import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { SortingMetadata } from "../sortingMetadata";
import { MyButton } from "../button";
import styles from "./index.module.scss";

export const AlgorithmContainer: React.FC = () => {
    const router = useRouter();
    useEffect(() => undefined, [router.query.sortType]);

    const [amount, setAmount] = useState(10);
    const [array, setArray] = useState([]);

    const generate = () => {
        var arr = [] as any;
        for (var i = 0; i < amount; i++) {
            arr.push(Math.round(Math.random() * 200));
        }
        setArray(arr);
    };

    const sort = () => {
        console.log("pressedSort");
        console.log(array);
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <SortingMetadata onChange={setAmount} />
                <MyButton onClick={generate} label="Generate" />
                <MyButton onClick={sort} label="Sort" />
            </div>

            <div className={styles.barsContainer}>
                {array.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            height: `${item * 5}px`,
                            width: "15px",
                            margin: "5px",
                            backgroundColor: "darkgray",
                        }}
                    ></div>
                ))}
            </div>

            {router.query.sortType}
        </div>
    );
};
