
namespace SmartStateMachine
{
    /**
     * 状态机转换
     */
    export abstract class MachineActionTransition
    {
        private _fromAction: MachineAction;
        private _toAction: MachineAction;

        protected _paused: boolean = false;

        constructor(fromAction, toAction)
        {
            this._fromAction = fromAction;
            this._toAction = toAction;
        }

        /**
         * 激活
         */
        public abstract onEnable()

        /**
         * 冻结
         */
        public abstract onDisable()

        /**
         * 触发
         */
        public onTrigger(triggerFlag: string, param: any){}

        /**
         * 是否暂停
         */
        public setPaused(paused: boolean)
        {
            this._paused = paused;
        }

        protected toNext(param: any)
        {
            this._fromAction.exit();
            this._toAction.enter(param);
        }

        onDelete()
        {
            this._fromAction = null;
            this._toAction = null;
        }
    }
}