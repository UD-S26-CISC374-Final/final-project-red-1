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
    maxLines: number = 43;

    textBoxText!: GameObjects.Text;
    cursorVisible: boolean = true;
    cursorChar: string = "█";

    outputLines: string[] = [];
    currentInput: string = "";
    prompt: string = "> ";

    constructor() {
        super("MainMenu");
    }

    /*
        Name: appendLine
        Description: Separates lines out so the input text can be rendered properly
        Input: line(string): The line that will be inputted
        Output: N/A
    */
    appendLine(line: string) {
        this.outputLines.push(line);

        if (this.outputLines.length > this.maxLines) {
            this.outputLines.shift();
        }

        this.renderTerminal();
    }

    /*
        Name: renderTerminal
        Description: Renders the terminal so it a) looks like a terminal, b) flashes when user input, and c) all previous commands are listed
        Input: N/A
        Output: N/A
    */
    renderTerminal() {
        const output = this.outputLines.join("\n");

        const cursor = this.cursorVisible ? this.cursorChar : " ";

        const inputLine = this.prompt + this.currentInput + cursor;

        const fullText = output + "\n" + inputLine;

        this.textBoxText.setText(fullText);
    }

    create() {
        this.env = new Enviroment();
        this.cameras.main.setViewport(700, 0, 324, 768);

        // terminal text formatting
        const terminalText = this.add.text(0, 0, "", {
            fontSize: "12px",
            fontFamily: "Courier New",
            color: "#FFFFFF",
            lineSpacing: 4,
        });

        // main textbox
        this.textBox = this.rexUI.add.textBox({
            x: 162,
            y: 384,
            width: 300,
            height: 700,

            background: this.rexUI.add.roundRectangle(
                0,
                0,
                2,
                2,
                10,
                0x000000,
                0.9,
            ),

            text: terminalText,

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            },
        });

        this.textBoxText = terminalText;

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

        // hidden DOM input
        const input = this.add.dom(512, 850, "input", {
            width: "1024px",
            fontSize: "16px",
            fontFamily: "Courier New",
            backgroundColor: "transparent",
            color: "transparent",
            border: "none",
            outline: "none",
        });

        const inputElement = input.node as HTMLInputElement;

        // focus immediately
        inputElement.focus();

        // regain focus if user clicks game
        this.input.on("pointerdown", () => {
            inputElement.focus();
        });

        // regain focus on keyboard activity too
        this.input.keyboard?.on("keydown", () => {
            inputElement.focus();
        });

        // initial terminal output
        this.appendLine(this.env.runCommand("ls"));

        // LIVE TYPING (moved OUTSIDE keydown)
        inputElement.addEventListener("input", () => {
            this.currentInput = inputElement.value;
            this.renderTerminal();
        });

        // ENTER handling
        inputElement.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                event.preventDefault();

                const value = this.currentInput.trim();

                this.appendLine(this.prompt + value);

                const output = this.env.runCommand(value);

                if (output) {
                    this.appendLine(output);
                }

                this.currentInput = "";
                inputElement.value = "";

                this.renderTerminal();
            }
        });

        // blinking cursor
        this.time.addEvent({
            delay: 500,
            loop: true,
            callback: () => {
                this.cursorVisible = !this.cursorVisible;
                this.renderTerminal();
            },
        });

        // initial draw
        this.renderTerminal();

        EventBus.emit("current-scene-ready", this);
    }

    update() {}

    changeScene() {
        if (this.logoTween) {
            this.logoTween.stop();
            this.logoTween = null;
        }
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
