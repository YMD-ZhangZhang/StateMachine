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
        let idle_run = this.CreateTransitionTrigger(idle, run, "run");
        // 休闲待机 -> 战斗待机
        let idle_fightidle = this.CreateTransitionTrigger(idle, fightidle, "enterfight");
        // 休闲跑 -> 休闲待机
        let run_idle = this.CreateTransitionTrigger(run, idle, "idle");
        // 休闲跑 -> 跳跃
        let run_jump = this.CreateTransitionTrigger(run, jump, "jump");
        // 跳跃 -> 战斗待机
        let jump_fightidle = this.CreateTransitionDelay(jump, fightidle, 867);
        // 战斗待机 -> 休闲待机
        let fightidle_idle = this.CreateTransitionTrigger(fightidle, idle, "exitfight");
        // 战斗待机 -> 攻击1
        let fightidle_a1 = this.CreateTransitionTrigger(fightidle, attack1, "attack");
        // 战斗待机 -> 技能1
        let fightidle_s1 = this.CreateTransitionTrigger(fightidle, skill1, "skill1");
        // 战斗待机 -> 技能2
        let fightidle_s2 = this.CreateTransitionTrigger(fightidle, skill2, "skill2");
        // 战斗待机 -> 技能3
        let fightidle_s3 = this.CreateTransitionTrigger(fightidle, skill3, "skill3");
        // 战斗待机 -> 技能4
        let fightidle_s4 = this.CreateTransitionTrigger(fightidle, skill4, "skill4");
        // 战斗待机 -> 战斗跑
        let fightidle_fightrun = this.CreateTransitionTrigger(fightidle, fightrun, "run");
        // 战斗待机 -> 跳跃
        let fightidle_jump = this.CreateTransitionTrigger(fightidle, jump, "jump");
        // 战斗跑 -> 跳跃
        let fightrun_jump = this.CreateTransitionTrigger(fightrun, jump, "jump");
        // 战斗跑 -> 战斗待机
        let fightrun_fightidle = this.CreateTransitionTrigger(fightrun, fightidle, "idle");
        // 战斗跑 -> 休闲跑
        let fightrun_run = this.CreateTransitionTrigger(fightrun, run, "exitfight");
        // 攻击1 -> 战斗待机
        let a1_fightidle = this.CreateTransitionDelay(attack1, fightidle, 667);
        // 攻击1 -> 攻击2
        let a1_a2 = this.CreateTransitionTrigger(attack1, attack2, "attack");
        a1_a2.setTriggerProtectTime(300);
        // 攻击2 -> 战斗待机
        let a2_fightidle = this.CreateTransitionDelay(attack2, fightidle, 733);
        // 攻击2 -> 攻击3
        let a2_a3 = this.CreateTransitionTrigger(attack2, attack3, "attack");
        a2_a3.setTriggerProtectTime(300);
        // 攻击3 -> 战斗待机
        let a3_fightidle = this.CreateTransitionDelay(attack3, fightidle, 1000);
        // 攻击3 -> 攻击1
        let a3_a1 = this.CreateTransitionTrigger(attack3, attack1, "attack");
        a3_a1.setTriggerProtectTime(633);
        a3_a1.setTriggerEndTime(999);
        // 技能1 -> 战斗待机
        let s1_fightidle = this.CreateTransitionDelay(skill1, fightidle, 1333);
        // 技能2 -> 战斗待机
        let s2_fightidle = this.CreateTransitionDelay(skill2, fightidle, 1767);
        // 技能3 -> 战斗待机
        let s3_fightidle = this.CreateTransitionDelay(skill3, fightidle, 1000);
        // 技能4 -> 战斗待机
        let s4_fightidle = this.CreateTransitionDelay(skill4, fightidle, 2000);

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
        let idle_run = this.CreateTransitionTrigger(idle, run, "run");
        // 休闲待机 -> 战斗待机
        let idle_fightidle = this.CreateTransitionTrigger(idle, fightidle, "enterfight");
        // 休闲跑 -> 休闲待机
        let run_idle = this.CreateTransitionTrigger(run, idle, "idle");
        // 休闲跑 -> 跳跃
        let run_jump = this.CreateTransitionTrigger(run, jump, "jump");
        // 跳跃 -> 战斗待机
        let jump_fightidle = this.CreateTransitionDelay(jump, fightidle, 867);
        // 战斗待机 -> 休闲待机
        let fightidle_idle = this.CreateTransitionTrigger(fightidle, idle, "exitfight");
        // 战斗待机 -> 攻击1
        let fightidle_a1 = this.CreateTransitionTrigger(fightidle, attack1, "attack");
        // 战斗待机 -> 技能1
        let fightidle_s1 = this.CreateTransitionTrigger(fightidle, skill1, "skill1");
        // 战斗待机 -> 技能2
        let fightidle_s2 = this.CreateTransitionTrigger(fightidle, skill2, "skill2");
        // 战斗待机 -> 技能3
        let fightidle_s3 = this.CreateTransitionTrigger(fightidle, skill3, "skill3");
        // 战斗待机 -> 技能4
        let fightidle_s4 = this.CreateTransitionTrigger(fightidle, skill4, "skill4");
        // 战斗待机 -> 战斗跑
        let fightidle_fightrun = this.CreateTransitionTrigger(fightidle, fightrun, "run");
        // 战斗待机 -> 跳跃
        let fightidle_jump = this.CreateTransitionTrigger(fightidle, jump, "jump");
        // 战斗跑 -> 跳跃
        let fightrun_jump = this.CreateTransitionTrigger(fightrun, jump, "jump");
        // 战斗跑 -> 战斗待机
        let fightrun_fightidle = this.CreateTransitionTrigger(fightrun, fightidle, "idle");
        // 战斗跑 -> 休闲跑
        let fightrun_run = this.CreateTransitionTrigger(fightrun, run, "exitfight");
        // 攻击1 -> 战斗待机
        let a1_fightidle = this.CreateTransitionDelay(attack1, fightidle, 467);
        // 攻击1 -> 攻击2
        let a1_a2 = this.CreateTransitionTrigger(attack1, attack2, "attack");
        a1_a2.setTriggerProtectTime(300);
        // 攻击2 -> 战斗待机
        let a2_fightidle = this.CreateTransitionDelay(attack2, fightidle, 600);
        // 攻击2 -> 攻击3
        let a2_a3 = this.CreateTransitionTrigger(attack2, attack3, "attack");
        a2_a3.setTriggerProtectTime(300);
        // 攻击3 -> 战斗待机
        let a3_fightidle = this.CreateTransitionDelay(attack3, fightidle, 800);
        // 攻击3 -> 攻击1
        let a3_a1 = this.CreateTransitionTrigger(attack3, attack1, "attack");
        a3_a1.setTriggerProtectTime(700);
        a3_a1.setTriggerEndTime(799);
        // 技能1 -> 战斗待机
        let s1_fightidle = this.CreateTransitionDelay(skill1, fightidle, 1100);
        // 技能2 -> 战斗待机
        let s2_fightidle = this.CreateTransitionDelay(skill2, fightidle, 1500);
        // 技能3 -> 战斗待机
        let s3_fightidle = this.CreateTransitionDelay(skill3, fightidle, 1500);
        // 技能4 -> 战斗待机
        let s4_fightidle = this.CreateTransitionDelay(skill4, fightidle, 1333);

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
        let idle_run = this.CreateTransitionTrigger(idle, run, "run");
        // 休闲待机 -> 战斗待机
        let idle_fightidle = this.CreateTransitionTrigger(idle, fightidle, "enterfight");
        // 休闲跑 -> 休闲待机
        let run_idle = this.CreateTransitionTrigger(run, idle, "idle");
        // 休闲跑 -> 跳跃
        let run_jump = this.CreateTransitionTrigger(run, jump, "jump");
        // 跳跃 -> 战斗待机
        let jump_fightidle = this.CreateTransitionDelay(jump, fightidle, 867);
        // 战斗待机 -> 休闲待机
        let fightidle_idle = this.CreateTransitionTrigger(fightidle, idle, "exitfight");
        // 战斗待机 -> 攻击1
        let fightidle_a1 = this.CreateTransitionTrigger(fightidle, attack1, "attack");
        // 战斗待机 -> 技能1
        let fightidle_s1 = this.CreateTransitionTrigger(fightidle, skill1, "skill1");
        // 战斗待机 -> 技能2
        let fightidle_s2 = this.CreateTransitionTrigger(fightidle, skill2, "skill2");
        // 战斗待机 -> 技能3
        let fightidle_s3 = this.CreateTransitionTrigger(fightidle, skill3, "skill3");
        // 战斗待机 -> 技能4
        let fightidle_s4 = this.CreateTransitionTrigger(fightidle, skill4, "skill4");
        // 战斗待机 -> 战斗跑
        let fightidle_fightrun = this.CreateTransitionTrigger(fightidle, fightrun, "run");
        // 战斗待机 -> 跳跃
        let fightidle_jump = this.CreateTransitionTrigger(fightidle, jump, "jump");
        // 战斗跑 -> 跳跃
        let fightrun_jump = this.CreateTransitionTrigger(fightrun, jump, "jump");
        // 战斗跑 -> 战斗待机
        let fightrun_fightidle = this.CreateTransitionTrigger(fightrun, fightidle, "idle");
        // 战斗跑 -> 休闲跑
        let fightrun_run = this.CreateTransitionTrigger(fightrun, run, "exitfight");
        // 攻击1 -> 战斗待机
        let a1_fightidle = this.CreateTransitionDelay(attack1, fightidle, 433);
        // 攻击1 -> 攻击2
        let a1_a2 = this.CreateTransitionTrigger(attack1, attack2, "attack");
        a1_a2.setTriggerProtectTime(200);
        // 攻击2 -> 战斗待机
        let a2_fightidle = this.CreateTransitionDelay(attack2, fightidle, 433);
        // 攻击2 -> 攻击3
        let a2_a3 = this.CreateTransitionTrigger(attack2, attack3, "attack");
        a2_a3.setTriggerProtectTime(200);
        // 攻击3 -> 战斗待机
        let a3_fightidle = this.CreateTransitionDelay(attack3, fightidle, 667);
        // 攻击3 -> 攻击1
        let a3_a1 = this.CreateTransitionTrigger(attack3, attack1, "attack");
        a3_a1.setTriggerProtectTime(567);
        a3_a1.setTriggerEndTime(666);
        // 技能1 -> 战斗待机
        let s1_fightidle = this.CreateTransitionDelay(skill1, fightidle, 1067);
        // 技能2 -> 战斗待机
        let s2_fightidle = this.CreateTransitionDelay(skill2, fightidle, 1367);
        // 技能3 -> 战斗待机
        let s3_fightidle = this.CreateTransitionDelay(skill3, fightidle, 1600);
        // 技能4 -> 战斗待机
        let s4_fightidle = this.CreateTransitionDelay(skill4, fightidle, 1733);

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
        let idle_run = this.CreateTransitionTrigger(idle, run, "run");
        // 休闲待机 -> 战斗待机
        let idle_fightidle = this.CreateTransitionTrigger(idle, fightidle, "enterfight");
        // 休闲跑 -> 休闲待机
        let run_idle = this.CreateTransitionTrigger(run, idle, "idle");
        // 休闲跑 -> 跳跃
        let run_jump = this.CreateTransitionTrigger(run, jump, "jump");
        // 跳跃 -> 战斗待机
        let jump_fightidle = this.CreateTransitionDelay(jump, fightidle, 867);
        // 战斗待机 -> 休闲待机
        let fightidle_idle = this.CreateTransitionTrigger(fightidle, idle, "exitfight");
        // 战斗待机 -> 攻击1
        let fightidle_a1 = this.CreateTransitionTrigger(fightidle, attack1, "attack");
        // 战斗待机 -> 技能1
        let fightidle_s1 = this.CreateTransitionTrigger(fightidle, skill1, "skill1");
        // 战斗待机 -> 技能2
        let fightidle_s2 = this.CreateTransitionTrigger(fightidle, skill2, "skill2");
        // 战斗待机 -> 技能3
        let fightidle_s3 = this.CreateTransitionTrigger(fightidle, skill3, "skill3");
        // 战斗待机 -> 技能4
        let fightidle_s4 = this.CreateTransitionTrigger(fightidle, skill4, "skill4");
        // 战斗待机 -> 战斗跑
        let fightidle_fightrun = this.CreateTransitionTrigger(fightidle, fightrun, "run");
        // 战斗待机 -> 跳跃
        let fightidle_jump = this.CreateTransitionTrigger(fightidle, jump, "jump");
        // 战斗跑 -> 跳跃
        let fightrun_jump = this.CreateTransitionTrigger(fightrun, jump, "jump");
        // 战斗跑 -> 战斗待机
        let fightrun_fightidle = this.CreateTransitionTrigger(fightrun, fightidle, "idle");
        // 战斗跑 -> 休闲跑
        let fightrun_run = this.CreateTransitionTrigger(fightrun, run, "exitfight");
        // 攻击1 -> 战斗待机
        let a1_fightidle = this.CreateTransitionDelay(attack1, fightidle, 667);
        // 攻击1 -> 攻击2
        let a1_a2 = this.CreateTransitionTrigger(attack1, attack2, "attack");
        a1_a2.setTriggerProtectTime(300);
        // 攻击2 -> 战斗待机
        let a2_fightidle = this.CreateTransitionDelay(attack2, fightidle, 667);
        // 攻击2 -> 攻击3
        let a2_a3 = this.CreateTransitionTrigger(attack2, attack3, "attack");
        a2_a3.setTriggerProtectTime(300);
        // 攻击3 -> 战斗待机
        let a3_fightidle = this.CreateTransitionDelay(attack3, fightidle, 1300);
        // 攻击3 -> 攻击1
        let a3_a1 = this.CreateTransitionTrigger(attack3, attack1, "attack");
        a3_a1.setTriggerProtectTime(850);
        a3_a1.setTriggerEndTime(1299);
        // 技能1 -> 战斗待机
        let s1_fightidle = this.CreateTransitionDelay(skill1, fightidle, 1533);
        // 技能2 -> 战斗待机
        let s2_fightidle = this.CreateTransitionDelay(skill2, fightidle, 1833);
        // 技能3 -> 战斗待机
        let s3_fightidle = this.CreateTransitionDelay(skill3, fightidle, 1200);
        // 技能4 -> 战斗待机
        let s4_fightidle = this.CreateTransitionDelay(skill4, fightidle, 1600);

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
        let idle_attack = this.CreateTransitionTrigger(idle, attack, "attack");
        // 休闲待机 -> 跑
        let idle_run = this.CreateTransitionTrigger(idle, run, "run");
        // 休闲待机 -> 受击
        let idle_injure = this.CreateTransitionTrigger(idle, injure, "injure");
        // 休闲待机 -> 死亡
        let idle_die = this.CreateTransitionTrigger(idle, die, "die");
        // 休闲跑 -> 休闲待机
        let run_idle = this.CreateTransitionTrigger(run, idle, "idle");
        // 攻击 -> 休闲待机
        let attack_idle = this.CreateTransitionDelay(attack, idle, timeDic.get("attack"));
        // 攻击 -> 受击
        let attack_injure = this.CreateTransitionTrigger(attack, injure, "injure");
        // 受击 -> 休闲待机
        let injure_idle = this.CreateTransitionDelay(injure, idle, timeDic.get("injure") / 0.7);
        // 受击 -> 受击
        let injure_injure = this.CreateTransitionTrigger(injure, injure, "injure");
        // 受击 -> 死亡
        let injure_die = this.CreateTransitionTrigger(injure, die, "die");

        return sm;
    }

    // 创建触发器转换
    private CreateTransitionTrigger(fromAction: MachineAction, toAction: MachineAction, triggerFlag: string)
    {
        let transition = new TransitionTrigger(fromAction, toAction);
        transition.setTriggerFlag(triggerFlag);
        fromAction.addTransition(transition);
        return transition;
    }

    // 创建延时转换
    private CreateTransitionDelay(fromAction: MachineAction, toAction: MachineAction, delayTime: number)
    {
        let transition = new TransitionDelay(fromAction, toAction);
        transition.setDelayTime(delayTime);
        fromAction.addTransition(transition);
        return transition;
    }
}