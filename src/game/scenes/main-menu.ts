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
                fontSize: 24,
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
        env.nav.travelDown("Hallway");
        this.title.text += "\n" + env.nav.showContent();
        env.nav.travelDown("Test");
        this.title.text += "\n" + env.nav.showContent();
        env.nav.travelDown("Records");
        this.title.text += "\n" + env.nav.showContent();
        env.nav.travelUp();
        this.title.text += "\n" + env.nav.showContent();
    }

    changeScene() {
        if (this.logoTween) {
            this.logoTween.stop();
            this.logoTween = null;
        }

        this.scene.start("Level1");
    }
}
