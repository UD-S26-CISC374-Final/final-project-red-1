import { File } from "./File";
import { Folder } from "./Folder";
import { Navigator } from "./Navigator";

function splitCommandPrompt(command: string): string[] {
    const splitCommand: string[] = [];

    do {
        const spaceIndex = command.indexOf(" ");

        if (spaceIndex !== -1) {
            splitCommand.push(command.slice(0, spaceIndex));
            command = command.slice(spaceIndex + 1);
        }
    } while (command.indexOf(" ") !== -1);

    if (command.length > 0 && command.indexOf(" ") === -1) {
        splitCommand.push(command);
    }

    return splitCommand;
}

export class Enviroment {
    public nav: Navigator;

    constructor() {
        //Root
        const folderRoot = new Folder("Root", null);

        //Hallway
        const hallway = new Folder("Hallway", folderRoot);
        new File("Table", hallway);
        new File("Candle", hallway);

        //Jail
        const jail = new Folder("Jail", hallway);
        new File("Dirt", jail);
        new File("Chain", jail);

        //Records
        const records = new Folder("Records", hallway);
        const shelf1 = new Folder("Shelf1", records);
        new File("Book1", shelf1);
        new File("Book2", shelf1);
        new File("Book3", shelf1);
        const shelf2 = new Folder("Shelf2", records);
        new File("Book1", shelf2);
        new File("Book2", shelf2);
        new File("Book3", shelf2);

        //Lab
        const lab = new Folder("Lab", hallway);
        new File("Potion", lab);

        this.nav = new Navigator(folderRoot);
    }

    public runCommand(command: string): string {
        const brokenUpCommand = splitCommandPrompt(command);

        if (brokenUpCommand[0] === "cd") {
            //change directory command
            switch (brokenUpCommand.length) {
                case 1: //case: only cd was inputted as the command
                    return "ERROR: Too few arguments. Please use the following format: cd [filepath]";

                case 2: //case: both the command and the file path were inputted
                    return this.nav.travelTo(brokenUpCommand[1]);

                default:
                    return "ERROR: Too many arguments. Please use the following format: cd [filepath]";
            }
        }

        return "ERROR OVERALL";
    }
}
