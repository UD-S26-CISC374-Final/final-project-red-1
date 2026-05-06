import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
import FpsText from "../objects/fps-text";

export class Level5 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    fpsText: FpsText;
    private player: Phaser.Physics.Arcade.Sprite;
    private throne: Phaser.Physics.Arcade.Image;
    private hammer: Phaser.Physics.Arcade.Image;
    private motionsensor: Phaser.Physics.Arcade.Image;
    private door: Phaser.Physics.Arcade.Image;

    private hasHammer: boolean;
    private thronebroken: boolean;
    private msActivated: boolean;
    private doorOpened: boolean;
    private fakeWin: boolean;

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor("#202020");

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        this.player = this.physics.add.sprite(100, 700, "player");
        this.player.setCollideWorldBounds(true);
        this.throne = this.physics.add.image(400, 600, "throne");
        this.hammer = this.physics.add.image(200, 700, "hammer");
        this.motionsensor = this.physics.add.image(400, 700, "motionsensor");
        this.door = this.physics.add.image(600, 700, "door");
        this.physics.add.collider(this.player, this.throne);
        this.physics.add.collider(this.player, this.hammer);
        this.physics.add.collider(this.player, this.motionsensor);
        this.physics.add.collider(this.player, this.door);
        this.physics.add.overlap(
            this.player,
            this.hammer,
            this.acquireHammer.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.throne,
            this.breakThrone.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.motionsensor,
            this.activateMS.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.door,
            this.openDoor.bind(this),
            undefined,
            this,
        );
        const sound = this.sound.add("throne", { loop: true });
        sound.play();
        EventBus.emit("current-scene-ready", this);
    }

    private acquireHammer() {
        if (!this.physics.overlap(this.player, this.hammer)) {
            this.hasHammer = false;
        } else if (
            this.physics.overlap(this.player, this.hammer) &&
            !this.hasHammer
        ) {
            this.hasHammer = true;
        } else {
            this.hasHammer = false;
        }
    }

    private breakThrone() {
        if (!this.hasHammer) {
            this.thronebroken = false;
        }
        if (
            this.hasHammer &&
            this.physics.overlap(this.player, this.throne) &&
            !this.thronebroken
        ) {
            this.thronebroken = true;
        } else {
            this.thronebroken = false;
        }
    }

    private activateMS() {
        if (!this.thronebroken) {
            this.msActivated = false;
        }
        if (
            this.thronebroken &&
            this.physics.overlap(this.player, this.motionsensor)
        ) {
            this.msActivated = true;
        } else {
            this.msActivated = false;
        }
    }

    private openDoor() {
        if (!this.msActivated) {
            this.doorOpened = false;
        }
        if (this.msActivated && this.physics.overlap(this.player, this.door)) {
            this.doorOpened = true;
        } else {
            this.doorOpened = false;
        }
        if (this.doorOpened) {
            this.fakeWin = true;
        }
    }

    update() {
        this.fpsText.update();
    }

    changeScene() {
        if (this.fakeWin) {
            this.scene.start("Win");
        }
    }
}
