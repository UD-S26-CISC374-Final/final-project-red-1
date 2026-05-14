import { File } from "./File";
import { Folder } from "./Folder";

const combinedFileNames = ["Crowbar", "PoweredGuillotine"];

/*
    Name: mergeFiles
    Description: When given 2 files and an index, both files are deleted and replaced with a new, combined file.
    Input: fileA (File), fileB (File): the files being combined
        index (number): The index that will be passed into the array combinedItems to produce a new file that corresponds to the input
    Output: N/A
 */
function mergeFiles(fileA: File, fileB: File, index: number) {
    const moveToFolder: Folder = fileA.parent;

    fileA.parent.removeChild(fileA.name);
    fileB.parent.removeChild(fileB.name);

    if (index === 0) {
        new File(
            "Crowbar",
            moveToFolder,
            true,
            "Oh, a crowbar! Really hope this thing's half-life hasn't passed. If only I could use it on something...",
            true,
        );
    }

    if (index === 1) {
        new File(
            "PoweredGuillotine",
            moveToFolder,
            false,
            "A guillotine attached to a chain that looms over a table, ready to slice something.",
        );
    }
}

/*
    Name: combineFiles
    Description: when given 2 files, the function combines the files
    Input: fileA (File), fileB (File): the files that are being combined
    Output: string: either an error or a notificaiton letting the user know that both files were combined
 */
export function combineFiles(fileA: File, fileB: File): string {
    const fileACombine: string[] = ["Crow.txt", "Chain.txt"];
    const fileBCombine: string[] = ["Bar.txt", "Guillotine.txt"];

    for (let i = 0; i < fileACombine.length; i++) {
        const matchA = fileACombine[i];
        const matchB = fileBCombine[i];

        const valid =
            (fileA.name === matchA && fileB.name === matchB) ||
            (fileA.name === matchB && fileB.name === matchA);

        if (valid) {
            mergeFiles(fileA, fileB, i);

            return `${fileA.name} was combined with ${fileB.name} to create a ${combinedFileNames[i]}.`;
        }
    }

    return fileA.name + " is unable to be combined with " + fileB.name;
}
