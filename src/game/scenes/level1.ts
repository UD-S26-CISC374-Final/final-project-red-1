import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import FpsText from "../objects/fps-text";

export class Level1 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    fpsText: FpsText;
    private ground: Phaser.Physics.Arcade.StaticGroup;
    private wall: Phaser.Physics.Arcade.StaticGroup;
    private player: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private crowbar: Phaser.GameObjects.Image;
    private prisoncells: Phaser.Physics.Arcade.StaticGroup;

    private hasCrowbar = false;
    private crowstrength = 1;
    private prisoncellHealth = 8;
    private torturechamber = false;

    constructor() {
        super("Level1");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor("#000000");

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        this.ground = this.physics.add.staticGroup();
        const g = this.ground.create(
            512,
            768,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        g.setScale(2).refreshBody();
        this.physics.add.collider(this.ground, this.player);

        this.wall = this.physics.add.staticGroup();
        const w = this.wall.create(
            0,
            384,
            "wall",
        ) as Phaser.Physics.Arcade.Sprite;
        w.setScale(2).refreshBody();
        this.physics.add.collider(this.wall, this.player);
        this.cursors = this.input.keyboard?.createCursorKeys();
        this.prisoncells = this.physics.add.staticGroup();
        this.prisoncells.create(400, 300, "prisoncells");
        this.prisoncells.create(450, 300, "prisoncells");
        this.prisoncells.create(500, 300, "prisoncells");

        this.crowbar = this.add.image(
            200,
            700,
            "crowbar",
        ) as Phaser.Physics.Arcade.Image;
        this.player = this.physics.add.sprite(100, 700, "player");

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 10,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.player.setCollideWorldBounds(true);
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

    update() {
        if (!this.cursors) {
            return;
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("left", true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("right", true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play("turn");
        }

        if (this.cursors.up.isDown && this.player.body?.touching.down) {
            this.player.setVelocityY(-330);
        }
        this.fpsText.update();
    }

    changeScene() {
        if (this.torturechamber) {
            this.scene.start("Level2");
        }
        this.scene.start("GameOver");
    }
}
