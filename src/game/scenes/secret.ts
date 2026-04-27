import { EventBus } from "../event-bus";
import { Scene } from "phaser";

export class Secret extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    private player: Phaser.Physics.Arcade.Sprite;
    private bart: Phaser.Physics.Arcade.Sprite;
    private shoes: Phaser.Physics.Arcade.Image;
    private wand: Phaser.Physics.Arcade.Image;
    private crown: Phaser.Physics.Arcade.Image;
}
