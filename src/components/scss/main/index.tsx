import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { SortingManager } from "../sortingManager";
import useWindowDimensions from "../../../hooks/windowDimension";
import styles from "./index.module.scss";

export const Main: React.FC = () => {
    const router = useRouter();
    const DEAFULT_VALUE = 30;
    const [amount, setAmount] = useState(DEAFULT_VALUE);
    const [array, setArray] = useState<number[]>([]);
    const { width } = useWindowDimensions();
    const highlight = [1, 4, 7, 9];
    const range = [1, 18];
    const [openPanel, setOpenPanel] = useState(false);

    useEffect(() => undefined, [router.query.sortType]);
    useEffect(() => generateArray(), []);
    useEffect(() => generateArray(), [amount]);

    const generateArray = () => {
        const arr = [] as number[];
        for (let i = 0; i < amount; i++) {
            arr.push(Math.round(Math.random() * 200) + 1);
        }
        setArray(arr);
    };

    const sort = () => {
        let sorted = [...array];
        sorted = sorted.sort((a: number, b: number) => a - b);
        setArray(sorted);
    };

    const inRange = (index: number) =>
        range && range.length > 0 && index >= range[0] && index <= range[1];
    const decideColor = (index: number) => {
        return highlight.includes(index)
            ? "black"
            : inRange(index)
            ? "green"
            : "darkgray";
    };

    const calculateWidth = () => {
        const widthCalculated = (width ?? window.innerWidth - 100) / amount;
        return widthCalculated;
    };

    return (
        <div className={styles.wrapper}>
            <SortingManager
                DEAFULT_VALUE={DEAFULT_VALUE}
                onSetAmount={setAmount}
                onGenerateArray={generateArray}
                onBeginSort={sort}
            ></SortingManager>
            <div className={styles.barsContainerWrapper}>
                <div className={styles.barsContainer}>
                    {array.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                height: `${item * 3}px`,
                                width: `${calculateWidth()}vw`,
                                margin: "5px",
                                backgroundColor: decideColor(index),
                            }}
                        ></div>
                    ))}
                </div>
            </div>
            {router.query.sortType}
        </div>
    );
};
