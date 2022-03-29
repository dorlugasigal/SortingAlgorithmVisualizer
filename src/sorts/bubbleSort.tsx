import { Step } from "../components/scss/main";

const swap = (arr: number[], xp: number, yp: number) => {
    const temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
};

export async function bubbleSort(arr: number[], n: number): Promise<Step[]> {
    return new Promise<Step[]>((resolve) => {
        let i: number, j: number;
        const steps: Step[] = [];
        for (i = 0; i < n - 1; i++) {
            for (j = 0; j < n - i - 1; j++) {
                steps.push({
                    highlightRange: [0, n - 1],
                    highlightElementAtIndex: [j, j + 1],
                    swap: false,
                    done: false,
                });
                if (arr[j] > arr[j + 1]) {
                    swap(arr, j, j + 1);
                    steps.push({
                        highlightRange: [0, n - 1],
                        highlightElementAtIndex: [j, j + 1],
                        swap: true,
                        done: false,
                    });
                    steps.push({
                        highlightRange: [0, n - 1],
                        highlightElementAtIndex: [j, j + 1],
                        swap: false,
                        done: false,
                    });
                }
            }
        }
        steps.push({
            highlightRange: [0, n - 1],
            highlightElementAtIndex: [0, n + 1],
            swap: false,
            done: true,
        });
        resolve(steps);
    });
}
