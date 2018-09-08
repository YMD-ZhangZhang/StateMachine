var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SmartStateMachine;
(function (SmartStateMachine) {
    /**
     * 一个状态/行为
     */
    var MachineAction = (function () {
        function MachineAction(name, stateMachine) {
            this._name = name;
            this._stateMachine = stateMachine;
            this._transitionList = new Array();
        }
        MachineAction.prototype.getName = function () {
            return this._name;
        };
        /**
         * 添加一个转换
         * @param transition 一个转换
         */
        MachineAction.prototype.addTransition = function (transition) {
            this._transitionList.push(transition);
        };
        /**
         * 进入状态
         */
        MachineAction.prototype.enter = function (param) {
            this._stateMachine.setAction(this);
            if (this.funcOnEnter)
                this.funcOnEnter(param);
            // 激活当前Action的所有Transition
            this._transitionList.forEach(function (x) { return x.onEnable(); });
        };
        /**
         * 退出状态
         */
        MachineAction.prototype.exit = function () {
            // 冻结当前Action的所有Transition
            this._transitionList.forEach(function (x) { return x.onDisable(); });
        };
        /**
         * 触发器
         * @param triggerFlag 触发Flag
         */
        MachineAction.prototype.trigger = function (triggerFlag, param) {
            if (param === void 0) { param = null; }
            this._transitionList.forEach(function (x) { return x.onTrigger(triggerFlag, param); });
        };
        /**
         * 设置暂停
         * @param paused 是否暂停
         */
        MachineAction.prototype.setPaused = function (paused) {
            this._transitionList.forEach(function (x) { return x.setPaused(paused); });
        };
        MachineAction.prototype.onDelete = function () {
            this._transitionList.forEach(function (x) { return x.onDelete(); });
        };
        return MachineAction;
    }());
    SmartStateMachine.MachineAction = MachineAction;
    /**
     * 状态机转换
     */
    var MachineActionTransition = (function () {
        function MachineActionTransition(fromAction, toAction) {
            this._paused = false;
            this._fromAction = fromAction;
            this._toAction = toAction;
        }
        /**
         * 触发
         */
        MachineActionTransition.prototype.onTrigger = function (triggerFlag, param) { };
        /**
         * 是否暂停
         */
        MachineActionTransition.prototype.setPaused = function (paused) {
            this._paused = paused;
        };
        MachineActionTransition.prototype.toNext = function (param) {
            this._fromAction.exit();
            this._toAction.enter(param);
        };
        MachineActionTransition.prototype.onDelete = function () {
        };
        return MachineActionTransition;
    }());
    SmartStateMachine.MachineActionTransition = MachineActionTransition;
    /**
     * 状态机，与游戏逻辑有关
     */
    var StateMachine = (function () {
        function StateMachine() {
            this._actionList = new Array();
        }
        StateMachine.prototype.createAction = function (name) {
            var action = new MachineAction(name, this);
            this._actionList.push(action);
            return action;
        };
        StateMachine.prototype.setAction = function (nowAction) {
            this._nowAction = nowAction;
        };
        StateMachine.prototype.getAction = function () {
            return this._nowAction;
        };
        /**
         * 设置暂停
         * @param paused 是否暂停
         */
        StateMachine.prototype.setPaused = function (paused) {
            this._nowAction.setPaused(paused);
        };
        StateMachine.prototype.trigger = function (triggerName, param) {
            if (param === void 0) { param = null; }
            this._nowAction.trigger(triggerName, param);
        };
        StateMachine.prototype.onDelete = function () {
            this._actionList.forEach(function (x) { return x.onDelete(); });
        };
        return StateMachine;
    }());
    SmartStateMachine.StateMachine = StateMachine;
    /**
     * 转换-延时
     */
    var TransitionDelay = (function (_super) {
        __extends(TransitionDelay, _super);
        function TransitionDelay(fromAction, toAction, delayLoop, delayStopFunc, delayGetDelta, delayClearFunc) {
            _super.call(this, fromAction, toAction);
            this._delayLoop = delayLoop;
            this._delayStopFunc = delayStopFunc;
            this._delayGetDelta = delayGetDelta;
            this._delayClearFunc = delayClearFunc;
        }
        /**
         * 自动转换延时
         */
        TransitionDelay.prototype.setDelayTime = function (delayTime) {
            this._delayTime = delayTime;
        };
        /**
         * Override
         */
        TransitionDelay.prototype.onEnable = function () {
            this._nowDelayTime = 0;
            this._delayLoop(1, this, this.delayUpdate);
        };
        /**
         * Override
         */
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
            this._delayClearFunc(this);
        };
        return TransitionDelay;
    }(MachineActionTransition));
    SmartStateMachine.TransitionDelay = TransitionDelay;
    /**
     * 转换-触发器
     */
    var TransitionTrigger = (function (_super) {
        __extends(TransitionTrigger, _super);
        function TransitionTrigger(fromAction, toAction, delayBeginFunc, delayStopFunc, delayClearFunc) {
            _super.call(this, fromAction, toAction);
            this._triggerProtectTime = 0; // 触发器的保护期(在保护期内触发器无效)
            this._triggerEndTime = 0; // 触发器结束时间(结束后触发器无效)
            this._delayBeginFunc = delayBeginFunc;
            this._delayStopFunc = delayStopFunc;
            this._delayClearFunc = delayClearFunc;
        }
        /**
         * 触发器Flag
         */
        TransitionTrigger.prototype.setTriggerFlag = function (triggerFlag) {
            this._triggerFlag = triggerFlag;
        };
        /**
         * 触发器保护时间
         */
        TransitionTrigger.prototype.setTriggerProtectTime = function (time) {
            this._triggerProtectTime = time;
            return this;
        };
        /**
         * 触发器截止时间
         */
        TransitionTrigger.prototype.setTriggerEndTime = function (time) {
            this._triggerEndTime = time;
            return this;
        };
        /**
         * Override
         */
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
        /**
         * Override
         */
        TransitionTrigger.prototype.onDisable = function () {
            this._delayStopFunc(this, this.onTriggerProtectTimeOver);
        };
        /**
         * Override
         */
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
        // Override
        TransitionTrigger.prototype.onDelete = function () {
            this._delayClearFunc(this);
        };
        return TransitionTrigger;
    }(MachineActionTransition));
    SmartStateMachine.TransitionTrigger = TransitionTrigger;
})(SmartStateMachine || (SmartStateMachine = {}));
