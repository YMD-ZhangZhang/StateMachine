namespace SmartStateMachine
{
    export class AttackEvent extends BaseEvent
    {
        constructor(id: number, startTime: number)
        {
            super(id, startTime);
        }
    }
}