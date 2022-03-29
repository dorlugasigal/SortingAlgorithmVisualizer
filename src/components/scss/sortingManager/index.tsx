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
                    <Slider
                        className={styles.slider}
                        min={2}
                        max={100}
                        defaultValue={props.DEAFULT_AMOUNT_VALUE}
                        tooltipVisible
                        onChange={props.onSetAmount}
                    />
                </div>
                <div className={styles.sliderContainer}>
                    <label className={styles.label}>Speed</label>
                    <Slider
                        className={styles.slider}
                        min={0}
                        max={300}
                        defaultValue={props.DEAFULT_SPEED_VALUE}
                        onChange={props.onSetSpeed}
                    />
                </div>
            </div>
            <Button
                onClick={props.onGenerateArray}
                type="default"
                disabled={props.isSorting}
                size="large"
                className={styles.button}
            >
                {props.isSorting ? "Stop" : "Generate"}
            </Button>
            <Button
                onClick={props.onBeginSort}
                type="primary"
                danger={props.isSorting}
                size="large"
                className={styles.button}
            >
                Sort
            </Button>
        </div>
    );
};
