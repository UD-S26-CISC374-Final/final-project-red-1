import { EventBus } from "../event-bus";
import { Scene } from "phaser";

export class PlotTwist extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    fpsText: Phaser.GameObjects.Text;
    private postext: Phaser.GameObjects.Text;
    private negtext: Phaser.GameObjects.Text;
    private player: Phaser.Physics.Arcade.Sprite;
    private ground: Phaser.Physics.Arcade.StaticGroup;
    private wall: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
        super("PlotTwist");
    }

    create() {
        this.postext = this.add.text(
            400,
            200,
            "You have won this game! Wait for five seconds to get your prize!",
            {
                fontSize: "32px",
                color: "#ffffff",
            },
        );

        this.tweens.add({
            targets: this.postext,
            alpha: 1,
            duration: 5000,
            ease: "Power1",
            onComplete: () => this.postext.setAlpha(0),
        });

        this.negtext = this.add.text(
            400,
            200,
            "Sorry, but your prize is in another room...not in an another castle, but in another room",
            {
                fontSize: "32px",
                color: "#ffffff",
            },
        );

        this.tweens.add({
            targets: this.negtext,
            alpha: 1,
            duration: 10000,
            ease: "Power1",
            onComplete: () => this.negtext.setAlpha(0),
        });

        const sound = this.sound.add("plottwist", { loop: true });
        sound.play();
        EventBus.emit("current-scene-ready", this);
    }

    update() {
        this.fpsText.update();
    }

    changeScene() {
        if (this.postext.alpha === 0 && this.negtext.alpha === 0) {
            this.scene.start("Secret");
        }
    }
}
