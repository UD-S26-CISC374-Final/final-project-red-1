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

    //v bunch of checks for in game progress v
    private moveDirt = false;
    private getCrowbar = false;
    private boxCut = false;
    private level3Opened = false;
    private breakWall = false;
    private throneOpened = false;
    private win = false;
    // v constructor is exclusively for creating the actual file system the player will be going through v
    constructor() {
        //Root
        const folderRoot = new Folder("Root", null, false);

        //Hallway
        const hallway = new Folder("Hallway", folderRoot, false);
        new File("Table", hallway, false, "This is a table.");
        new File("Candle", hallway, false, "This is a candle.");

        //Jail/Level1
        const jail = new Folder("Jail", hallway, true, false);
        new File(
            "Cells",
            jail,
            false,
            "These cells are really hard to break. If I could maybe bend them, I could get out of this cell.",
            false,
        );

        new File(
            "Dirt",
            jail,
            false,
            "Seems this pile was made hastily in order to conceal something.",
        );
        new Folder("Hole", jail);

        //Torture Chamber/Level2
        const torture = new Folder(
            "TortureChamber",
            hallway,
            true,
            false,
            true,
        );
        new File(
            "Chain",
            torture,
            false,
            "An old, rusty chain that flakes off metal when you touch it. Its connected to the lever, but nothing else.\nI wonder if I could connect it to anything.",
        );
        new File(
            "Lever",
            torture,
            true,
            "An old mechanical lever that seems to be attached to the chain. I wonder what will happen if I press it.",
        ); //Lever
        const tortureTable = new Folder("Table", torture, true, true);
        new File(
            "Guillotine",
            tortureTable,
            false,
            "A guillotine. It seems like it needs to be attached to something in order to work.",
        );
        const tortureBox = new Folder("Box", torture, false, true, false);
        new File(
            "Button",
            tortureBox,
            true,
            "Oooo, a button! I wonder what will happen if I press it.",
        );

        //AlchemyRoom/Level3
        const alchemy = new Folder("AlchemyRoom", hallway, false);
        new File("Wall", alchemy, false, "Good luck getting past this...");
        /*new File(
            "Key",
            alchemy,
            false,
            "The magic key! You aren't out of the woods yet, but you're getting close!",
        );*/
        const potionTable = new Folder("PotionTable", alchemy, true, false);
        new File(
            "RecipeBook",
            potionTable,
            false,
            "A recipe for a wall-dissolving potion:\nThe one found in your stomach in the 1st\nThe one found in your bath in the 2nd\nThe remaining one in the 3rd",
        );
        new Folder("Flask1", potionTable);
        new Folder("Flask2", potionTable);
        new Folder("Flask3", potionTable);
        new File("Acid", potionTable, false, "Smells like the stomach");
        new File("Neutral", potionTable, false, "Smells like nothing");
        new File("Base", potionTable, false, "Smells like soap");
        new File(
            "UsePotion",
            potionTable,
            true,
            "Mixes, then uses the potions on the wall.",
        );

        //ThroneRoom/Level5

        const throneroom = new Folder("ThroneRoom", hallway, false);
        new File("Throne", throneroom, false, "Your rightful throne as king");
        new File(
            "Picture",
            throneroom,
            false,
            "Just looks like something that isn't necessary.",
        );
        new File(
            "MotionSensor",
            throneroom,
            false,
            "What a shame. It doesn't recognize you in your withered state. Who knows what it will recognize.",
        );
        new File("Elevator", throneroom, true, "Hope it doesnt get stuck!");

        //Win
        const win = new Folder("Win", hallway, false);
        new File("Congratulations", win, false, "You did it!!!");
        this.nav = new Navigator(folderRoot, jail); //start of the game

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
        return this.runCommand(command) + this.updateEnviromentState();
    }

    /*
        Name: updateEnviromentState
        Desciption: Makes sure the game state updates whenever the user does something
        Input: N/A
        Output: N/A
    */
    private updateEnviromentState(): string {
        const currentFolder = this.nav.current;
        // LEVEL 1 LOGIC
        if (currentFolder.name === "Jail") {
            const Hole = currentFolder.getChildAsFile("Hole");

            if (Hole instanceof File) {
                return "\nERROR";
            } //will always be true

            if (Hole?.getChild("Dirt.txt") !== -1 && !this.moveDirt) {
                //creates Crow and Bar for player
                new File(
                    "Crow",
                    currentFolder,
                    false,
                    "A member of the corvidae family that is nevermore- oh its just half of a crowbar. You should combine it with its sibling.",
                );

                new File(
                    "Bar",
                    currentFolder,
                    false,
                    "A nutrient dense blend of soybeans, lint, and leafy greens- oh its just half of a crowbar. You should combine it with its sibling.",
                );
                this.moveDirt = true;
                return "\nIt seems like there was something underneath the dirt...";
            } //Did you push the dirt in the hole?

            if (Hole?.getChild("Crowbar.exe") !== -1 && !this.getCrowbar) {
                this.getCrowbar = true;
                return "\n...you put it in the hole didnt you?";
            }
        }

        //LEVEL 2 LOGIC
        if (this.boxCut) {
            //is the box supposted to be opened or not
            this.boxCut = false;
            const tempGrab = this.nav.getFileDeep("Box");
            if (tempGrab instanceof Folder) {
                tempGrab.acessible = true;
            }
        }

        if (this.level3Opened) {
            //should level 3 be unlocked
            this.level3Opened = false;
            const tempGrab = this.nav.getFileDeep("AlchemyRoom");
            if (tempGrab instanceof Folder) {
                tempGrab.acessible = true;
            }
            return "\nA strange rumbling of a door opening up can be heard...\n\n(AlchemyRoomUnlocked)";
        }

        // Level3 Logic
        if (this.breakWall) {
            //is the wall broken
            const alchemy = this.nav.getFileDeep("AlchemyRoom");

            if (alchemy instanceof Folder) {
                //will always be true
                alchemy.removeChild("Wall.txt");
                new File(
                    "Key",
                    alchemy,
                    true,
                    "ooo, a key! I should go and move it to an area with a locked door",
                );
                this.breakWall = false;
            }

            return "\nThe wall begins to fizzle and slowly melt, revealing something new";
        }

        if (this.throneOpened) {
            //is final level unlocked
            const throneRoom = this.nav.getFileDeep("ThroneRoom");

            if (throneRoom instanceof Folder) {
                throneRoom.acessible = true;
                this.throneOpened = false;
            }
        }

        // Level 5 Logic //
        if (currentFolder.name == "ThroneRoom") {
            return "\nSeems like there is a chance that you could get out of here";
        }

        if (this.win) {
            const win = this.nav.getFileDeep("Win");

            if (win instanceof Folder) {
                win.acessible = true;
                this.win = false;
            }
        }

        // Win Logic //
        if (currentFolder.name == "Win") {
            return "You have escaped!!!";
        }

        return "";
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
                        const tempFolder = this.nav.getFileDeep("Hallway");
                        if (tempFolder instanceof Folder) {
                            tempFolder.acessible = true;
                            tempFolder.moveInto = true;
                        }
                    }

                    return "With all of your strength and body mass, you push against the brittle bars, bending then enough to allow for your escape.\n\n You are now able to do 'cd ../' to escape the jail!";
                }
            } else {
                //for some reason you used this in any other place but the jail
                return "You look around to see if theres any pryable surfaces and it seems like there are none.";
            }
        } else if (name === "Lever.exe") {
            let returnMessage = "You hear a click of the lever...";

            if (this.nav.doesFileExistAtAll("PoweredGuillotine.txt")) {
                //did player connect chain to guillotine
                returnMessage += "\nThe guillotine blade falls...";

                const box = this.nav.getFileDeep("Box");

                if (box instanceof Folder && box.parent?.name === "Table") {
                    returnMessage +=
                        "\nAnd the box has been opened! I wonder what's inside...";
                    this.boxCut = true;
                } else {
                    returnMessage +=
                        "\nAnd nothing happened. If only you could move an item onto the table.";
                }
            } else {
                //...oh they didnt.
                returnMessage +=
                    "\n...and nothing happens. Maybe try using cat on two items";
            }

            return returnMessage;
        } else if (name === "Button.exe") {
            //simple "opens level 3" thing
            this.level3Opened = true;
            return "";
        } else if (name === "UsePotion.exe") {
            const f1 = this.nav.getFileDeep("Flask1");
            const f2 = this.nav.getFileDeep("Flask2");
            const f3 = this.nav.getFileDeep("Flask3");

            let returnPhrase = "You start mixing the potions...";

            //v these 3 if statements will always be true v
            if (!(f1 instanceof Folder)) {
                return "error";
            }

            if (!(f2 instanceof Folder)) {
                return "error";
            }

            if (!(f3 instanceof Folder)) {
                return "error";
            }

            /*
                IF...
                    flask 1 has the acid
                    flask 2 has the base
                    flask 3 has the neutral
            */
            if (
                f1.getChild("Acid.txt") !== -1 &&
                f2.getChild("Base.txt") !== -1 &&
                f3.getChild("Neutral.txt") !== -1
            ) {
                returnPhrase +=
                    "\nAnd everything starts turning blue. You assume that means it works and you splash it on the wall...";
                this.breakWall = true;
            } else {
                returnPhrase +=
                    "\n...Nothing happens. You think you put the wrong ingredients in each flask...";
            }

            return returnPhrase;
        } else if (name === "Key.exe") {
            if (this.nav.current.name === "Hallway") {
                //tells player this is correct
                this.throneOpened = true;
                return "You turn the key and slowly unlock the last door... \nThroneRoom unlocked";
            } else {
                //"hey, move me somewhere else :3"
                return (
                    "Theres no unlocked door in " +
                    this.nav.current.name +
                    "! Maybe try going to the hallway..."
                );
            }
        } else if (name === "Elevator.exe") {
            this.win = true;
            return "";
        }

        return "Hi, this is just the default text"; //Default case incase the .exe file doesnt exist... somehow.
        //^ was used for testing purposes. Will never show up. If a .exe file doesnt exist, runCommand will catch it before this methods even ran ^
    }

    /*
        Name: runCommand
        Desciption: When given user input, it will then parse said input by splitting it into an array, then will produce an output that matches
        the command prescent
        Input: command(string): the user's input
        Output: string: Will either let the user know of an error, OR will print out the output.
    */
    private runCommand(command: string): string {
        // Hi, this is Leif here. This seems very daunting, and I know my commenting for this section probably isnt the besttttt, but eh
        // It really isnt. most of this is just a massive if-else ladder
        // That and just simple error handling. The general formula is:
        // - checks if command exists. If not? Laugh at user
        // - Oh, command exists... ok does it have the right arguments? No? Laugh at user
        // - Oh, it does... use the designated logic from this.nav (shown in Navigator.ts)
        // Its just a lot of checking and error handling

        const brokenUpCommand = splitCommandPrompt(command);

        if (brokenUpCommand[0] === "help") {
            switch (brokenUpCommand.length) {
                case 1: //case: just "help". Prints all commands
                    return "Available commands:\n cd: changes directory to the specified folder indicated in blue.\nls: lists all of the contents of the current directory you are in\nhelp: displays either general descriptions of commands\nmv: moves a file to a given directory\ncat: will either display the contents of a text file, or combine two text files together.\n[file].exe: executes a given executable file\nclear: clears the terminal screen\npwd: prints your current location\n\nIf you want a more detailed description of a given command, please type help [command you want the description of].";
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
                            return "cat, or 'concatenate', is a command that is used exclusively for text files, or files labeled with .txt.\n\nWhen used in the format: cat [file], the description of the text file will be presented. This also works on executibles.\nWhen used in the format: cat [file1] [file2], both of the text files will be combined into a new item, only if they are able to, however. NOTE: This is permenant, and does not work on executables.";
                        case "clear":
                            return "Clears the entire terminal screen.";
                        case "pwd":
                            return "Stands for 'print working directory.' Prints your current room location as a file path.";
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
                    /*if (brokenUpCommand[1] === "Inventory") {
                        //error handling for moving into inventory
                        return "ERROR: Cannot move into inventory.";
                    } else {*/
                    return this.nav.travelTo(brokenUpCommand[1]);
                //}

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
                    if (
                        this.nav.stringToFile(brokenUpCommand[1]) ===
                            this.nav.stringToFile(brokenUpCommand[2]) &&
                        typeof this.nav.stringToFile(brokenUpCommand[1]) !==
                            "string"
                    ) {
                        //check if players trying to move a file into itself
                        return "ERROR: Cannot move a Folder into itself";
                    }

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
        } else if (brokenUpCommand[0] === "pwd") {
            //print working directory command
            if (brokenUpCommand.length !== 1) {
                //obligatory "too many arguments"
                return "ERROR: Too many arguments! You only need to type in the file path.";
            }

            return "Your current location is:" + this.nav.current.path;
        }

        return "ERROR: Command not found"; //default case
    }
}
