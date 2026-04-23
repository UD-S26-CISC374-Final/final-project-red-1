import { Scene } from "phaser";

export class Preloader extends Scene {
    constructor() {
        super("Preloader");
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, "background");

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on("progress", (progress: number) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + 460 * progress;
        });
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.image(
            "dungeon",
            "assets/dungeon.png",
        ); /* Credit goes to https://opengameart.org/content/a-cute-dungeon by author Buch */
        this.load.image(
            "ground",
            "assets/ground.png",
        ); /* Credit goes to https://opengameart.org/content/ground-plate by author TyberiusGames */
        this.load.image(
            "wall",
            "assets/wall.png",
        ); /* Credit goes to https://opengameart.org/content/wall by author djonvincent */
        this.load.image(
            "prisoncells",
            "assets/prisoncell.png",
        ); /* Credit goes to https://opengameart.org/content/prison-tiles by author devnewton */
        this.load.image(
            "Crowbar.txt",
            "assets/crowbar.png",
        ); /* Credit goes to https://opengameart.org/content/crow-bar by author Lewis W. Veasey */
        // this.load.image("chain", "assets/chain.png");
        // this.load.image("gloves", "assets/gloves.png");
        // this.load.image("guillotine", "assets/guillotine.png");
        // this.load.image("lever", "assets/lever.png");
        this.load.image("logo", "assets/logo.png");
        this.load.image("star", "assets/star.png");
        this.load.image("phaser-logo", "assets/phaser-logo.png");
        this.load.spritesheet("player", "assets/king.png", {
            frameWidth: 120,
            frameHeight: 120,
        }); /* Credit goes to https://opengameart.org/content/gilead-king-in-armor by author Razare2015 */
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start("dungeon.png");
        this.scene.launch("MainMenu");
    }
}
