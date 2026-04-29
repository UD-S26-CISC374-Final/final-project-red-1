import { Event } from "../event-bus";
import { Scene } from "phaser";

export class PlotTwist extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
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
    }

    update() {}

    changeScene() {}
}
