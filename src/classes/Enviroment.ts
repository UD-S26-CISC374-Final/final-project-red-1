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

        if (brokenUpCommand[0] === "help") {
            let helpFile: File | Folder | string;
            switch (brokenUpCommand.length) {
                case 1: //case: just "help". Prints all commands
                    return "Available commands: cd, ls, help, mv, /.sh, cat, sudo. If you want to quit, press cntrl + c.";
                case 2: //case: "help" + a command. Prints that command's function
                    helpFile = this.nav.stringToFile(brokenUpCommand[1]);
                    if (helpFile instanceof Folder) {
                        return "ERROR: Pathway lead to a folder. Please use a command";
                    } else if (helpFile instanceof File) {
                        switch (helpFile.name) {
                            case "cd":
                                return "Changes the current directory to the specified path.";
                            case "ls":
                                return "Lists the contents of the current directory or the specified path.";
                            case "help":
                                return "Displays available commands or detailed information about a specific command.";
                            case "mv":
                                return "Moves or renames a file or directory.";
                            case "/.exe":
                                return "Executes an executable file.";
                            case "cat":
                                return "Displays the contents of a file.";
                            default:
                                return "Command not found.";
                        }
                    } else {
                        return "ERROR: Command not found. Please enter a valid command to receive help.";
                    }
                default: //case: too many arguments
                    return "ERROR: Too many arguments. Please use the following format: help [command (optional)]";
            }
        } else if (brokenUpCommand[0] === "cd") {
            //change directory command
            switch (brokenUpCommand.length) {
                case 1: //case: only cd was inputted as the command
                    return "ERROR: Too few arguments. Please use the following format: cd [filepath]";

                case 2: //case: both the command and the file path were inputted
                    return this.nav.travelTo(brokenUpCommand[1]);

                default: //case: too many arguments
                    return "ERROR: Too many arguments. Please use the following format: cd [filepath]";
            }
        } else if (brokenUpCommand[0] === "ls") {
            //list command
            let tempFile: File | Folder | string;
            switch (brokenUpCommand.length) {
                case 1: //case: just "ls". Prints current directory
                    return this.nav.showContent();
                case 2: //case: "ls" + a file path
                    tempFile = this.nav.stringToFile(brokenUpCommand[1]);
                    if (tempFile instanceof Folder) {
                        return "../, ./, " + tempFile.showContents();
                    } else if (tempFile instanceof File) {
                        return "ERROR: Pathway lead to a file. Please use a directory";
                    } else {
                        return tempFile;
                    }
                default: //case: too many arguments
                    return "ERROR: Too many arguments. Please use the following format: ls [filepath (optional)]";
            }
        } else if (brokenUpCommand[0] === "mv") {
            switch (brokenUpCommand.length) {
                case 1: //just mv
                    return "ERROR: Too few arguments. Please use the format 'mv [file/folder path] [folderpath]";

                case 2: //case mv + file path
                    return "ERROR: Too few arguments. Please use the format 'mv [file/folder path] [folder path]'";

                case 3: //case mv + 2 file paths
                    return this.nav.moveFile(
                        brokenUpCommand[1],
                        brokenUpCommand[2],
                    );

                default: //case: too many arguments
                    return "ERROR: Too many arguments. Please use the following format: mv [source] [destination]";
            }
        }
        return "ERROR: Command not found";
    }
}
