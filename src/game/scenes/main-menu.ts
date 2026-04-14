import { GameObjects, Scene } from "phaser";
import { Enviroment } from "../../classes/Enviroment";

import { EventBus } from "../event-bus";
import type { ChangeableScene } from "../reactable-scene";

export class MainMenu extends Scene implements ChangeableScene {
    background: GameObjects.Image;
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;

    constructor() {
        super("MainMenu");
    }

    create() {
        this.background = this.add.image(512, 384, "background");

        this.title = this.add
            .text(24, 24, "Main Menu", {
                fontFamily: "Courier New",
                fontSize: 16,
                color: "#ffffff",
                align: "left",
            })
            .setOrigin(0, 0)
            .setDepth(100);

        this.title.setLineSpacing(10);
        EventBus.emit("current-scene-ready", this);
    }

    update() {
        const env = new Enviroment();

        this.title.text = env.nav.showContent();
        env.runCommand("cd Hallway/Jail");
        this.title.text += "\n" + env.runCommand("ls");
        this.title.text += "\n" + env.runCommand("ls ../../../");
        this.title.text += "\n" + env.runCommand("cd ..");
        this.title.text += "\n" + env.runCommand("ls");
        this.title.text += "\n" + env.runCommand("cd ../");
        this.title.text += "\n" + env.runCommand("ls");
        this.title.text += "\n" + env.runCommand("cd ../");
        this.title.text += "\n" + env.runCommand("ls");
    }

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
