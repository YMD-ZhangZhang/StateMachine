/**
 * 状态机构建器 用于构建不同职业的状态机
 * 与游戏逻辑有关
 */
class StateMachineBuilder
{
    public buildStateMachine(player3D: Player3D) : StateMachine
    {
        switch (player3D.getJob())
        {
        case 100:
            return new StateMachineBuilder().buildJob100(player3D);
        case 101:
            return new StateMachineBuilder().buildJob101(player3D);
        case 102:
            return new StateMachineBuilder().buildJob102(player3D);
        case 103:
            return new StateMachineBuilder().buildJob103(player3D);
        }

        return new StateMachineBuilder().buildMonster(player3D, MTest.getMonsterTimeDic(player3D.getClothName()));
    }

    /**
     * 构建一个职业100的状态机
     * 分为2步，首先创建全部状态/行为，然后增加状态/行为之间的转换
     * @param target 具有状态机行为的目标对象
     */
    public buildJob100(target: Player3D) : StateMachine
    {
        let sm = new StateMachine();

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
            target.onAttack1();
        };

        // 攻击2
        let attack2 = sm.createAction("attack2");
        attack2.funcOnEnter = ()=>
        {
            target.onAttack2();
        };

        // 攻击3
        let attack3 = sm.createAction("attack3");
        attack3.funcOnEnter = ()=>
        {
            target.onAttack3();
        };

        // 技能1
        let skill1 = sm.createAction("skill1");
        skill1.funcOnEnter = ()=>
        {
            target.onSkill1();
        };

        // 技能2
        let skill2 = sm.createAction("skill2");
        skill2.funcOnEnter = ()=>
        {
            target.onSkill2();
        };

        // 技能3
        let skill3 = sm.createAction("skill3");
        skill3.funcOnEnter = ()=>
        {
            target.onSkill3();
        };

        // 技能4
        let skill4 = sm.createAction("skill4");
        skill4.funcOnEnter = ()=>
        {
            target.onSkill4();
        };

        // 休闲待机 -> 休闲跑
        let idle_run = new TransitionTrigger(idle, run);
        // idle_run.setType(TransitionType.Trigger);
        idle_run.setTriggerFlag("run");
        idle_run.setTriggerProtectTime(0);
        idle.addTransition(idle_run);

        // 休闲待机 -> 战斗待机
        let idle_fightidle = new TransitionTrigger(idle, fightidle);
        // idle_fightidle.setType(TransitionType.Trigger);
        idle_fightidle.setTriggerFlag("enterfight");
        idle_fightidle.setTriggerProtectTime(0);
        idle.addTransition(idle_fightidle);

        // 休闲待机 -> 攻击1
        // let idle_a1 = new MachineActionTransition(idle, attack1);
        // idle_a1.setType(TracsitionType.Trigger);
        // idle_a1.setTriggerFlag("attack";
        // idle_a1.setTriggerProtectTime(0;
        // idle.addTransition(idle_a1);

        // 休闲跑 -> 休闲待机
        let run_idle = new TransitionTrigger(run, idle);
        // run_idle.setType(TransitionType.Trigger);
        run_idle.setTriggerFlag("idle");
        run_idle.setTriggerProtectTime(0);
        run.addTransition(run_idle);

        // 休闲待机 -> 跳跃
        // let idle_jump = new MachineActionTransition(idle, jump);
        // idle_jump.setType(TracsitionType.Trigger);
        // idle_jump.setTriggerFlag("jump";
        // idle_jump.setTriggerProtectTime(0;
        // idle.addTransition(idle_jump);

        // 休闲跑 -> 跳跃
        let run_jump = new TransitionTrigger(run, jump);
        // run_jump.setType(TransitionType.Trigger);
        run_jump.setTriggerFlag("jump");
        run_jump.setTriggerProtectTime(0);
        run.addTransition(run_jump);

        // 跳跃 -> 战斗待机
        let jump_fightidle = new TransitionDelay(jump, fightidle);
        // jump_fightidle.setType(TransitionType.Delay);
        jump_fightidle.setDelayTime(867);
        jump.addTransition(jump_fightidle);

