import React from "react";
import Image from "next/image";
import styles from "./index.module.scss";

export const Logo: React.FC<LogoProps> = ({ withTitle, title }) => {
    return (
        <div className={styles.wrapper}>
            <Image
                className={styles.withPadding}
                src="/icons/dlg-logo.svg"
                alt="nextjs"
                width="96"
                height="58"
            />
            {withTitle && (
                <h1 className={styles.withPadding}>
                    {title ?? "Sorting Algorithm Visualizer"}
                </h1>
            )}
        </div>
    );
};

type LogoProps = {
    withTitle: boolean;
    title?: string;
};
