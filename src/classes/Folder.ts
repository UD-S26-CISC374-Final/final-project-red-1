import type { File } from "./File";
// ^ imports ^

export class Folder {
    name: string;
    path: string;
    parent: Folder | null;
    children: (Folder | File)[];

    constructor(n: string, pF: Folder | null) {
        this.name = n;
        this.parent = pF;
        this.path = this.setPath();
        this.children = [];
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
}
