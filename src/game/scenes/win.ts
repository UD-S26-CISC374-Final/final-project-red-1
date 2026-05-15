import { EventBus } from "../event-bus";
import { Scene } from "phaser";

export class Win extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    fpsText: Phaser.GameObjects.Text;

    private player: Phaser.Physics.Arcade.Sprite;
    private ground: Phaser.Physics.Arcade.StaticGroup;
    private fountain: Phaser.Physics.Arcade.Image;
    private paintings: Phaser.Physics.Arcade.Group;

    constructor() {
        super("Win");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor();

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha();

        this.player = this.physics.add.sprite(100, 700, "player");
        this.player.setCollideWorldBounds(true);
        this.ground = this.physics.add.staticGroup();
        const g = this.ground.create(
            512,
            768,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        g.setScale(2).refreshBody();
        this.physics.add.collider(this.ground, this.player);
        this.fountain = this.physics.add.image(400, 700, "fountain");
        this.paintings = this.physics.add.group();
        this.paintings.create(600, 700, "paintings");
        this.physics.add.collider(this.player, this.fountain);
        this.physics.add.collider(this.player, this.paintings);
        EventBus.emit("current-scene-ready", this);
    }

    update() {
        this.fpsText.update();
    }

    changeScene() {
        this.time.addEvent({
            delay: 15000,
            callback: () => this.scene.start("MainMenu"),
        });
    }
}
