import { File } from "./File";
import { Folder } from "./Folder";

/*
    Name: mergeFiles
    Description: When given 2 files and an index, both files are deleted and replaced with a new, combined file.
    Input: fileA (File), fileB (File): the files being combined
        index (number): The index that will be passed into the array combinedItems to produce a new file that corresponds to the input
    Output: N/A
 */
function mergeFiles(fileA: File, fileB: File, index: number) {
    const moveToFolder: Folder = fileA.parent;

    const combinedItems: File[] = [
        new File(
            "BrokenCells",
            moveToFolder,
            false,
            "These look like you can fit through them easily",
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

/*
    Name: combineFiles
    Description: when given 2 files, the function combines the files
    Input: fileA (File), fileB (File): the files that are being combined
    Output: string: either an error or a notificaiton letting the user know that both files were combined
 */
export function combineFiles(fileA: File, fileB: File): string {
    const fileACombine: string[] = [""];
    const fileBCombine: string[] = [""];

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
