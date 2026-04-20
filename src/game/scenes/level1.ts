import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import { File } from "../../classes/File";
import { Folder } from "../../classes/Folder";
//import { Navigator } from "../../classes/Navigator";
//import { splitCommandPrompt } from "../../classes/Enviroment";
import FpsText from "../objects/fps-text";

export class Level1 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    fpsText: FpsText;
    command: string;
    private ground: Phaser.Physics.Arcade.StaticGroup;
    private wall: Phaser.Physics.Arcade.StaticGroup;
    private player: Phaser.Physics.Arcade.Sprite;
    private crowbar: Phaser.Physics.Arcade.Image;
    private prisoncells: Phaser.Physics.Arcade.StaticGroup;

    private hasCrowbar = false;
    private crowstrength = 1;
    private prisoncellHealth = 8;
    private torturechamber = false;
    private inventory: Phaser.GameObjects.Components.Depth;

    constructor() {
        super("Level1");
    }

    create() {
        this.camera = this.cameras.main;

        this.cameras.main.setViewport(0, 0, 700, 768);

        this.add.image(400, 300, "dungeon");
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor("#000000");

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        const Level1 = new Folder("Level1", null);
        //const level1Command = splitCommandPrompt(this.command);
        new File("ground", Level1, false, "This is ground");
        new File("wall", Level1, false, "This is a wall");
        new File("crowbar", Level1, false, "This is a crowbar");
        new File("prisoncells", Level1, false, "These are prisoncells");
        this.ground = this.physics.add.staticGroup();
        const g = this.ground.create(
            512,
            724,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        g.setScale(2).refreshBody();
        const g1 = this.ground.create(
            388,
            724,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        g1.setScale(2).refreshBody();
        const g2 = this.ground.create(
            636,
            724,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        g2.setScale(2).refreshBody();
        this.physics.add.collider(this.ground, this.player);
        const pg = this.ground.create(
            264,
            724,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        pg.setScale(2).refreshBody();
        const wpg = this.ground.create(
            140,
            724,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        wpg.setScale(2).refreshBody();
        this.wall = this.physics.add.staticGroup();
        const w = this.wall.create(
            100,
            484,
            "wall",
        ) as Phaser.Physics.Arcade.Sprite;
        w.setScale(2).refreshBody();
        this.physics.add.collider(this.wall, this.player);
        this.prisoncells = this.physics.add.staticGroup();
        this.prisoncells.create(500, 500, "prisoncells");
        this.prisoncells.create(550, 500, "prisoncells");
        this.prisoncells.create(600, 500, "prisoncells");

        this.crowbar = this.add.image(
            300,
            675,
            "crowbar",
        ) as Phaser.Physics.Arcade.Image;
        this.player = this.physics.add.sprite(200, 500, "player");

        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.wall);
        this.physics.add.overlap(
            this.player,
            this.ground,
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
        this.physics.add.collider(this.crowbar, this.prisoncells);
        this.physics.add.overlap(
            this.player,
            this.crowbar,
            this.collectCrowbar.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.crowbar,
            this.prisoncells,
            this.handlecrowbarHit.bind(this),
            undefined,
            this,
        );
        this.fpsText = new FpsText(this);

        EventBus.emit("current-scene-ready", this);
    }

    private hitPrisonCell() {
        if (
            this.physics.overlap(this.player, this.prisoncells) &&
            !this.hasCrowbar
        ) {
            console.log("You need a crowbar to break the prison cell!");
            this.prisoncellHealth = this.prisoncellHealth - 0;
        }
        if (
            this.physics.overlap(this.player, this.prisoncells) &&
            this.hasCrowbar
        ) {
            this.prisoncellHealth -= this.crowstrength;
            if (this.prisoncellHealth == 0) {
                this.prisoncellHealth = 8;
                this.torturechamber = true;
                this.prisoncells.children.each((cell) => {
                    const prisoncell = cell as Phaser.Physics.Arcade.Sprite;
                    prisoncell.disableBody(true, true);
                    return true;
                });
            }
        }
    }

    /*private overlaps() {
        if ()
    }*/
    private collectCrowbar() {
        if (this.physics.overlap(this.player, this.crowbar)) {
            this.hasCrowbar = true;
        }
    }

    private handlecrowbarHit() {
        if (
            this.physics.overlap(this.prisoncells, this.player) &&
            this.hasCrowbar
        ) {
            this.hitPrisonCell();
        }
    }

    private groundandwallCollisions() {
        if (this.physics.overlap(this.player, this.ground)) {
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
