import { Boot } from "./scenes/boot";
import { GameOver } from "./scenes/game-over";
import { Tutorial } from "./scenes/tutorial";
import { Level1 as Level1Game } from "./scenes/level1";
import { Level2 as Level2Game } from "./scenes/level2";

import { MainMenu } from "./scenes/main-menu";
import { AUTO, Game } from "phaser";
import { Preloader } from "./scenes/preloader";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
    title: "My Untitled CISC374 Game",
    version: "0.0.1",
    type: AUTO,
    parent: "game-container",
    backgroundColor: "#000000",
    audio: {
        disableWebAudio: false,
        noAudio: false,
    },
    dom: {
        createContainer: true,
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Tutorial,
        Level1Game,
        Level2Game,
        GameOver,
    ],
    scale: {
        parent: "phaser-game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1024,
        height: 768,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { x: 0, y: 300 },
        },
    },
    input: {
        keyboard: true,
        mouse: true,
        touch: true,
        gamepad: false,
    },
    render: {
        pixelArt: false,
        antialias: true,
    },
    plugins: {
        scene: [
            {
                key: "rexUI",
                plugin: RexUIPlugin,
                mapping: "rexUI",
            },
        ],
    },
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartGame;
