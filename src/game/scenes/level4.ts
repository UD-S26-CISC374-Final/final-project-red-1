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
    private bucket: Phaser.Physics.Arcade.Image;
    private cobwebs: Phaser.Physics.Arcade.Group;
    private rake: Phaser.Physics.Arcade.Image;
    private boxes: Phaser.Physics.Arcade.Image;
    private wrench: Phaser.Physics.Arcade.Image;
    private vent: Phaser.Physics.Arcade.Image;
    private stick: Phaser.Physics.Arcade.Image;
    private rock: Phaser.Physics.Arcade.Image;
    private door: Phaser.Physics.Arcade.Image;
    private garage: Phaser.Physics.Arcade.Image;

    private hasRake: boolean = false;
    private hasBucket: boolean = false;
    private waterbucket: boolean = false;
    private cobwebsRemoved: boolean = false;
    private boxeslifted: boolean = false;
    private wrenchCollected: boolean = false;
    private openedVent: boolean = false;
    private hasStick: boolean = false;
    private hasRock: boolean = false;
    private createdHammer: boolean = false;
    private knockDoor: boolean = false;
    private accessgarage: boolean = false;
    private throneroom: boolean = false;

    constructor() {
        super("Level4");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor("#000000");

        this.cameras.main.setViewport(0, 0, 512, 768);
        this.cameras.main.setBounds(0, 0, 512, 768);
        this.physics.world.setBounds(0, 0, 512, 768);

        this.wrench = this.physics.add.image(300, 600, "hammer");
        this.vent = this.physics.add.image(400, 500, "wall");
        this.stick = this.physics.add.image(500, 500, "rake");
        this.rock = this.physics.add.image(550, 500, "chain");
        this.door = this.physics.add.image(700, 600, "door");
        this.garage = this.physics.add.image(850, 600, "door");

        this.wrench.setImmovable(true);
        this.vent.setImmovable(true);
        this.stick.setImmovable(true);
        this.rock.setImmovable(true);
        this.door.setImmovable(true);
        this.garage.setImmovable(true);

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(1);

        const sound = this.sound.add("old", { loop: true });
        sound.play();

        this.player = this.physics.add.sprite(100, 700, "player");
        this.player.setCollideWorldBounds(true);
        this.bucket = this.physics.add.image(500, 700, "bucket");
        this.cobwebs = this.physics.add.group();
        this.cobwebs.create(700, 700, "cobwebs");
        this.cobwebs.create(700, 670, "cobwebs");
        this.cobwebs.create(670, 700, "cobwebs");
        this.rake = this.physics.add.image(450, 700, "rake");
        this.boxes = this.physics.add.image(600, 700, "boxes");
        this.rake.setImmovable(true);
        this.boxes.setImmovable(true);
        this.physics.add.collider(this.player, this.boxes);
        this.physics.add.collider(this.player, this.bucket);
        this.physics.add.collider(this.player, this.wrench);
        this.physics.add.collider(this.player, this.vent);
        this.physics.add.collider(this.player, this.stick);
        this.physics.add.collider(this.player, this.rock);
        this.physics.add.collider(this.rock, this.stick);
        this.physics.add.collider(this.player, this.door);
        this.physics.add.collider(this.player, this.garage);
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
        this.physics.add.overlap(
            this.player,
            this.vent,
            this.openVent.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.rock,
            this.collectRock.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.stick,
            this.collectStick.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.rock,
            this.stick,
            this.constructHammer.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.door,
            this.breakDoor.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.garage,
            this.accessGarage.bind(this),
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

    private breakDoor() {
        if (!this.createdHammer) {
            this.knockDoor = false;
        }
        if (this.createdHammer && !this.knockDoor) {
            this.knockDoor = true;
        }
    }
    private accessGarage() {
        if (!this.knockDoor) {
            this.accessgarage = false;
        }
        if (this.knockDoor && !this.accessgarage) {
            this.accessgarage = true;
        } else {
            this.accessgarage = false;
        }
        if (this.accessgarage) {
            this.throneroom = true;
        }
    }

    changeScene() {
        if (this.throneroom) {
            this.scene.start("Level5");
        }
    }
}
