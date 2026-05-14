import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import FpsText from "../objects/fps-text";

export class Level1 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    fpsText: FpsText;
    private dirt: Phaser.Physics.Arcade.StaticGroup;
    private stick: Phaser.Physics.Arcade.Image;
    private rock: Phaser.Physics.Arcade.Image;
    private wall: Phaser.Physics.Arcade.StaticGroup;
    private player: Phaser.Physics.Arcade.Sprite;
    private crowbarhalf1: Phaser.Physics.Arcade.Image;
    private crowbarhalf2: Phaser.Physics.Arcade.Image;
    private prisoncells: Phaser.Physics.Arcade.StaticGroup;
    private crowstrength = 1;
    private prisoncellHealth = 1;
    private torturechamber = false;
    private hashalf1: boolean;
    private hashalf2: boolean;
    private createdbar: boolean;
    private createdshovel: boolean;
    private digging: boolean;
    private acquirerock: boolean;
    private acquirestick: boolean;

    //DESCRIPTION OF PUZZLE FOR LEVEL (logic implemented in Enviroment.ts)
    // Move dirt to hole
    // oh wow! theres a crow and a bar!
    // concatenate crow and bar
    // that produces crowbar
    // crowbar.exe, run file
    // escape

    constructor() {
        super("Level1");
    }

    create() {
        this.camera = this.cameras.main;
        this.cameras.main.setViewport(0, 0, 514, 768);

        this.add.image(400, 400, "dungeon");
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor("#000000");

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        const sound = this.sound.add("battlemusic", { loop: true });
        sound.play();
        this.dirt = this.physics.add.staticGroup();
        const g = this.dirt.create(
            100,
            724,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        g.setScale(2).refreshBody();
        const g1 = this.dirt.create(
            200,
            724,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        g1.setScale(2).refreshBody();
        const g2 = this.dirt.create(
            300,
            724,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        g2.setScale(2).refreshBody();
        this.physics.add.collider(this.dirt, this.player);
        const pg = this.dirt.create(
            400,
            724,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        pg.setScale(2).refreshBody();
        const wpg = this.dirt.create(
            500,
            724,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        wpg.setScale(2).refreshBody();
        const dirt = this.dirt.create(
            50,
            724,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        dirt.setScale(2).refreshBody();
        this.wall = this.physics.add.staticGroup();
        const w = this.wall.create(
            20,
            590,
            "wall",
        ) as Phaser.Physics.Arcade.Sprite;
        w.setScale(2).refreshBody();
        const w1 = this.wall.create(
            20,
            670,
            "wall",
        ) as Phaser.Physics.Arcade.Sprite;
        w1.setScale(2).refreshBody();
        this.physics.add.collider(this.wall, this.player);
        this.prisoncells = this.physics.add.staticGroup();
        this.prisoncells.create(500, 400, "prisoncells");
        this.prisoncells.create(500, 425, "prisoncells");
        this.prisoncells.create(500, 450, "prisoncells");
        this.prisoncells.create(500, 475, "prisoncells");
        this.prisoncells.create(500, 500, "prisoncells");
        this.prisoncells.create(500, 525, "prisoncells");
        this.prisoncells.create(500, 550, "prisoncells");
        this.prisoncells.create(500, 575, "prisoncells");
        this.prisoncells.create(500, 600, "prisoncells");
        this.prisoncells.create(500, 625, "prisoncells");
        this.prisoncells.create(500, 650, "prisoncells");
        this.prisoncells.create(500, 660, "prisoncells");
        this.crowbarhalf1 = this.add.image(
            300,
            580,
            "crow",
        ) as Phaser.Physics.Arcade.Image;
        this.crowbarhalf2 = this.add.image(
            300,
            720,
            "bar",
        ) as Phaser.Physics.Arcade.Image;
        this.player = this.physics.add.sprite(200, 619, "player");

        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.dirt);
        this.physics.add.collider(this.dirt, this.prisoncells);
        this.physics.add.collider(this.player, this.wall);
        this.physics.add.overlap(
            this.player,
            this.dirt,
            this.groundandwallCollisions.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.wall,
            this.groundandwallCollisions.bind(this),
            undefined,
            this,
        );
        this.physics.add.collider(this.player, this.prisoncells);
        this.physics.add.collider(this.player, this.rock);
        this.physics.add.overlap(
            this.player,
            this.rock,
            this.getRock.bind(this),
            undefined,
            this,
        );
        this.physics.add.collider(this.player, this.stick);
        this.physics.add.overlap(
            this.player,
            this.stick,
            this.getStick.bind(this),
            undefined,
            this,
        );
        this.physics.add.collider(this.player, this.dirt);
        this.physics.add.overlap(
            this.player,
            this.dirt,
            this.digDirt.bind(this),
            undefined,
            this,
        );

        this.physics.add.collider(this.stick, this.rock);
        this.physics.add.overlap(
            this.stick,
            this.rock,
            this.createShovel.bind(this),
            undefined,
            this,
        );
        this.physics.add.collider(this.player, this.crowbarhalf1);
        this.physics.add.overlap(
            this.player,
            this.crowbarhalf1,
            this.collectCrowbar1.bind(this),
            undefined,
            this,
        );
        this.physics.add.collider(this.player, this.crowbarhalf2);
        this.physics.add.overlap(
            this.player,
            this.crowbarhalf2,
            this.collectCrowbar2.bind(this),
            undefined,
            this,
        );
        this.physics.add.collider(this.crowbarhalf2, this.prisoncells);
        this.physics.add.overlap(
            this.crowbarhalf1,
            this.crowbarhalf2,
            this.createCrowbar.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.crowbarhalf2,
            this.prisoncells,
            this.handlecrowbarHit.bind(this),
            undefined,
            this,
        );

        this.fpsText = new FpsText(this);

        EventBus.emit("current-scene-ready", this);
    }

    private getRock() {
        if (!this.acquirerock) {
            this.acquirerock = true;
        }
    }

    private getStick() {
        if (!this.acquirestick) {
            this.acquirestick = true;
        }
    }

    private createShovel() {
        if (!this.acquirerock || !this.acquirestick) {
            this.createdshovel = false;
        } else {
            this.createdshovel = true;
        }
    }

    private digDirt() {
        if (!this.createdshovel) {
            this.digging = false;
        } else {
            this.digging = true;
        }
    }
    private hitPrisonCell() {
        if (
            this.physics.overlap(this.player, this.prisoncells) &&
            !this.createdbar
        ) {
            console.log("You need a crowbar to break the prison cell!");
            this.prisoncellHealth = this.prisoncellHealth - 0;
        }
        if (
            this.physics.overlap(this.player, this.prisoncells) &&
            this.createdbar
        ) {
            this.prisoncellHealth -= this.crowstrength;
            if (this.prisoncellHealth == 0) {
                this.prisoncellHealth = 1;
                this.torturechamber = true;
                this.prisoncells.children.each((cell) => {
                    const prisoncell = cell as Phaser.Physics.Arcade.Sprite;
                    prisoncell.disableBody(true, true);
                    return true;
                });
            }
        }
    }

    private collectCrowbar1() {
        if (!this.digging) {
            this.hashalf1 = false;
        } else {
            this.hashalf1 = true;
        }
    }

    private collectCrowbar2() {
        if (!this.digging) {
            this.hashalf2 = false;
        } else {
            this.hashalf2 = true;
        }
    }
    private createCrowbar() {
        if (!this.hashalf1 || !this.hashalf2) {
            this.createdbar = false;
        } else {
            this.createdbar = true;
        }
    }

    private handlecrowbarHit() {
        if (
            this.physics.overlap(this.prisoncells, this.player) &&
            this.createdbar
        ) {
            this.hitPrisonCell();
        }
    }

    private groundandwallCollisions() {
        if (this.physics.overlap(this.player, this.dirt)) {
            this.player.setVelocityY(0);
        }
        if (this.physics.overlap(this.player, this.wall)) {
            this.player.setVelocityX(0);
        }
    }

    update() {
        this.fpsText.update();
    }

    changeScene() {
        if (this.torturechamber) {
            this.scene.start("Level2");
        }
        this.scene.start("GameOver");
    }
}
