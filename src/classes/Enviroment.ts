import { File } from "./File";
import { Folder } from "./Folder";
import { Navigator } from "./Navigator";

export class Enviroment {
    public nav: Navigator;

    constructor() {
        //Root
        const folderRoot = new Folder("Root", null);

        //Hallway
        const hallway = new Folder("Hallway", folderRoot);
        new File("Table", hallway);
        new File("Candle", hallway);

        //Jail
        const jail = new Folder("Jail", hallway);
        new File("Dirt", jail);
        new File("Chain", jail);

        //Records
        const records = new Folder("Records", hallway);
        const shelf1 = new Folder("Shelf1", records);
        new File("Book1", shelf1);
        new File("Book2", shelf1);
        new File("Book3", shelf1);
        const shelf2 = new Folder("Shelf2", records);
        new File("Book1", shelf2);
        new File("Book2", shelf2);
        new File("Book3", shelf2);

        //Lab
        const lab = new Folder("Lab", hallway);
        new File("Potion", lab);

        this.nav = new Navigator(folderRoot);
    }
}
