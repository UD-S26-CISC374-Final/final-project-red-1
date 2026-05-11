import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import FpsText from "../objects/fps-text";

export class Level2 extends Scene {
    camera!: Phaser.Cameras.Scene2D.Camera;
    background!: Phaser.GameObjects.Image;
    fpsText!: FpsText;

    private ground!: Phaser.Physics.Arcade.StaticGroup;
    private player!: Phaser.Physics.Arcade.Sprite;

    private chain!: Phaser.Physics.Arcade.Image;
    private lever!: Phaser.Physics.Arcade.Image;

    private gloves!: Phaser.Physics.Arcade.StaticGroup;
    private guillotine!: Phaser.Physics.Arcade.Group;

    private metal!: Phaser.Physics.Arcade.Group;
    private boxes!: Phaser.Physics.Arcade.StaticGroup;

    private cabinet!: Phaser.Physics.Arcade.Image;
    private button!: Phaser.Physics.Arcade.Image;
    private slide!: Phaser.Physics.Arcade.Image;

    private hasChain = false;
    private hasGloves = false;
    private leverPulled = false;
    private guillotineActive = false;
    private alchemyLab = false;
    private transitioning = false;

    constructor() {
        super("Level2");
    }

    create() {
        // CAMERA
        this.cameras.main.setViewport(0, 0, 514, 768);
        this.cameras.main.setBackgroundColor("#808080");

        // BACKGROUND
        this.add.image(400, 400, "torture");
        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        // PLAYER (IMPORTANT: FIRST PHYSICS OBJECT)
        this.player = this.physics.add.sprite(100, 700, "player");
        this.player.setCollideWorldBounds(true);

        // AUDIO
        this.sound.add("cyberpunk", { loop: true }).play();

        // GROUND
        this.ground = this.physics.add.staticGroup();
        const g = this.ground.create(
            512,
            768,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        g.setScale(2).refreshBody();

        this.physics.add.collider(this.player, this.ground);

        // OBJECTS (FIXED: immovable for stability)
        this.chain = this.physics.add.image(100, 700, "chain");
        this.chain.setImmovable(true);

        this.lever = this.physics.add.image(200, 600, "lever");
        this.lever.setImmovable(true);

        this.gloves = this.physics.add.staticGroup();
        this.gloves.create(400, 600, "gloves");

        this.guillotine = this.physics.add.group({ allowGravity: false });
        this.guillotine.create(800, 600, "guillotine");

        // COLLIDERS
        this.physics.add.collider(this.player, this.chain);
        this.physics.add.collider(this.player, this.lever);
        this.physics.add.collider(this.player, this.gloves);
        this.physics.add.collider(this.guillotine, this.ground);

        // OVERLAPS
        this.physics.add.overlap(
            this.player,
            this.gloves,
            this.handleGloveCollect,
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.chain,
            this.handleChainCollect,
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.lever,
            this.handleLeverPull,
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.guillotine,
            this.guillotineWorking,
            undefined,
            this,
        );

        this.fpsText = new FpsText(this);
        EventBus.emit("current-scene-ready", this);
    }

    private handleGloveCollect = () => {
        if (!this.hasGloves) {
            this.hasGloves = true;
        }
    };

    private handleChainCollect = () => {
        if (this.hasGloves) {
            this.hasChain = true;
        }
    };

    private handleLeverPull = () => {
        if (this.hasChain) {
            this.leverPulled = true;
            this.guillotineActive = true;

            this.guillotine.children.each((g) => {
                (g as Phaser.Physics.Arcade.Sprite).setVelocityY(200);
                return true;
            });
        }
    };

    private guillotineWorking = () => {
        if (this.guillotineActive) {
            console.log("Avoided guillotine!");
            return;
        }

        if (
            this.hasGloves &&
            this.hasChain &&
            !this.transitioning &&
            this.leverPulled
        ) {
            this.transitioning = true;

            this.time.delayedCall(500, () => {
                this.scene.start("Level3");
            });
        }
    };

    update() {
        this.fpsText.update();
    }

    changeScene() {
        if (this.alchemyLab) {
            this.scene.start("Level3");
        }
    }
}
