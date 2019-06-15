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
    class StateMachine {
        private _nowAction;
        private _actionList;
        private _forceActionList;
        createAction(name: string): MachineAction;
        addForceAction(action: MachineAction): void;
        setAction(nowAction: MachineAction): void;
        getAction(): MachineAction;
        setPaused(paused: boolean): void;
        trigger(triggerName: string, param?: any): void;
        enterForceAction(name: string): void;
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
    class TransitionDelay extends MachineActionTransition {
        private _delayTime;
        private _nowDelayTime;
        private _frameLoop;
        private _clear;
        private _delta;
        constructor(fromAction: any, toAction: any, frameLoop: Function, clear: Function, delta: Function);
        setDelayTime(delayTime: number): void;
        onEnable(): void;
        onDisable(): void;
        private onUpdate;
        private onDelayOver;
        onDelete(): void;
    }
}
declare namespace SmartStateMachine {
    class TransitionTrigger extends MachineActionTransition {
        private _triggerFlag;
        private _triggerProtectTime;
        private _triggerEndTime;
        private _triggerProtecting;
        private _nowTriggerProtectTime;
        private _nowTriggerEndTime;
        private _clear;
        private _frameLoop;
        private _delta;
        constructor(fromAction: any, toAction: any, frameLoop: Function, clear: Function, delta: Function);
        setTriggerFlag(triggerFlag: string): void;
        setTriggerProtectTime(time: number): TransitionTrigger;
        setTriggerEndTime(time: number): TransitionTrigger;
        onEnable(): void;
        onDisable(): void;
        private onUpdate;
        onTrigger(triggerFlag: string, param: any): void;
        private onTriggerProtectTimeOver;
        private onTriggerEndTimerOver;
        onDelete(): void;
    }
}
