
namespace SmartStateMachine
{
    /**
     * 一个状态/行为
     */
    export class MachineAction
    {
        public funcOnEnter: Function;// 进入回调

        private _name: string;
        private _stateMachine: StateMachine;
        private _transitionList: Array<MachineActionTransition>;// 转换列表

        constructor(name: string, stateMachine: StateMachine)
        {
            this._name = name;
            this._stateMachine = stateMachine;
            this._transitionList = new Array<MachineActionTransition>();
        }

        public getName()
        {
            return this._name;
        }

        /**
         * 添加一个转换
         * @param transition 一个转换
         */
        public addTransition(transition: MachineActionTransition)
        {
            this._transitionList.push(transition);
        }

        /**
         * 进入状态
         */
        public enter(param: any)
        {
            this._stateMachine.setAction(this);

            if (this.funcOnEnter)
                this.funcOnEnter(param);

            // 激活当前Action的所有Transition
            this._transitionList.forEach(x => x.onEnable());
        }

        /**
         * 退出状态
         */
        public exit()
        {
            // 冻结当前Action的所有Transition
            this._transitionList.forEach(x => x.onDisable());
        }

        /**
         * 触发器
         * @param triggerFlag 触发Flag
         */
        public trigger(triggerFlag: string, param: any = null)
        {
            this._transitionList.forEach(x => x.onTrigger(triggerFlag, param));
        }

        /**
         * 设置暂停
         * @param paused 是否暂停
         */
        public setPaused(paused: boolean)
        {
            this._transitionList.forEach(x => x.setPaused(paused));
        }

        onDelete()
        {
            this._transitionList.forEach(x => x.onDelete());
        }
    }
	
	/**
     * 状态机转换
     */
    export abstract class MachineActionTransition
    {
        private _fromAction: MachineAction;
        private _toAction: MachineAction;

        protected _paused: boolean = false;

        constructor(fromAction, toAction)
        {
            this._fromAction = fromAction;
            this._toAction = toAction;
        }

        /**
         * 激活
         */
        public abstract onEnable()

        /**
         * 冻结
         */
        public abstract onDisable()

        /**
         * 触发
         */
        public onTrigger(triggerFlag: string, param: any){}

        /**
         * 是否暂停
         */
        public setPaused(paused: boolean)
        {
            this._paused = paused;
        }

        protected toNext(param: any)
        {
            this._fromAction.exit();
            this._toAction.enter(param);
        }

        onDelete()
        {
        }
    }
	
	/**
     * 状态机，与游戏逻辑有关
     */
    export class StateMachine
    {
        private _nowAction: MachineAction;
        private _actionList: Array<MachineAction> = new Array<MachineAction>();

        public createAction(name: string) : MachineAction
        {
            let action = new MachineAction(name, this);
            this._actionList.push(action);
            return action;
        }

        public setAction(nowAction: MachineAction)
        {
            this._nowAction = nowAction;
        }

        public getAction() : MachineAction
        {
            return this._nowAction;
        }

        /**
         * 设置暂停
         * @param paused 是否暂停
         */
        public setPaused(paused: boolean)
        {
            this._nowAction.setPaused(paused);
        }

        public trigger(triggerName: string, param: any = null)
        {
            this._nowAction.trigger(triggerName, param);
        }

        onDelete()
        {
            this._actionList.forEach(x => x.onDelete());
        }
    }
	
	/**
     * 转换-延时
     */
    export class TransitionDelay extends MachineActionTransition
    {
        private _delayTime: number;
        private _nowDelayTime: number;

        private _delayLoop: Function;
        private _delayStopFunc: Function;
        private _delayGetDelta: Function;
        private _delayClearFunc: Function;

        constructor(fromAction, toAction, delayLoop: Function, delayStopFunc: Function, delayGetDelta: Function, delayClearFunc: Function)
        {
            super(fromAction, toAction);

            this._delayLoop = delayLoop;
            this._delayStopFunc = delayStopFunc;
            this._delayGetDelta = delayGetDelta;
            this._delayClearFunc = delayClearFunc;
        }

        /**
         * 自动转换延时
         */
        public setDelayTime(delayTime: number)
        {
            this._delayTime = delayTime;
        }

        /**
         * Override
         */
        public onEnable()
        {
            this._nowDelayTime = 0;
            this._delayLoop(1, this, this.delayUpdate);
        }

        /**
         * Override
         */
        public onDisable()
        {
            this._delayStopFunc(this, this.delayUpdate);
        }

        private delayUpdate()
        {
            if (this._paused)
                return;
                
            this._nowDelayTime += this._delayGetDelta();
            if (this._nowDelayTime >= this._delayTime)
            {
                this.onDelayOver();
            }
        }

        private onDelayOver()
        {
            this.toNext(null);
        }

        onDelete()
        {
            this._delayClearFunc(this);
        }
    }
	
	/**
     * 转换-触发器
     */
    export class TransitionTrigger extends MachineActionTransition
    {
        private _triggerFlag: string;// 触发器Flag
        private _triggerProtectTime: number = 0;// 触发器的保护期(在保护期内触发器无效)
        private _triggerEndTime: number = 0;// 触发器结束时间(结束后触发器无效)
        private _triggerProtecting: boolean;// 触发保护生效中

        private _delayBeginFunc: Function;
        private _delayStopFunc: Function;
        private _delayClearFunc: Function;

        constructor(fromAction, toAction, delayBeginFunc: Function, delayStopFunc: Function, delayClearFunc: Function)
        {
            super(fromAction, toAction);
            this._delayBeginFunc = delayBeginFunc;
            this._delayStopFunc = delayStopFunc;
            this._delayClearFunc = delayClearFunc;
        }

        /**
         * 触发器Flag
         */
        public setTriggerFlag(triggerFlag: string)
        {
            this._triggerFlag = triggerFlag;
        }

        /**
         * 触发器保护时间
         */
        public setTriggerProtectTime(time: number) : TransitionTrigger
        {
            this._triggerProtectTime = time;
            return this;
        }

        /**
         * 触发器截止时间
         */
        public setTriggerEndTime(time: number) : TransitionTrigger
        {
            this._triggerEndTime = time;
            return this;
        }

        /**
         * Override
         */
        public onEnable()
        {
            if (this._triggerProtectTime > 0)
            {
                this._triggerProtecting = true;
                this._delayBeginFunc(this._triggerProtectTime, this, this.onTriggerProtectTimeOver)

                if (this._triggerEndTime > 0)
                {
                    this._delayBeginFunc(this._triggerEndTime, this, this.onTriggerEndTimerOver)
                }
            }
            else
            {
                this._triggerProtecting = false;
            }
        }

        /**
         * Override
         */
        public onDisable()
        {
            this._delayStopFunc(this, this.onTriggerProtectTimeOver);
        }

        /**
         * Override
         */
        public onTrigger(triggerFlag: string, param: any)
        {
            if (this._triggerFlag == triggerFlag && !this._triggerProtecting)
            {
                this.toNext(param);
            }
        }

        private onTriggerProtectTimeOver()
        {
            this._triggerProtecting = false;
        }

        private onTriggerEndTimerOver()
        {
            this._triggerProtecting = true;
        }

        // Override
        onDelete()
        {
            this._delayClearFunc(this);
        }
    }
}