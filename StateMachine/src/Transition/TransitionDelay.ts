
namespace SmartStateMachine
{
    /**
     * 转换-延时
     */
    export class TransitionDelay extends MachineActionTransition
    {
        private _canUpdate: boolean;
        private _delayTime: number;
        private _nowDelayTime: number;

        private _frameLoop: Function;
        private _clear: Function;
        private _delta: Function;

        constructor(fromAction, toAction, frameLoop: Function, clear: Function, delta: Function)
        {
            super(fromAction, toAction);

            this._frameLoop = frameLoop;
            this._clear = clear;
            this._delta = delta;

            this._canUpdate = false;
            this._frameLoop(1, this, this.onUpdate);
        }

        /**
         * 自动转换延时
         */
        public setDelayTime(delayTime: number)
        {
            this._delayTime = delayTime;
        }

        /**
         * Override
         */
        public onEnable()
        {
            this._nowDelayTime = 0;
            this._canUpdate = true;
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
                
            this._nowDelayTime += this._delta();
            if (this._nowDelayTime >= this._delayTime)
            {
                this.onDelayOver();
            }
        }

        private onDelayOver()
        {
            this.toNext(null);
        }

        onDelete()
        {
            this._clear(this, this.onUpdate);
            super.onDelete();
            //this._delayClearFunc(this);
        }
    }
}