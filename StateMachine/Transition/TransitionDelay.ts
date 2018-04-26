
/**
 * 转换-延时
 */
class TransitionDelay extends MachineActionTransition
{
    private _delayTime: number;
    private _nowDelayTime: number;

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
        Laya.timer.frameLoop(1, this, this.delayUpdate);
    }

    /**
     * Override
     */
    public onDisable()
    {
        Laya.timer.clear(this, this.delayUpdate);
    }

    private delayUpdate()
    {
        if (this._paused)
            return;
            
        this._nowDelayTime += Laya.timer.delta;
        if (this._nowDelayTime >= this._delayTime)
        {
            this.onDelayOver();
        }
    }

    private onDelayOver()
    {
        this.toNext(null);
    }
}