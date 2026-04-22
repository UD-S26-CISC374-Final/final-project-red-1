import { File } from "./File";
import { Folder } from "./Folder";
import { splitCommandPrompt } from "./Enviroment";
import { combineFiles } from "./Concatenate";
import { Navigator } from "./Navigator";

export class Functions {
    public file: File;
    public folder: Folder;
    public block: boolean;
    public command: string;
    public nav: Navigator;
    public sourceFolder: Folder;
    public destinationFolder: Folder;

    /* 
        Name: executeMove
        Description: Executes movement
        Input: Command line
        Output: Movement(within the game);
    */

    public executeMove(sourceFolder: string, destinationFolder: string) {
        const move = splitCommandPrompt(this.command);
        if (move[0] == "mv") {
            return this.nav.moveFile(sourceFolder, destinationFolder);
        }
    }

    /* 
        Name: executeCombine
        Description: Executes combining of files
        Input: Command line
        Output: Creation of objects(within the game);
    */

    public executeCombine(block: boolean, fileA: File, fileB: File) {
        const combine = splitCommandPrompt(this.command);
        if (!block && combine[0] === "cat") {
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
        let otherfile: File | Folder | string;
        if (list[0] == "ls") {
            switch (list.length) {
                case 1: // just ls
                    return this.nav.showContent();
                case 2: // ls + more file(s)
                    otherfile = this.nav.stringToFile(list[1]);
                    if (otherfile instanceof Folder) {
                        return "../, ./, " + otherfile.showContents();
                    } else if (otherfile instanceof File) {
                        return "ERROR. Pathway leads to a file.";
                    } else {
                        return otherfile;
                    }
            }
        }
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

    public executeQuit() {
        const quit = splitCommandPrompt(this.command);
        if (quit[0] == "cntrl+c") {
            return "You may go back to the beginning.";
        }
    }
}
