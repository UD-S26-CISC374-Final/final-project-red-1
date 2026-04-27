import { EventBus } from "../event-bus";
import { Scene } from "phaser";

export class Win extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;

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

    changeScene() {
        this.scene.start("MainMenu");
    }
}
