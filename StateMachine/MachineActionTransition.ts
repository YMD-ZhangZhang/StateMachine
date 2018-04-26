
enum TransitionType
{
    Delay,
    Trigger,
}

 /**
 * 状态机转换
 */
class MachineActionTransition
{
    private _type: TransitionType;
    private _fromAction: MachineAction;
    private _toAction: MachineAction;

    private _delayTime: number;
    private _nowDelayTime: number;
    private _paused: boolean = false;

    private _triggerFlag: string;// 触发器Flag
    private _triggerProtectTime: number = 0;// 触发器的保护期(在保护期内触发器无效)
    private _triggerEndTime: number = 0;// 触发器结束时间(结束后触发器无效)
    private _triggerProtecting: boolean;// 触发保护生效中

    public constructor(fromAction, toAction)
    {
        this._fromAction = fromAction;
        this._toAction = toAction;
    }

    /**
     * 转换类型
     */
    public setType(type: TransitionType)
    {
        this._type = type;
    }

    /**
     * 自动转换延时
     */
    public setDelayTime(delayTime: number)
    {
        this._delayTime = delayTime;
    }

    /**
     * 是否暂停
     */
    public setPaused(paused: boolean)
    {
        this._paused = paused;
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
    public setTriggerProtectTime(time: number)
    {
        this._triggerProtectTime = time;
    }

    /**
     * 触发器截止时间
     */
    public setTriggerEndTime(time: number)
    {
        this._triggerEndTime = time;
    }

    /**
     * 激活
     */
    public onEnable()
    {
        // 自动延时类型
        if (this._type == TransitionType.Delay)
        {
            this._nowDelayTime = 0;
            Laya.timer.frameLoop(1, this, this.onUpdate);
        }

        // 触发器类型
        if (this._type == TransitionType.Trigger)
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

    /**
     * 触发
     * @param triggerFlag 触发Flag
     * @param param 透传参数
     */
    public onTrigger(triggerFlag: string, param: any)
    {
        if (this._type == TransitionType.Trigger)
        {
            if (this._triggerFlag == triggerFlag && !this._triggerProtecting)
            {
                 this.toNext(param);
            }
        }
    }

    /**
     * 冻结
     */
    public onDisable()
    {
        Laya.timer.clear(this, this.onUpdate);
        Laya.timer.clear(this, this.onTriggerProtectTimeOver);
    }

    private onDelayOver()
    {
        this.toNext(null);
    }

    private onTriggerProtectTimeOver()
    {
        this._triggerProtecting = false;
    }

    private onTriggerEndTimerOver()
    {
        this._triggerProtecting = true;
    }

    private toNext(param: any)
    {
        this._fromAction.exit();
        this._toAction.enter(param);
    }
}