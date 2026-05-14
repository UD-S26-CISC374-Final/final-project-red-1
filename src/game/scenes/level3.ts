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
    private table: Phaser.Physics.Arcade.Image;
    private book: Phaser.Physics.Arcade.Image;
    private wall: Phaser.Physics.Arcade.StaticGroup;
    private hasFlasks: boolean;
    private hasneutral: boolean;
    private hasacid: boolean;
    private hasbase: boolean;
    private chemicalsneutral: Phaser.Physics.Arcade.StaticGroup;
    private chemicalsacid: Phaser.Physics.Arcade.StaticGroup;
    private chemicalsbase: Phaser.Physics.Arcade.StaticGroup;
    private seeKey: boolean;
    private key: Phaser.Physics.Arcade.Image;
    private door: Phaser.Physics.Arcade.Image;

    private readBook = false;
    private knowsRecipe = false;
    private hasKey = false;
    private madechemicals = false;
    private madeacids = false;
    private madebases = false;
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
        this.cameras.main.setViewport(0, 0, 512, 768);
        this.cameras.main.setBounds(0, 0, 512, 768);

        this.player = this.physics.add.sprite(100, 700, "player");
        this.player.setCollideWorldBounds(true);

        this.key = this.physics.add.image(700, 600, "key");
        this.key.setImmovable(true);

        this.door = this.physics.add.image(900, 600, "door");
        this.door.setImmovable(true);

        this.book = this.physics.add.image(300, 550, "book");
        this.book.setImmovable(true);
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor("#404040");

        this.add.image(400, 400, "alchemy");
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
        this.chemicalsneutral = this.physics.add.staticGroup();
        this.chemicalsneutral.create(200, 600, "chemicals");
        this.chemicalsacid = this.physics.add.staticGroup();
        this.chemicalsacid.create(200, 550, "chemicals");
        this.chemicalsbase = this.physics.add.staticGroup();
        this.chemicalsbase.create(250, 550, "chemicals");
        this.wall = this.physics.add.staticGroup();
        this.wall.create(400, 550, "wall");
        this.wall.create(400, 600, "wall");
        this.wall.create(400, 650, "wall");
        this.wall.create(400, 625, "wall");
        this.wall.create(400, 575, "wall");
        this.physics.add.collider(this.player, this.flasks);
        this.physics.add.collider(this.player, this.book);
        this.physics.add.collider(this.book, this.table);
        this.physics.add.collider(this.player, this.chemicalsneutral);
        this.physics.add.collider(this.player, this.chemicalsacid);
        this.physics.add.collider(this.player, this.chemicalsbase);
        this.physics.add.collider(this.flasks, this.chemicalsneutral);
        this.physics.add.collider(this.flasks, this.chemicalsacid);
        this.physics.add.collider(this.flasks, this.chemicalsbase);
        this.physics.add.collider(this.player, this.key);
        this.physics.add.collider(this.player, this.door);
        this.physics.add.overlap(
            this.player,
            this.flasks,
            this.pourchemicals.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.book,
            this.knowsBook.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.flasks,
            this.book,
            this.knowRecipe.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.chemicalsneutral,
            this.pourchemicals.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.chemicalsacid,
            this.pourchemicals.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.chemicalsbase,
            this.pourchemicals.bind(this),
            undefined,
            this,
        );

        this.physics.add.overlap(
            this.player,
            this.chemicalsneutral,
            this.chemicalKey.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.key,
            this.vision.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.door,
            this.handleDoor.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.wall,
            this.breakWall.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.chemicalsneutral,
            this.neutralTimer.bind(this),
            undefined,
            this,
        );
        EventBus.emit("current-scene-ready", this);
    }

    private knowsBook() {
        if (!this.readBook) {
            this.readBook = true;
        }
    }
    private knowRecipe() {
        if (!this.readBook) {
            this.knowsRecipe = false;
        } else {
            this.knowsRecipe = true;
        }
    }
    private pourchemicals() {
        if (
            !this.hasFlasks ||
            (!this.hasneutral && !this.hasacid && !this.hasbase) ||
            !this.knowsRecipe
        ) {
            this.madechemicals = false;
            this.madeacids = false;
            this.madebases = false;
        }
        if (
            (this.hasFlasks && this.hasneutral) ||
            this.hasacid ||
            (this.hasbase && this.knowsRecipe)
        ) {
            if (this.hasneutral) {
                this.madechemicals = true;
            } else if (this.hasacid) {
                this.madeacids = true;
            } else if (this.hasbase) {
                this.madebases = true;
            }
        }
        if (this.madechemicals) {
            this.chemicalspoured = true;
        } else if (this.madeacids) {
            this.acidpoured = true;
        } else if (this.madebases) {
            this.basepoured = true;
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
                this.wall.setAlpha(0);
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

        if (this.timer <= 0) {
            this.timer = 100;
            this.player.setTint(0x00000);
            this.time.delayedCall(500, () => {
                this.scene.start("Level3");
            });
        }
    }

    changeScene() {
        if (this.storeroom) {
            this.scene.start("Level4");
        }
    }
}
