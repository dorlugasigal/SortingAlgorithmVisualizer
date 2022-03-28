import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { SortingManager } from "../sortingManager";
import { Visualizer } from "../visualizer";
import styles from "./index.module.scss";

export interface Step {
    highlightRange: number[];
    highlightElementAtIndex: number[];
}
export const Main: React.FC = () => {
    const router = useRouter();
    const DEAFULT_VALUE = 30;
    const [amount, setAmount] = useState(DEAFULT_VALUE);
    const [array, setArray] = useState<number[]>([]);
    //const [steps, setSteps] = useState<Step[]>([]);
    const [currentStep, setCurrentStep] = useState<Step>({} as Step);

    useEffect(() => undefined, [router.query.sortType]);
    useEffect(() => generateArray(), []);
    useEffect(() => generateArray(), [amount]);

    const generateArray = () => {
        const arr = [] as number[];
        for (let i = 0; i < amount; i++) {
            arr.push(Math.round(Math.random() * 200) + 1);
        }
        setCurrentStep({} as Step);
        setArray(arr);
    };

    const sort = () => {
        function swap(arr: number[], xp: number, yp: number) {
            const temp = arr[xp];
            arr[xp] = arr[yp];
            arr[yp] = temp;
        }

        function bubbleSort(arr: number[], n: number) {
            let i: number, j: number;
            for (i = 0; i < n - 1; i++) {
                for (j = 0; j < n - i - 1; j++) {
                    setTimeout(() => {
                        setCurrentStep({
                            highlightRange: [0, n - 1],
                            highlightElementAtIndex: [j, j + 1],
                        });
                    }, 1000);
                    if (arr[j] > arr[j + 1]) {
                        swap(arr, j, j + 1);
                        setTimeout(() => {
                            setArray([...arr]);
                        }, 1000);
                    }
                }
            }
        }
        bubbleSort(array, array.length);
    };
    return (
        <div className={styles.wrapper}>
            <SortingManager
                DEAFULT_VALUE={DEAFULT_VALUE}
                onSetAmount={setAmount}
                onGenerateArray={generateArray}
                onBeginSort={sort}
            />
            <Visualizer
                array={array}
                amount={amount}
                currentStep={currentStep}
            />
            {router.query.sortType}
        </div>
    );
};
