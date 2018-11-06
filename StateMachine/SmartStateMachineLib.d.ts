declare namespace SmartStateMachine {
    /**
     * 一个状态/行为
     */
    class MachineAction {
        funcOnEnter: Function;
        private _name;
        private _stateMachine;
        private _transitionList;
        constructor(name: string, stateMachine: StateMachine);
        getName(): string;
        /**
         * 添加一个转换
         * @param transition 一个转换
         */
        addTransition(transition: MachineActionTransition): void;
        /**
         * 进入状态
         */
        enter(param: any): void;
        /**
         * 退出状态
         */
        exit(): void;
        /**
         * 触发器
         * @param triggerFlag 触发Flag
         */
        trigger(triggerFlag: string, param?: any): void;
        /**
         * 设置暂停
         * @param paused 是否暂停
         */
        setPaused(paused: boolean): void;
        onDelete(): void;
    }
    /**
     * 状态机转换
     */
    abstract class MachineActionTransition {
        private _fromAction;
        private _toAction;
        protected _paused: boolean;
        constructor(fromAction: any, toAction: any);
        /**
         * 激活
         */
        abstract onEnable(): any;
        /**
         * 冻结
         */
        abstract onDisable(): any;
        /**
         * 触发
         */
        onTrigger(triggerFlag: string, param: any): void;
        /**
         * 是否暂停
         */
        setPaused(paused: boolean): void;
        protected toNext(param: any): void;
        onDelete(): void;
    }
    /**
     * 状态机，与游戏逻辑有关
     */
    class StateMachine {
        private _nowAction;
        private _actionList;
        createAction(name: string): MachineAction;
        setAction(nowAction: MachineAction): void;
        getAction(): MachineAction;
        /**
         * 设置暂停
         * @param paused 是否暂停
         */
        setPaused(paused: boolean): void;
        trigger(triggerName: string, param?: any): void;
        onDelete(): void;
    }
    /**
     * 转换-延时
     */
    class TransitionDelay extends MachineActionTransition {
        private _delayTime;
        private _nowDelayTime;
        private _delayLoop;
        private _delayStopFunc;
        private _delayGetDelta;
        private _delayClearFunc;
        constructor(fromAction: any, toAction: any, delayLoop: Function, delayStopFunc: Function, delayGetDelta: Function, delayClearFunc: Function);
        /**
         * 自动转换延时
         */
        setDelayTime(delayTime: number): void;
        /**
         * Override
         */
        onEnable(): void;
        /**
         * Override
         */
        onDisable(): void;
        private delayUpdate();
        private onDelayOver();
        onDelete(): void;
    }
    /**
     * 转换-触发器
     */
    class TransitionTrigger extends MachineActionTransition {
        private _triggerFlag;
        private _triggerProtectTime;
        private _triggerEndTime;
        private _triggerProtecting;
        private _delayBeginFunc;
        private _delayStopFunc;
        private _delayClearFunc;
        constructor(fromAction: any, toAction: any, delayBeginFunc: Function, delayStopFunc: Function, delayClearFunc: Function);
        /**
         * 触发器Flag
         */
        setTriggerFlag(triggerFlag: string): void;
        /**
         * 触发器保护时间
         */
        setTriggerProtectTime(time: number): TransitionTrigger;
        /**
         * 触发器截止时间
         */
        setTriggerEndTime(time: number): TransitionTrigger;
        /**
         * Override
         */
        onEnable(): void;
        /**
         * Override
         */
        onDisable(): void;
        /**
         * Override
         */
        onTrigger(triggerFlag: string, param: any): void;
        private onTriggerProtectTimeOver();
        private onTriggerEndTimerOver();
        onDelete(): void;
    }
}
