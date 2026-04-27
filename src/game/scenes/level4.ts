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
    private boxes: Phaser.GameObjects.Image;
    private buttons: Phaser.GameObjects.Image;
    private inventory: Phaser.GameObjects.Components.Depth;

    constructor() {
        super("Level4");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor("");

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha();

        this.player = this.physics.add.sprite(100, 700, "player");
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.boxes);
        this.physics.add.collider(this.player, this.bucket);
    }
}
