import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { SortingMetadata } from "../sortingMetadata";
import { MyButton } from "../button";
import useWindowDimensions from "../../../hooks/windowDimension";
import styles from "./index.module.scss";

export const AlgorithmContainer: React.FC = () => {
    const router = useRouter();
    useEffect(() => generate(), []);
    useEffect(() => undefined, [router.query.sortType]);
    const { width, height } = useWindowDimensions();

    const DEAFULT_VALUE = 30;
    const [amount, setAmount] = useState(DEAFULT_VALUE);
    const [array, setArray] = useState([]);

    const generate = () => {
        var arr = [] as any;
        for (var i = 0; i < amount; i++) {
            arr.push(Math.round(Math.random() * 200) + 1);
        }
        arr.sort((a: number, b: number) => a - b);
        console.log(arr);
        setArray(arr);
    };

    const sort = () => {
        console.log("pressedSort");
        console.log(array);
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <SortingMetadata
                    defaultValue={DEAFULT_VALUE}
                    onChange={(event) => {
                        setAmount(event);
                        generate();
                    }}
                />
                <MyButton onClick={generate} label="Generate" />
                <MyButton onClick={sort} label="Sort" />
            </div>
            <div className={styles.barsContainerWrapper}>
                <div className={styles.barsContainer}>
                    {array.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                height: `${item * 3}px`,
                                width: `${
                                    width ?? window.innerWidth / array.length
                                }vw`,
                                margin: "5px",
                                backgroundColor: "darkgray",
                            }}
                        ></div>
                    ))}
                </div>
            </div>
            {router.query.sortType}
        </div>
    );
};
