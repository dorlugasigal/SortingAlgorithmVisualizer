import { Step } from "../components/scss/main";

const swap = (items: number[], leftIndex: number, rightIndex: number) => {
    const temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
};

const partition = (items: number[], left: number, right: number) => {
    const pivot = items[Math.floor((right + left) / 2)];
    let i = left;
    let j = right;
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
};

export async function quickSort(
    items: number[],
    left: number,
    right: number,
): Promise<Step[]> {
    return new Promise<Step[]>((resolve) => {
        const steps: Step[] = [];

        let index;
        if (items.length > 1) {
            index = partition(items, left, right); //index returned from partition
            if (left < index - 1) {
                steps.push({
                    highlightRange: [left, index - 1],
                    highlightElementAtIndex: [index],
                    swap: false,
                    done: false,
                });
                quickSort(items, left, index - 1);
            }
            if (index < right) {
                steps.push({
                    highlightRange: [index, right],
                    highlightElementAtIndex: [index],
                    swap: false,
                    done: false,
                });
                quickSort(items, index, right);
            }
        }
        resolve(steps);
    });
}
