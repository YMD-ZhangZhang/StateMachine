
namespace SmartStateMachine
{ 
    /**
     * 状态机，与游戏逻辑有关
     */
    export class StateMachine
    {
        private _nowAction: MachineAction;
        private _actionList: Array<MachineAction> = new Array<MachineAction>();

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

        /**
         * 设置暂停
         * @param paused 是否暂停
         */
        public setPaused(paused: boolean)
        {
            this._nowAction.setPaused(paused);
        }

        public trigger(triggerName: string, param: any = null)
        {
            this._nowAction.trigger(triggerName, param);
        }

        onDelete()
        {
            this._actionList.forEach(x => x.onDelete());
        }
    }
}