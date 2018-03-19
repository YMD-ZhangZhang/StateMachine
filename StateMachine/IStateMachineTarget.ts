/**
 * 具有状态机行为的目标interface，让状态机逻辑与游戏对象引用解耦，可根据游戏逻辑修改function
 */
interface IStateMachineTarget
{
    onIdle();
    onRun();
    onJump();
    onFightIdle();
    onFightRun();
    attack1();
    attack2();
    attack3();
    skill1();
    skill2();
    skill3();
    skill4();
    skills();
}