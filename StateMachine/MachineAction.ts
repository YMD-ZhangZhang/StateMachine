/**
 * 一个状态/行为，与游戏逻辑无关
 */
class MachineAction
{
    public funcOnEnter: Function;// 进入回调

    private _name: string;
    private _stateMachine: StateMachine;
    private _transitionList: Array<MachineActionTransition>;// 转换列表

    constructor(name: string, stateMachine: StateMachine)
    {
        this._name = name;
        this._stateMachine = stateMachine;
        this._transitionList = new Array<MachineActionTransition>();
    }

    public getName()
    {
        return this._name;
    }

    /**
     * 添加一个转换
     * @param transition 一个转换
     */
    public addTransition(transition: MachineActionTransition)
    {
        this._transitionList.push(transition);
    }

    /**
     * 进入状态机
     */
    public enter()
    {
        console.log(`当前进入状态机[${this._name}]`);
        this._stateMachine.setAction(this);

        if (this.funcOnEnter)
            this.funcOnEnter();

        this._transitionList.forEach(x => x.onEnable());
    }

    /**
     * 退出状态机
     */
    public exit()
    {
        this._transitionList.forEach(x => x.onDisable());
    }

    /**
     * 触发器
     * @param triggerFlag 触发Flag
     */
    public trigger(triggerFlag: string)
    {
        console.log(`状态行为[${this._name}]触发[${triggerFlag}]`);
        this._transitionList.forEach(x => x.onTrigger(triggerFlag));
    }
}