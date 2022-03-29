import React from "react";
import styles from "./index.module.scss";
import { Logo } from "@components/scss";
import { useRouter } from "next/router";

export const Header: React.FC = () => {
    const router = useRouter();

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Logo withTitle />
            </div>
            <>
                <a
                    onClick={() =>
                        router.push("/?sortType=bubble", undefined, {
                            shallow: true,
                        })
                    }
                >
                    Bubble Sort
                </a>

                <a
                    onClick={() =>
                        router.push("/?sortType=quick", undefined, {
                            shallow: true,
                        })
                    }
                >
                    Quick Sort
                </a>
            </>
        </div>
    );
};
