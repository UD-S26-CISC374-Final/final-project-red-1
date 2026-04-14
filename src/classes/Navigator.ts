import { File } from "./File";
import { Folder } from "./Folder";
// ^ imports ^

function cutdownFilePath(filePath: string): string[] {
    const slashIndex = filePath.indexOf("/");

    if (slashIndex === -1) {
        return [filePath, ""];
    }

    const segment = filePath.slice(0, slashIndex);
    const rest = filePath.slice(slashIndex + 1);

    return [segment, rest];
}

export class Navigator {
    root: Folder;
    current: Folder;

    constructor(f: Folder, f2?: Folder) {
        this.root = f;
        this.current = this.root;
        if (f2 === undefined) this.current = this.root;
        else this.current = f2;
    }

    public showContent(): string {
        return "../, ./, " + this.current.showContents();
    }

    /*
        Name: travelUp
        Description: If possible, will set the current directory to the parent of the current directory
        Input: N/A
        Output: boolean: whether or not a root exists
    */
    private travelUp(): boolean {
        if (this.current.parent != null) {
            //if not the root
            this.current = this.current.parent;
            return true;
        } else {
            return false;
        }
    }

    /*
        Name: travelDown
        Description: When given the name of a folder, will set the current folder to said folder
        Input: name (String): the name of the folder to travel to
        Output: N/A
    */
    private travelDown(name: string) {
        const temp = this.getFile(name);

        if (temp instanceof Folder) {
            this.current = temp;
        }
    }

    /*
        Name: travelTo
        Description: When given a file path of a folder, will set the current folder to said file path
        Input: path (string): The path to a directory/folder
        Output: string: Returns either an error notifying the player of a mistake, or that it was succesful.
    */
    public travelTo(path: string): string {
        const tempFile = this.stringToFile(path);

        if (tempFile instanceof Folder) {
            this.current = tempFile;
            return "Succesfully changed directory";
        } else if (tempFile instanceof File) {
            return "ERROR: Pathway led to a file, not a folder.";
        } else {
            return tempFile;
        }
    }

    /*
        Name: getFile
        Description: when given the name of a file, grabs said file
        Input: name (string): the name of the file that should be grabbed
        Output: File/Folder: the returned file.
            null: error case
    */
    private getFile(name: string): File | Folder | null {
        if (this.doesFileExist(name)) {
            const temp = this.current.children[this.current.getChild(name)];

            if (temp instanceof Folder) {
                return temp;
            } else if (temp instanceof File) {
                return temp;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    /*
        Name: doesFileExist
        Description: when given a file, will return whether or not the file exists in the current folder
        Input: name (string): the name of the file
        Output: boolean: whether or not the file given exists
    */
    private doesFileExist(name: string): boolean {
        return this.current.getChild(name) !== -1;
    }

    //for testing purposes
    public s2FTest(filePath: string): string {
        const temp = this.stringToFile(filePath);

        if (temp instanceof Folder) {
            return temp.name;
        } else if (temp instanceof File) {
            return temp.name;
        } else if (typeof temp === "string") {
            return temp;
        } else {
            return "it failed";
        }
    }

    /*
        Name: stringToFile
        Description: when given the path to a file, produces said file at the location 
        Input: filePath (string): the given file path
        Output: File/Filder: the file at the end of the path provided
            string: error catch
    */
    public stringToFile(filePath: string): File | Folder | string {
        const nav = new Navigator(this.root, this.current);
        let currentPath = filePath; //edited file path
        let errorFound = false; //checks if an error is produced
        let fileString = ""; //current file being iterated in the do-while
        let tempFile: File | Folder | null;
        tempFile = nav.current; //temp variable for storing files
        let errorString = "";

        do {
            const tempVar = cutdownFilePath(currentPath);
            currentPath = tempVar[1];
            fileString = tempVar[0];

            if (fileString === "..") {
                const hasRoot = nav.travelUp();
                if (!hasRoot) {
                    errorFound = true;
                    errorString = "ERROR: Filepath goes outside of bounds";
                }
            } else {
                if (nav.doesFileExist(fileString)) {
                    tempFile = nav.getFile(fileString);
                    if (tempFile instanceof Folder) {
                        nav.travelDown(fileString);
                    } else {
                        //catches file
                        if (this.hasSlash(currentPath)) {
                            errorFound = true;
                            errorString = "ERROR";
                        } //error catching
                    }
                } else {
                    errorFound = true;
                    errorString = "ERROR: Filepath does not exist";
                } //another error catch
            }
        } while (currentPath.length > 0 && !errorFound);

        if (errorFound) {
            return errorString;
        } //error catch all

        if (fileString === ".." || fileString === "") {
            return nav.current;
        } //I.E., moving up a file

        if (tempFile instanceof File) {
            return tempFile;
        } //god I hate how multitype variables work, you gotta specify what the type is. Ignore the sloppy if statements

        if (tempFile instanceof Folder) {
            return tempFile;
        }

        return "ERROR"; // mostly used this for testing, but a final catch all return
    }

    private hasSlash(filePath: string): boolean {
        for (let i = 0; i < filePath.length; i++) {
            if (filePath[i] === "/") {
                return true;
            }
        }

        return false;
    }
}
