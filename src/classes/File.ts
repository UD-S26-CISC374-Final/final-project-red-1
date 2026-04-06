import type { Folder } from "./Folder";

export class File {
    name: string;
    path: string;
    parent: Folder;

    constructor(n: string, pF: Folder) {
        this.name = n;
        this.parent = pF;
        this.parent.addChild(this);
        this.path = this.setPath();
    }

    /*
        Name: setPath
        Description: Via recursion, sets the path of the file.
        Input: N/A
        Output: string (the overall path of the file)
    */
    public setPath(): string {
        return this.parent.path + "/" + this.name;
    }
}
