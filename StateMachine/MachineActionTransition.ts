/**
 * 状态机转换，与游戏逻辑无关
 */
class MachineActionTransition
{
    public static TYPE_DELAY = "delay";
    public static TYPE_TRIGGER = "trigger";

    public _type: string;

    public _delayTime: number;
    public _paused: boolean = false;
    private _nowDelayTime: number;
    
    public _triggerFlag: string;
    public _triggerProtectTime: number = 0;// 触发器的保护期（在保护期内触发器无效）
    public _triggerEndTime: number = 0;// 
    public _triggerProtecting: boolean;// 触发保护生效中

    private _fromAction: MachineAction;
    private _toAction: MachineAction;

    public constructor(fromAction, toAction)
    {
        this._fromAction = fromAction;
        this._toAction = toAction;
    }

    public onEnable()
    {
        if (this._type == MachineActionTransition.TYPE_DELAY)
        {
            //Laya.timer.once(this._delayTime, this, this.onDelayOver);
            this._nowDelayTime = 0;
            Laya.timer.frameLoop(1, this, this.onUpdate);
        }

        if (this._type == MachineActionTransition.TYPE_TRIGGER)
        {
            if (this._triggerProtectTime > 0)
            {
                this._triggerProtecting = true;
                Laya.timer.once(this._triggerProtectTime, this, this.onTriggerProtectTimeOver)

                if (this._triggerEndTime > 0)
                {
                    Laya.timer.once(this._triggerEndTime, this, this.onTriggerEndTimerOver)
                }
            }
            else
            {
                this._triggerProtecting = false;
            }
        }
    }

    private onUpdate()
    {
        if (this._paused)
            return;
            
        this._nowDelayTime += Laya.timer.delta;
        if (this._nowDelayTime >= this._delayTime)
        {
            this.onDelayOver();
        }
    }

    public onTrigger(triggerFlag: string, param: any)
    {
        if (this._type == MachineActionTransition.TYPE_TRIGGER)
        {
            if (this._triggerProtecting)
            {
                // console.log("[" + this._fromAction.getName() + "]的转换正在保护期中");
            }

            if (this._triggerFlag == triggerFlag && !this._triggerProtecting)
            {
                 this.toNext(param);
            }
        }
    }

    public onDisable()
    {
        Laya.timer.clear(this, this.onUpdate);
        //Laya.timer.clear(this, this.onDelayOver);
        Laya.timer.clear(this, this.onTriggerProtectTimeOver);
    }

    private onDelayOver()
    {
        this.toNext(null);
    }

    private onTriggerProtectTimeOver()
    {
        this._triggerProtecting = false;
        // console.log("可连击", PlayerUtil.getTimestamp());
    }

    private onTriggerEndTimerOver()
    {
        this._triggerProtecting = true;
        // console.log("可连击结束", PlayerUtil.getTimestamp());
    }

    private toNext(param: any)
    {
        this._fromAction.exit();
        this._toAction.enter(param);
    }
}