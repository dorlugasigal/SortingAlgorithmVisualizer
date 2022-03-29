import useWindowDimensions from "../../../hooks/windowDimension";
import styles from "./index.module.scss";
import React, { useEffect, useState } from "react";
import { Step } from "../main";
type VisualizerType = {
    array: number[];
    amount: number;
    steps: Step[];
    currentStepIndex: number;
};

export const Visualizer: React.FC<VisualizerType> = ({ ...props }) => {
    const { array, amount, steps ,currentStepIndex} = props;
    const currentStep = steps[currentStepIndex] ?? null;
    const { width } = useWindowDimensions();
    useEffect(()=>{
        if (currentStep && currentStep.swap)
        {
            swap(array,currentStep.highlightElementAtIndex[0],currentStep.highlightElementAtIndex[1])
        }
    },[])
    const inRange = (index: number) =>
        currentStep &&
        index >= currentStep.highlightRange[0] &&
        index <= currentStep.highlightRange[1];

    const swap = (arr: number[], xp: number, yp: number) => {
        const temp = arr[xp];
        arr[xp] = arr[yp];
        arr[yp] = temp;
    }
    const decideColor = (index: number) => {
        return currentStep &&
            currentStep.highlightElementAtIndex.includes(index)
            ? "black"
            : inRange(index)
            ? "green"
            : "darkgray";
    };

    const calculateWidth = () => {
        const widthCalculated =
            ((width ?? window.innerWidth) * 0.7) / amount -
            2 * (amount * -0.03 + 4);
        return widthCalculated;
    };
    return (
        <div className={styles.barsContainerWrapper}>
            <div className={styles.barsContainer}>
                {array.map((item, index) => (
                    <div key={index} className={styles.barContainer}>
                        <div
                            title={item.toString()}
                            style={{
                                height: `${item * 3 + 22}px`,
                                width: `${calculateWidth()}px`,
                                margin: `${amount * -0.03 + 4}px`,
                                marginBottom: `${amount * -0.03 + 4}px`,
                                backgroundColor: decideColor(index),
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "flex-end",
                            }}
                        >
                            {amount <= 40 && (
                                <div className={styles.barNumber}>{item}</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
