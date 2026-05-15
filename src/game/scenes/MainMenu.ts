import { Scene, GameObjects } from "phaser";

export class MainMenu extends Scene {
    background!: GameObjects.Image;

    private aboutBox!: GameObjects.Rectangle;
    private aboutText!: GameObjects.Text;
    private aboutVisible: boolean = false;

    constructor() {
        super("MainMenu");
    }

    create() {
        // background
        this.background = this.add.image(512, 384, "Hallway");

        // dark overlay so text is readable
        this.add.rectangle(512, 384, 1024, 768, 0x000000, 0.45);

        // game title
        this.add
            .text(512, 140, "Command the Dungeon", {
                fontFamily: "Courier New",
                fontSize: "48px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 6,
            })
            .setOrigin(0.5);

        // START BUTTON
        const startButton = this.add
            .text(512, 320, "START", {
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

        startButton.on("pointerover", () => {
            startButton.setScale(1.05);
        });

        startButton.on("pointerout", () => {
            startButton.setScale(1);
        });

        startButton.on("pointerdown", () => {
            this.scene.start("Preloader");
        });

        // ABOUT BUTTON
        const aboutButton = this.add
            .text(512, 420, "ABOUT", {
                fontFamily: "Courier New",
                fontSize: "28px",
                backgroundColor: "#222222",
                color: "#ffffff",
                padding: {
                    left: 20,
                    right: 20,
                    top: 10,
                    bottom: 10,
                },
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        aboutButton.on("pointerover", () => {
            aboutButton.setScale(1.05);
        });

        aboutButton.on("pointerout", () => {
            aboutButton.setScale(1);
        });

        aboutButton.on("pointerdown", () => {
            this.toggleAbout();
        });

        // ABOUT PANEL
        this.aboutBox = this.add
            .rectangle(512, 600, 700, 180, 0x000000, 0.85)
            .setVisible(false);

        this.aboutText = this.add
            .text(
                512,
                600,
                "Command the Dungeon\n\nAn educational terminal-based dungeon crawler meant to teach the basics of a terminal-based file system\nCreated by George Zapponne and Leif Keane, 2026",
                {
                    fontFamily: "Courier New",
                    fontSize: "16px",
                    color: "#ffffff",
                    align: "center",
                    wordWrap: {
                        width: 650,
                    },
                },
            )
            .setOrigin(0.5)
            .setVisible(false);
    }

    private toggleAbout() {
        this.aboutVisible = !this.aboutVisible;

        this.aboutBox.setVisible(this.aboutVisible);
        this.aboutText.setVisible(this.aboutVisible);
    }
}
