
namespace SmartStateMachine
{
    /**
     * 一个状态/行为
     */
    export class MachineAction
    {
        public funcOnEnter: Function;// 进入回调
        public onEvent: Function;

        private _saveParam: any;

        private _name: string;
        private _stateMachine: StateMachine;
        private _transitionList: Array<MachineActionTransition>;// 转换列表

        private _eventList: Array<BaseEvent>;// 事件列表

        private _canUpdate: boolean;
        private _clear: Function;
        private _frameLoop: Function;
        private _delta: Function;

        private _runningTime: number = 0;// 本次运行时间

        constructor(name: string, stateMachine: StateMachine, frameLoop: Function, clear: Function, delta: Function)
        {
            this._name = name;
            this._stateMachine = stateMachine;
            this._transitionList = new Array<MachineActionTransition>();
            this._eventList = new Array<BaseEvent>();

            this._frameLoop = frameLoop;
            this._clear = clear;
            this._delta = delta;

            this._frameLoop(1, this, this.onUpdate);
        }

        /**
         * 添加事件
         * @param e 事件
         */
        public addEvent(e: BaseEvent)
        {
            //console.log(`[${this._name}]增加事件[${e.getID()}]`);
            this._eventList.push(e);
        }

        private onUpdate()
        {
            if (!this._canUpdate)
                return;

            this._runningTime += this._delta();
            this.tryTriggerEvent();
        }

        private tryTriggerEvent()
        {
            this._eventList.forEach(e =>
            {
                if (e.getStatus() == EventStatus.NO_TRIGGER)
                {
                    if (e.getStartTime() <= this._runningTime)
                    {
                        e.setStatus(EventStatus.TRIGGER_ED);
                        //console.log(`[${this._name}]触发了事件[${e.getID()}] 时间[${e.getStartTime()}]`);
                        if (this.onEvent)
                            this.onEvent(e, this._saveParam);
                    }
                }
            });
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
            this._saveParam = param;
            this._stateMachine.setAction(this);

            if (this.funcOnEnter)
                this.funcOnEnter(this._saveParam);

            // 激活当前Action的所有Transition
            this._transitionList.forEach(x => x.onEnable());

            this._runningTime = 0;

            // 重置所有事件状态
            this.resetAllEventStatus();

            this._canUpdate = true;
        }

        /**
         * 重置所有事件状态
         */
        private resetAllEventStatus()
        {
            this._eventList.forEach(x => x.setStatus(EventStatus.NO_TRIGGER));
        }

        /**
         * 退出状态
         */
        public exit()
        {
            // 发送所有未处理的事件
            this._eventList.forEach(e =>
            {
                if (e.getStatus() == EventStatus.NO_TRIGGER)
                {
                    e.setStatus(EventStatus.TRIGGER_ED);
                    if (this.onEvent)
                        this.onEvent(e, this._saveParam);
                }
            });

            // 冻结当前Action的所有Transition
            this._transitionList.forEach(x => x.onDisable());

            this._canUpdate = false;
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
            if (this._transitionList)
            {
                this._transitionList.forEach(x => x.onDelete());
                this._transitionList = null;
            }
            
            this._clear(this, this.onUpdate);

            this.funcOnEnter = null;
            this._stateMachine = null;
        }
    }
}