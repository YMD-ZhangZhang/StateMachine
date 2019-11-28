
namespace SmartStateMachine
{ 
    /**
     * 状态机，与游戏逻辑有关
     */
    export class StateMachine
    {
        private _nowAction: MachineAction;
        private _actionList = new Array<MachineAction>();
        private _forceActionList = new Array<MachineAction>();

        private _clear: Function;
        private _frameLoop: Function;
        private _delta: Function;
        private _resetDelta: Function;
        private _getSpeedMode: Function;

        constructor(frameLoop: Function, clear: Function, delta: Function, resetDelta: Function, getSpeedMode: Function)
        {
            this._frameLoop = frameLoop;
            this._clear = clear;
            this._delta = delta;
            this._resetDelta = resetDelta;
            this._getSpeedMode = getSpeedMode;
        }

        public createAction(name: string) : MachineAction
        {
            let action = new MachineAction(name, this, this._frameLoop, this._clear, this._delta, this._resetDelta, this._getSpeedMode);
            this._actionList.push(action);
            return action;
        }

        // 添加强制Action
        public addForceAction(action: MachineAction)
        {
            this._forceActionList.push(action);
        }

        public setAction(nowAction: MachineAction)
        {
            this._nowAction = nowAction;
        }

        public getAction() : MachineAction
        {
            return this._nowAction;
        }

        public getSpecifiedAction(name: string) : MachineAction
        {
            for (let i = 0; i < this._actionList.length; i++)
            {
                let action = this._actionList[i];
                if (action.getName() == name)
                    return action;
            }
            return null;
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

        public enterForceAction(name: string)
        {
            let forces = this._forceActionList.filter(action => action.getName() == name);
            if (forces.length > 0)
            {
                this._nowAction.exit();
                forces[0].enter(null);
            }
        }

        onDelete()
        {
            if (this._actionList)
            {
                this._actionList.forEach(x => x.onDelete());
                this._actionList = null;
            }

            if (this._forceActionList)
            {
                this._forceActionList.forEach(x => x.onDelete());
                this._forceActionList = null;
            }

            this._nowAction = null;
        }
    }
}