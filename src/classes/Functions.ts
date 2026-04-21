import { File } from "./File";
import { Folder } from "./Folder";
import { splitCommandPrompt } from "./Enviroment";
import { combineFiles } from "./Concatenate";

export class Functions {
    public file: File;
    public folder: Folder;
    public block: boolean;
    public command: string;
    public sourceFolder: Folder;
    public destinationFolder: Folder;

    constructor() {
        const sourceFolder = new Folder("sourceFolder", null);
        const destinationFolder = new Folder("destinationFolder", null);
    }
    /* 
        Name: executeMove
        Description: Executes movement
        Input: Command line
        Output: Movement(within the game);
    */

    public executeMove() {}

    /* 
        Name: executeCombine
        Description: Executes combining of files
        Input: Command line
        Output: Creation of objects(within the game);
    */

    public executeCombine(block: boolean, fileA: File, fileB: File) {
        if (!block) {
            return combineFiles(fileA, fileB);
        } else {
            return "ERROR: Combination has been blocked";
        }
    }

    /* 
        Name: executeDisplay
        Description: Executes the display
        Input: Command line
        Output: Listing of objects(within the game);
    */

    public executeDisplay() {
        const list = splitCommandPrompt(this.command);
    }

    /*
        Name: executeFile
        Description: Executes the file
        Input: Command line
        Output: Executes file
    */

    public executeFile(filename: File) {
        const execute = splitCommandPrompt(this.command);
        if (execute[0] == "./" + filename.name + "exe") {
            return "File has been successfully executed.";
        } else {
            return "ERROR: File has not been successfully executed.";
        }
    }

    /*
        Name: executeQuit
        Description: Executes quitting
        Input: Command line
        Output: Quits the puzzle
    */

    public executeQuit() {}
}
