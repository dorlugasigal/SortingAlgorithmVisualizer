import React from "react";
import Image from "next/image";

import styles from "./index.module.scss";

export const Footer: React.FC = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.icons}>
                <a
                    href="https://github.com/dorlugasigal/SortingAlgorithmVisualizer"
                    target="_blank"
                >
                    <Image
                        src="/icons/github-icon.svg"
                        alt="github"
                        width="28"
                        height="29"
                    />
                </a>
                <a
                    href="https://www.linkedin.com/in/dor-lugasi-104736131/"
                    target="_blank"
                >
                    <Image
                        src="/icons/linkedin-icon.svg"
                        alt="linkedin"
                        width="28"
                        height="32"
                    />
                </a>
            </div>
        </div>
    );
};
