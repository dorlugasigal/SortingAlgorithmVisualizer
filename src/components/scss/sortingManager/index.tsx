import React from "react";
import { Button, Slider } from "antd";
import styles from "./index.module.scss";

type SortingManagerProps = {
    DEAFULT_AMOUNT_VALUE: number;
    DEAFULT_SPEED_VALUE: number;
    isSorting: boolean;
    onSetAmount: (amount: number) => void;
    onSetSpeed: (amount: number) => void;
    onGenerateArray: () => void;
    onBeginSort: () => void;
};

export const SortingManager: React.FC<SortingManagerProps> = (props) => {
    return (
        <div className={styles.row}>
            <div className={styles.slidersContainer}>
                <div className={styles.sliderContainer}>
                    <label className={styles.label}>Amount</label>
                    {GetSlider(
                        props.onSetAmount,
                        props.DEAFULT_AMOUNT_VALUE,
                        props.isSorting,
                        2,
                        100,
                    )}
                </div>
                <div className={styles.sliderContainer}>
                    <label className={styles.label}>Speed</label>
                    {GetSlider(
                        props.onSetSpeed,
                        props.DEAFULT_SPEED_VALUE,
                        props.isSorting,
                        0,
                        300,
                        false,
                    )}
                </div>
            </div>
            <Button
                onClick={props.onGenerateArray}
                type="primary"
                size="large"
                className={styles.button}
                disabled={props.isSorting}
            >
                Generate
            </Button>
            <Button
                onClick={props.onBeginSort}
                type="primary"
                size="large"
                className={styles.button}
                danger={props.isSorting}
            >
                {props.isSorting ? "Stop" : "Start Sorting"}
            </Button>
        </div>
    );

    function GetSlider(
        onChange: (value: number) => void,
        defaultValue: number,
        isSorting: boolean,
        min: number,
        max: number,
        showTooltip = true,
    ): JSX.Element {
        return (
            <Slider
                className={styles.slider}
                min={min}
                max={max}
                disabled={isSorting}
                defaultValue={defaultValue}
                tooltipVisible={showTooltip}
                onChange={onChange}
                trackStyle={{ backgroundColor: "#5e408f" }}
                handleStyle={{
                    backgroundColor: "#5e408f",
                    border: "#47306c",
                }}
            />
        );
    }
};
