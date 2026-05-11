import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
import FpsText from "../objects/fps-text";

export class Level4 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    fpsText: FpsText;
    private player: Phaser.Physics.Arcade.Sprite;
    private bucket: Phaser.GameObjects.Image;
    private cobwebs: Phaser.Physics.Arcade.Group;
    private rake: Phaser.GameObjects.Image;
    private boxes: Phaser.GameObjects.Image;
    private wrench: Phaser.GameObjects.Image;
    private vent: Phaser.GameObjects.Image;
    private stick: Phaser.GameObjects.Image;
    private rock: Phaser.GameObjects.Image;
    private garage: Phaser.GameObjects.Image;

    private hasRake: boolean;
    private hasBucket: boolean;
    private waterbucket: boolean;
    private cobwebsRemoved: boolean;
    private boxeslifted: boolean;
    private wrenchCollected: boolean;
    private openedVent: boolean;
    private hasStick: boolean;
    private hasRock: boolean;
    private createdHammer: boolean;
    private throneroom: boolean;

    constructor() {
        super("Level4");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor("");

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha();

        const sound = this.sound.add("old", { loop: true });
        sound.play();

        this.player = this.physics.add.sprite(100, 700, "player");
        this.player.setCollideWorldBounds(true);
        this.bucket = this.add.image(500, 700, "bucket");
        this.cobwebs = this.physics.add.group();
        this.cobwebs.create(700, 700, "cobwebs");
        this.cobwebs.create(700, 670, "cobwebs");
        this.cobwebs.create(670, 700, "cobwebs");
        this.rake = this.add.image(450, 700, "rake");
        this.boxes = this.add.image(600, 700, "boxes");
        this.physics.add.collider(this.player, this.boxes);
        this.physics.add.collider(this.player, this.bucket);
        this.physics.add.collider(this.player, this.wrench);
        this.physics.add.overlap(
            this.player,
            this.cobwebs,
            this.removingCobwebs.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.rake,
            this.obtainingRake.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.bucket,
            this.acquireBucket.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.boxes,
            this.pushingBoxes.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.wrench,
            this.acquireWrench.bind(this),
            undefined,
            this,
        );
        EventBus.emit("current-scene-ready", this);
    }

    private acquireBucket() {
        if (!this.hasBucket) {
            this.waterbucket = false;
        } else {
            this.waterbucket = true;
        }
    }

    private removingCobwebs() {
        if (!this.waterbucket) {
            this.cobwebsRemoved = false;
        }
        if (
            this.waterbucket &&
            !this.physics.overlap(this.player, this.cobwebs)
        ) {
            this.cobwebsRemoved = false;
        } else if (
            this.waterbucket &&
            this.physics.overlap(this.player, this.cobwebs)
        ) {
            this.cobwebsRemoved = true;
        }
    }

    private obtainingRake() {
        if (!this.cobwebsRemoved) {
            this.hasRake = false;
        }
        if (this.physics.overlap(this.player, this.rake) && !this.hasRake) {
            this.hasRake = true;
        } else {
            this.hasRake = false;
        }
    }

    private pushingBoxes() {
        if (!this.hasRake) {
            this.boxeslifted = false;
        }
        if (this.hasRake && this.physics.overlap(this.player, this.boxes)) {
            this.boxeslifted = true;
        } else {
            this.boxeslifted = false;
        }
    }

    private acquireWrench() {
        if (!this.boxeslifted) {
            this.wrenchCollected = false;
        }
        if (!this.wrenchCollected && this.boxeslifted) {
            this.wrenchCollected = true;
        }
    }

    private openVent() {
        if (!this.wrenchCollected) {
            this.openedVent = false;
        }
        if (!this.openedVent && this.wrenchCollected) {
            this.openedVent = true;
        }
    }

    private collectStick() {
        if (!this.openedVent) {
            this.hasStick = false;
        }
        if (this.openedVent && !this.hasStick) {
            this.hasStick = true;
        }
    }

    private collectRock() {
        if (!this.openedVent) {
            this.hasRock = false;
        }
        if (this.openedVent && !this.hasRock) {
            this.hasRock = true;
        }
    }

    private constructHammer() {
        if (!this.hasStick || !this.hasRock) {
            this.createdHammer = false;
        } else {
            this.createdHammer = true;
        }
    }

    private accessGarage() {}

    update() {
        this.fpsText.update();
    }

    changeScene() {
        if (this.throneroom) {
            this.scene.start("Level5");
        }
    }
}
