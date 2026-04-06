//import { File } from "./File";
import { Folder } from "./Folder";
// ^ imports ^

export class Navigator {
    root: Folder;
    current: Folder;

    constructor() {
        this.root = new Folder("root", null);
        this.current = this.root;
    }

    /*
        Name: travelUp
        Description: If possible, will set the current directory to the parent of the current directory
        Input: N/A
        Output: N/A
    */
    public travelUp() {
        if (this.current.parent != null) {
            this.current = this.current.parent;
        }
    }

    /*
        Name: travelDown
        Description: When given the name of a folder, will set the current folder to said folder
        Input: name (String): the name of the folder to travel to
        Output: N/A
    */
    public travelDown(name: string) {
        const index = this.current.getChild(name);

        if (index != -1) {
            if (this.current.children[index] instanceof Folder) {
                this.current = this.current.children[index];
            }
        }
    }
}
