/**
 * 状态机，与游戏逻辑有关
 */
class StateMachine
{
    private _target: IStateMachineTarget;
    private _nowAction: MachineAction;
    private _actionList: Array<MachineAction> = new Array<MachineAction>();

    constructor(target: IStateMachineTarget)
    {
        this._target = target;
    }

    public createAction(name: string) : MachineAction
    {
        let action = new MachineAction(name, this);
        this._actionList.push(action);
        return action;
    }

    public setAction(nowAction: MachineAction)
    {
        this._nowAction = nowAction;
    }

    /**
     * 进入休闲
     */
    public enterIdle()
    {
        this._nowAction.trigger("idle");
    }

    /**
     * 进入跑
     */
    public enterRun()
    {
        this._nowAction.trigger("run");
    }

    /**
     * 进入跳跃
     */
    public enterJump()
    {
        this._nowAction.trigger("jump");
    }

    /**
     * 进入普通攻击
     */
    public enterAttack()
    {
        this.enterFight();
        this._nowAction.trigger("attack");
    }

    /**
     * 进入技能
     * @param skill 1 2 3 4 s : string
     */
    public enterSkill(skill: string)
    {
        this.enterFight();
        this._nowAction.trigger(`skill${skill}`);
    }

    private enterFight()
    {
        this._nowAction.trigger("enterfight");
        Laya.timer.clear(this, this.exitFight)
        Laya.timer.once(5000, this, this.exitFight);
    }

    private exitFight()
    {
        this._nowAction.trigger("exitfight");
    }
}