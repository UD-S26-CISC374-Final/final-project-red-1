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
    private water: Phaser.Physics.Arcade.Group;
    private bucket: Phaser.GameObjects.Image;
    private cobwebs: Phaser.Physics.Arcade.Group;
    private rake: Phaser.GameObjects.Image;
    private boxes: Phaser.GameObjects.Image;
    private buttons: Phaser.GameObjects.Image;

    private hasRake: boolean;
    private hasWater: boolean;
    private hasBucket: boolean;
    private waterbucket: boolean;
    private cobwebsRemoved: boolean;
    private boxeslifted: boolean;
    private buttonpressed: boolean;
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
        this.water = this.physics.add.group();
        this.water.create(300, 700, "water");
        this.bucket = this.add.image(500, 700, "bucket");
        this.cobwebs = this.physics.add.group();
        this.cobwebs.create(700, 700, "cobwebs");
        this.cobwebs.create(700, 670, "cobwebs");
        this.cobwebs.create(670, 700, "cobwebs");
        this.rake = this.add.image(450, 700, "rake");
        this.boxes = this.add.image(600, 700, "boxes");
        this.buttons = this.add.image(800, 700, "buttons");
        this.physics.add.collider(this.player, this.boxes);
        this.physics.add.collider(this.player, this.bucket);
        this.physics.add.collider(this.player, this.buttons);

        EventBus.emit("current-scene-ready", this);
    }

    private bucketandwatercombination() {
        if (!this.hasWater || !this.hasBucket) {
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

    private pressButton() {
        if (!this.boxeslifted) {
            this.buttonpressed = false;
        }
        if (
            this.boxeslifted &&
            this.physics.overlap(this.player, this.buttons)
        ) {
            this.buttonpressed = true;
        }
        if (this.buttonpressed) {
            this.throneroom = true;
        }
    }

    update() {
        this.fpsText.update();
    }

    changeScene() {
        if (this.throneroom) {
            this.scene.start("Level5");
        }
    }
}
