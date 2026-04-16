import { GameObjects, Scene } from "phaser";
import { Enviroment } from "../../classes/Enviroment";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import { EventBus } from "../event-bus";
import type { ChangeableScene } from "../reactable-scene";

export class MainMenu extends Scene implements ChangeableScene {
    rexUI!: RexUIPlugin;
    title: GameObjects.Text;
    textBox: GameObjects.GameObject;
    logoTween: Phaser.Tweens.Tween | null;

    env: Enviroment;
    lines: string[] = [];
    maxLines: number = 25;

    constructor() {
        super("MainMenu");
    }

    appendLine(line: string) {
        this.lines.push(line);

        // keep only last N lines (this is the “scroll” behavior)
        if (this.lines.length > this.maxLines) {
            this.lines.shift();
        }

        this.title.setText(this.lines.join("\n"));
    }

    create() {
        this.env = new Enviroment(); // ✅ add this

        this.textBox = this.rexUI.add.textBox({
            x: 0,
            y: 1000,
            width: 1080,
            height: 100,
            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0x000000),
            text: this.add.text(0, 0, "", {
                fontSize: "20px",
                fontFamily: "Courier New",
                color: "#ffffff",
                wordWrap: { width: 380 },
            }),
            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            },
        });

        this.title = this.add
            .text(24, 24, "", {
                fontFamily: "Courier New",
                fontSize: 16,
                color: "#ffffff",
                align: "left",
            })
            .setOrigin(0, 0)
            .setDepth(100);

        this.title.setLineSpacing(10);

        const input = this.add.dom(512, 750, "input", {
            width: "1024px",
            fontSize: "16px",
            fontFamily: "Courier New",
        });

        this.appendLine(this.env.runCommand("ls"));

        const inputElement = input.node as HTMLInputElement;

        inputElement.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                const value = (input.node as HTMLInputElement).value;

                const output = this.env.runCommand(value);

                this.appendLine("> " + value);
                this.appendLine(output);

                inputElement.value = "";
            }
        });

        EventBus.emit("current-scene-ready", this);
    }

    update() {}

    changeScene() {
        if (this.logoTween) {
            this.logoTween.stop();
            this.logoTween = null;
        }

        this.scene.start("Level1");
    }
}

/*
TEST CODE USED BY LEIF TO TEST FUNCTIONALITY

        this.title.text = env.nav.showContent();
        env.nav.travelDown("Hallway");
        this.title.text += "\n" + env.nav.showContent();
        env.nav.travelDown("Test");
        this.title.text += "\n" + env.nav.showContent();
        env.nav.travelDown("Records");
        this.title.text += "\n" + env.nav.showContent();
        //env.nav.s2FTest("../Jail/Dirt");
        this.title.text += "\n" + env.nav.s2FTest("../"); //should return "Hallway"
        this.title.text += "\n" + env.nav.s2FTest("../Jail/"); //should return "Jail"
        this.title.text += "\n" + env.nav.s2FTest("Shelf1/Book2/"); //should be "Book2"
        this.title.text += "\n" + env.nav.s2FTest("../Jail/Dirt"); //should be "Dirt"
        this.title.text += "\n" + env.nav.s2FTest("../../");

        this.title.text += "\n" + env.nav.showContent();
        this.title.text += "\n" + env.runCommand("");
        this.title.text += "\n" + env.runCommand("ls");
        this.title.text += "\n" + env.runCommand("ls ../");
        this.title.text += "\n" + env.runCommand("ls ../ ../");
        this.title.text += "\n" + env.runCommand("ls ../../");

*/
