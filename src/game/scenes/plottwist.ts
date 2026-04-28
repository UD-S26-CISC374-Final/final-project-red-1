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

    create() {}

    update() {}

    changeScene() {}
}
