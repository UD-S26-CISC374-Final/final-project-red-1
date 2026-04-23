import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import { File } from "../../classes/File";
import { Folder } from "../../classes/Folder";
import { Navigator } from "../../classes/Navigator";
import { splitCommandPrompt } from "../../classes/Enviroment";
import FpsText from "../objects/fps-text";

export class Level1 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    fpsText: FpsText;
    command: string;
    private ground: Phaser.Physics.Arcade.StaticGroup;
    private pregametext: Phaser.GameObjects.Text;
    private wall: Phaser.Physics.Arcade.StaticGroup;
    private player: Phaser.Physics.Arcade.Sprite;
    private crowbar: Phaser.Physics.Arcade.Image;
    private prisoncells: Phaser.Physics.Arcade.StaticGroup;
    private nav: Navigator;
    //private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    private inventory: Set<string> = new Set();
    private crowstrength = 1;
    private prisoncellHealth = 1;
    private torturechamber = false;

    constructor() {
        super("dungeon.png");
    }

    create() {
        this.pregametext = this.add
            .text(
                300,
                150,
                "Welcome to the game.\nYour mission is to save the king from the dungeon.\nCd - change directories.\nHelp - Call for help.\nLs - list out files. \nMv - move files. \nCat - combine or see the contents of files. \nControl + c - Quit the puzzles.\n ./filename.exe - Execute the files.\nGood luck, and god save the king!",
                {
                    fontSize: "16px",
                    color: "#ffffff",
                },
            )
            .setOrigin(0.5);
        this.camera = this.cameras.main;

        this.cameras.main.setViewport(0, 0, 514, 768);

        this.add.image(400, 400, "dungeon");
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor("#000000");

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        const jail = new Folder("Jail", null);
        const player = new Folder("Player", null);
        new File("king", player, false, "He is weakening");
        new File("ground", jail, false, "This is ground");
        new File("wall", jail, false, "This is a wall");
        new File("Crowbar.txt", jail, false, "This is a crowbar");
        new File("prisoncells", jail, false, "These are prisoncells");
        this.ground = this.physics.add.staticGroup();
        const g = this.ground.create(
            100,
            724,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        g.setScale(2).refreshBody();
        const g1 = this.ground.create(
            200,
            724,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        g1.setScale(2).refreshBody();
        const g2 = this.ground.create(
            300,
            724,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        g2.setScale(2).refreshBody();
        this.physics.add.collider(this.ground, this.player);
        const pg = this.ground.create(
            400,
            724,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        pg.setScale(2).refreshBody();
        const wpg = this.ground.create(
            500,
            724,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        wpg.setScale(2).refreshBody();
        const dirt = this.ground.create(
            50,
            724,
            "ground",
        ) as Phaser.Physics.Arcade.Sprite;
        dirt.setScale(2).refreshBody();
        this.wall = this.physics.add.staticGroup();
        const w = this.wall.create(
            20,
            590,
            "wall",
        ) as Phaser.Physics.Arcade.Sprite;
        w.setScale(2).refreshBody();
        const w1 = this.wall.create(
            20,
            670,
            "wall",
        ) as Phaser.Physics.Arcade.Sprite;
        w1.setScale(2).refreshBody();
        this.physics.add.collider(this.wall, this.player);
        this.prisoncells = this.physics.add.staticGroup();
        this.prisoncells.create(500, 400, "prisoncells");
        this.prisoncells.create(500, 425, "prisoncells");
        this.prisoncells.create(500, 450, "prisoncells");
        this.prisoncells.create(500, 475, "prisoncells");
        this.prisoncells.create(500, 500, "prisoncells");
        this.prisoncells.create(500, 525, "prisoncells");
        this.prisoncells.create(500, 550, "prisoncells");
        this.prisoncells.create(500, 575, "prisoncells");
        this.prisoncells.create(500, 600, "prisoncells");
        this.prisoncells.create(500, 625, "prisoncells");
        this.prisoncells.create(500, 650, "prisoncells");
        this.prisoncells.create(500, 660, "prisoncells");
        this.crowbar = this.add.image(
            300,
            580,
            "Crowbar.txt",
        ) as Phaser.Physics.Arcade.Image;
        this.player = this.physics.add.sprite(200, 619, "player");

        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.ground, this.prisoncells);
        this.physics.add.collider(this.player, this.wall);
        this.physics.add.overlap(
            this.player,
            this.ground,
            this.groundandwallCollisions.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.wall,
            this.groundandwallCollisions.bind(this),
            undefined,
            this,
        );
        this.physics.add.collider(this.player, this.prisoncells);
        this.physics.add.collider(this.crowbar, this.prisoncells);
        this.physics.add.overlap(
            this.player,
            this.crowbar,
            this.collectCrowbar.bind(this),
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.crowbar,
            this.prisoncells,
            this.handlecrowbarHit.bind(this),
            undefined,
            this,
        );
        this.physics.add.collider(this.player, this.crowbar);
        this.physics.overlap(
            this.player,
            this.crowbar,
            this.overlapCommands.bind(this),
            undefined,
            this,
        );

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "player", frame: 4 }],
            frameRate: 10,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("player", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });

        //this.cursors = this.input.keyboard?.createCursorKeys();
        this.fpsText = new FpsText(this);

        EventBus.emit("current-scene-ready", this);
    }

    private hitPrisonCell() {
        if (
            this.physics.overlap(this.player, this.prisoncells) &&
            !this.inventory.has("Crowbar.txt")
        ) {
            console.log("You need a crowbar to break the prison cell!");
            this.prisoncellHealth = this.prisoncellHealth - 0;
        }
        if (
            this.physics.overlap(this.player, this.prisoncells) &&
            this.inventory.has("Crowbar.txt")
        ) {
            this.prisoncellHealth -= this.crowstrength;
            if (this.prisoncellHealth == 0) {
                this.prisoncellHealth = 8;
                this.torturechamber = true;
                this.prisoncells.children.each((cell) => {
                    const prisoncell = cell as Phaser.Physics.Arcade.Sprite;
                    prisoncell.disableBody(true, true);
                    return true;
                });
            }
        }
    }

    private overlapCommands() {
        const level1Command = splitCommandPrompt(this.command);
        if (level1Command[0] === "cd") {
            if (this.physics.overlap(this.player, this.prisoncells)) {
                if (!this.inventory.has("Crowbar.txt")) {
                    switch (level1Command.length) {
                        default:
                            return "ERROR: You cannot overlap a player with prisoncells unless you have a crowbar";
                    }
                }
                if (
                    this.prisoncellHealth > 0 &&
                    level1Command[1] == "prisoncells" &&
                    this.inventory.has("Crowbar.txt")
                ) {
                    this.prisoncellHealth -= this.crowstrength;
                    switch (level1Command.length) {
                        default:
                            return (
                                "Good job! Prison health at: " +
                                this.prisoncellHealth
                            );
                    }
                } else if (
                    this.prisoncellHealth == 0 &&
                    level1Command[1] == "Cells.txt" &&
                    this.inventory.has("Crowbar.txt")
                ) {
                    this.torturechamber = true;
                    this.prisoncells.children.each((jail) => {
                        const jailcell = jail as Phaser.Physics.Arcade.Sprite;
                        jailcell.disableBody(true, true);
                        return true;
                    });
                    switch (level1Command.length) {
                        default:
                            return "Congratulations! Prison is opened!";
                    }
                }
            }
        } else if (level1Command[0] == "mv") {
            if (
                this.physics.overlap(this.player, this.crowbar) &&
                level1Command[1] != "Crowbar.txt"
            ) {
                switch (level1Command.length) {
                    default: // crowbar has not been caught yet
                        return "ERROR: Cannot move something that doesn't exist";
                }
            } else if (
                this.physics.overlap(this.player, this.crowbar) &&
                level1Command[1] == "Crowbar.txt"
            ) {
                this.inventory.add("Crowbar.txt");
                this.crowbar.destroy();
                switch (level1Command.length) {
                    default: //crowbar has been caught and is moved
                        return this.nav.moveFile("Crowbar.txt", "Player");
                }
            }
        }
    }

    private collectCrowbar() {
        if (this.physics.overlap(this.player, this.crowbar)) {
            this.inventory.has("Crowbar.txt");
        }
    }

    private handlecrowbarHit() {
        if (
            this.physics.overlap(this.prisoncells, this.player) &&
            this.inventory.has("Crowbar.txt")
        ) {
            this.hitPrisonCell();
        }
    }

    private groundandwallCollisions() {
        if (this.physics.overlap(this.player, this.ground)) {
            this.player.setVelocityY(0);
        }
        if (this.physics.overlap(this.player, this.wall)) {
            this.player.setVelocityX(0);
        }
    }

    update() {
        /*if (!this.cursors) {
            return;
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("left", true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("right", true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play("turn");
        }

        if (this.cursors.up.isDown && this.player.body?.touching.down) {
            this.player.setVelocityY(-330);
        }*/
        this.fpsText.update();
        this.pregametext.update();
    }

    changeScene() {
        if (this.torturechamber) {
            this.scene.start("torture.png");
        }
        this.scene.start("GameOver");
    }
}
