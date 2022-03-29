import useWindowDimensions from "../../../hooks/windowDimension";
import styles from "./index.module.scss";
import React, { useEffect } from "react";
import { Step } from "../main";
type VisualizerType = {
    array: number[];
    amount: number;
    steps: Step[];
    currentStepIndex: number;
};

export const Visualizer: React.FC<VisualizerType> = ({ ...props }) => {
    const { array, amount, steps, currentStepIndex } = props;
    const currentStep = steps[currentStepIndex] ?? null;
    const { width } = useWindowDimensions();
    const NOT_ACTIVE_COLOR = "#C582D5";
    const DARK_COLOR = "#71397C";
    const ACTIVE_COLOR = "#91519D";
    const COMPARING__COLOR = "#FFDF5A";
    useEffect(() => {
        if (currentStep && currentStep.swap) {
            swap(
                array,
                currentStep.highlightElementAtIndex[0],
                currentStep.highlightElementAtIndex[1],
            );
        }
        console.log(array);
    }, [currentStepIndex]);
    const inRange = (index: number) =>
        currentStep &&
        index >= currentStep.highlightRange[0] &&
        index <= currentStep.highlightRange[1];

    const swap = (arr: number[], xp: number, yp: number) => {
        const temp = arr[xp];
        arr[xp] = arr[yp];
        arr[yp] = temp;
    };
    const decideColor = (index: number) => {
        return currentStep && currentStep.done
            ? "#70d16a"
            : currentStep && currentStep.highlightElementAtIndex.includes(index)
            ? COMPARING__COLOR
            : inRange(index)
            ? ACTIVE_COLOR
            : NOT_ACTIVE_COLOR;
    };

    const decideBarNumberColor = (index: number) => {
        return currentStep && currentStep.done
            ? "#FFF"
            : currentStep && currentStep.highlightElementAtIndex.includes(index)
            ? DARK_COLOR
            : "#FFF";
    };

    const calculateMarginBottom = (index: number) => {
        return currentStep && currentStep.done
            ? amount * -0.03 + 4
            : currentStep && currentStep.highlightElementAtIndex.includes(index)
            ? amount * -0.03 - 14
            : amount * -0.03 + 4;
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
                                height: `${item * 3 + 30}px`,
                                width: `${calculateWidth()}px`,
                                margin: `${amount * -0.03 + 4}px`,
                                marginBottom: `${calculateMarginBottom(
                                    index,
                                )}px`,
                                transform: "all 0.3s ease-in-out",
                                borderRadius: "2.5rem 2.5rem 0 0",
                                backgroundColor: decideColor(index),
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "flex-end",
                            }}
                        >
                            {amount <= 40 && (
                                <div
                                    style={{
                                        color: decideBarNumberColor(index),
                                    }}
                                    className={styles.barNumber}
                                >
                                    {item}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
