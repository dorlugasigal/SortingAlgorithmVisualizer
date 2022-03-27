import React, { useState } from "react";
import { Button, Slider } from "antd";
import styles from "./index.module.scss";

type SortingManagerProps = {
    DEAFULT_VALUE: number;
    onSetAmount: (amount: number) => void;
    onGenerateArray: () => void;
    onBeginSort: () => void;
};

export const SortingManager: React.FC<SortingManagerProps> = (props) => {
    return (
        <div className={styles.row}>
            <Slider
                className={styles.slider}
                min={10}
                max={100}
                defaultValue={props.DEAFULT_VALUE}
                tooltipVisible
                onChange={props.onSetAmount}
            />
            <Button
                onClick={props.onGenerateArray}
                type="default"
                size="large"
                className={styles.button}
            >
                Generate
            </Button>
            <Button
                onClick={props.onBeginSort}
                type="primary"
                size="large"
                className={styles.button}
            >
                Sort
            </Button>
        </div>
    );
};
