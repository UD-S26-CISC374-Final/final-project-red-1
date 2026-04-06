import type { Folder } from "./Folder";

export class File {
    name: string;
    path: string;
    parent: Folder;

    constructor(n: string, p: string, pF: Folder) {
        this.name = n;
        this.path = p;
        this.parent = pF;
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
