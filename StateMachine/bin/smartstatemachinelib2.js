var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SmartStateMachine;
(function (SmartStateMachine) {
    var MachineAction = (function () {
        function MachineAction(name, stateMachine) {
            this._name = name;
            this._stateMachine = stateMachine;
            this._transitionList = new Array();
        }
        MachineAction.prototype.getName = function () {
            return this._name;
        };
        MachineAction.prototype.addTransition = function (transition) {
            this._transitionList.push(transition);
        };
        MachineAction.prototype.enter = function (param) {
            this._stateMachine.setAction(this);
            if (this.funcOnEnter)
                this.funcOnEnter(param);
            this._transitionList.forEach(function (x) { return x.onEnable(); });
        };
        MachineAction.prototype.exit = function () {
            this._transitionList.forEach(function (x) { return x.onDisable(); });
        };
        MachineAction.prototype.trigger = function (triggerFlag, param) {
            if (param === void 0) { param = null; }
            this._transitionList.forEach(function (x) { return x.onTrigger(triggerFlag, param); });
        };
        MachineAction.prototype.setPaused = function (paused) {
            this._transitionList.forEach(function (x) { return x.setPaused(paused); });
        };
        MachineAction.prototype.onDelete = function () {
            if (this._transitionList) {
                this._transitionList.forEach(function (x) { return x.onDelete(); });
                this._transitionList = null;
            }
            this.funcOnEnter = null;
            this._stateMachine = null;
        };
        return MachineAction;
    }());
    SmartStateMachine.MachineAction = MachineAction;
})(SmartStateMachine || (SmartStateMachine = {}));
var SmartStateMachine;
(function (SmartStateMachine) {
    var StateMachine = (function () {
        function StateMachine() {
            this._actionList = new Array();
            this._forceActionList = new Array();
        }
        StateMachine.prototype.createAction = function (name) {
            var action = new SmartStateMachine.MachineAction(name, this);
            this._actionList.push(action);
            return action;
        };
        StateMachine.prototype.addForceAction = function (action) {
            this._forceActionList.push(action);
        };
        StateMachine.prototype.setAction = function (nowAction) {
            this._nowAction = nowAction;
        };
        StateMachine.prototype.getAction = function () {
            return this._nowAction;
        };
        StateMachine.prototype.setPaused = function (paused) {
            this._nowAction.setPaused(paused);
        };
        StateMachine.prototype.trigger = function (triggerName, param) {
            if (param === void 0) { param = null; }
            this._nowAction.trigger(triggerName, param);
        };
        StateMachine.prototype.enterForceAction = function (name) {
            var forces = this._forceActionList.filter(function (action) { return action.getName() == name; });
            if (forces.length > 0) {
                this._nowAction.exit();
                forces[0].enter(null);
            }
        };
        StateMachine.prototype.onDelete = function () {
            if (this._actionList) {
                this._actionList.forEach(function (x) { return x.onDelete(); });
                this._actionList = null;
            }
            if (this._forceActionList) {
                this._forceActionList.forEach(function (x) { return x.onDelete(); });
                this._forceActionList = null;
            }
            this._nowAction = null;
        };
        return StateMachine;
    }());
    SmartStateMachine.StateMachine = StateMachine;
})(SmartStateMachine || (SmartStateMachine = {}));
var SmartStateMachine;
(function (SmartStateMachine) {
    var MachineActionTransition = (function () {
        function MachineActionTransition(fromAction, toAction) {
            this._paused = false;
            this._fromAction = fromAction;
            this._toAction = toAction;
        }
        MachineActionTransition.prototype.onTrigger = function (triggerFlag, param) { };
        MachineActionTransition.prototype.setPaused = function (paused) {
            this._paused = paused;
        };
        MachineActionTransition.prototype.toNext = function (param) {
            this._fromAction.exit();
            this._toAction.enter(param);
        };
        MachineActionTransition.prototype.onDelete = function () {
            this._fromAction = null;
            this._toAction = null;
        };
        return MachineActionTransition;
    }());
    SmartStateMachine.MachineActionTransition = MachineActionTransition;
})(SmartStateMachine || (SmartStateMachine = {}));
var SmartStateMachine;
(function (SmartStateMachine) {
    var TransitionDelay = (function (_super) {
        __extends(TransitionDelay, _super);
        function TransitionDelay(fromAction, toAction, delayLoop, delayStopFunc, delayGetDelta, delayClearFunc) {
            var _this = _super.call(this, fromAction, toAction) || this;
            _this._delayLoop = delayLoop;
            _this._delayStopFunc = delayStopFunc;
            _this._delayGetDelta = delayGetDelta;
            _this._delayClearFunc = delayClearFunc;
            return _this;
        }
        TransitionDelay.prototype.setDelayTime = function (delayTime) {
            this._delayTime = delayTime;
        };
        TransitionDelay.prototype.onEnable = function () {
            this._nowDelayTime = 0;
            this._delayLoop(1, this, this.delayUpdate);
        };
        TransitionDelay.prototype.onDisable = function () {
            this._delayStopFunc(this, this.delayUpdate);
        };
        TransitionDelay.prototype.delayUpdate = function () {
            if (this._paused)
                return;
            this._nowDelayTime += this._delayGetDelta();
            if (this._nowDelayTime >= this._delayTime) {
                this.onDelayOver();
            }
        };
        TransitionDelay.prototype.onDelayOver = function () {
            this.toNext(null);
        };
        TransitionDelay.prototype.onDelete = function () {
            this._delayStopFunc(this, this.delayUpdate);
            _super.prototype.onDelete.call(this);
        };
        return TransitionDelay;
    }(SmartStateMachine.MachineActionTransition));
    SmartStateMachine.TransitionDelay = TransitionDelay;
})(SmartStateMachine || (SmartStateMachine = {}));
var SmartStateMachine;
(function (SmartStateMachine) {
    var TransitionTrigger = (function (_super) {
        __extends(TransitionTrigger, _super);
        function TransitionTrigger(fromAction, toAction, delayBeginFunc, delayStopFunc, delayClearFunc) {
            var _this = _super.call(this, fromAction, toAction) || this;
            _this._triggerProtectTime = 0;
            _this._triggerEndTime = 0;
            _this._delayBeginFunc = delayBeginFunc;
            _this._delayStopFunc = delayStopFunc;
            _this._delayClearFunc = delayClearFunc;
            return _this;
        }
        TransitionTrigger.prototype.setTriggerFlag = function (triggerFlag) {
            this._triggerFlag = triggerFlag;
        };
        TransitionTrigger.prototype.setTriggerProtectTime = function (time) {
            this._triggerProtectTime = time;
            return this;
        };
        TransitionTrigger.prototype.setTriggerEndTime = function (time) {
            this._triggerEndTime = time;
            return this;
        };
        TransitionTrigger.prototype.onEnable = function () {
            if (this._triggerProtectTime > 0) {
                this._triggerProtecting = true;
                this._delayBeginFunc(this._triggerProtectTime, this, this.onTriggerProtectTimeOver);
                if (this._triggerEndTime > 0) {
                    this._delayBeginFunc(this._triggerEndTime, this, this.onTriggerEndTimerOver);
                }
            }
            else {
                this._triggerProtecting = false;
            }
        };
        TransitionTrigger.prototype.onDisable = function () {
            this._delayStopFunc(this, this.onTriggerProtectTimeOver);
        };
        TransitionTrigger.prototype.onTrigger = function (triggerFlag, param) {
            if (this._triggerFlag == triggerFlag && !this._triggerProtecting) {
                this.toNext(param);
            }
        };
        TransitionTrigger.prototype.onTriggerProtectTimeOver = function () {
            this._triggerProtecting = false;
        };
        TransitionTrigger.prototype.onTriggerEndTimerOver = function () {
            this._triggerProtecting = true;
        };
        TransitionTrigger.prototype.onDelete = function () {
            this._delayStopFunc(this, this.onTriggerProtectTimeOver);
            this._delayStopFunc(this, this.onTriggerEndTimerOver);
            _super.prototype.onDelete.call(this);
        };
        return TransitionTrigger;
    }(SmartStateMachine.MachineActionTransition));
    SmartStateMachine.TransitionTrigger = TransitionTrigger;
})(SmartStateMachine || (SmartStateMachine = {}));
