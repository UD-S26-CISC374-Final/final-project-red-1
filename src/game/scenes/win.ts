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

        this.background = this.add.image(512, 384, "Hallway");
        this.background.setAlpha();

        this.add
            .text(
                512,
                140,
                "Congratulations! You are free! The king has returned to his former glory. Something is now not rotten in Denmark!!!",
                {
                    fontFamily: "Courier New",
                    fontSize: "48px",
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 6,
                },
            )
            .setOrigin(0.5);

        const playagain = this.add
            .text(512, 320, "Play again?", {
                fontFamily: "Courier New",
                fontSize: "32px",
                backgroundColor: "#222222",
                color: "#00ff00",
                padding: {
                    left: 20,
                    right: 20,
                    top: 10,
                    bottom: 10,
                },
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        playagain.on("pointerover", () => {
            playagain.setScale(1.05);
        });

        playagain.on("pointerout", () => {
            playagain.setScale(1.0);
        });

        playagain.on("pointerdown", () => {
            this.scene.start("MainMenu");
        });

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
