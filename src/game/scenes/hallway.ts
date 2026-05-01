import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import FpsText from "../objects/fps-text";

export class Level1 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    fpsText: FpsText;
    command: string;
    private pregametext: Phaser.GameObjects.Text;

    constructor() {
        super("Hallway");
    }

    create() {
        this.pregametext = this.add
            .text(
                300,
                150,
                "Welcome to the game.\n Your mission is to save a former king from the dungeon.\ncd - change directories.\nhelp - Call for help.\nls - list out files. \nmv - move files. cat - combine or see the contents of files. \nControl + c - Quit the puzzles.\n ./filename.exe - Execute the files.\nGood luck, and god save the king!",
                {
                    fontSize: "16px",
                    color: "#ffffff",
                },
            )
            .setOrigin(0.5);
        this.camera = this.cameras.main;

        this.cameras.main.setViewport(0, 0, 514, 768);

        EventBus.emit("current-scene-ready", this);
    }
}
