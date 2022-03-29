import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { SortingManager } from "../sortingManager";
import { Visualizer } from "../visualizer";
import styles from "./index.module.scss";
import { StepsProps } from "antd";

export interface Step {
    highlightRange: number[];
    highlightElementAtIndex: number[];
    swap: boolean;
}
export const Main: React.FC = () => {
    const router = useRouter();
    const DEAFULT_VALUE = 30;
    const [amount, setAmount] = useState(DEAFULT_VALUE);
    const [array, setArray] = useState<number[]>([]);
    const [steps, setSteps] = useState<Step[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

    useEffect(() => undefined, [router.query.sortType]);
    useEffect(() => generateArray(), []);
    useEffect(() => generateArray(), [amount]);

    const generateArray = () => {
        const arr = [] as number[];
        for (let i = 0; i < amount; i++) {
            arr.push(Math.round(Math.random() * 200) + 1);
        }
        setCurrentStepIndex(0);
        setSteps([]);
        setArray(arr);
    };
    const swap = (arr: number[], xp: number, yp: number) => {
        const temp = arr[xp];
        arr[xp] = arr[yp];
        arr[yp] = temp;
    };

    async function bubbleSort(arr: number[], n: number): Promise<Step[]> {
        return new Promise<Step[]>((resolve) => {
            let i: number, j: number;
            let steps: Step[] = [];
            for (i = 0; i < n - 1; i++) {
                for (j = 0; j < n - i - 1; j++) {
                    steps.push({
                        highlightRange: [0, n - 1],
                        highlightElementAtIndex: [j, j + 1],
                        swap: false,
                    });
                    if (arr[j] > arr[j + 1]) {
                        swap(arr, j, j + 1);
                        steps.push({
                            highlightRange: [0, n - 1],
                            highlightElementAtIndex: [j, j + 1],
                            swap: true,
                        });
                    }
                }
            }
            resolve(steps);
        });
    }
    const sort = async () => {
        var steps = await bubbleSort([...array], array.length);
        function updateCurrentStep(i: number) {
            setTimeout(function () {
                setSteps([...steps]);
                setCurrentStepIndex(i);
            }, i * 10);
        }
        for (let index = 0; index < steps.length; index++) {
            updateCurrentStep(index);
        }
    };
    return (
        <div className={styles.wrapper}>
            <SortingManager
                DEAFULT_VALUE={DEAFULT_VALUE}
                onSetAmount={setAmount}
                onGenerateArray={generateArray}
                onBeginSort={sort}
            />
            <button
                onClick={() => {
                    setCurrentStepIndex(currentStepIndex + 1);
                }}
            >
                Hi
            </button>
            <Visualizer
                array={array}
                amount={amount}
                steps={steps}
                currentStepIndex={currentStepIndex}
            />
            {router.query.sortType}
        </div>
    );
};
