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

    private hasCrowbar = false;
    private crowstrength = 1;
    private prisoncellHealth = 8;
    private torturechamber = false;

    constructor() {
        super("Level1");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor("#000000");

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        this.prisoncells = this.physics.add.staticGroup();
        this.prisoncells.create(400, 300, "prisoncells");
        this.prisoncells.create(450, 300, "prisoncells");
        this.prisoncells.create(500, 300, "prisoncells");

        this.crowbar = this.add.image(
            200,
            600,
            "crowbar",
        ) as Phaser.Physics.Arcade.Image;
        this.player = this.physics.add.sprite(100, 600, "player");
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.prisoncells);
        this.physics.add.collider(this.crowbar, this.prisoncells);
        this.physics.add.overlap(
            this.player,
            this.crowbar,
            this.collectCrowbar.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.crowbar,
            this.prisoncells,
            this.handlecrowbarHit.bind(this),
            undefined,
            this,
        );
        this.phaserLogo = new PhaserLogo(this, this.cameras.main.width / 2, 0);
        this.fpsText = new FpsText(this);

        EventBus.emit("current-scene-ready", this);
    }

    private hitPrisonCell() {
        this.prisoncellHealth -= this.crowstrength;
        if (this.prisoncellHealth == 0) {
            this.prisoncellHealth = 8;
            this.torturechamber = true;
            this.prisoncells.children.each((cell) => {
                const prisoncell = cell as Phaser.Physics.Arcade.Sprite;
                prisoncell.disableBody(true, true);
                return true;
            });
        }
    }

    private collectCrowbar() {
        if (this.physics.overlap(this.player, this.crowbar)) {
            this.hasCrowbar = true;
        }
    }

    private handlecrowbarHit() {
        if (
            this.physics.overlap(this.prisoncells, this.crowbar) &&
            this.hasCrowbar
        ) {
            this.hitPrisonCell();
        }
    }

    update() {
        this.fpsText.update();
    }

    changeScene() {
        if (this.torturechamber) {
            this.scene.start("Level2");
        }
        this.scene.start("GameOver");
    }
}
