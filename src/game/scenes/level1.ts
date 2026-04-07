import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
import FpsText from "../objects/fps-text";

export class Level1 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    fpsText: FpsText;
    private player: Phaser.Physics.Arcade.Sprite;
    private crowbar: Phaser.GameObjects.Image;
    private prisoncells: Phaser.Physics.Arcade.StaticGroup;

    private crowstrength = 1;
    private prisoncellHealth = 8;

    constructor() {
        super("Level1");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        this.prisoncells = this.physics.add.staticGroup();
        this.prisoncells.create(400, 300, "prisoncell");
        this.prisoncells.create(450, 300, "prisoncell");
        this.prisoncells.create(500, 300, "prisoncell");

        this.crowbar = this.add.image(
            200,
            600,
            "crowbar",
        ) as Phaser.Physics.Arcade.Image;
        this.player = this.physics.add.sprite(100, 600, "player");
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.prisoncells);
        this.phaserLogo = new PhaserLogo(this, this.cameras.main.width / 2, 0);
        this.fpsText = new FpsText(this);

        EventBus.emit("current-scene-ready", this);
    }

    private hitPrisonCell() {
        this.prisoncellHealth -= this.crowstrength;
        if (this.prisoncellHealth <= 0) {
            this.prisoncells.children.each((cell) => {
                const prisoncell = cell as Phaser.Physics.Arcade.Sprite;
                prisoncell.disableBody(true, true);
                return true;
            });
        }
    }

    update() {
        this.fpsText.update();
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}
