import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import type { ChangeableScene } from "../reactable-scene";
import FpsText from "../objects/fps-text";

export class Tutorial extends Scene implements ChangeableScene {
    rexUI!: RexUIPlugin;
    camera: Phaser.Cameras.Scene2D.Camera;
    fpsText: FpsText;
    background: Phaser.GameObjects.Image;
    private pregametext: Phaser.GameObjects.Text;
    private commandstext: Phaser.GameObjects.Text;
    private changetext: Phaser.GameObjects.Text;
    private listtext: Phaser.GameObjects.Text;
    private cattext: Phaser.GameObjects.Text;
    private movetext: Phaser.GameObjects.Text;
    private tuttext: Phaser.GameObjects.Text;
    private player: Phaser.Physics.Arcade.Sprite;
    private key: Phaser.Physics.Arcade.Image;
    private door: Phaser.Physics.Arcade.Image;

    private pickupkey: boolean;
    private dooropen: boolean;
    private changecomplete: boolean;
    private listcomplete: boolean;
    private catcomplete: boolean;
    private movecomplete: boolean;
    private tutorialcompleted: boolean;

    create() {
        this.pregametext = this.add.text(
            400,
            200,
            "Welcome to the game. \nLet us show you how to save the king",
            {
                fontSize: "24px",
                color: "#ffffff",
            },
        );

        this.tweens.add({
            targets: this.pregametext,
            alpha: 1,
            duration: 8000,
            ease: "Power1",
            onComplete: () => this.pregametext.setAlpha(0),
        });

        this.commandstext = this.add.text(
            400,
            200,
            "There are a list of commands that you should remember. Those commands are: \ncd, ls, help, cat, mv, ./filename.exe, and ctrl + c.",
            {
                fontSize: "24px",
                color: "#ffffff",
            },
        );

        this.tweens.add({
            targets: this.commandstext,
            alpha: 1,
            duration: 10000,
            ease: "Power1",
            onComplete: () => this.commandstext.setAlpha(0),
        });

        this.changetext = this.add.text(
            400,
            200,
            "Cd is to change directories. \nGo cd into the Tutorial directory",
        );

        if (this.changecomplete) {
            this.changetext.setAlpha(0);
        }

        this.listtext = this.add.text(
            400,
            200,
            "Ls is to list files. \nGo ls to see the files",
        );

        if (this.listcomplete) {
            this.listtext.setAlpha(0);
        }

        this.cattext = this.add.text(
            400,
            200,
            "Cat can be used in two ways. \nOne way is to access the contents of the file. \nThe other way is to combine the two files. Use cat to see the contents of the file.",
        );

        if (this.catcomplete) {
            this.cattext.setAlpha(0);
        }

        this.movetext = this.add.text(
            400,
            200,
            "Mv is to move files. \nUse mv to move the key file to the player",
        );

        if (!this.pickupkey) {
            this.movecomplete = false;
        }

        if (this.pickupkey) {
            this.movecomplete = true;
        }
        if (this.movecomplete) {
            this.movetext.setAlpha(0);
        }

        this.tuttext = this.add.text(
            400,
            200,
            "Now that you know the commands, you can finish this level by escaping the room.",
        );

        if (!this.dooropen) {
            this.tutorialcompleted = false;
        }
        if (this.dooropen) {
            this.tutorialcompleted = true;
        }
        if (this.tutorialcompleted) {
            this.tuttext.setAlpha(0);
        }

        const sound = this.sound.add("tutorial", { loop: true });
        sound.play();

        EventBus.emit("current-scene-ready", this);
    }

    update() {
        this.fpsText.update();
        this.time.addEvent({
            delay: 5000,
            callback: () => this.pregametext.update(),
        });
        this.time.addEvent({
            delay: 13000,
            callback: () => this.commandstext.update(),
        });
        this.changetext.update();
        this.listtext.update();
        this.cattext.update();
        this.movetext.update();
        this.tuttext.update();
    }

    changeScene() {
        if (this.tutorialcompleted) {
            this.scene.start("Level1");
        }
    }
}
