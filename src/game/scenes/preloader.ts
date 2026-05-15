import { Scene } from "phaser";

export class Preloader extends Scene {
    constructor() {
        super("Preloader");
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, "Hallway");

        //  A simple progress bar. This is the outline of the bar.

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on("progress", (progress: number) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + 460 * progress;
            if (progress == 1) {
                bar.setAlpha(0);
            }
        });
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.image(
            "Hallway",
            "assets/rooms/roomHallway.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "dungeon",
            "assets/rooms/roomJail.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "torture",
            "assets/rooms/roomChamber.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "alchemy",
            "assets/rooms/roomAlchemy.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "throne",
            "assets/rooms/roomThrone.png",
        ); /* Credit goes to Leif Kaine */
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
            "assets/Cells.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "Crowbar.exe",
            "assets/Crowbar.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "crow",
            "assets/crow.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "bar",
            "assets/bar.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "chain",
            "assets/chain.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "gloves",
            "assets/gloves.png",
        ); /* Credit goes to https://opengameart.org/content/pointers-part-5 by yd */
        this.load.image(
            "dirt",
            "assets/dirt.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "candle",
            "assets/candle.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "Hole",
            "assets/Hole.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "potions",
            "assets/potions.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "guillotine",
            "assets/guillotine.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "lever",
            "assets/lever.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "flasks",
            "assets/flash.png",
        ); /* Credit goes to Leif Kaine */

        this.load.image(
            "key",
            "assets/key.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "door",
            "assets/door.png",
        ); /* Credit goes to https://opengameart.org/content/wood-door by wobba89 */
        this.load.image(
            "boxes",
            "assets/box.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "throne",
            "assets/throne.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "motionsensor",
            "assets/detector.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "fountain",
            "assets/fountain.png",
        ); /* Credit goes to https://opengameart.org/content/solarus-fountain by AntumDeluge */
        this.load.image(
            "paintings",
            "assets/paintings.png",
        ); /* Credit goes to https://opengameart.org/content/abstract-art by geoadel */
        this.load.image(
            "books",
            "assets/book.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "table",
            "assets/table.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "elevator",
            "assets/elevator.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image("logo", "assets/logo.png");
        this.load.image("star", "assets/star.png");
        this.load.image("phaser-logo", "assets/phaser-logo.png");
        this.load.spritesheet("player", "assets/king.png", {
            frameWidth: 120,
            frameHeight: 120,
        }); /* Credit goes to https://opengameart.org/content/gilead-king-in-armor by author Razare2015 */

        // Soundtrack for the game
        this.load.audio(
            "battlemusic",
            "assets/sounds/battle.mp3",
        ); /* Credit goes to https://opengameart.org/content/battle-theme-a by cynicmusic */
        this.load.audio(
            "cyberpunk",
            "assets/sounds/cyberpunk.mp3",
        ); /* Credit goes to https://opengameart.org/content/cyberpunk-moonlight-sonata by Joth */
        this.load.audio(
            "alchemyspace",
            "assets/sounds/alchemyspace.mp3",
        ); /* Credit goes to https://opengameart.org/content/space-boss-battle-theme by Matthew Pablo */
        this.load.audio(
            "throne",
            "assets/sounds/fakelast.mp3",
        ); /*Credit goes to https://opengameart.org/content/defying-commodus by Matthew Pablo */
        this.load.audio(
            "win",
            "assets/sounds/symphony.mp3",
        ); /* Credit goes to https://opengameart.org/content/calm-relax-1-synthwave-421k by cynicmusic */
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.launch("Level1");
        this.scene.launch("Terminal");
    }
}