        // 战斗待机 -> 休闲待机
        let fightidle_idle = new TransitionTrigger(fightidle, idle);
        // fightidle_idle.setType(TransitionType.Trigger);
        fightidle_idle.setTriggerFlag("exitfight");
        fightidle_idle.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_idle);

        // 战斗待机 -> 攻击1
        let fightidle_a1 = new TransitionTrigger(fightidle, attack1);
        // fightidle_a1.setType(TransitionType.Trigger);
        fightidle_a1.setTriggerFlag("attack");
        fightidle_a1.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_a1);

        // 战斗待机 -> 技能1
        let fightidle_s1 = new TransitionTrigger(fightidle, skill1);
        // fightidle_s1.setType(TransitionType.Trigger);
        fightidle_s1.setTriggerFlag("skill1");
        fightidle_s1.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_s1);

        // 战斗待机 -> 技能2
        let fightidle_s2 = new TransitionTrigger(fightidle, skill2);
        // fightidle_s2.setType(TransitionType.Trigger);
        fightidle_s2.setTriggerFlag("skill2");
        fightidle_s2.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_s2);

        // 战斗待机 -> 技能3
        let fightidle_s3 = new TransitionTrigger(fightidle, skill3);
        // fightidle_s3.setType(TransitionType.Trigger);
        fightidle_s3.setTriggerFlag("skill3");
        fightidle_s3.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_s3);

        // 战斗待机 -> 技能4
        let fightidle_s4 = new TransitionTrigger(fightidle, skill4);
        // fightidle_s4.setType(TransitionType.Trigger);
        fightidle_s4.setTriggerFlag("skill4");
        fightidle_s4.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_s4);

        // 战斗待机 -> 战斗跑
        let fightidle_fightrun = new TransitionTrigger(fightidle, fightrun);
        // fightidle_fightrun.setType(TransitionType.Trigger);
        fightidle_fightrun.setTriggerFlag("run");
        fightidle_fightrun.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_fightrun);

        // 战斗待机 -> 跳跃
        let fightidle_jump = new TransitionTrigger(fightidle, jump);
        // fightidle_jump.setType(TransitionType.Trigger);
        fightidle_jump.setTriggerFlag("jump");
        fightidle_jump.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_jump);

        // 战斗跑 -> 跳跃
        let fightrun_jump = new TransitionTrigger(fightrun, jump);
        // fightrun_jump.setType(TransitionType.Trigger);
        fightrun_jump.setTriggerFlag("jump");
        fightrun_jump.setTriggerProtectTime(0);
        fightrun.addTransition(fightrun_jump);

        // 战斗跑 -> 战斗待机
        let fightrun_fightidle = new TransitionTrigger(fightrun, fightidle);
        // fightrun_fightidle.setType(TransitionType.Trigger);
        fightrun_fightidle.setTriggerFlag("idle");
        fightrun_fightidle.setTriggerProtectTime(0);
        fightrun.addTransition(fightrun_fightidle);

        // 战斗跑 -> 休闲跑
        let fightrun_run = new TransitionTrigger(fightrun, run);
        // fightrun_run.setType(TransitionType.Trigger);
        fightrun_run.setTriggerFlag("exitfight");
        fightrun_run.setTriggerProtectTime(0);
        fightrun.addTransition(fightrun_run);

        // 攻击1 -> 战斗待机
        let a1_fightidle = new TransitionDelay(attack1, fightidle);
        // a1_fightidle.setType(TransitionType.Delay);
        a1_fightidle.setDelayTime(667);
        attack1.addTransition(a1_fightidle);

        // 攻击1 -> 攻击2
        let a1_a2 = new TransitionTrigger(attack1, attack2);
        // a1_a2.setType(TransitionType.Trigger);
        a1_a2.setTriggerFlag("attack");
        a1_a2.setTriggerProtectTime(300);
        attack1.addTransition(a1_a2);

        // 攻击2 -> 战斗待机
        let a2_fightidle = new TransitionDelay(attack2, fightidle);
        // a2_fightidle.setType(TransitionType.Delay);
        a2_fightidle.setDelayTime(733);
        attack2.addTransition(a2_fightidle);

        // 攻击2 -> 攻击3
        let a2_a3 = new TransitionTrigger(attack2, attack3);
        // a2_a3.setType(TransitionType.Trigger);
        a2_a3.setTriggerFlag("attack");
        a2_a3.setTriggerProtectTime(300);
        attack2.addTransition(a2_a3);

        // 攻击3 -> 战斗待机
        let a3_fightidle = new TransitionDelay(attack3, fightidle);
        // a3_fightidle.setType(TransitionType.Delay);
        a3_fightidle.setDelayTime(1000);
        attack3.addTransition(a3_fightidle);

        // 攻击3 -> 攻击1
        let a3_a1 = new TransitionTrigger(attack3, attack1);
        // a3_a1.setType(TransitionType.Trigger);
        a3_a1.setTriggerFlag("attack");
        a3_a1.setTriggerProtectTime(633);
        a3_a1.setTriggerEndTime(999);
        attack3.addTransition(a3_a1);

        // 技能1 -> 战斗待机
        let s1_fightidle = new TransitionDelay(skill1, fightidle);
        // s1_fightidle.setType(TransitionType.Delay);
        s1_fightidle.setDelayTime(1333);
        skill1.addTransition(s1_fightidle);

        // 技能2 -> 战斗待机
        let s2_fightidle = new TransitionDelay(skill2, fightidle);
        // s2_fightidle.setType(TransitionType.Delay);
        s2_fightidle.setDelayTime(1767);
        skill2.addTransition(s2_fightidle);

        // 技能3 -> 战斗待机
        let s3_fightidle = new TransitionDelay(skill3, fightidle);
        // s3_fightidle.setType(TransitionType.Delay);
        s3_fightidle.setDelayTime(1000);
        skill3.addTransition(s3_fightidle);

        // 技能4 -> 战斗待机
        let s4_fightidle = new TransitionDelay(skill4, fightidle);
        // s4_fightidle.setType(TransitionType.Delay);
        s4_fightidle.setDelayTime(2000);
        skill4.addTransition(s4_fightidle);

        return sm;
    }

    // 女法
    public buildJob101(target: Player3D) : StateMachine
    {
        let sm = new StateMachine();

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
            target.onAttack1();
        };

        // 攻击2
        let attack2 = sm.createAction("attack2");
        attack2.funcOnEnter = ()=>
        {
            target.onAttack2();
        };

        // 攻击3
        let attack3 = sm.createAction("attack3");
        attack3.funcOnEnter = ()=>
        {
            target.onAttack3();
        };

        // 技能1
        let skill1 = sm.createAction("skill1");
        skill1.funcOnEnter = ()=>
        {
            target.onSkill1();
        };

        // 技能2
        let skill2 = sm.createAction("skill2");
        skill2.funcOnEnter = ()=>
        {
            target.onSkill2();
        };

        // 技能3
        let skill3 = sm.createAction("skill3");
        skill3.funcOnEnter = ()=>
        {
            target.onSkill3();
        };

        // 技能4
        let skill4 = sm.createAction("skill4");
        skill4.funcOnEnter = ()=>
        {
            target.onSkill4();
        };

        // 休闲待机 -> 休闲跑
        let idle_run = new TransitionTrigger(idle, run);
        // idle_run.setType(TransitionType.Trigger);
        idle_run.setTriggerFlag("run");
        idle_run.setTriggerProtectTime(0);
        idle.addTransition(idle_run);

        // 休闲待机 -> 战斗待机
        let idle_fightidle = new TransitionTrigger(idle, fightidle);
        // idle_fightidle.setType(TransitionType.Trigger);
        idle_fightidle.setTriggerFlag("enterfight");
        idle_fightidle.setTriggerProtectTime(0);
        idle.addTransition(idle_fightidle);

        // 休闲待机 -> 攻击1
        // let idle_a1 = new MachineActionTransition(idle, attack1);
        // idle_a1.setType(TracsitionType.Trigger);
        // idle_a1.setTriggerFlag("attack";
        // idle_a1.setTriggerProtectTime(0;
        // idle.addTransition(idle_a1);

        // 休闲跑 -> 休闲待机
        let run_idle = new TransitionTrigger(run, idle);
        // run_idle.setType(TransitionType.Trigger);
        run_idle.setTriggerFlag("idle");
        run_idle.setTriggerProtectTime(0);
        run.addTransition(run_idle);

        // 休闲待机 -> 跳跃
        // let idle_jump = new MachineActionTransition(idle, jump);
        // idle_jump.setType(TracsitionType.Trigger);
        // idle_jump.setTriggerFlag("jump";
        // idle_jump.setTriggerProtectTime(0;
        // idle.addTransition(idle_jump);

        // 休闲跑 -> 跳跃
        let run_jump = new TransitionTrigger(run, jump);
        // run_jump.setType(TransitionType.Trigger);
        run_jump.setTriggerFlag("jump");
        run_jump.setTriggerProtectTime(0);
        run.addTransition(run_jump);

        // 跳跃 -> 战斗待机
        let jump_fightidle = new TransitionDelay(jump, fightidle);
        // jump_fightidle.setType(TransitionType.Delay);
        jump_fightidle.setDelayTime(867);
        jump.addTransition(jump_fightidle);

        // 战斗待机 -> 休闲待机
        let fightidle_idle = new TransitionTrigger(fightidle, idle);
        // fightidle_idle.setType(TransitionType.Trigger);
        fightidle_idle.setTriggerFlag("exitfight");
        fightidle_idle.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_idle);

        // 战斗待机 -> 攻击1
        let fightidle_a1 = new TransitionTrigger(fightidle, attack1);
        // fightidle_a1.setType(TransitionType.Trigger);
        fightidle_a1.setTriggerFlag("attack");
        fightidle_a1.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_a1);

        // 战斗待机 -> 技能1
        let fightidle_s1 = new TransitionTrigger(fightidle, skill1);
        // fightidle_s1.setType(TransitionType.Trigger);
        fightidle_s1.setTriggerFlag("skill1");
        fightidle_s1.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_s1);

        // 战斗待机 -> 技能2
        let fightidle_s2 = new TransitionTrigger(fightidle, skill2);
        // fightidle_s2.setType(TransitionType.Trigger);
        fightidle_s2.setTriggerFlag("skill2");
        fightidle_s2.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_s2);

        // 战斗待机 -> 技能3
        let fightidle_s3 = new TransitionTrigger(fightidle, skill3);
        // fightidle_s3.setType(TransitionType.Trigger);
        fightidle_s3.setTriggerFlag("skill3");
        fightidle_s3.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_s3);

        // 战斗待机 -> 技能4
        let fightidle_s4 = new TransitionTrigger(fightidle, skill4);
        // fightidle_s4.setType(TransitionType.Trigger);
        fightidle_s4.setTriggerFlag("skill4");
        fightidle_s4.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_s4);

        // 战斗待机 -> 战斗跑
        let fightidle_fightrun = new TransitionTrigger(fightidle, fightrun);
        // fightidle_fightrun.setType(TransitionType.Trigger);
        fightidle_fightrun.setTriggerFlag("run");
        fightidle_fightrun.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_fightrun);

        // 战斗待机 -> 跳跃
        let fightidle_jump = new TransitionTrigger(fightidle, jump);
        // fightidle_jump.setType(TransitionType.Trigger);
        fightidle_jump.setTriggerFlag("jump");
        fightidle_jump.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_jump);

        // 战斗跑 -> 跳跃
        let fightrun_jump = new TransitionTrigger(fightrun, jump);
        // fightrun_jump.setType(TransitionType.Trigger);
        fightrun_jump.setTriggerFlag("jump");
        fightrun_jump.setTriggerProtectTime(0);
        fightrun.addTransition(fightrun_jump);

        // 战斗跑 -> 战斗待机
        let fightrun_fightidle = new TransitionTrigger(fightrun, fightidle);
        // fightrun_fightidle.setType(TransitionType.Trigger);
        fightrun_fightidle.setTriggerFlag("idle");
        fightrun_fightidle.setTriggerProtectTime(0);
        fightrun.addTransition(fightrun_fightidle);

        // 战斗跑 -> 休闲跑
        let fightrun_run = new TransitionTrigger(fightrun, run);
        // fightrun_run.setType(TransitionType.Trigger);
        fightrun_run.setTriggerFlag("exitfight");
        fightrun_run.setTriggerProtectTime(0);
        fightrun.addTransition(fightrun_run);

        // 攻击1 -> 战斗待机
        let a1_fightidle = new TransitionDelay(attack1, fightidle);
        // a1_fightidle.setType(TransitionType.Delay);
        a1_fightidle.setDelayTime(467);
        attack1.addTransition(a1_fightidle);

        // 攻击1 -> 攻击2
        let a1_a2 = new TransitionTrigger(attack1, attack2);
        // a1_a2.setType(TransitionType.Trigger);
        a1_a2.setTriggerFlag("attack");
        a1_a2.setTriggerProtectTime(300);
        attack1.addTransition(a1_a2);

        // 攻击2 -> 战斗待机
        let a2_fightidle = new TransitionDelay(attack2, fightidle);
        // a2_fightidle.setType(TransitionType.Delay);
        a2_fightidle.setDelayTime(600);
        attack2.addTransition(a2_fightidle);

        // 攻击2 -> 攻击3
        let a2_a3 = new TransitionTrigger(attack2, attack3);
        // a2_a3.setType(TransitionType.Trigger);
        a2_a3.setTriggerFlag("attack");
        a2_a3.setTriggerProtectTime(300);
        attack2.addTransition(a2_a3);

        // 攻击3 -> 战斗待机
        let a3_fightidle = new TransitionDelay(attack3, fightidle);
        // a3_fightidle.setType(TransitionType.Delay);
        a3_fightidle.setDelayTime(800);
        attack3.addTransition(a3_fightidle);

        // 攻击3 -> 攻击1
        let a3_a1 = new TransitionTrigger(attack3, attack1);
        // a3_a1.setType(TransitionType.Trigger);
        a3_a1.setTriggerFlag("attack");
        a3_a1.setTriggerProtectTime(700);
        a3_a1.setTriggerEndTime(799);
        attack3.addTransition(a3_a1);

        // 技能1 -> 战斗待机
        let s1_fightidle = new TransitionDelay(skill1, fightidle);
        // s1_fightidle.setType(TransitionType.Delay);
        s1_fightidle.setDelayTime(1100);
        skill1.addTransition(s1_fightidle);

        // 技能2 -> 战斗待机
        let s2_fightidle = new TransitionDelay(skill2, fightidle);
        // s2_fightidle.setType(TransitionType.Delay);
        s2_fightidle.setDelayTime(1500);
        skill2.addTransition(s2_fightidle);

        // 技能3 -> 战斗待机
        let s3_fightidle = new TransitionDelay(skill3, fightidle);
        // s3_fightidle.setType(TransitionType.Delay);
        s3_fightidle.setDelayTime(1500);
        skill3.addTransition(s3_fightidle);

        // 技能4 -> 战斗待机
        let s4_fightidle = new TransitionDelay(skill4, fightidle);
        // s4_fightidle.setType(TransitionType.Delay);
        s4_fightidle.setDelayTime(1333);
        skill4.addTransition(s4_fightidle);

        return sm;
    }

    // 弓箭手
    public buildJob102(target: Player3D) : StateMachine
    {
        let sm = new StateMachine();

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
            target.onAttack1();
        };

        // 攻击2
        let attack2 = sm.createAction("attack2");
        attack2.funcOnEnter = ()=>
        {
            target.onAttack2();
        };

        // 攻击3
        let attack3 = sm.createAction("attack3");
        attack3.funcOnEnter = ()=>
        {
            target.onAttack3();
        };

        // 技能1
        let skill1 = sm.createAction("skill1");
        skill1.funcOnEnter = ()=>
        {
            target.onSkill1();
        };

        // 技能2
        let skill2 = sm.createAction("skill2");
        skill2.funcOnEnter = ()=>
        {
            target.onSkill2();
        };

        // 技能3
        let skill3 = sm.createAction("skill3");
        skill3.funcOnEnter = ()=>
        {
            target.onSkill3();
        };

        // 技能4
        let skill4 = sm.createAction("skill4");
        skill4.funcOnEnter = ()=>
        {
            target.onSkill4();
        };

        // 休闲待机 -> 休闲跑
        let idle_run = new TransitionTrigger(idle, run);
        // idle_run.setType(TransitionType.Trigger);
        idle_run.setTriggerFlag("run");
        idle_run.setTriggerProtectTime(0);
        idle.addTransition(idle_run);

        // 休闲待机 -> 战斗待机
        let idle_fightidle = new TransitionTrigger(idle, fightidle);
        // idle_fightidle.setType(TransitionType.Trigger);
        idle_fightidle.setTriggerFlag("enterfight");
        idle_fightidle.setTriggerProtectTime(0);
        idle.addTransition(idle_fightidle);

        // 休闲跑 -> 休闲待机
        let run_idle = new TransitionTrigger(run, idle);
        // run_idle.setType(TransitionType.Trigger);
        run_idle.setTriggerFlag("idle");
        run_idle.setTriggerProtectTime(0);
        run.addTransition(run_idle);

        // 休闲跑 -> 跳跃
        let run_jump = new TransitionTrigger(run, jump);
        // run_jump.setType(TransitionType.Trigger);
        run_jump.setTriggerFlag("jump");
        run_jump.setTriggerProtectTime(0);
        run.addTransition(run_jump);

        // 跳跃 -> 战斗待机
        let jump_fightidle = new TransitionDelay(jump, fightidle);
        // jump_fightidle.setType(TransitionType.Delay);
        jump_fightidle.setDelayTime(867);
        jump.addTransition(jump_fightidle);

        // 战斗待机 -> 休闲待机
        let fightidle_idle = new TransitionTrigger(fightidle, idle);
        // fightidle_idle.setType(TransitionType.Trigger);
        fightidle_idle.setTriggerFlag("exitfight");
        fightidle_idle.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_idle);

        // 战斗待机 -> 攻击1
        let fightidle_a1 = new TransitionTrigger(fightidle, attack1);
        // fightidle_a1.setType(TransitionType.Trigger);
        fightidle_a1.setTriggerFlag("attack");
        fightidle_a1.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_a1);

        // 战斗待机 -> 技能1
        let fightidle_s1 = new TransitionTrigger(fightidle, skill1);
        // fightidle_s1.setType(TransitionType.Trigger);
        fightidle_s1.setTriggerFlag("skill1");
        fightidle_s1.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_s1);

        // 战斗待机 -> 技能2
        let fightidle_s2 = new TransitionTrigger(fightidle, skill2);
        // fightidle_s2.setType(TransitionType.Trigger);
        fightidle_s2.setTriggerFlag("skill2");
        fightidle_s2.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_s2);

        // 战斗待机 -> 技能3
        let fightidle_s3 = new TransitionTrigger(fightidle, skill3);
        // fightidle_s3.setType(TransitionType.Trigger);
        fightidle_s3.setTriggerFlag("skill3");
        fightidle_s3.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_s3);

        // 战斗待机 -> 技能4
        let fightidle_s4 = new TransitionTrigger(fightidle, skill4);
        // fightidle_s4.setType(TransitionType.Trigger);
        fightidle_s4.setTriggerFlag("skill4");
        fightidle_s4.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_s4);

        // 战斗待机 -> 战斗跑
        let fightidle_fightrun = new TransitionTrigger(fightidle, fightrun);
        // fightidle_fightrun.setType(TransitionType.Trigger);
        fightidle_fightrun.setTriggerFlag("run");
        fightidle_fightrun.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_fightrun);

        // 战斗待机 -> 跳跃
        let fightidle_jump = new TransitionTrigger(fightidle, jump);
        // fightidle_jump.setType(TransitionType.Trigger);
        fightidle_jump.setTriggerFlag("jump");
        fightidle_jump.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_jump);

        // 战斗跑 -> 跳跃
        let fightrun_jump = new TransitionTrigger(fightrun, jump);
        // fightrun_jump.setType(TransitionType.Trigger);
        fightrun_jump.setTriggerFlag("jump");
        fightrun_jump.setTriggerProtectTime(0);
        fightrun.addTransition(fightrun_jump);

        // 战斗跑 -> 战斗待机
        let fightrun_fightidle = new TransitionTrigger(fightrun, fightidle);
        // fightrun_fightidle.setType(TransitionType.Trigger);
        fightrun_fightidle.setTriggerFlag("idle");
        fightrun_fightidle.setTriggerProtectTime(0);
        fightrun.addTransition(fightrun_fightidle);

        // 战斗跑 -> 休闲跑
        let fightrun_run = new TransitionTrigger(fightrun, run);
        // fightrun_run.setType(TransitionType.Trigger);
        fightrun_run.setTriggerFlag("exitfight");
        fightrun_run.setTriggerProtectTime(0);
        fightrun.addTransition(fightrun_run);

        // 攻击1 -> 战斗待机
        let a1_fightidle = new TransitionDelay(attack1, fightidle);
        // a1_fightidle.setType(TransitionType.Delay);
        a1_fightidle.setDelayTime(433);
        attack1.addTransition(a1_fightidle);

        // 攻击1 -> 攻击2
        let a1_a2 = new TransitionTrigger(attack1, attack2);
        // a1_a2.setType(TransitionType.Trigger);
        a1_a2.setTriggerFlag("attack");
        a1_a2.setTriggerProtectTime(200);
        attack1.addTransition(a1_a2);

        // 攻击2 -> 战斗待机
        let a2_fightidle = new TransitionDelay(attack2, fightidle);
        // a2_fightidle.setType(TransitionType.Delay);
        a2_fightidle.setDelayTime(433);
        attack2.addTransition(a2_fightidle);

        // 攻击2 -> 攻击3
        let a2_a3 = new TransitionTrigger(attack2, attack3);
        // a2_a3.setType(TransitionType.Trigger);
        a2_a3.setTriggerFlag("attack");
        a2_a3.setTriggerProtectTime(200);
        attack2.addTransition(a2_a3);

        // 攻击3 -> 战斗待机
        let a3_fightidle = new TransitionDelay(attack3, fightidle);
        // a3_fightidle.setType(TransitionType.Delay);
        a3_fightidle.setDelayTime(667);
        attack3.addTransition(a3_fightidle);

        // 攻击3 -> 攻击1
        let a3_a1 = new TransitionTrigger(attack3, attack1);
        // a3_a1.setType(TransitionType.Trigger);
        a3_a1.setTriggerFlag("attack");
        a3_a1.setTriggerProtectTime(567);
        a3_a1.setTriggerEndTime(666);
        attack3.addTransition(a3_a1);

        // 技能1 -> 战斗待机
        let s1_fightidle = new TransitionDelay(skill1, fightidle);
        // s1_fightidle.setType(TransitionType.Delay);
        s1_fightidle.setDelayTime(1067);
        skill1.addTransition(s1_fightidle);

        // 技能2 -> 战斗待机
        let s2_fightidle = new TransitionDelay(skill2, fightidle);
        // s2_fightidle.setType(TransitionType.Delay);
        s2_fightidle.setDelayTime(1367);
        skill2.addTransition(s2_fightidle);

        // 技能3 -> 战斗待机
        let s3_fightidle = new TransitionDelay(skill3, fightidle);
        // s3_fightidle.setType(TransitionType.Delay);
        s3_fightidle.setDelayTime(1600);
        skill3.addTransition(s3_fightidle);

        // 技能4 -> 战斗待机
        let s4_fightidle = new TransitionDelay(skill4, fightidle);
        // s4_fightidle.setType(TransitionType.Delay);
        s4_fightidle.setDelayTime(1733);
        skill4.addTransition(s4_fightidle);

        return sm;
    }

    // 钟馗
    public buildJob103(target: Player3D) : StateMachine
    {
        let sm = new StateMachine();

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
            target.onAttack1();
        };

        // 攻击2
        let attack2 = sm.createAction("attack2");
        attack2.funcOnEnter = ()=>
        {
            target.onAttack2();
        };

        // 攻击3
        let attack3 = sm.createAction("attack3");
        attack3.funcOnEnter = ()=>
        {
            target.onAttack3();
        };

        // 技能1
        let skill1 = sm.createAction("skill1");
        skill1.funcOnEnter = ()=>
        {
            target.onSkill1();
        };

        // 技能2
        let skill2 = sm.createAction("skill2");
        skill2.funcOnEnter = ()=>
        {
            target.onSkill2();
        };

        // 技能3
        let skill3 = sm.createAction("skill3");
        skill3.funcOnEnter = ()=>
        {
            target.onSkill3();
        };

        // 技能4
        let skill4 = sm.createAction("skill4");
        skill4.funcOnEnter = ()=>
        {
            target.onSkill4();
        };

        // 休闲待机 -> 休闲跑
        let idle_run = new TransitionTrigger(idle, run);
        // idle_run.setType(TransitionType.Trigger);
        idle_run.setTriggerFlag("run");
        idle_run.setTriggerProtectTime(0);
        idle.addTransition(idle_run);

        // 休闲待机 -> 战斗待机
        let idle_fightidle = new TransitionTrigger(idle, fightidle);
        // idle_fightidle.setType(TransitionType.Trigger);
        idle_fightidle.setTriggerFlag("enterfight");
        idle_fightidle.setTriggerProtectTime(0);
        idle.addTransition(idle_fightidle);

        // 休闲跑 -> 休闲待机
        let run_idle = new TransitionTrigger(run, idle);
        // run_idle.setType(TransitionType.Trigger);
        run_idle.setTriggerFlag("idle");
        run_idle.setTriggerProtectTime(0);
        run.addTransition(run_idle);

        // 休闲跑 -> 跳跃
        let run_jump = new TransitionTrigger(run, jump);
        // run_jump.setType(TransitionType.Trigger);
        run_jump.setTriggerFlag("jump");
        run_jump.setTriggerProtectTime(0);
        run.addTransition(run_jump);

        // 跳跃 -> 战斗待机
        let jump_fightidle = new TransitionDelay(jump, fightidle);
        // jump_fightidle.setType(TransitionType.Delay);
        jump_fightidle.setDelayTime(867);
        jump.addTransition(jump_fightidle);

        // 战斗待机 -> 休闲待机
        let fightidle_idle = new TransitionTrigger(fightidle, idle);
        // fightidle_idle.setType(TransitionType.Trigger);
        fightidle_idle.setTriggerFlag("exitfight");
        fightidle_idle.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_idle);

        // 战斗待机 -> 攻击1
        let fightidle_a1 = new TransitionTrigger(fightidle, attack1);
        // fightidle_a1.setType(TransitionType.Trigger);
        fightidle_a1.setTriggerFlag("attack");
        fightidle_a1.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_a1);

        // 战斗待机 -> 技能1
        let fightidle_s1 = new TransitionTrigger(fightidle, skill1);
        // fightidle_s1.setType(TransitionType.Trigger);
        fightidle_s1.setTriggerFlag("skill1");
        fightidle_s1.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_s1);

        // 战斗待机 -> 技能2
        let fightidle_s2 = new TransitionTrigger(fightidle, skill2);
        // fightidle_s2.setType(TransitionType.Trigger);
        fightidle_s2.setTriggerFlag("skill2");
        fightidle_s2.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_s2);

        // 战斗待机 -> 技能3
        let fightidle_s3 = new TransitionTrigger(fightidle, skill3);
        // fightidle_s3.setType(TransitionType.Trigger);
        fightidle_s3.setTriggerFlag("skill3");
        fightidle_s3.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_s3);

        // 战斗待机 -> 技能4
        let fightidle_s4 = new TransitionTrigger(fightidle, skill4);
        // fightidle_s4.setType(TransitionType.Trigger);
        fightidle_s4.setTriggerFlag("skill4");
        fightidle_s4.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_s4);

        // 战斗待机 -> 战斗跑
        let fightidle_fightrun = new TransitionTrigger(fightidle, fightrun);
        // fightidle_fightrun.setType(TransitionType.Trigger);
        fightidle_fightrun.setTriggerFlag("run");
        fightidle_fightrun.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_fightrun);

        // 战斗待机 -> 跳跃
        let fightidle_jump = new TransitionTrigger(fightidle, jump);
        // fightidle_jump.setType(TransitionType.Trigger);
        fightidle_jump.setTriggerFlag("jump");
        fightidle_jump.setTriggerProtectTime(0);
        fightidle.addTransition(fightidle_jump);

        // 战斗跑 -> 跳跃
        let fightrun_jump = new TransitionTrigger(fightrun, jump);
        // fightrun_jump.setType(TransitionType.Trigger);
        fightrun_jump.setTriggerFlag("jump");
        fightrun_jump.setTriggerProtectTime(0);
        fightrun.addTransition(fightrun_jump);

        // 战斗跑 -> 战斗待机
        let fightrun_fightidle = new TransitionTrigger(fightrun, fightidle);
        // fightrun_fightidle.setType(TransitionType.Trigger);
        fightrun_fightidle.setTriggerFlag("idle");
        fightrun_fightidle.setTriggerProtectTime(0);
        fightrun.addTransition(fightrun_fightidle);

        // 战斗跑 -> 休闲跑
        let fightrun_run = new TransitionTrigger(fightrun, run);
        // fightrun_run.setType(TransitionType.Trigger);
        fightrun_run.setTriggerFlag("exitfight");
        fightrun_run.setTriggerProtectTime(0);
        fightrun.addTransition(fightrun_run);

        // 攻击1 -> 战斗待机
        let a1_fightidle = new TransitionDelay(attack1, fightidle);
        // a1_fightidle.setType(TransitionType.Delay);
        a1_fightidle.setDelayTime(667);
        attack1.addTransition(a1_fightidle);

        // 攻击1 -> 攻击2
        let a1_a2 = new TransitionTrigger(attack1, attack2);
        // a1_a2.setType(TransitionType.Trigger);
        a1_a2.setTriggerFlag("attack");
        a1_a2.setTriggerProtectTime(300);
        attack1.addTransition(a1_a2);

        // 攻击2 -> 战斗待机
        let a2_fightidle = new TransitionDelay(attack2, fightidle);
        // a2_fightidle.setType(TransitionType.Delay);
        a2_fightidle.setDelayTime(667);
        attack2.addTransition(a2_fightidle);

        // 攻击2 -> 攻击3
        let a2_a3 = new TransitionTrigger(attack2, attack3);
        // a2_a3.setType(TransitionType.Trigger);
        a2_a3.setTriggerFlag("attack");
        a2_a3.setTriggerProtectTime(300);
        attack2.addTransition(a2_a3);

        // 攻击3 -> 战斗待机
        let a3_fightidle = new TransitionDelay(attack3, fightidle);
        // a3_fightidle.setType(TransitionType.Delay);
        a3_fightidle.setDelayTime(1300);
        attack3.addTransition(a3_fightidle);

        // 攻击3 -> 攻击1
        let a3_a1 = new TransitionTrigger(attack3, attack1);
        // a3_a1.setType(TransitionType.Trigger);
        a3_a1.setTriggerFlag("attack");
        a3_a1.setTriggerProtectTime(850);
        a3_a1.setTriggerEndTime(1299);
        attack3.addTransition(a3_a1);

        // 技能1 -> 战斗待机
        let s1_fightidle = new TransitionDelay(skill1, fightidle);
        // s1_fightidle.setType(TransitionType.Delay);
        s1_fightidle.setDelayTime(1533);
        skill1.addTransition(s1_fightidle);

        // 技能2 -> 战斗待机
        let s2_fightidle = new TransitionDelay(skill2, fightidle);
        // s2_fightidle.setType(TransitionType.Delay);
        s2_fightidle.setDelayTime(1833);
        skill2.addTransition(s2_fightidle);

        // 技能3 -> 战斗待机
        let s3_fightidle = new TransitionDelay(skill3, fightidle);
        // s3_fightidle.setType(TransitionType.Delay);
        s3_fightidle.setDelayTime(1200);
        skill3.addTransition(s3_fightidle);

        // 技能4 -> 战斗待机
        let s4_fightidle = new TransitionDelay(skill4, fightidle);
        // s4_fightidle.setType(TransitionType.Delay);
        s4_fightidle.setDelayTime(1600);
        skill4.addTransition(s4_fightidle);

        return sm;
    }

    /**
     * 构建一个普通怪物的状态机
     * 分为2步，首先创建全部状态/行为，然后增加状态/行为之间的转换
     * @param target 具有状态机行为的目标对象
     */
    public buildMonster(target: Player3D, timeDic: any) : StateMachine
    {
        let sm = new StateMachine();

        // 休闲待机
        let idle = sm.createAction("idle");
        idle.funcOnEnter = () =>
        {
            target.onIdle();
        };
        sm.setAction(idle);

        // 休闲跑
        let run = sm.createAction("run");
        run.funcOnEnter = () =>
        {
            target.onRun();
        };

        // 攻击
        let attack = sm.createAction("attack");
        attack.funcOnEnter = () =>
        {
            target.onAttack1();
        };

        // 受击
        let injure = sm.createAction("injure");
        injure.funcOnEnter = (param) =>
        {
            target.onInjure(param);
        };

        // 死亡
        let die = sm.createAction("die");
        die.funcOnEnter = () =>
        {
            target.onDie();
        };

        // 休闲待机 -> 攻击
        let idle_attack = new TransitionTrigger(idle, attack);
        // idle_attack.setType(TransitionType.Trigger);
        idle_attack.setTriggerFlag("attack");
        idle.addTransition(idle_attack);

        // 休闲待机 -> 跑
        let idle_run = new TransitionTrigger(idle, run);
        // idle_run.setType(TransitionType.Trigger);
        idle_run.setTriggerFlag("run");
        idle.addTransition(idle_run);

        // 休闲待机 -> 受击
        let idle_injure = new TransitionTrigger(idle, injure);
        // idle_injure.setType(TransitionType.Trigger);
        idle_injure.setTriggerFlag("injure");
        idle.addTransition(idle_injure);

        // 休闲待机 -> 死亡
        let idle_die = new TransitionTrigger(idle, die);
        // idle_die.setType(TransitionType.Trigger);
        idle_die.setTriggerFlag("die");
        idle.addTransition(idle_die);

        // 休闲跑 -> 休闲待机
        let run_idle = new TransitionTrigger(run, idle);
        // run_idle.setType(TransitionType.Trigger);
        run_idle.setTriggerFlag("idle");
        run.addTransition(run_idle);

        // 攻击 -> 休闲待机
        let attack_idle = new TransitionDelay(attack, idle);
        // attack_idle.setType(TransitionType.Delay);
        attack_idle.setDelayTime(timeDic.get("attack"));
        attack.addTransition(attack_idle);

        // 攻击 -> 受击
        let attack_injure = new TransitionTrigger(attack, injure);
        // attack_injure.setType(TransitionType.Trigger);
        attack_injure.setTriggerFlag("injure");
        attack.addTransition(attack_injure);

        // 受击 -> 休闲待机
        let injure_idle = new TransitionDelay(injure, idle);
        // injure_idle.setType(TransitionType.Delay);
        injure_idle.setDelayTime(timeDic.get("injure") / 0.7);
        injure.addTransition(injure_idle);

        // 受击 -> 受击
        let injure_injure = new TransitionTrigger(injure, injure);
        // injure_injure.setType(TransitionType.Trigger);
        injure_injure.setTriggerFlag("injure");
        injure.addTransition(injure_injure);

        // 受击 -> 死亡
        let injure_die = new TransitionTrigger(injure, die);
        // injure_die.setType(TransitionType.Trigger);
        injure_die.setTriggerFlag("die");
        injure.addTransition(injure_die);

        return sm;
    }
}