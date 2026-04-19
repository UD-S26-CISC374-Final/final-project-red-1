import { File } from "./File";
import { Folder } from "./Folder";

function mergeFiles(fileA: File, fileB: File, index: number) {
    const moveToFolder: Folder = fileA.parent;

    const combinedItems: File[] = [
        new File(
            "DirtyCandle",
            moveToFolder,
            false,
            "Why'd you put dirt on a candle?",
        ),
        new File(
            "BurntTable",
            moveToFolder,
            false,
            "OH NO! OUR TABLE! ITS BURNT!",
        ),
        new File(
            "ChainedTable",
            moveToFolder,
            false,
            "Susan's gone. Shes been replaced... by Chain Bastard.",
        ),
    ];

    fileA.parent.removeChild(fileA.name);
    fileB.parent.removeChild(fileB.name);

    for (let i = 0; i < combinedItems.length; i++) {
        if (i !== index) {
            combinedItems[i].parent.removeChild(combinedItems[i].name);
        }
    }
}

export function combineFiles(fileA: File, fileB: File): string {
    const fileACombine: string[] = ["Candle.txt", "Candle.txt", "Chain.txt"];
    const fileBCombine: string[] = ["Dirt.txt", "Table.txt", "Table.txt"];

    let fileAinCombines: number;
    let checkforA: string[];
    let checkforB: string[];

    if (fileACombine.indexOf(fileA.name) !== -1) {
        fileAinCombines = fileACombine.indexOf(fileA.name);
        checkforA = fileACombine;
        checkforB = fileBCombine;
    } else if (fileBCombine.indexOf(fileA.name) !== -1) {
        fileAinCombines = fileBCombine.indexOf(fileA.name);
        checkforA = fileBCombine;
        checkforB = fileACombine;
    } else {
        return fileA.name + " is unable to be combined with anything.";
    }

    let tracker = -1;

    for (let i = fileAinCombines; i < checkforA.length; i++) {
        tracker = checkforA.indexOf(fileA.name, i);

        if (tracker === -1) {
            return fileA.name + " is unable to be combined with " + fileB.name;
        }

        if (checkforB[tracker] === fileB.name) {
            mergeFiles(fileA, fileB, tracker);
            return fileA.name + " was combined with " + fileB.name;
            break;
        }
    }

    return fileA.name + " is unable to be combined with " + fileB.name;
}
