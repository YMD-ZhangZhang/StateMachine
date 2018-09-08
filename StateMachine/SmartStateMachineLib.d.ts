declare module SmartStateMachine
{
	/**
     * 一个状态/行为
     */
    class MachineAction
    {
        funcOnEnter: Function;// 进入回调

        _name: string;
        _stateMachine: StateMachine;
        _transitionList: Array<MachineActionTransition>;// 转换列表

        constructor(name: string, stateMachine: StateMachine);
		
        getName();
        
        /**
         * 添加一个转换
         * @param transition 一个转换
         */
        addTransition(transition: MachineActionTransition);

        /**
         * 进入状态
         */
        enter(param: any);

        /**
         * 退出状态
         */
        exit();

        /**
         * 触发器
         * @param triggerFlag 触发Flag
         */
        trigger(triggerFlag: string, param: any = null);

        /**
         * 设置暂停
         * @param paused 是否暂停
         */
        setPaused(paused: boolean);

        onDelete();
    }
	
	/**
     * 状态机转换
     */
    class MachineActionTransition
    {
        _fromAction: MachineAction;
        _toAction: MachineAction;

        _paused: boolean = false;

        constructor(fromAction, toAction);

        /**
         * 激活
         */
        onEnable();

        /**
         * 冻结
         */
        onDisable();

        /**
         * 触发
         */
        onTrigger(triggerFlag: string, param: any);

        /**
         * 是否暂停
         */
        setPaused(paused: boolean);

        toNext(param: any);

        onDelete();
    }
	
	/**
     * 状态机，与游戏逻辑有关
     */
    class StateMachine
    {
        _nowAction: MachineAction;
        _actionList: Array<MachineAction> = new Array<MachineAction>();

        createAction(name: string);

        setAction(nowAction: MachineAction);

        getAction();

        /**
         * 设置暂停
         * @param paused 是否暂停
         */
        setPaused(paused: boolean);

        trigger(triggerName: string, param: any = null);

        onDelete();
    }
	
	/**
     * 转换-延时
     */
    class TransitionDelay extends MachineActionTransition
    {
        _delayTime: number;
        _nowDelayTime: number;

        _delayLoop: Function;
        _delayStopFunc: Function;
        _delayGetDelta: Function;
        _delayClearFunc: Function;

        constructor(fromAction, toAction, delayLoop: Function, delayStopFunc: Function, delayGetDelta: Function, delayClearFunc: Function);

        /**
         * 自动转换延时
         */
        setDelayTime(delayTime: number);

        /**
         * Override
         */
        onEnable();
        /**
         * Override
         */
        onDisable();

        delayUpdate();

        onDelayOver();

        onDelete();
    }
	
	/**
     * 转换-触发器
     */
    class TransitionTrigger extends MachineActionTransition
    {
        _triggerFlag: string;// 触发器Flag
        _triggerProtectTime: number = 0;// 触发器的保护期(在保护期内触发器无效)
        _triggerEndTime: number = 0;// 触发器结束时间(结束后触发器无效)
        _triggerProtecting: boolean;// 触发保护生效中

        _delayBeginFunc: Function;
        _delayStopFunc: Function;
        _delayClearFunc: Function;

        constructor(fromAction, toAction, delayBeginFunc: Function, delayStopFunc: Function, delayClearFunc: Function);

        /**
         * 触发器Flag
         */
        public setTriggerFlag(triggerFlag: string);

        /**
         * 触发器保护时间
         */
        public setTriggerProtectTime(time: number);

        /**
         * 触发器截止时间
         */
        public setTriggerEndTime(time: number);

        /**
         * Override
         */
        public onEnable();

        /**
         * Override
         */
        public onDisable();

        /**
         * Override
         */
        public onTrigger(triggerFlag: string, param: any);

        private onTriggerProtectTimeOver()
        {
            this._triggerProtecting = false;
        }

        private onTriggerEndTimerOver();

        // Override
        onDelete();
    }
}