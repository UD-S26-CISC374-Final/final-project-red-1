import { EventBus } from "../event-bus";
import { Scene } from "phaser";

export class Secret extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    private player: Phaser.Physics.Arcade.Sprite;
    private shoes: Phaser.Physics.Arcade.Image;
    private wand: Phaser.Physics.Arcade.Image;
    private crown: Phaser.Physics.Arcade.Image;
    private elevator: Phaser.Physics.Arcade.Image;

    private hasShoes: boolean;
    private hasWand: boolean;
    private hasCrown: boolean;
    private elevatorOpen: boolean;

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor("#000000");

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        this.player = this.physics.add.sprite(100, 700, "player");
        this.player.setCollideWorldBounds(true);
        this.shoes = this.physics.add.image(300, 700, "shoes");
        this.wand = this.physics.add.image(500, 700, "wand");
        this.crown = this.physics.add.image(700, 700, "crown");
        this.elevator = this.physics.add.image(900, 700, "elevator");
        this.physics.add.collider(this.player, this.shoes);
        this.physics.add.collider(this.player, this.wand);
        this.physics.add.collider(this.player, this.crown);
        this.physics.add.collider(this.player, this.elevator);
        const sound = this.sound.add("secret", { loop: true });
        sound.play();
        EventBus.emit("current-scene-ready", this);
    }

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
        if (this.elevatorOpen) {
            this.scene.start("Win");
        }
    }
}
