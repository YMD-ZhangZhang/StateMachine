
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

        private _canUpdate: boolean;
        private _nowTriggerProtectTime = 0;
        private _nowTriggerEndTime = 0;

        private _clear: Function;
        private _frameLoop: Function;
        private _delta: Function;
        private _resetDelta: Function;
        private _getSpeedMode: Function;

        constructor(fromAction, toAction, frameLoop: Function, clear: Function, delta: Function, resetDelta: Function, getSpeedMode: Function)
        {
            super(fromAction, toAction);

            this._frameLoop = frameLoop;
            this._clear = clear;
            this._delta = delta;
            this._resetDelta = resetDelta;
            this._getSpeedMode = getSpeedMode;

            this._canUpdate = false;
            this._frameLoop(1, this, this.onUpdate);
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
            this._canUpdate = true;

            // 如果需要保护时间
            if (this._triggerProtectTime > 0)
            {
                this._triggerProtecting = true;
                this._nowTriggerProtectTime = this._triggerProtectTime;

                // 如果有保护结束时间
                if (this._triggerEndTime > 0)
                {
                    this._nowTriggerEndTime = this._triggerEndTime;
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
            this._canUpdate = false;
        }

        private onUpdate()
        {
            if (this._paused || !this._canUpdate)
                return;

            // 减少ProtectTime
            if (this._nowTriggerProtectTime > 0)
            {
                if (this._getSpeedMode() == 1)
                    this._nowTriggerProtectTime -= this._delta();
                if (this._getSpeedMode() == 2)
                    this._nowTriggerProtectTime -= this._resetDelta();

                if (this._nowTriggerProtectTime <= 0)
                {
                    this.onTriggerProtectTimeOver();
                }
            }

            // 减少EndTime
            if (this._nowTriggerEndTime > 0)
            {
                if (this._getSpeedMode() == 1)
                    this._nowTriggerEndTime -= this._delta();
                if (this._getSpeedMode() == 2)
                    this._nowTriggerEndTime -= this._resetDelta();

                if (this._nowTriggerEndTime <= 0)
                {
                    this.onTriggerEndTimerOver();
                }
            }
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
            this._clear(this, this.onUpdate);
			this._clear(this, this.onTriggerProtectTimeOver);
            this._clear(this, this.onTriggerEndTimerOver);
            super.onDelete();
        }
    }
}