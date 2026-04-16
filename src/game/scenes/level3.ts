import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
import FpsText from "../objects/fps-text";

export class Level3 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    fpsText: FpsText;
    private ground: Phaser.Physics.Arcade.StaticGroup;
    private player: Phaser.Physics.Arcade.Sprite;
    private flasks: Phaser.Physics.Arcade.StaticGroup;
    private chemicalsneutral: Phaser.Physics.Arcade.StaticGroup;
    private chemicalsacid: Phaser.Physics.Arcade.StaticGroup;
    private chemicalsbase: Phaser.Physics.Arcade.StaticGroup;
    private key: Phaser.Physics.Arcade.Image;
    private door: Phaser.Physics.Arcade.Image;

    private hasKey = false;
    private madechemicals = false;
    private chemicalspoured = false;
    private acidpoured = false;
    private basepoured = false;
    private doorunlocked = false;
    private chemicalstrength = 1;

    constructor() {
        super("Level3");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor("#404040");

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        this.ground = this.physics.add.staticGroup();
        const g = this.ground.create(
            512,
            768,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        g.setScale(2).refreshBody();
        this.physics.add.collider(this.ground, this.player);

        this.flasks = this.physics.add.staticGroup();
        this.flasks.create(200, 600, "flasks");
        this.chemicalsneutral = this.physics.add.staticGroup();
        this.chemicalsneutral.create(400, 600, "chemicalsneutral");

        EventBus.emit("current-scene-ready", this);
    }
}
