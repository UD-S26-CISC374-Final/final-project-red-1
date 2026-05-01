import { EventBus } from "../event-bus";
import { Scene } from "phaser";

export class Win extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;

    private player: Phaser.Physics.Arcade.Sprite;
    private ground: Phaser.Physics.Arcade.StaticGroup;
    private fountain: Phaser.Physics.Arcade.Image;
    private paintings: Phaser.Physics.Arcade.Group;

    constructor() {
        super("Win");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor();

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha();

        EventBus.emit("current-scene-ready", this);
    }

    update() {}
    changeScene() {
        this.time.addEvent({
            delay: 15000,
            callback: () => this.scene.start("MainMenu"),
        });
    }
}
