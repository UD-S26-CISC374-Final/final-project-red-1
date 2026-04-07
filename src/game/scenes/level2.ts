/*import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
import FpsText from "../objects/fps-text";

export class Level2 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    fpsText: FpsText;
    private player: Phaser.Physics.Arcade.Sprite;
    private rustedchain: Phaser.GameObjects.Image;
    private gloves: Phaser.GameObjects.Image;
    private guillotine: Phaser.GameObjects.Image;
    private lever: Phaser.GameObjects.Image;
    private inventory: Phaser.GameObjects.Components.Depth;

    constructor() {
        super("Level2");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);
        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        this.phaserLogo = new PhaserLogo(this, this.cameras.main.width / 2, 0);
        this.fpsText = new FpsText(this);

        EventBus.emit("current-scene-ready", this);
    }
}*/