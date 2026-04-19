import type { File } from "./File";
// ^ imports ^

export class Folder {
    name: string;
    path: string;
    parent: Folder | null;
    children: (Folder | File)[];
    height: number;

    constructor(n: string, pF: Folder | null) {
        this.name = n;
        this.parent = pF;
        this.parent?.addChild(this);
        this.path = this.setPath();
        this.children = [];

        if (this.parent === null) {
            this.height = 0;
        } else {
            this.height = this.parent.height + 1;
        }
    }

    /*
        Name: setPath
        Description: Via recursion, sets the path of the folder.
        Input: N/A
        Output: string (the overall path of the folder)
    */
    public setPath(): string {
        if (this.parent) {
            return this.parent.setPath() + "/" + this.name;
        } else {
            return this.name;
        }
    }

    public addChild(child: Folder | File): void {
        child.parent = this;
        this.children.push(child);
    }

    /*
        Name: showContents
        Description: Lists out all of the items currently in this folder
        Input: N/A
        Output: string (a list of all of the files and folders in this current folder)
    */
    public showContents(): string {
        let contents = "";

        for (let i = 0; i < this.children.length; i++) {
            if (i == this.children.length - 1) {
                contents += this.children[i].name;
            } else {
                contents += this.children[i].name + ", ";
            }
        }

        return contents;
    }

    /*
        Name: getChild
        Description: given a name of a filder/file, will return the index in which to access it. -1 error case
        Input: name (string): the name of the element needed
        Output: number: index of wanted element
    */
    public getChild(name: string): number {
        let index = -1; //default error case

        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].name == name) {
                index = i;
                break;
            }
        }
        return index;
    }

    public removeChild(name: string): Folder | File | null {
        const index = this.getChild(name);

        if (index === -1) {
            return null;
        }

        const removed = this.children.splice(index, 1)[0];
        removed.parent = null;

        return removed;
    }
}
