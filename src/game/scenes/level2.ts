import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
import FpsText from "../objects/fps-text";

export class Level2 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    fpsText: FpsText;
    private ground: Phaser.Physics.Arcade.StaticGroup;
    private player: Phaser.Physics.Arcade.Sprite;
    private chain: Phaser.GameObjects.Image;
    private gloves: Phaser.Physics.Arcade.StaticGroup;
    private guillotine: Phaser.Physics.Arcade.StaticGroup;
    private lever: Phaser.GameObjects.Image;

    private hasChain = false;
    private hasgloves = false;
    private leverpulled = false;
    private guillotineactive = false;
    private alchemylab = false;

    constructor() {
        super("Level2");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor("#808080");

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

        this.chain = this.add.image(
            100,
            700,
            "chain",
        ) as Phaser.Physics.Arcade.Image;
        this.gloves = this.physics.add.staticGroup();
        this.gloves.create(400, 600, "gloves");
        this.guillotine = this.physics.add.staticGroup();
        this.guillotine.create(800, 600, "guillotine");
        this.lever = this.add.image(
            200,
            600,
            "lever",
        ) as Phaser.Physics.Arcade.Image;
        this.player = this.physics.add.sprite(100, 700, "player");
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.gloves);
        this.physics.add.collider(this.player, this.chain);
        this.physics.add.collider(this.player, this.lever);

        this.physics.add.overlap(
            this.player,
            this.gloves,
            this.handleGloveCollect.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.chain,
            this.handleChainCollect.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.lever,
            this.handleLeverPull.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.guillotine,
            this.guillotineWorking.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.chain,
            this.guillotine,
            this.guillotineWorking.bind(this),
            undefined,
            this,
        );

        EventBus.emit("current-scene-ready", this);
    }

    private handleGloveCollect() {
        if (this.physics.overlap(this.player, this.gloves) && !this.hasgloves) {
            this.hasgloves = true;
        }
    }

    private handleChainCollect() {
        if (this.physics.overlap(this.player, this.chain) && !this.hasgloves) {
            console.log("You need gloves to pick up the chain!");
        }
        if (this.physics.overlap(this.player, this.chain) && this.hasgloves) {
            this.hasChain = true;
        }
    }

    private handleLeverPull() {
        if (this.physics.overlap(this.player, this.lever) && !this.hasChain) {
            console.log("You need the chain to pull the lever!");
        }
        if (this.physics.overlap(this.player, this.lever) && this.hasChain) {
            this.leverpulled = true;
            this.guillotineactive = true;
            this.guillotine.children.each((guill) => {
                const guillotine = guill as Phaser.Physics.Arcade.Sprite;
                guillotine.setVelocityY(200);
                return true;
            });
        }
    }

    private guillotineWorking() {
        if (
            this.physics.overlap(this.player, this.guillotine) &&
            this.guillotineactive
        ) {
            console.log(
                "You would've been beheaded by the guillotine! Luckily, there's a check to prevent that due to the nature of this being educational software. You cannot die, but you still have to complete the level",
            );
        }
        if (
            this.physics.overlap(this.chain, this.guillotine) &&
            this.guillotineactive &&
            this.leverpulled
        ) {
            this.guillotineactive = false;
        }
        if (
            this.physics.overlap(this.player, this.guillotine) &&
            !this.guillotineactive &&
            this.hasgloves &&
            this.hasChain
        ) {
            this.alchemylab = true;
            this.time.addEvent({
                delay: 2000,
                callback: () => this.scene.start("Level3"),
            });
        }
    }

    update() {
        this.fpsText.update();
    }

    changeScene() {
        if (this.alchemylab) {
            this.scene.start("Level3");
        }
    }
}
