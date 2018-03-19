/**
 * 状态机转换，与游戏逻辑无关
 */
class MachineActionTransition
{
    public static TYPE_DELAY = "delay";
    public static TYPE_TRIGGER = "trigger";

    public _type: string;

    public _delayTime: number;
    
    public _triggerFlag: string;
    public _triggerProtectTime: number = 0;// 触发器的保护期（在保护期内触发器无效）
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
            Laya.timer.once(this._delayTime, this, this.onDelayOver);
        }

        if (this._type == MachineActionTransition.TYPE_TRIGGER)
        {
            if (this._triggerProtectTime > 0)
            {
                this._triggerProtecting = true;
                Laya.timer.once(this._triggerProtectTime, this, this.onTriggerProtectTimeOver)
            }
            else
            {
                this._triggerProtecting = false;
            }
        }
    }

    public onTrigger(triggerFlag: string)
    {
        if (this._type == MachineActionTransition.TYPE_TRIGGER)
        {
            if (this._triggerProtecting)
            {
                console.log("[" + this._fromAction.getName() + "]的转换正在保护期中");
            }

            if (this._triggerFlag == triggerFlag && !this._triggerProtecting)
            {
                 this.toNext();
            }
        }
    }

    public onDisable()
    {
        Laya.timer.clear(this, this.onDelayOver);
        Laya.timer.clear(this, this.onTriggerProtectTimeOver);
    }

    private onDelayOver()
    {
        this.toNext();
    }

    private onTriggerProtectTimeOver()
    {
        this._triggerProtecting = false;
    }

    private toNext()
    {
        this._fromAction.exit();
        this._toAction.enter();
    }
}