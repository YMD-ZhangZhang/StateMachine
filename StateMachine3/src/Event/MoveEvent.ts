namespace SmartStateMachine
{
    export class MoveEvent extends BaseEvent
    {
        constructor(id: number, startTime: number)
        {
            super(id, startTime);
        }
    }
}