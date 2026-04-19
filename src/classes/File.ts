import type { Folder } from "./Folder";

export class File {
    name: string;
    path: string;
    parent: Folder;
    height: number;

    isExe?: boolean;
    description?: string;

    constructor(n: string, pF: Folder, e?: boolean, d?: string) {
        this.isExe = e;

        if (this.isExe) {
            this.name = n + ".exe";
        } else {
            this.name = n + ".txt";
        }
        this.parent = pF;
        this.parent.addChild(this);
        this.path = this.setPath();
        this.description = d;

        this.height = this.parent.height + 1;
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

    public displayDescription(): string {
        if (!this.isExe) {
            if (this.description) {
                return this.description;
            } else {
                return "ERROR: File does not have a description.";
            }
        } else {
            return "ERROR! exe's cannot be concatenated!";
        }
    }
}
