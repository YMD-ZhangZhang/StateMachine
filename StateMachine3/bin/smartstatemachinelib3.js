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
        function MachineAction(name, stateMachine, frameLoop, clear, delta) {
            this._runningTime = 0;
            this._name = name;
            this._stateMachine = stateMachine;
            this._transitionList = new Array();
            this._eventList = new Array();
            this._frameLoop = frameLoop;
            this._clear = clear;
            this._delta = delta;
            this._frameLoop(1, this, this.onUpdate);
        }
        MachineAction.prototype.addEvent = function (e) {
            this._eventList.push(e);
        };
        MachineAction.prototype.onUpdate = function () {
            if (!this._canUpdate)
                return;
            this._runningTime += this._delta();
            this.tryTriggerEvent();
        };
        MachineAction.prototype.tryTriggerEvent = function () {
            var _this = this;
            this._eventList.forEach(function (e) {
                if (e.getStatus() == SmartStateMachine.EventStatus.NO_TRIGGER) {
                    if (e.getStartTime() <= _this._runningTime) {
                        e.setStatus(SmartStateMachine.EventStatus.TRIGGER_ED);
                        if (_this.onEvent)
                            _this.onEvent(e, _this._saveParam);
                    }
                }
            });
        };
        MachineAction.prototype.getName = function () {
            return this._name;
        };
        MachineAction.prototype.addTransition = function (transition) {
            this._transitionList.push(transition);
        };
        MachineAction.prototype.enter = function (param) {
            this._saveParam = param;
            this._stateMachine.setAction(this);
            if (this.funcOnEnter)
                this.funcOnEnter(this._saveParam);
            this._transitionList.forEach(function (x) { return x.onEnable(); });
            this._runningTime = 0;
            this.resetAllEventStatus();
            this._canUpdate = true;
        };
        MachineAction.prototype.resetAllEventStatus = function () {
            this._eventList.forEach(function (x) { return x.setStatus(SmartStateMachine.EventStatus.NO_TRIGGER); });
        };
        MachineAction.prototype.exit = function () {
            var _this = this;
            this._eventList.forEach(function (e) {
                if (e.getStatus() == SmartStateMachine.EventStatus.NO_TRIGGER) {
                    e.setStatus(SmartStateMachine.EventStatus.TRIGGER_ED);
                    if (_this.onEvent)
                        _this.onEvent(e, _this._saveParam);
                }
            });
            this._transitionList.forEach(function (x) { return x.onDisable(); });
            this._canUpdate = false;
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
                for (var i = 0; i < this._transitionList.length; i++) {
                    var x = this._transitionList[i];
                    x.onDelete();
                }
                this._transitionList = null;
            }
            this._clear(this, this.onUpdate);
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
        function StateMachine(frameLoop, clear, delta) {
            this._actionList = new Array();
            this._forceActionList = new Array();
            this._frameLoop = frameLoop;
            this._clear = clear;
            this._delta = delta;
        }
        StateMachine.prototype.createAction = function (name) {
            var action = new SmartStateMachine.MachineAction(name, this, this._frameLoop, this._clear, this._delta);
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
        StateMachine.prototype.getSpecifiedAction = function (name) {
            for (var i = 0; i < this._actionList.length; i++) {
                var action = this._actionList[i];
                if (action.getName() == name)
                    return action;
            }
            return null;
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
    var EventStatus;
    (function (EventStatus) {
        EventStatus[EventStatus["NO_TRIGGER"] = 0] = "NO_TRIGGER";
        EventStatus[EventStatus["TRIGGER_ED"] = 1] = "TRIGGER_ED";
    })(EventStatus = SmartStateMachine.EventStatus || (SmartStateMachine.EventStatus = {}));
    var BaseEvent = (function () {
        function BaseEvent(id, startTime) {
            this._status = EventStatus.NO_TRIGGER;
            this._id = id;
            this._startTime = startTime;
        }
        BaseEvent.prototype.getID = function () { return this._id; };
        BaseEvent.prototype.getStartTime = function () { return this._startTime; };
        BaseEvent.prototype.setStatus = function (status) {
            this._status = status;
        };
        BaseEvent.prototype.getStatus = function () {
            return this._status;
        };
        return BaseEvent;
    }());
    SmartStateMachine.BaseEvent = BaseEvent;
})(SmartStateMachine || (SmartStateMachine = {}));
var SmartStateMachine;
(function (SmartStateMachine) {
    var AttackEvent = (function (_super) {
        __extends(AttackEvent, _super);
        function AttackEvent(id, startTime) {
            return _super.call(this, id, startTime) || this;
        }
        return AttackEvent;
    }(SmartStateMachine.BaseEvent));
    SmartStateMachine.AttackEvent = AttackEvent;
})(SmartStateMachine || (SmartStateMachine = {}));
var SmartStateMachine;
(function (SmartStateMachine) {
    var EffectEvent = (function (_super) {
        __extends(EffectEvent, _super);
        function EffectEvent(id, startTime) {
            return _super.call(this, id, startTime) || this;
        }
        return EffectEvent;
    }(SmartStateMachine.BaseEvent));
    SmartStateMachine.EffectEvent = EffectEvent;
})(SmartStateMachine || (SmartStateMachine = {}));
var SmartStateMachine;
(function (SmartStateMachine) {
    var MoveEvent = (function (_super) {
        __extends(MoveEvent, _super);
        function MoveEvent(id, startTime) {
            return _super.call(this, id, startTime) || this;
        }
        return MoveEvent;
    }(SmartStateMachine.BaseEvent));
    SmartStateMachine.MoveEvent = MoveEvent;
})(SmartStateMachine || (SmartStateMachine = {}));
var SmartStateMachine;
(function (SmartStateMachine) {
    var SoundEvent = (function (_super) {
        __extends(SoundEvent, _super);
        function SoundEvent(id, startTime) {
            return _super.call(this, id, startTime) || this;
        }
        return SoundEvent;
    }(SmartStateMachine.BaseEvent));
    SmartStateMachine.SoundEvent = SoundEvent;
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
        function TransitionDelay(fromAction, toAction, frameLoop, clear, delta) {
            var _this = _super.call(this, fromAction, toAction) || this;
            _this._frameLoop = frameLoop;
            _this._clear = clear;
            _this._delta = delta;
            _this._canUpdate = false;
            _this._frameLoop(1, _this, _this.onUpdate);
            return _this;
        }
        TransitionDelay.prototype.setDelayTime = function (delayTime) {
            this._delayTime = delayTime;
        };
        TransitionDelay.prototype.onEnable = function () {
            this._nowDelayTime = 0;
            this._canUpdate = true;
        };
        TransitionDelay.prototype.onDisable = function () {
            this._canUpdate = false;
        };
        TransitionDelay.prototype.onUpdate = function () {
            if (this._paused || !this._canUpdate)
                return;
            this._nowDelayTime += this._delta();
            if (this._nowDelayTime >= this._delayTime) {
                this.onDelayOver();
            }
        };
        TransitionDelay.prototype.onDelayOver = function () {
            this.toNext(null);
        };
        TransitionDelay.prototype.onDelete = function () {
            this._clear(this, this.onUpdate);
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
        function TransitionTrigger(fromAction, toAction, frameLoop, clear, delta) {
            var _this = _super.call(this, fromAction, toAction) || this;
            _this._triggerProtectTime = 0;
            _this._triggerEndTime = 0;
            _this._nowTriggerProtectTime = 0;
            _this._nowTriggerEndTime = 0;
            _this._frameLoop = frameLoop;
            _this._clear = clear;
            _this._delta = delta;
            _this._canUpdate = false;
            _this._frameLoop(1, _this, _this.onUpdate);
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
            this._canUpdate = true;
            if (this._triggerProtectTime > 0) {
                this._triggerProtecting = true;
                this._nowTriggerProtectTime = this._triggerProtectTime;
                if (this._triggerEndTime > 0) {
                    this._nowTriggerEndTime = this._triggerEndTime;
                }
            }
            else {
                this._triggerProtecting = false;
            }
        };
        TransitionTrigger.prototype.onDisable = function () {
            this._canUpdate = false;
        };
        TransitionTrigger.prototype.onUpdate = function () {
            if (this._paused || !this._canUpdate)
                return;
            if (this._nowTriggerProtectTime > 0) {
                this._nowTriggerProtectTime -= this._delta();
                if (this._nowTriggerProtectTime <= 0) {
                    this.onTriggerProtectTimeOver();
                }
            }
            if (this._nowTriggerEndTime > 0) {
                this._nowTriggerEndTime -= this._delta();
                if (this._nowTriggerEndTime <= 0) {
                    this.onTriggerEndTimerOver();
                }
            }
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
            this._clear(this, this.onUpdate);
            this._clear(this, this.onTriggerProtectTimeOver);
            this._clear(this, this.onTriggerEndTimerOver);
            _super.prototype.onDelete.call(this);
        };
        return TransitionTrigger;
    }(SmartStateMachine.MachineActionTransition));
    SmartStateMachine.TransitionTrigger = TransitionTrigger;
})(SmartStateMachine || (SmartStateMachine = {}));
