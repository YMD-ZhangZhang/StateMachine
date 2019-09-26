namespace SmartStateMachine
{
    export class EffectEvent extends BaseEvent
    {
        constructor(id: number, startTime: number)
        {
            super(id, startTime);
        }
    }
}