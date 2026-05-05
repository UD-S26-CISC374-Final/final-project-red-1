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
    private elevator: Phaser.Physics.Arcade.Image;

    private hasShoes: boolean;
    private hasWand: boolean;
    private hasCrown: boolean;
    private bartShoes: boolean;
    private bartWand: boolean;
    private bartCrown: boolean;
    private elevatorOpen: boolean;

    create() {
        const sound = this.sound.add("secret", { loop: true });
        sound.play();
        EventBus.emit("current-scene-ready", this);
    }

    private bartMovement() {}

    private handleWand() {}

    private handleShoes() {}

    private handleCrown() {}

    private openElevator() {
        if (this.hasShoes && this.hasWand && this.hasCrown) {
            this.elevatorOpen = true;
        } else {
            this.elevatorOpen = false;
        }
    }

    update() {}

    changeScene() {
        this.scene.start("Win");
    }
}
