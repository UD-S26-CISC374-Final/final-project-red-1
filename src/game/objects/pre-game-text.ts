import Phaser from "phaser";

export default class PreGameText extends Phaser.GameObjects.Text {
    constructor(scene: Phaser.Scene) {
        super(scene, 100, 100, "", { color: "red", fontSize: "80px" });
        scene.add.existing(this);
        this.setOrigin(0);
    }

    public update() {
        this.setText(
            `pregametext: Cd - Change directories. Mv - move files. Help - ask for help. Good luck`,
        );
    }
}
