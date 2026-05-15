import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";

export class Level5 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    private player: Phaser.Physics.Arcade.Sprite;
    private throne: Phaser.Physics.Arcade.Group;
    private motionsensor: Phaser.Physics.Arcade.Group;
    private picture: Phaser.Physics.Arcade.Image;
    private elevator: Phaser.Physics.Arcade.Group;

    private thronebroken: boolean = false;
    private grabPainting: boolean = false;
    private msActivated: boolean = false;
    private elevatorActivated: boolean = false;
    private fakeWin: boolean = false;

    constructor() {
        super("Level5");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor("#202020");

        this.cameras.main.setViewport(0, 0, 512, 768);
        this.cameras.main.setBounds(0, 0, 512, 768);

        this.add.image(400, 400, "throne");

        this.player = this.physics.add.sprite(100, 700, "player");
        this.player.setCollideWorldBounds(true);
        this.throne = this.physics.add.group({ allowGravity: false });
        this.throne.create(400, 600, "throne");
        this.motionsensor = this.physics.add.group({ allowGravity: false });
        this.motionsensor.create(400, 700, "motionsensor");
        this.picture = this.physics.add.image(50, 600, "picture");
        this.elevator = this.physics.add.group({ allowGravity: false });
        this.elevator.create(600, 700, "elevator");
        this.physics.add.collider(this.player, this.throne);
        this.physics.add.collider(this.player, this.motionsensor);
        this.physics.add.collider(this.player, this.elevator);
        this.physics.add.collider(this.player, this.picture);
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
            this.picture,
            this.ripPainting.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.elevator,
            this.openElevator.bind(this),
            undefined,
            this,
        );
        const sound = this.sound.add("throne", { loop: false });
        sound.play();
        EventBus.emit("current-scene-ready", this);
    }

    private breakThrone() {
        if (!this.grabPainting) {
            this.thronebroken = false;
        }
        if (
            this.grabPainting &&
            this.physics.overlap(this.player, this.throne) &&
            !this.thronebroken
        ) {
            this.thronebroken = true;
        } else {
            this.thronebroken = false;
        }
    }

    private ripPainting() {
        if (!this.grabPainting) {
            this.grabPainting = true;
        }
    }
    private activateMS() {
        if (!this.msActivated) {
            this.msActivated = true;
        }
    }

    private openElevator() {
        if (!this.msActivated) {
            this.elevatorActivated = false;
        }
        if (this.msActivated && this.thronebroken) {
            this.elevatorActivated = true;
        } else {
            this.elevatorActivated = false;
        }
        if (this.elevatorActivated) {
            this.fakeWin = true;
        }
    }

    changeScene() {
        if (this.fakeWin) {
            this.scene.start("Win");
        }
    }
}
