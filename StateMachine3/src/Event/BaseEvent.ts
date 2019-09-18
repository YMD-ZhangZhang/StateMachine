namespace SmartStateMachine
{
    export enum EventStatus
    {
        NO_TRIGGER,// 未触发
        TRIGGER_ED,// 已触发
    }

    export class BaseEvent
    {
        private _status: EventStatus = EventStatus.NO_TRIGGER;

        private _id: number;
        private _startTime: number;

        constructor(id: number, startTime: number)
        {
            this._id = id;
            this._startTime = startTime;
        }

        public getID() : number { return this._id; }
        public getStartTime() : number { return this._startTime; }

        /**
         * 设置状态
         */
        public setStatus(status: EventStatus)
        {
            this._status = status;
        }

        /**
         * 获取状态
         */
        public getStatus() : EventStatus
        {
            return this._status;
        }
    }
}