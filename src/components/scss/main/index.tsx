import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { SortingManager } from "../sortingManager";
import { Visualizer } from "../visualizer";
import styles from "./index.module.scss";

export interface Step {
    highlightRange: number[];
    highlightElementAtIndex: number[];
    swap: boolean;
}
export const Main: React.FC = () => {
    const router = useRouter();
    const DEAFULT_ARRARY_SIZE = 30;
    const DEAFULT_SPEED = 100;
    const [amount, setAmount] = useState(DEAFULT_ARRARY_SIZE);
    const [speed, setSpeed] = useState(DEAFULT_SPEED);
    const [array, setArray] = useState<number[]>([]);
    const [steps, setSteps] = useState<Step[]>([]);
    const [isSorting, setIsSorting] = useState(false);

    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
    const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([]);

    useEffect(() => undefined, [router.query.sortType]);
    useEffect(() => generateArray(), []);
    useEffect(() => generateArray(), [amount]);

    const generateArray = () => {
        const arr = [] as number[];
        for (let i = 0; i < amount; i++) {
            arr.push(Math.round(Math.random() * 200) + 1);
        }
        timeouts.forEach((timeout) => clearTimeout(timeout));
        setTimeouts([]);
        setCurrentStepIndex(0);
        setSteps([]);
        setIsSorting(false);
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
            const steps: Step[] = [];
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
        if (timeouts.length > 0) {
            timeouts.forEach((timeout) => clearTimeout(timeout));
            setTimeouts([]);
            setIsSorting(false);
            return;
        }
        const updateCurrentStep = (i: number): NodeJS.Timeout => {
            return setTimeout(function () {
                setSteps([...steps]);
                setCurrentStepIndex(i);
            }, i * speed);
        };
        setIsSorting(true);
        const steps = await bubbleSort([...array], array.length);
        const timeoutsArray = [];
        for (let index = 0; index < steps.length; index++) {
            timeoutsArray.push(updateCurrentStep(index));
        }
        setTimeouts(timeoutsArray);
    };
    return (
        <div className={styles.wrapper}>
            <SortingManager
                DEAFULT_AMOUNT_VALUE={DEAFULT_ARRARY_SIZE}
                DEAFULT_SPEED_VALUE={DEAFULT_SPEED}
                onSetAmount={setAmount}
                onSetSpeed={setSpeed}
                onGenerateArray={generateArray}
                onBeginSort={sort}
                isSorting={isSorting}
            />
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
