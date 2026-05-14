import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import FpsText from "../objects/fps-text";

export class Level2 extends Scene {
    camera!: Phaser.Cameras.Scene2D.Camera;
    background!: Phaser.GameObjects.Image;
    fpsText!: FpsText;

    private ground!: Phaser.Physics.Arcade.StaticGroup;
    private player!: Phaser.Physics.Arcade.Sprite;

    private chain!: Phaser.Physics.Arcade.Group;
    private lever!: Phaser.Physics.Arcade.Group;

    private gloves!: Phaser.Physics.Arcade.StaticGroup;
    private guillotine!: Phaser.Physics.Arcade.Group;

    private metal!: Phaser.Physics.Arcade.Group;
    private boxes!: Phaser.Physics.Arcade.Group;

    private cabinet!: Phaser.Physics.Arcade.Group;
    private button!: Phaser.Physics.Arcade.Group;
    private slide!: Phaser.Physics.Arcade.Group;

    private hasChain = false;
    private hasGloves = false;
    private leverPulled = false;
    private guillotineActive = false;
    private alchemyLab = false;
    private transitioning = false;
    private metalchopped: boolean = false;
    private openCabinet: boolean = false;
    private hasMetal: boolean = false;
    private brokeBoxes: boolean = false;
    private pressedButton: boolean = false;
    private accessSlide: boolean = false;

    constructor() {
        super("Level2");
    }

    create() {
        this.button = this.physics.add.group({ allowGravity: false });
        this.button.create(300, 500, "buttons");

        this.cabinet = this.physics.add.group({ allowGravity: false });
        this.cabinet.create(600, 500, "boxes");

        this.slide = this.physics.add.group({ allowGravity: false });
        this.slide.create(700, 400, "door");

        this.metal = this.physics.add.group({ allowGravity: false });
        this.metal.create(350, 500, "chain");
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
        this.chain = this.physics.add.group({ allowGravity: false });
        this.chain.create(100, 700, "chain");

        this.lever = this.physics.add.group({ allowGravity: false });
        this.lever.create(200, 600, "lever");

        this.gloves = this.physics.add.staticGroup();
        this.gloves.create(400, 600, "gloves");

        this.guillotine = this.physics.add.group({ allowGravity: false });
        this.guillotine.create(800, 600, "guillotine");

        this.boxes = this.physics.add.group({ allowGravity: false });
        this.boxes.create(500, 700, "boxes");
        this.boxes.create(500, 650, "boxes");
        this.boxes.create(500, 600, "boxes");

        // COLLIDERS
        this.physics.add.collider(this.player, this.chain);
        this.physics.add.collider(this.player, this.lever);
        this.physics.add.collider(this.player, this.gloves);
        this.physics.add.collider(this.guillotine, this.ground);
        this.physics.add.collider(this.player, this.button);
        this.physics.add.collider(this.guillotine, this.metal);
        this.physics.add.collider(this.player, this.cabinet);
        this.physics.add.collider(this.player, this.metal);
        this.physics.add.collider(this.player, this.boxes);
        this.physics.add.collider(this.player, this.slide);

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
        this.physics.add.overlap(
            this.metal,
            this.guillotine,
            this.metalChopped.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.cabinet,
            this.cabinetOpened.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.metal,
            this.collectMetal.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.boxes,
            this.destroyBoxes.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.button,
            this.pressButton.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.slide,
            this.Slide.bind(this),
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
        if (
            this.guillotineActive &&
            this.physics.overlap(this.player, this.guillotine)
        ) {
            this.scene.start("Level2");
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

    private cabinetOpened() {
        if (!this.openCabinet) {
            this.openCabinet = true;
        }
    }

    private collectMetal() {
        if (!this.openCabinet) {
            this.hasMetal = false;
        }
        if (this.openCabinet && !this.hasMetal) {
            this.hasMetal = true;
        }
    }

    private metalChopped() {
        if (!this.guillotineActive || !this.hasMetal) {
            this.metalchopped = false;
        } else {
            this.metalchopped = true;
        }
    }

    private destroyBoxes() {
        if (!this.metalchopped) {
            this.brokeBoxes = false;
        }
        if (this.metalchopped && !this.brokeBoxes) {
            this.brokeBoxes = true;
        }
    }

    private pressButton() {
        if (!this.brokeBoxes) {
            this.pressedButton = false;
        }
        if (this.brokeBoxes && !this.pressedButton) {
            this.pressedButton = true;
        }
    }

    private Slide() {
        if (!this.pressedButton) {
            this.accessSlide = false;
        }
        if (this.pressedButton && !this.accessSlide) {
            this.accessSlide = true;
        } else {
            this.accessSlide = false;
        }
        if (this.accessSlide) {
            this.alchemyLab = true;
        }
    }
    update() {
        this.fpsText.update();
    }

    changeScene() {
        if (this.alchemyLab) {
            this.scene.start("Level3");
        }
    }
}
