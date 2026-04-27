import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import type { ChangeableScene } from "../reactable-scene";

export class Tutorial extends Scene implements ChangeableScene {
    rexUI!: RexUIPlugin;
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    private pregametext: Phaser.GameObjects.Text;
    private player: Phaser.Physics.Arcade.Sprite;
    private key: Phaser.Physics.Arcade.Image;
    private door: Phaser.Physics.Arcade.Image;

    create() {
        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {}
}
