
namespace SmartStateMachine
{
    /**
     * 转换-延时
     */
    export class TransitionDelay extends MachineActionTransition
    {
        private _delayTime: number;
        private _nowDelayTime: number;

        private _delayLoop: Function;
        private _delayStopFunc: Function;
        private _delayGetDelta: Function;
        private _delayClearFunc: Function;

        constructor(fromAction, toAction, delayLoop: Function, delayStopFunc: Function, delayGetDelta: Function, delayClearFunc: Function)
        {
            super(fromAction, toAction);

            this._delayLoop = delayLoop;
            this._delayStopFunc = delayStopFunc;
            this._delayGetDelta = delayGetDelta;
            this._delayClearFunc = delayClearFunc;
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
            this._delayLoop(1, this, this.delayUpdate);
        }

        /**
         * Override
         */
        public onDisable()
        {
            this._delayStopFunc(this, this.delayUpdate);
        }

        private delayUpdate()
        {
            if (this._paused)
                return;
                
            this._nowDelayTime += this._delayGetDelta();
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
            this._delayClearFunc(this);
        }
    }
}