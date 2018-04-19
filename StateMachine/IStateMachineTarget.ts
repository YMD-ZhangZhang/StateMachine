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
    onInjure(param: any);
    onDie();
    onAttack1();
    onAttack2();
    onAttack3();
    onSkill1();
    onSkill2();
    onSkill3();
    onSkill4();
}