/**
 * 状态机，与游戏逻辑有关
 */
class StateMachine
{
    private _nowAction: MachineAction;
    private _actionList: Array<MachineAction> = new Array<MachineAction>();

    constructor()
    {
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

    public getAction() : MachineAction
    {
        return this._nowAction;
    }

    public canMove() : boolean
    {
        switch (this._nowAction.getName())
        {
            case "idle":
            case "run":
            case "fightidle":
            case "fightrun":
                return true;
        }

        return false;
    }

    /**
     * 设置暂停
     * @param paused 是否暂停
     */
    public setPaused(paused: boolean)
    {
        this._nowAction.setPaused(paused);
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
     * 进入受击
     */
    public enterInjure(param: any)
    {
        this._nowAction.trigger("injure", param);
    }

    /**
     * 进入死亡
     */
    public enterDie()
    {
        this._nowAction.trigger("die");
    }

    /**
     * 进入跳跃
     */
    public enterJump()
    {
        this.enterFight();
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
     * @param skill skill1 skill2 skill3 skill4
     */
    public enterSkill(skill: string)
    {
        this.enterFight();
        this._nowAction.trigger(skill);
    }

    /**
     * 进入战斗
     */
    public enterFight()
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