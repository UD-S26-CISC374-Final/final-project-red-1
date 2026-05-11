import { EventBus } from "../event-bus";
import { Scene } from "phaser";

export class PlotTwist extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    fpsText: Phaser.GameObjects.Text;
    private fakeout: Phaser.GameObjects.Text;
    private player: Phaser.Physics.Arcade.Sprite;
    private ground: Phaser.Physics.Arcade.StaticGroup;
    private wall: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
        super("PlotTwist");
    }

    create() {
        this.fakeout = this.add.text(
            400,
            200,
            "Sorry, but your prize is in another room...not in an another castle, but in another room",
            {
                fontSize: "32px",
                color: "#ffffff",
            },
        );

        this.tweens.add({
            targets: this.fakeout,
            alpha: 1,
            duration: 10000,
            ease: "Power1",
            onComplete: () => this.fakeout.setAlpha(0),
        });

        this.player = this.physics.add.sprite(400, 700, "player");
        this.player.setCollideWorldBounds(true);
        this.ground = this.physics.add.staticGroup();
        const g = this.ground.create(
            400,
            768,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        g.setScale(2).refreshBody();
        this.physics.add.collider(this.ground, this.player);
        this.wall = this.physics.add.staticGroup();
        const w = this.wall.create(
            50,
            384,
            "wall",
        ) as Phaser.Physics.Arcade.Sprite;
        w.setScale(2).refreshBody();
        this.physics.add.collider(this.wall, this.player);
        const sound = this.sound.add("plottwist", { loop: true });
        sound.play();
        EventBus.emit("current-scene-ready", this);
    }

    update() {
        this.fpsText.update();
    }

    changeScene() {
        if (this.fakeout.alpha == 0) {
            this.scene.start("Secret");
        }
    }
}
