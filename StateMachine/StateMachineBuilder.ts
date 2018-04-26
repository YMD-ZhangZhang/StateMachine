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
        this.CreateTransitionTrigger(idle, run, "run");
        // 休闲待机 -> 战斗待机
        this.CreateTransitionTrigger(idle, fightidle, "enterfight");
        // 休闲跑 -> 休闲待机
        this.CreateTransitionTrigger(run, idle, "idle");
        // 休闲跑 -> 跳跃
        this.CreateTransitionTrigger(run, jump, "jump");
        // 跳跃 -> 战斗待机
        this.CreateTransitionDelay(jump, fightidle, 867);
        // 战斗待机 -> 休闲待机
        this.CreateTransitionTrigger(fightidle, idle, "exitfight");
        // 战斗待机 -> 攻击1
        this.CreateTransitionTrigger(fightidle, attack1, "attack");
        // 战斗待机 -> 技能1
        this.CreateTransitionTrigger(fightidle, skill1, "skill1");
        // 战斗待机 -> 技能2
        this.CreateTransitionTrigger(fightidle, skill2, "skill2");
        // 战斗待机 -> 技能3
        this.CreateTransitionTrigger(fightidle, skill3, "skill3");
        // 战斗待机 -> 技能4
        this.CreateTransitionTrigger(fightidle, skill4, "skill4");
        // 战斗待机 -> 战斗跑
        this.CreateTransitionTrigger(fightidle, fightrun, "run");
        // 战斗待机 -> 跳跃
        this.CreateTransitionTrigger(fightidle, jump, "jump");
        // 战斗跑 -> 跳跃
        this.CreateTransitionTrigger(fightrun, jump, "jump");
        // 战斗跑 -> 战斗待机
        this.CreateTransitionTrigger(fightrun, fightidle, "idle");
        // 战斗跑 -> 休闲跑
        this.CreateTransitionTrigger(fightrun, run, "exitfight");
        // 攻击1 -> 战斗待机
        this.CreateTransitionDelay(attack1, fightidle, 667);

        // 攻击1 -> 攻击2
        this.CreateTransitionTrigger(attack1, attack2, "attack")
        .setTriggerProtectTime(300);

        // 攻击2 -> 战斗待机
        this.CreateTransitionDelay(attack2, fightidle, 733);

        // 攻击2 -> 攻击3
        this.CreateTransitionTrigger(attack2, attack3, "attack")
        .setTriggerProtectTime(300);

        // 攻击3 -> 战斗待机
        this.CreateTransitionDelay(attack3, fightidle, 1000);

        // 攻击3 -> 攻击1
        this.CreateTransitionTrigger(attack3, attack1, "attack")
        .setTriggerProtectTime(633)
        .setTriggerEndTime(999);

        // 技能1 -> 战斗待机
        this.CreateTransitionDelay(skill1, fightidle, 1333);
        // 技能2 -> 战斗待机
        this.CreateTransitionDelay(skill2, fightidle, 1767);
        // 技能3 -> 战斗待机
        this.CreateTransitionDelay(skill3, fightidle, 1000);
        // 技能4 -> 战斗待机
        this.CreateTransitionDelay(skill4, fightidle, 2000);

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
        this.CreateTransitionTrigger(idle, run, "run");
        // 休闲待机 -> 战斗待机
        this.CreateTransitionTrigger(idle, fightidle, "enterfight");
        // 休闲跑 -> 休闲待机
        this.CreateTransitionTrigger(run, idle, "idle");
        // 休闲跑 -> 跳跃
        this.CreateTransitionTrigger(run, jump, "jump");
        // 跳跃 -> 战斗待机
        this.CreateTransitionDelay(jump, fightidle, 867);
        // 战斗待机 -> 休闲待机
        this.CreateTransitionTrigger(fightidle, idle, "exitfight");
        // 战斗待机 -> 攻击1
        this.CreateTransitionTrigger(fightidle, attack1, "attack");
        // 战斗待机 -> 技能1
        this.CreateTransitionTrigger(fightidle, skill1, "skill1");
        // 战斗待机 -> 技能2
        this.CreateTransitionTrigger(fightidle, skill2, "skill2");
        // 战斗待机 -> 技能3
        this.CreateTransitionTrigger(fightidle, skill3, "skill3");
        // 战斗待机 -> 技能4
        this.CreateTransitionTrigger(fightidle, skill4, "skill4");
        // 战斗待机 -> 战斗跑
        this.CreateTransitionTrigger(fightidle, fightrun, "run");
        // 战斗待机 -> 跳跃
        this.CreateTransitionTrigger(fightidle, jump, "jump");
        // 战斗跑 -> 跳跃
        this.CreateTransitionTrigger(fightrun, jump, "jump");
        // 战斗跑 -> 战斗待机
        this.CreateTransitionTrigger(fightrun, fightidle, "idle");
        // 战斗跑 -> 休闲跑
        this.CreateTransitionTrigger(fightrun, run, "exitfight");
        // 攻击1 -> 战斗待机
        this.CreateTransitionDelay(attack1, fightidle, 467);

        // 攻击1 -> 攻击2
        this.CreateTransitionTrigger(attack1, attack2, "attack")
        .setTriggerProtectTime(300);

        // 攻击2 -> 战斗待机
        this.CreateTransitionDelay(attack2, fightidle, 600);

        // 攻击2 -> 攻击3
        this.CreateTransitionTrigger(attack2, attack3, "attack")
        .setTriggerProtectTime(300);

        // 攻击3 -> 战斗待机
        this.CreateTransitionDelay(attack3, fightidle, 800);

        // 攻击3 -> 攻击1
        this.CreateTransitionTrigger(attack3, attack1, "attack")
        .setTriggerProtectTime(700)
        .setTriggerEndTime(799);

        // 技能1 -> 战斗待机
        this.CreateTransitionDelay(skill1, fightidle, 1100);
        // 技能2 -> 战斗待机
        this.CreateTransitionDelay(skill2, fightidle, 1500);
        // 技能3 -> 战斗待机
        this.CreateTransitionDelay(skill3, fightidle, 1500);
        // 技能4 -> 战斗待机
        this.CreateTransitionDelay(skill4, fightidle, 1333);

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
        this.CreateTransitionTrigger(idle, run, "run");
        // 休闲待机 -> 战斗待机
        this.CreateTransitionTrigger(idle, fightidle, "enterfight");
        // 休闲跑 -> 休闲待机
        this.CreateTransitionTrigger(run, idle, "idle");
        // 休闲跑 -> 跳跃
        this.CreateTransitionTrigger(run, jump, "jump");
        // 跳跃 -> 战斗待机
        this.CreateTransitionDelay(jump, fightidle, 867);
        // 战斗待机 -> 休闲待机
        this.CreateTransitionTrigger(fightidle, idle, "exitfight");
        // 战斗待机 -> 攻击1
        this.CreateTransitionTrigger(fightidle, attack1, "attack");
        // 战斗待机 -> 技能1
        this.CreateTransitionTrigger(fightidle, skill1, "skill1");
        // 战斗待机 -> 技能2
        this.CreateTransitionTrigger(fightidle, skill2, "skill2");
        // 战斗待机 -> 技能3
        this.CreateTransitionTrigger(fightidle, skill3, "skill3");
        // 战斗待机 -> 技能4
        this.CreateTransitionTrigger(fightidle, skill4, "skill4");
        // 战斗待机 -> 战斗跑
        this.CreateTransitionTrigger(fightidle, fightrun, "run");
        // 战斗待机 -> 跳跃
        this.CreateTransitionTrigger(fightidle, jump, "jump");
        // 战斗跑 -> 跳跃
        this.CreateTransitionTrigger(fightrun, jump, "jump");
        // 战斗跑 -> 战斗待机
        this.CreateTransitionTrigger(fightrun, fightidle, "idle");
        // 战斗跑 -> 休闲跑
        this.CreateTransitionTrigger(fightrun, run, "exitfight");
        // 攻击1 -> 战斗待机
        this.CreateTransitionDelay(attack1, fightidle, 433);

        // 攻击1 -> 攻击2
        this.CreateTransitionTrigger(attack1, attack2, "attack")
        .setTriggerProtectTime(200);

        // 攻击2 -> 战斗待机
        this.CreateTransitionDelay(attack2, fightidle, 433);

        // 攻击2 -> 攻击3
        this.CreateTransitionTrigger(attack2, attack3, "attack")
        .setTriggerProtectTime(200);

        // 攻击3 -> 战斗待机
        this.CreateTransitionDelay(attack3, fightidle, 667);

        // 攻击3 -> 攻击1
        this.CreateTransitionTrigger(attack3, attack1, "attack")
        .setTriggerProtectTime(567)
        .setTriggerEndTime(666);

        // 技能1 -> 战斗待机
        this.CreateTransitionDelay(skill1, fightidle, 1067);
        // 技能2 -> 战斗待机
        this.CreateTransitionDelay(skill2, fightidle, 1367);
        // 技能3 -> 战斗待机
        this.CreateTransitionDelay(skill3, fightidle, 1600);
        // 技能4 -> 战斗待机
        this.CreateTransitionDelay(skill4, fightidle, 1733);

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
        this.CreateTransitionTrigger(idle, run, "run");
        // 休闲待机 -> 战斗待机
        this.CreateTransitionTrigger(idle, fightidle, "enterfight");
        // 休闲跑 -> 休闲待机
        this.CreateTransitionTrigger(run, idle, "idle");
        // 休闲跑 -> 跳跃
        this.CreateTransitionTrigger(run, jump, "jump");
        // 跳跃 -> 战斗待机
        this.CreateTransitionDelay(jump, fightidle, 867);
        // 战斗待机 -> 休闲待机
        this.CreateTransitionTrigger(fightidle, idle, "exitfight");
        // 战斗待机 -> 攻击1
        this.CreateTransitionTrigger(fightidle, attack1, "attack");
        // 战斗待机 -> 技能1
        this.CreateTransitionTrigger(fightidle, skill1, "skill1");
        // 战斗待机 -> 技能2
        this.CreateTransitionTrigger(fightidle, skill2, "skill2");
        // 战斗待机 -> 技能3
        this.CreateTransitionTrigger(fightidle, skill3, "skill3");
        // 战斗待机 -> 技能4
        this.CreateTransitionTrigger(fightidle, skill4, "skill4");
        // 战斗待机 -> 战斗跑
        this.CreateTransitionTrigger(fightidle, fightrun, "run");
        // 战斗待机 -> 跳跃
        this.CreateTransitionTrigger(fightidle, jump, "jump");
        // 战斗跑 -> 跳跃
        this.CreateTransitionTrigger(fightrun, jump, "jump");
        // 战斗跑 -> 战斗待机
        this.CreateTransitionTrigger(fightrun, fightidle, "idle");
        // 战斗跑 -> 休闲跑
        this.CreateTransitionTrigger(fightrun, run, "exitfight");
        // 攻击1 -> 战斗待机
        this.CreateTransitionDelay(attack1, fightidle, 667);

        // 攻击1 -> 攻击2
        this.CreateTransitionTrigger(attack1, attack2, "attack")
        .setTriggerProtectTime(300);

        // 攻击2 -> 战斗待机
        this.CreateTransitionDelay(attack2, fightidle, 667);

        // 攻击2 -> 攻击3
        this.CreateTransitionTrigger(attack2, attack3, "attack")
        .setTriggerProtectTime(300);

        // 攻击3 -> 战斗待机
        this.CreateTransitionDelay(attack3, fightidle, 1300);

        // 攻击3 -> 攻击1
        this.CreateTransitionTrigger(attack3, attack1, "attack")
        .setTriggerProtectTime(850)
        .setTriggerEndTime(1299);

        // 技能1 -> 战斗待机
        this.CreateTransitionDelay(skill1, fightidle, 1533);
        // 技能2 -> 战斗待机
        this.CreateTransitionDelay(skill2, fightidle, 1833);
        // 技能3 -> 战斗待机
        this.CreateTransitionDelay(skill3, fightidle, 1200);
        // 技能4 -> 战斗待机
        this.CreateTransitionDelay(skill4, fightidle, 1600);

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
        this.CreateTransitionTrigger(idle, attack, "attack");
        // 休闲待机 -> 跑
        this.CreateTransitionTrigger(idle, run, "run");
        // 休闲待机 -> 受击
        this.CreateTransitionTrigger(idle, injure, "injure");
        // 休闲待机 -> 死亡
        this.CreateTransitionTrigger(idle, die, "die");
        // 休闲跑 -> 休闲待机
        this.CreateTransitionTrigger(run, idle, "idle");
        // 攻击 -> 休闲待机
        this.CreateTransitionDelay(attack, idle, timeDic.get("attack"));
        // 攻击 -> 受击
        this.CreateTransitionTrigger(attack, injure, "injure");
        // 受击 -> 休闲待机
        this.CreateTransitionDelay(injure, idle, timeDic.get("injure") / 0.7);
        // 受击 -> 受击
        this.CreateTransitionTrigger(injure, injure, "injure");
        // 受击 -> 死亡
        this.CreateTransitionTrigger(injure, die, "die");

        return sm;
    }

    // 创建触发器转换
    private CreateTransitionTrigger(fromAction: MachineAction, toAction: MachineAction, triggerFlag: string) : TransitionTrigger
    {
        let transition = new TransitionTrigger(fromAction, toAction);
        transition.setTriggerFlag(triggerFlag);
        fromAction.addTransition(transition);
        return transition;
    }

    // 创建延时转换
    private CreateTransitionDelay(fromAction: MachineAction, toAction: MachineAction, delayTime: number) : TransitionDelay
    {
        let transition = new TransitionDelay(fromAction, toAction);
        transition.setDelayTime(delayTime);
        fromAction.addTransition(transition);
        return transition;
    }
}