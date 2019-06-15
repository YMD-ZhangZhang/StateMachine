
namespace SmartStateMachine
{
    /**
     * 转换-延时
     */
    export class TransitionDelay extends MachineActionTransition
    {
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
            this._frameLoop(1, this, this.onUpdate);
        }

        /**
         * Override
         */
        public onDisable()
        {
            this._clear(this, this.onUpdate);
        }

        private onUpdate()
        {
            if (this._paused)
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