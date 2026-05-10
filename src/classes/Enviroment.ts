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
    //public Inventory: Folder;

    constructor() {
        //Root
        const folderRoot = new Folder("Root", null, false);

        //Hallway
        const hallway = new Folder("Hallway", folderRoot, false);
        new File("Table", hallway, false, "This is a table.");
        new File("Candle", hallway, false, "This is a candle.");

        //Jail/Level1
        const jail = new Folder("Jail", hallway);
        new File(
            "Crowbar",
            jail,
            true,
            "Oh, a crowbar! Really hope this things half-life hasnt passed. If only I could use it on something...",
        );
        new File(
            "Cells",
            jail,
            false,
            "These cells are really hard to break. If I could maybe bend them, I could get out of this cell.",
        );

        //Torture Chamber/Level2
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

        //AlchemyRoom/Level3
        const alchemy = new Folder("AlchemyRoom", hallway);
        new File("Flasks", alchemy, false, "These feel super hard");
        new File("Chemicals", alchemy, false, "Oh...chemicals. Be careful now");
        new File(
            "Switch",
            alchemy,
            false,
            "A switch, like the one that you use to turn on and off stuff",
        );
        new File(
            "Key",
            alchemy,
            false,
            "The magic key! You aren't out of the woods yet, but you're getting close!",
        );
        new File(
            "Door",
            alchemy,
            false,
            "It's a door. What'd you expect...once you've gotten this far, it's quite simplistic.",
        );

        //OldRoom/Level4

        const oldroom = new Folder("OldRoom", hallway);
        new File("Water", oldroom, false, "It's water. Wet like Steph");
        new File(
            "Bucket",
            oldroom,
            false,
            "It's a bucket. Can be filled with anything, like water, lava, fire, acid.",
        );
        new File(
            "Cobwebs",
            oldroom,
            false,
            "It's a cobweb. Old and annoying, like this room hasn't been touched in years.",
        );
        new File(
            "Boxes",
            oldroom,
            false,
            "Boxes. Like, the ones you store parts in.",
        );
        new File(
            "Button",
            oldroom,
            false,
            "Just a button. It's very insignificant. Won't help you escape",
        );

        //ThroneRoom/Level5

        const throneroom = new Folder("ThroneRoom", hallway);
        new File("Throne", throneroom, false, "Your rightful throne as king");
        new File(
            "Clock",
            throneroom,
            false,
            "It's a clock, mocking you. Tick tick, you're done!",
        );
        new File(
            "Torches",
            throneroom,
            false,
            "Torch the throne room. It's yours, but, whatever.",
        );
        new File("Hammer", throneroom, false, "Escape with the hammer");

        //Records (Add Back Later)
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

        this.nav = new Navigator(jail); //start of the game
        /*this.nav = new Navigator(torture);
        this.nav = new Navigator(alchemy);
        this.nav = new Navigator(oldroom);
        this.nav = new Navigator(throneroom);*/

        //Blank Inventory
        //this.Inventory = new Folder("Inventory", this.nav.current);
    }

    /*
        Name: update
        Description: main handler function for updating the overall game state
        Input: command (string): a user's command. Will be parsed in this.runCommand();
        Output: string: see runCommand for more details, but the jist is that it will return either user input or an error
    */
    public update(command: string): string {
        this.updateEnviromentState();

        return this.runCommand(command);
    }

    /*
        Name: updateEnviromentState
        Desciption: Makes sure the game state updates whenever the user does something
        Input: N/A
        Output: N/A
    */
    private updateEnviromentState() {
        /*if (currentFolder.name === "Jail") {
            if (
                (currentFolder.getChild("BrokenCells.txt") !== -1 ||
                    this.Inventory.getChild("BrokenCells.txt") !== -1) &&
                currentFolder.parent !== null
            ) {
                currentFolder.parent.acessible = true;
            }
        } //Unlocks Hallway*/
        //^ Former Logic for the first puzzle^
        /*if (this.nav.current.getChild("Inventory") !== -1) {
            this.nav.current.removeChild("Inventory");
        }

        if (this.nav.current.name !== "Inventory") {
            this.nav.current.addChild(this.Inventory);
        }*/
    }

    /*
        Name: executeFile
        Description: When given the name of an executible file, will then find what it should execute
        Input: name (string): the name of the executible
        Output: string: the output
    */
    private executeFile(name: string): string {
        if (name === "Crowbar.exe") {
            //activates crowbar text
            if (this.nav.current.name === "Jail") {
                if (!this.nav.current.acessible) {
                    //oh wow you already used the bars
                    return "...I dont think you need to bend these bars again, bucko.";
                } else {
                    //YAY IT WORKED!
                    this.nav.current.removeChild("Cells.txt");
                    new File(
                        "BrokenCell",
                        this.nav.current,
                        false,
                        "Mmmmm, bended metal. Something tells me that you can escape this room now.",
                    );

                    if (this.nav.current.parent !== null) {
                        this.nav.current.parent.acessible = true;
                    }

                    return "With all of your strength and body mass, you push against the brittle bars, bending then enough to allow for your escape.\n\n You are now able to do 'cd ../' to escape the jail!";
                }
            } else {
                //for some reason you used this in any other place but the jail
                return "You look around to see if theres any pryable surfaces and it seems like there are none.";
            }
        }

        return "Hi, this is just the default text"; //Default case incase the .exe file doesnt exist... somehow.
    }

    /*
        Name: runCommand
        Desciption: When given user input, it will then parse said input by splitting it into an array, then will produce an output that matches
        the command prescent
        Input: command(string): the user's input
        Output: string: Will either let the user know of an error, OR will print out the output.
    */
    private runCommand(command: string): string {
        const brokenUpCommand = splitCommandPrompt(command);

        if (brokenUpCommand[0] === "help") {
            switch (brokenUpCommand.length) {
                case 1: //case: just "help". Prints all commands
                    return "Available commands:\n cd: changes directory to the specified folder indicated in blue.\nls: lists all of the contents of the current directory you are in\nhelp: displays either general descriptions of commands\nmv: moves a file to a given directory\ncat: will either display the contents of a text file, or combine two text files together.\n\nIf you want a more detailed description of a given command, please type help [command you want the description of].";
                case 2: //case: "help" + a command. Prints that command's function
                    switch (brokenUpCommand[1]) {
                        case "cd":
                            return "cd, or 'change directory', allows you to move between folders, or 'rooms'.\n";
                        case "ls":
                            return "ls, or  'list' allows you to see every single item in a folder.\nIf you just type 'ls', you will only be able to see the items in your current directory.\nIf you want to see the items in a different folder, you can use the format 'ls [path]'..";
                        case "help":
                            return "Displays available commands or detailed information about a specific command.";
                        case "mv":
                            return "mv, or 'move', is a command that allows you to move files between folders via the format mv [file] [folder].";
                        case "/.exe":
                            return "Executes an executable file.";
                        case "cat":
                            return "cat, or 'concatenate', is a command that is used exclusively for text files, or files labeled with .txt.\n\nWhen used in the format: cat [file], the description of the text file will be presented.\nWhen used in the format: cat [file1] [file2], both of the text files will be combined into a new item, only if they are able to, however. NOTE: This is permenant.";
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
                    if (brokenUpCommand[1] === "Inventory") {
                        //error handling for moving into inventory
                        return "ERROR: Cannot move into inventory.";
                    } else {
                        return this.nav.travelTo(brokenUpCommand[1]);
                    }

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
                        if (tempFile.acessible) {
                            return "../, ./, " + tempFile.showContents();
                        } else {
                            return "ERROR: Unable to access folder.";
                        }
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
        } else if (brokenUpCommand[0] === "clear") {
            //clear command
            if (brokenUpCommand.length !== 1) {
                return "ERROR: Too many arguments! You only need to type in the file path.";
            }

            return "Cleared entire screen!";
        } else if (brokenUpCommand[0].includes(".exe")) {
            //NOTE: Does not check whether or not ".exe" is at the end of the string
            //executables
            if (brokenUpCommand.length !== 1) {
                //obligatory "too many arguments"
                return "ERROR: Too many arguments! You only need to type in the file path.";
            }

            const tempFile = this.nav.stringToFile(brokenUpCommand[0]);

            if (tempFile instanceof File) {
                //correct case
                if (tempFile.isExe) {
                    //file actually is an exe
                    //return "Meow"; //TEMP HANDLE. Here for testing purposes

                    return this.executeFile(tempFile.name);
                } else {
                    //This will technically never proc, but because of how the error handler works, I kind of have to have this here
                    return "ERROR: File is not an .exe";
                }
            } else if (tempFile instanceof Folder) {
                //another "only here because of how the error handler works." That and Im too lazy to copy and paste
                //the error message from nav's stringToFile
                return "ERROR";
            } else {
                //is an error message/string
                return tempFile;
            }
        }

        return "ERROR: Command not found"; //default case
    }
}
