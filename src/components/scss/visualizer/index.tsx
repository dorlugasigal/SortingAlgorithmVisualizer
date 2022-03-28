import useWindowDimensions from "../../../hooks/windowDimension";
import styles from "./index.module.scss";
import React, { useState } from "react";
import { Step } from "../main";
type VisualizerType = {
    array: number[];
    amount: number;
    // steps: Step[];
    currentStep: Step;
};

export const Visualizer: React.FC<VisualizerType> = ({ ...props }) => {
    const { array, amount, currentStep } = props;
    const { width } = useWindowDimensions();

    const inRange = (index: number) =>
        currentStep.highlightRange &&
        index >= currentStep.highlightRange[0] &&
        index <= currentStep.highlightRange[1];

    const decideColor = (index: number) => {
        return currentStep.highlightElementAtIndex &&
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
                    <div className={styles.barContainer}>
                        <div
                            key={index}
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
