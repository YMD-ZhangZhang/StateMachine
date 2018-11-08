declare namespace SmartStateMachine {
    class MachineAction {
        funcOnEnter: Function;
        private _name;
        private _stateMachine;
        private _transitionList;
        constructor(name: string, stateMachine: StateMachine);
        getName(): string;
        addTransition(transition: MachineActionTransition): void;
        enter(param: any): void;
        exit(): void;
        trigger(triggerFlag: string, param?: any): void;
        setPaused(paused: boolean): void;
        onDelete(): void;
    }
}
declare namespace SmartStateMachine {
    abstract class MachineActionTransition {
        private _fromAction;
        private _toAction;
        protected _paused: boolean;
        constructor(fromAction: any, toAction: any);
        abstract onEnable(): any;
        abstract onDisable(): any;
        onTrigger(triggerFlag: string, param: any): void;
        setPaused(paused: boolean): void;
        protected toNext(param: any): void;
        onDelete(): void;
    }
}
declare namespace SmartStateMachine {
    class StateMachine {
        private _nowAction;
        private _actionList;
        createAction(name: string): MachineAction;
        setAction(nowAction: MachineAction): void;
        getAction(): MachineAction;
        setPaused(paused: boolean): void;
        trigger(triggerName: string, param?: any): void;
        onDelete(): void;
    }
}
declare namespace SmartStateMachine {
    class TransitionDelay extends MachineActionTransition {
        private _delayTime;
        private _nowDelayTime;
        private _delayLoop;
        private _delayStopFunc;
        private _delayGetDelta;
        private _delayClearFunc;
        constructor(fromAction: any, toAction: any, delayLoop: Function, delayStopFunc: Function, delayGetDelta: Function, delayClearFunc: Function);
        setDelayTime(delayTime: number): void;
        onEnable(): void;
        onDisable(): void;
        private delayUpdate();
        private onDelayOver();
        onDelete(): void;
    }
}
declare namespace SmartStateMachine {
    class TransitionTrigger extends MachineActionTransition {
        private _triggerFlag;
        private _triggerProtectTime;
        private _triggerEndTime;
        private _triggerProtecting;
        private _delayBeginFunc;
        private _delayStopFunc;
        private _delayClearFunc;
        constructor(fromAction: any, toAction: any, delayBeginFunc: Function, delayStopFunc: Function, delayClearFunc: Function);
        setTriggerFlag(triggerFlag: string): void;
        setTriggerProtectTime(time: number): TransitionTrigger;
        setTriggerEndTime(time: number): TransitionTrigger;
        onEnable(): void;
        onDisable(): void;
        onTrigger(triggerFlag: string, param: any): void;
        private onTriggerProtectTimeOver();
        private onTriggerEndTimerOver();
        onDelete(): void;
    }
}
