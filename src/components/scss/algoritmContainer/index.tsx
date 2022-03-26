import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

import styles from "./index.module.scss";

export const AlgorithmContainer: React.FC = () => {
    const router = useRouter();

    useEffect(() => {}, [router.query.sortType]);
    
    return <div className={styles.wrapper}>{router.query.sortType}</div>;
};
