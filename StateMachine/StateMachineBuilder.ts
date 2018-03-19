/**
 * 状态机构建器 用于构建不同职业的状态机
 * 与游戏逻辑有关
 */
class StateMachineBuilder
{
    /**
     * 构建一个职业100的状态机
     * 分为2步，首先创建全部状态/行为，然后增加状态/行为之间的转换
     * @param target 具有状态机行为的目标对象
     */
    public buildJob100(target: IStateMachineTarget) : StateMachine
    {
        let sm = new StateMachine(target);

        // 休闲待机
        let idle = sm.createAction("idle");
        idle.funcOnEnter = ()=>
        {
            target.onIdle();
        };
        sm.setAction(idle);

        // 休闲跑步
        let run = sm.createAction("run");
        run.funcOnEnter = ()=>
        {
            target.onRun();
        };

        // 跳跃
        let jump = sm.createAction("jump");
        jump.funcOnEnter = ()=>
        {
            target.onJump();
        };

        // 战斗待机
        let fightidle = sm.createAction("fightidle");
        fightidle.funcOnEnter = ()=>
        {
            target.onFightIdle();
        };

        // 战斗跑
        let fightrun = sm.createAction("fightrun");
        fightrun.funcOnEnter = ()=>
        {
            target.onFightRun();
        };

        // 攻击1
        let attack1 = sm.createAction("attack1");
        attack1.funcOnEnter = ()=>
        {
            target.attack1();
        };

        // 攻击2
        let attack2 = sm.createAction("attack2");
        attack2.funcOnEnter = ()=>
        {
            target.attack2();
        };

        // 攻击3
        let attack3 = sm.createAction("attack3");
        attack3.funcOnEnter = ()=>
        {
            target.attack3();
        };

        // 技能1
        let skill1 = sm.createAction("skill1");
        skill1.funcOnEnter = ()=>
        {
            target.skill1();
        };

        // 技能2
        let skill2 = sm.createAction("skill2");
        skill2.funcOnEnter = ()=>
        {
            target.skill2();
        };

        // 技能3
        let skill3 = sm.createAction("skill3");
        skill3.funcOnEnter = ()=>
        {
            target.skill3();
        };

        // 技能4
        let skill4 = sm.createAction("skill4");
        skill4.funcOnEnter = ()=>
        {
            target.skill4();
        };

        // 休闲待机 -> 休闲跑
        let idle_run = new MachineActionTransition(idle, run);
        idle_run._type = MachineActionTransition.TYPE_TRIGGER;
        idle_run._triggerFlag = "run";
        idle_run._triggerProtectTime = 0;
        idle.addTransition(idle_run);

        // 休闲待机 -> 战斗待机
        let idle_fightidle = new MachineActionTransition(idle, fightidle);
        idle_fightidle._type = MachineActionTransition.TYPE_TRIGGER;
        idle_fightidle._triggerFlag = "enterfight";
        idle_fightidle._triggerProtectTime = 0;
        idle.addTransition(idle_fightidle);

        // 休闲待机 -> 攻击1
        // let idle_a1 = new MachineActionTransition(idle, attack1);
        // idle_a1._type = MachineActionTransition.TYPE_TRIGGER;
        // idle_a1._triggerFlag = "attack";
        // idle_a1._triggerProtectTime = 0;
        // idle.addTransition(idle_a1);

        // 休闲跑 -> 休闲待机
        let run_idle = new MachineActionTransition(run, idle);
        run_idle._type = MachineActionTransition.TYPE_TRIGGER;
        run_idle._triggerFlag = "idle";
        run_idle._triggerProtectTime = 0;
        run.addTransition(run_idle);

        // 休闲待机 -> 跳跃
        // let idle_jump = new MachineActionTransition(idle, jump);
        // idle_jump._type = MachineActionTransition.TYPE_TRIGGER;
        // idle_jump._triggerFlag = "jump";
        // idle_jump._triggerProtectTime = 0;
        // idle.addTransition(idle_jump);

        // 休闲跑 -> 跳跃
        let run_jump = new MachineActionTransition(run, jump);
        run_jump._type = MachineActionTransition.TYPE_TRIGGER;
        run_jump._triggerFlag = "jump";
        run_jump._triggerProtectTime = 0;
        run.addTransition(run_jump);

        // 跳跃 -> 战斗待机
        let jump_fightidle = new MachineActionTransition(jump, fightidle);
        jump_fightidle._type = MachineActionTransition.TYPE_DELAY;
        jump_fightidle._delayTime = 867;
        jump.addTransition(jump_fightidle);

        // 战斗待机 -> 休闲待机
        let fightidle_idle = new MachineActionTransition(fightidle, idle);
        fightidle_idle._type = MachineActionTransition.TYPE_TRIGGER;
        fightidle_idle._triggerFlag = "exitfight";
        fightidle_idle._triggerProtectTime = 0;
        fightidle.addTransition(fightidle_idle);

        // 战斗待机 -> 攻击1
        let fightidle_a1 = new MachineActionTransition(fightidle, attack1);
        fightidle_a1._type = MachineActionTransition.TYPE_TRIGGER;
        fightidle_a1._triggerFlag = "attack";
        fightidle_a1._triggerProtectTime = 0;
        fightidle.addTransition(fightidle_a1);

        // 战斗待机 -> 技能1
        let fightidle_s1 = new MachineActionTransition(fightidle, skill1);
        fightidle_s1._type = MachineActionTransition.TYPE_TRIGGER;
        fightidle_s1._triggerFlag = "skill1";
        fightidle_s1._triggerProtectTime = 0;
        fightidle.addTransition(fightidle_s1);

        // 战斗待机 -> 技能2
        let fightidle_s2 = new MachineActionTransition(fightidle, skill2);
        fightidle_s2._type = MachineActionTransition.TYPE_TRIGGER;
        fightidle_s2._triggerFlag = "skill2";
        fightidle_s2._triggerProtectTime = 0;
        fightidle.addTransition(fightidle_s2);

        // 战斗待机 -> 技能3
        let fightidle_s3 = new MachineActionTransition(fightidle, skill3);
        fightidle_s3._type = MachineActionTransition.TYPE_TRIGGER;
        fightidle_s3._triggerFlag = "skill3";
        fightidle_s3._triggerProtectTime = 0;
        fightidle.addTransition(fightidle_s3);

        // 战斗待机 -> 技能4
        let fightidle_s4 = new MachineActionTransition(fightidle, skill4);
        fightidle_s4._type = MachineActionTransition.TYPE_TRIGGER;
        fightidle_s4._triggerFlag = "skill4";
        fightidle_s4._triggerProtectTime = 0;
        fightidle.addTransition(fightidle_s4);

        // 战斗待机 -> 战斗跑
        let fightidle_fightrun = new MachineActionTransition(fightidle, fightrun);
        fightidle_fightrun._type = MachineActionTransition.TYPE_TRIGGER;
        fightidle_fightrun._triggerFlag = "run";
        fightidle_fightrun._triggerProtectTime = 0;
        fightidle.addTransition(fightidle_fightrun);

        // 战斗待机 -> 跳跃
        let fightidle_jump = new MachineActionTransition(fightidle, jump);
        fightidle_jump._type = MachineActionTransition.TYPE_TRIGGER;
        fightidle_jump._triggerFlag = "jump";
        fightidle_jump._triggerProtectTime = 0;
        fightidle.addTransition(fightidle_jump);

        // 战斗跑 -> 跳跃
        let fightrun_jump = new MachineActionTransition(fightrun, jump);
        fightrun_jump._type = MachineActionTransition.TYPE_TRIGGER;
        fightrun_jump._triggerFlag = "jump";
        fightrun_jump._triggerProtectTime = 0;
        fightrun.addTransition(fightrun_jump);

        // 战斗跑 -> 战斗待机
        let fightrun_fightidle = new MachineActionTransition(fightrun, fightidle);
        fightrun_fightidle._type = MachineActionTransition.TYPE_TRIGGER;
        fightrun_fightidle._triggerFlag = "idle";
        fightrun_fightidle._triggerProtectTime = 0;
        fightrun.addTransition(fightrun_fightidle);

        // 战斗跑 -> 休闲跑
        let fightrun_run = new MachineActionTransition(fightrun, run);
        fightrun_run._type = MachineActionTransition.TYPE_TRIGGER;
        fightrun_run._triggerFlag = "exitfight";
        fightrun_run._triggerProtectTime = 0;
        fightrun.addTransition(fightrun_run);

        // 攻击1 -> 战斗待机
        let a1_fightidle = new MachineActionTransition(attack1, fightidle);
        a1_fightidle._type = MachineActionTransition.TYPE_DELAY;
        a1_fightidle._delayTime = 667;
        attack1.addTransition(a1_fightidle);

        // 攻击1 -> 攻击2
        let a1_a2 = new MachineActionTransition(attack1, attack2);
        a1_a2._type = MachineActionTransition.TYPE_TRIGGER;
        a1_a2._triggerFlag = "attack";
        a1_a2._triggerProtectTime = 300;
        attack1.addTransition(a1_a2);

        // 攻击2 -> 战斗待机
        let a2_fightidle = new MachineActionTransition(attack2, fightidle);
        a2_fightidle._type = MachineActionTransition.TYPE_DELAY;
        a2_fightidle._delayTime = 733;
        attack2.addTransition(a2_fightidle);

        // 攻击2 -> 攻击3
        let a2_a3 = new MachineActionTransition(attack2, attack3);
        a2_a3._type = MachineActionTransition.TYPE_TRIGGER;
        a2_a3._triggerFlag = "attack";
        a2_a3._triggerProtectTime = 300;
        attack2.addTransition(a2_a3);

        // 攻击3 -> 战斗待机
        let a3_fightidle = new MachineActionTransition(attack3, fightidle);
        a3_fightidle._type = MachineActionTransition.TYPE_DELAY;
        a3_fightidle._delayTime = 1000;
        attack3.addTransition(a3_fightidle);

        // 技能1 -> 战斗待机
        let s1_fightidle = new MachineActionTransition(skill1, fightidle);
        s1_fightidle._type = MachineActionTransition.TYPE_DELAY;
        s1_fightidle._delayTime = 1333;
        skill1.addTransition(s1_fightidle);

        // 技能2 -> 战斗待机
        let s2_fightidle = new MachineActionTransition(skill2, fightidle);
        s2_fightidle._type = MachineActionTransition.TYPE_DELAY;
        s2_fightidle._delayTime = 1767;
        skill2.addTransition(s2_fightidle);

        // 技能3 -> 战斗待机
        let s3_fightidle = new MachineActionTransition(skill3, fightidle);
        s3_fightidle._type = MachineActionTransition.TYPE_DELAY;
        s3_fightidle._delayTime = 1000;
        skill3.addTransition(s3_fightidle);

        // 技能4 -> 战斗待机
        let s4_fightidle = new MachineActionTransition(skill4, fightidle);
        s4_fightidle._type = MachineActionTransition.TYPE_DELAY;
        s4_fightidle._delayTime = 1000;
        skill4.addTransition(s4_fightidle);

        return sm;
    }
}