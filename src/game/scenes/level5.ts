import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
import FpsText from "../objects/fps-text";

export class Level5 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    fpsText: FpsText;
    private player: Phaser.Physics.Arcade.Sprite;
    private throne: Phaser.Physics.Arcade.Image;
    private clock: Phaser.Physics.Arcade.Image;
    private torches: Phaser.Physics.Arcade.Group;
    private sticks: Phaser.Physics.Arcade.Group;
}
