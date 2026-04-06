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
}
