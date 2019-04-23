
namespace SmartStateMachine
{
    /**
     * 一个状态/行为
     */
    export class MachineAction
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
         * 进入状态
         */
        public enter(param: any)
        {
            this._stateMachine.setAction(this);

            if (this.funcOnEnter)
                this.funcOnEnter(param);

            // 激活当前Action的所有Transition
            this._transitionList.forEach(x => x.onEnable());
        }

        /**
         * 退出状态
         */
        public exit()
        {
            // 冻结当前Action的所有Transition
            this._transitionList.forEach(x => x.onDisable());
        }

        /**
         * 触发器
         * @param triggerFlag 触发Flag
         */
        public trigger(triggerFlag: string, param: any = null)
        {
            this._transitionList.forEach(x => x.onTrigger(triggerFlag, param));
        }

        /**
         * 设置暂停
         * @param paused 是否暂停
         */
        public setPaused(paused: boolean)
        {
            this._transitionList.forEach(x => x.setPaused(paused));
        }

        onDelete()
        {
            if (this._transitionList)
            {
                this._transitionList.forEach(x => x.onDelete());
                this._transitionList = null;
            }
            
            this.funcOnEnter = null;
            this._stateMachine = null;
        }
    }
}