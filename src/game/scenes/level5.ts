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
    private hammer: Phaser.Physics.Arcade.Image;
    private motionsensor: Phaser.Physics.Arcade.Image;
    private door: Phaser.Physics.Arcade.Image;

    private thronebroken: boolean;
    private msActivated: boolean;
    private doorOpened: boolean;
    private fakeWin: boolean;

    create() {
        EventBus.emit("current-scene-ready", this);
    }

    private breakThrone() {}

    private activateMS() {}

    private openDoor() {}

    update() {}

    changeScene() {}
}
