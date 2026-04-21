import { File } from "./File";
import { Folder } from "./Folder";
import { Navigator } from "./Navigator";

/*
    Name: splitCommandPrompt
    Description: When given user input(command), it spits out an array of strings so that the overall command can be more easily parsed
    Input: command(string): The command that is being parsed
    Output: string[]: The afformentioned command split into an array, so each part of the array can be looked at seperately
*/
export function splitCommandPrompt(command: string): string[] {
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
        new File("Player", hallway, false, "Something is rotten in Denmark");
        new File("Table", hallway, false, "This is a table.");
        new File("Candle", hallway, false, "This is a candle.");

        //Jail
        const jail = new Folder("Jail", hallway);
        new File("Crowbar", jail, false, "Oh a crowbar! What are the odds!");
        new File(
            "Cells",
            jail,
            false,
            "These cells are hard to break, like really hard",
        );

        //Torture
        const torture = new Folder("TortureChamber", hallway);
        new File("Chain", torture, false, "Feel how hard the links are!");
        new File("Guillotine", torture, false, "This is so French!");
        new File(
            "Gloves",
            torture,
            false,
            "Gloves...like the materials you use to protect your hands",
        );
        new File("Lever", torture, false, "Pull that lever");

        //Records
        const records = new Folder("Records", hallway);
        const shelf1 = new Folder("Shelf1", records);
        new File("Book1", shelf1, true);
        new File("Book2", shelf1, true);
        new File("Book3", shelf1, true);
        const shelf2 = new Folder("Shelf2", records);
        new File("Book1", shelf2, true);
        new File("Book2", shelf2, true);
        new File("Book3", shelf2, true);

        //Lab
        const lab = new Folder("Lab", hallway);
        new File("Potion", lab, false, "3 days blinding stew.");

        this.nav = new Navigator(folderRoot);
    }

    /*
        Name: runCommand
        Desciption: When given user input, it will then parse said input by splitting it into an array, then will produce an output that matches
        the command prescent
        Input: command(string): the user's input
        Output: string: Will either let the user know of an error, OR will print out the output.
    */
    public runCommand(command: string): string {
        const brokenUpCommand = splitCommandPrompt(command);

        if (brokenUpCommand[0] === "help") {
            switch (brokenUpCommand.length) {
                case 1: //case: just "help". Prints all commands
                    return "Available commands: cd, ls, help, mv, /.exe, cat. If you want to quit an executable, press cntrl + c.";
                case 2: //case: "help" + a command. Prints that command's function
                    switch (brokenUpCommand[1]) {
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
                            return "When given 1 file, will display its description. When given 2 files, will combine them";
                        default:
                            return "Command not found.";
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
        } else if (brokenUpCommand[0] === "cd..") {
            switch (brokenUpCommand.length) {
                case 1: //case: they are at the folderRoot
                    return "ERROR. There are no directories behind you.";
                case 2: //case: You are at one directory in the folderRoot
                    return this.nav.travelTo("Root");
                default: //case: too many arguments
                    return "ERROR: Too many arguments. Please use the following format: cd..";
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
        } else if (brokenUpCommand[0] === "cat") {
            switch (brokenUpCommand.length) {
                case 1: //just cat
                    return "ERROR: Too few arguments. Please use the format 'cat [file1] [file2(optional)]";

                case 2: //cat + file path
                    return this.nav.displayFileDescription(brokenUpCommand[1]);

                case 3: //cat + 2 file paths
                    return this.nav.concatenate(
                        brokenUpCommand[1],
                        brokenUpCommand[2],
                    );

                default:
                    return "ERROR: Too many arguments. Please use the format 'cat [file1] [file2(optional)]";
            }
        }
        return "ERROR: Command not found";
    }
}
