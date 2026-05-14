import { GameObjects, Scene } from "phaser";
import { Enviroment } from "../../classes/Enviroment";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import { EventBus } from "../event-bus";
import type { ChangeableScene } from "../reactable-scene";
import BBCodeText from "phaser3-rex-plugins/plugins/bbcodetext";

export class Terminal extends Scene implements ChangeableScene {
    rexUI!: RexUIPlugin;
    title: GameObjects.Text;
    textBox: GameObjects.GameObject;
    logoTween: Phaser.Tweens.Tween | null;

    env: Enviroment;
    lines: string[] = [];
    maxChars: number = 2000;

    textBoxText!: BBCodeText;
    cursorVisible: boolean = true;
    cursorChar: string = "█";
    cursorIndex: number = 0;

    outputLines: string[] = [];
    currentInput: string = "";
    prompt: string = "> ";

    history: string[] = [];
    historyIndex: number = -1;

    currentLevel: string = "Level1";

    constructor() {
        super("Terminal");
    }

    getSceneFromFolder(folderName: string): string | null {
        switch (folderName) {
            case "Jail":
                return "Level1";
            case "TortureChamber":
                return "Level2";
            case "AlchemyRoom":
                return "Level3";
            case "OldRoom":
                return "Level4";
            case "ThroneRoom":
                return "Level5";
            case "Hallway":
                return "Hallway";
            default:
                return null;
        }
    }

    /*
        Name: appendLine
        Description: Separates lines out so the input text can be rendered properly
        Input: line(string): The line that will be inputted
        Output: N/A
    */
    appendLine(line: string, shouldFormat: boolean = false) {
        if (shouldFormat) {
            this.outputLines.push(this.formatLine(line));
        } else {
            this.outputLines.push(`[color=#ffffff]${line}[/color]`);
        }

        this.renderTerminal();

        const lineHeight = 14;
        const maxVisibleLines = 53;

        while (
            Math.floor(this.textBoxText.height / lineHeight) >
                maxVisibleLines &&
            this.outputLines.length > 0
        ) {
            this.outputLines.shift();
            this.renderTerminal();
        }
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

        const before = this.currentInput.slice(0, this.cursorIndex);
        const after = this.currentInput.slice(this.cursorIndex);

        const inputLine =
            `[color=#ffffff]${this.prompt}${before}[/color]` +
            cursor +
            `[color=#ffffff]${after}[/color]`;

        const fullText = output + "\n" + inputLine;

        this.textBoxText.setText(fullText);
    }

    create() {
        this.env = new Enviroment();
        this.cameras.main.setViewport(514, 0, 514, 768);
        this.cameras.main.setBackgroundColor("#000000");

        // terminal text formatting
        const terminalText = this.rexUI.add.BBCodeText(0, 0, "", {
            fontSize: "12px",
            fontFamily: "Courier New",
            color: "#ffffff",
            lineSpacing: 6,

            wrap: {
                mode: "word",
                width: 500,
            },
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
            padding: "15px",
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
        this.appendLine(
            "Hello! Welcome to the dungeon! Your goal is to get out of this area by using the commands at your disposal. Do ''help'' In order to see a list of commands.",
        );
        this.appendLine(this.env.update("ls"), true);

        // LIVE TYPING (moved OUTSIDE keydown)
        inputElement.addEventListener("input", () => {
            this.currentInput = inputElement.value;
            this.cursorIndex = this.currentInput.length; // keep cursor synced
            this.renderTerminal();
        });

        // ENTER handling
        inputElement.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault();

                this.cursorIndex = Math.max(0, this.cursorIndex - 1);
                this.renderTerminal();
                return;
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();

                this.cursorIndex = Math.min(
                    this.currentInput.length,
                    this.cursorIndex + 1,
                );
                this.renderTerminal();
                return;
            }

            if (event.key === "ArrowUp") {
                event.preventDefault();

                if (this.history.length > 0) {
                    if (this.historyIndex === -1) {
                        this.historyIndex = this.history.length - 1;
                    } else {
                        this.historyIndex = Math.max(0, this.historyIndex - 1);
                    }

                    this.currentInput = this.history[this.historyIndex];
                    inputElement.value = this.currentInput;
                    this.cursorIndex = this.currentInput.length;
                    this.renderTerminal();
                }
                return;
            }

            if (event.key === "ArrowDown") {
                event.preventDefault();

                if (this.historyIndex !== -1) {
                    this.historyIndex++;

                    if (this.historyIndex >= this.history.length) {
                        this.historyIndex = -1;
                        this.currentInput = "";
                        this.cursorIndex = 0;
                    } else {
                        this.currentInput = this.history[this.historyIndex];
                    }

                    inputElement.value = this.currentInput;
                    this.renderTerminal();
                }
                return;
            }

            if (event.key === "Enter") {
                event.preventDefault();

                const value = this.currentInput.trim();

                //clear command inputted
                if (value === "clear") {
                    this.outputLines = ["All Cleared!"];
                    this.currentInput = "";
                    inputElement.value = "";

                    this.renderTerminal();

                    return;
                }

                this.appendLine(this.prompt + value);

                const output = this.env.update(value);

                if (output) {
                    this.appendLine(output, value.startsWith("ls"));
                }

                const targetScene = this.getSceneFromFolder(
                    this.env.nav.current.name,
                );

                if (targetScene && targetScene !== this.currentLevel) {
                    this.scene.stop(this.currentLevel);
                    this.scene.launch(targetScene);
                    this.currentLevel = targetScene;
                }

                if (value.length > 0) {
                    this.history.push(value);
                }

                this.historyIndex = -1;

                this.currentInput = "";
                inputElement.value = "";
                this.cursorIndex = 0;

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

    formatLine(line: string): string {
        return line
            .split("\n")
            .map((singleLine) => {
                const tokens = singleLine.split(/\s+/);

                return tokens
                    .map((token) => {
                        // exe files
                        if (/\.exe\b/i.test(token)) {
                            return `[color=#00ff00]${token}[/color]`;
                        }

                        // directories
                        const cleanedToken = token.replace(/[.,!?;:]+$/, "");

                        if (
                            this.env.nav.current.getChild(cleanedToken) !==
                                -1 &&
                            !token.includes(".txt")
                        ) {
                            return `[color=#0088ff]${token}[/color]`;
                        }

                        // relative paths
                        if (
                            token === "../" ||
                            token === "./" ||
                            token.startsWith("../") ||
                            token.startsWith("./")
                        ) {
                            return `[color=#0088ff]${token}[/color]`;
                        }

                        // generic files
                        if (/\.[a-zA-Z0-9]+$/i.test(token)) {
                            return `[color=#ffffff]${token}[/color]`;
                        }

                        // paths
                        if (token.includes("/") && /^[\w./-]+$/.test(token)) {
                            return `[color=#0088ff]${token}[/color]`;
                        }

                        return `[color=#ffffff]${token}[/color]`;
                    })
                    .join(" ");
            })
            .join("\n");
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
