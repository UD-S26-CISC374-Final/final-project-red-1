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
            "assets/rooms/roomJail.png",
        ); /* Credit goes to Leif Kaine */
        this.load.image(
            "torture",
            "assets/rooms/roomChamber.png",
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
            "assets/prisoncell.png",
        ); /* Credit goes to https://opengameart.org/content/prison-tiles by author devnewton */
        this.load.image(
            "Crowbar.txt",
            "assets/crowbar.png",
        ); /* Credit goes to https://opengameart.org/content/crow-bar by author Lewis W. Veasey */
        this.load.image(
            "chain",
            "assets/chain.png",
        ); /* Credit goes to https://opengameart.org/content/chain-whip by Nineball */
        this.load.image(
            "gloves",
            "assets/gloves.png",
        ); /* Credit goes to https://opengameart.org/content/pointers-part-5 by yd */
        this.load.image(
            "guillotine",
            "assets/guillotine.png",
        ); /* Credit goes to https://opengameart.org/content/guillotine by author Rudy Phelippeau */
        this.load.image(
            "lever",
            "assets/lever.png",
        ); /* Credit goes to https://opengameart.org/content/bundle-events-assets by amaralzin9309 */
        this.load.image(
            "flasks",
            "assets/flasks.png",
        ); /* Credit goes to https://opengameart.org/content/isometric-alchemist-flasks-with-and-without-magic-symbols by Varkalandar */
        this.load.image(
            "chemicals",
            "assets/chemicals.png",
        ); /* Credit goes to https://opengameart.org/content/potions-7 by chabull */
        this.load.image(
            "key",
            "assets/key.png",
        ); /* Credit goes to https://opengameart.org/content/rusty-iron-key-povray-scene-file by Varkalandar */
        this.load.image(
            "door",
            "assets/door.png",
        ); /* Credit goes to https://opengameart.org/content/wood-door by wobba89 */
        this.load.image("water", "assets/water.png");
        this.load.image("bucket", "assets/bucket.png");
        this.load.image("cobwebs", "assets/cobwebs.png");
        this.load.image("rake", "assets/rake.png");
        this.load.image("boxes", "assets/boxes.png");
        this.load.image("buttons", "assets/buttons.png");
        this.load.image("throne", "assets/throne.png");
        this.load.image("motionsensor", "assets/motionsensor.png");
        this.load.image("hammer", "assets/hammer.png");
        this.load.image(
            "fountain",
            "assets/fountain.png",
        ); /* Credit goes to https://opengameart.org/content/solarus-fountain by AntumDeluge */
        this.load.image(
            "paintings",
            "assets/paintings.png",
        ); /* Credit goes to https://opengameart.org/content/abstract-art by geoadel */
        this.load.image("logo", "assets/logo.png");
        this.load.image("star", "assets/star.png");
        this.load.image("phaser-logo", "assets/phaser-logo.png");
        this.load.spritesheet("player", "assets/king.png", {
            frameWidth: 120,
            frameHeight: 120,
        }); /* Credit goes to https://opengameart.org/content/gilead-king-in-armor by author Razare2015 */

        // Soundtrack for the game
        this.load.audio(
            "tutorial",
            "assets/sounds/carpediem.mp3",
        ); /* Credit goes to https://opengameart.org/content/deus-ex-tempus by author Trevor Lentz */
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
            "old",
            "assets/sounds/old.mp3",
        ); /* Credit goes to https://opengameart.org/content/mythica by congusbongus */
        this.load.audio(
            "throne",
            "assets/sounds/fakelast.mp3",
        ); /*Credit goes to https://opengameart.org/content/defying-commodus by Matthew Pablo */
        this.load.audio(
            "plottwist",
            "assets/sounds/plottwist.mp3",
        ); /* Credit goes to https://opengameart.org/content/arabesque by brianiac256 */
        this.load.audio(
            "secret",
            "assets/sounds/secret.mp3",
        ); /* Credit goes to https://opengameart.org/content/a-slave-to-no-one-rpg-orchestral-essentials-boss-music by author InspectorJ(composed by Jonathan Shaw) */
        this.load.audio(
            "win",
            "assets/sounds/symphony.mp3",
        ); /* Credit goes to https://opengameart.org/content/calm-relax-1-synthwave-421k by cynicmusic */

        // Sound effects
        this.load.audio(
            "itempickup",
            "assets/seffects/itemcombo.flac",
        ); /* Credit goes to https://opengameart.org/content/life-pickup-yo-frankie by Blender Foundation(submitted by Lamoot) */
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.launch("Level1");
        this.scene.launch("Terminal");
    }
}
