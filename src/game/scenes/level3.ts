import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
import FpsText from "../objects/fps-text";

export class Level3 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    timer: number;
    fpsText: FpsText;
    timertext: Phaser.GameObjects.Text;
    timerEvent: Phaser.Time.TimerEvent;
    private ground: Phaser.Physics.Arcade.StaticGroup;
    private player: Phaser.Physics.Arcade.Sprite;
    private flasks: Phaser.Physics.Arcade.StaticGroup;
    private chemicals: Phaser.Physics.Arcade.StaticGroup;
    private wall: Phaser.Physics.Arcade.StaticGroup;
    private hasFlasks: boolean;
    private hasChemicals: boolean;
    private chemicalsneutral: boolean;
    private chemicalsacid: boolean;
    private chemicalsbase: boolean;
    private seeKey: boolean;
    private key: Phaser.Physics.Arcade.Image;
    private door: Phaser.Physics.Arcade.Image;

    private hasKey = false;
    private madechemicals = false;
    private chemicalspoured = false;
    private acidpoured = false;
    private basepoured = false;
    private neutraldrank = false;
    private aciddrank = false;
    private basedrank = false;
    private brokeWall = false;
    private doorunlocked = false;
    private storeroom = false;
    private timePaused = false;

    constructor() {
        super("Level3");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor("#404040");

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        const sound = this.sound.add("alchemyspace", { loop: true });
        sound.play();

        this.timer = 100;
        this.timePaused = false;

        this.timertext = this.add.text(50, 500, "Timer: 100", {
            fontSize: "16px",
            color: "#326a42",
        });

        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.handleTimer.bind(this),
            callbackScope: this,
            loop: true,
        });
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
        this.flasks.create(200, 550, "flasks");
        this.flasks.create(200, 500, "flasks");
        this.chemicals = this.physics.add.staticGroup();
        this.chemicals.create(200, 600, "chemicals");
        this.chemicals.create(200, 550, "chemicals");
        this.chemicals.create(250, 550, "chemicals");
        this.wall = this.physics.add.staticGroup();
        this.wall.create(400, 550, "wall");
        this.wall.create(400, 600, "wall");
        this.wall.create(400, 650, "wall");
        this.wall.create(400, 625, "wall");
        this.wall.create(400, 575, "wall");
        this.physics.add.collider(this.player, this.flasks);
        this.physics.add.collider(this.player, this.chemicals);
        this.physics.add.collider(this.flasks, this.chemicals);
        this.physics.add.collider(this.player, this.key);
        this.physics.add.collider(this.player, this.door);
        this.physics.overlap(
            this.player,
            this.flasks,
            this.pourchemicals.bind(this),
            undefined,
            this,
        );
        this.physics.overlap(
            this.player,
            this.chemicals,
            this.pourchemicals.bind(this),
            undefined,
            this,
        );
        this.physics.overlap(
            this.player,
            this.chemicals,
            this.chemicalKey.bind(this),
            undefined,
            this,
        );
        this.physics.overlap(
            this.player,
            this.key,
            this.vision.bind(this),
            undefined,
            this,
        );
        this.physics.overlap(
            this.player,
            this.door,
            this.handleDoor.bind(this),
            undefined,
            this,
        );
        this.physics.overlap(
            this.player,
            this.wall,
            this.breakWall.bind(this),
            undefined,
            this,
        );
        this.physics.overlap(
            this.player,
            this.chemicals,
            this.neutralTimer.bind(this),
            undefined,
            this,
        );
        EventBus.emit("current-scene-ready", this);
    }

    private pourchemicals() {
        if (!this.hasFlasks || !this.hasChemicals) {
            this.madechemicals = false;
        }
        if (this.hasFlasks && this.hasChemicals) {
            this.madechemicals = true;
        }
        if (this.madechemicals) {
            if (this.chemicalsneutral) {
                this.chemicalspoured = true;
            } else if (this.chemicalsacid) {
                this.acidpoured = true;
            } else if (this.chemicalsbase) {
                this.basepoured = true;
            }
        } else {
            this.madechemicals = false;
        }
    }

    private breakWall() {
        if (!this.acidpoured || !this.chemicalspoured || !this.basepoured) {
            this.brokeWall = false;
        }
        if (this.acidpoured && this.chemicalspoured && this.basepoured) {
            if (!this.aciddrank && !this.neutraldrank && !this.basedrank) {
                this.brokeWall = false;
            }
            if (this.aciddrank) {
                this.brokeWall = true;
            } else {
                this.brokeWall = false;
            }
        }
    }

    private neutralTimer() {
        if (this.timePaused) return;

        if (!this.acidpoured || !this.chemicalspoured || !this.basepoured) {
            this.timerEvent.paused = false;
        }
        if (this.acidpoured && this.chemicalspoured && this.basepoured) {
            if (!this.aciddrank && !this.neutraldrank && this.basedrank) {
                this.timerEvent.paused = false;
            }
            if (this.neutraldrank) {
                this.timerEvent.paused = true;
            } else {
                this.timerEvent.paused = false;
            }
        }
    }
    private chemicalKey() {
        if (!this.brokeWall) {
            this.seeKey = false;
        }
        if (!this.acidpoured || !this.chemicalspoured || !this.basepoured) {
            this.seeKey = false;
        }
        if (this.acidpoured && this.chemicalspoured && this.basepoured) {
            if (!this.aciddrank && !this.neutraldrank && !this.basedrank) {
                this.seeKey = false;
            }
            if (this.basedrank) {
                this.seeKey = true;
            } else this.seeKey = false;
        }
    }

    private vision() {
        if (!this.physics.overlap(this.player, this.key)) {
            this.hasKey = false;
        }
        if (this.physics.overlap(this.player, this.key) && !this.seeKey) {
            this.hasKey = false;
        } else {
            this.hasKey = true;
        }
    }

    private handleDoor() {
        if (!this.hasKey) {
            this.doorunlocked = false;
        }
        if (this.hasKey) {
            if (this.physics.overlap(this.player, this.door)) {
                this.doorunlocked = true;
            }
        }
        if (this.doorunlocked) {
            this.storeroom = true;
        }
    }

    private handleTimer() {
        if (this.timePaused) return;

        this.timer--;
        this.timertext.setText("Time: " + this.timer);
    }

    update() {
        this.fpsText.update();
    }

    changeScene() {
        if (this.storeroom) {
            this.scene.start("Win");
        }
    }
}
