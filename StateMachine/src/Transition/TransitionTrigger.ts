
namespace SmartStateMachine
{
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