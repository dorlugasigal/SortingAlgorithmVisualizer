import React from "react";
import styles from "./index.module.scss";
import { Logo } from "@components/scss";
import { useRouter } from "next/router";

export const Header: React.FC = () => {
    const router = useRouter();

    return (
        <div className={styles.header}>
            <Logo withTitle />
            <>
                <a
                    onClick={() =>
                        router.push("/?value=1", undefined, { shallow: true })
                    }
                >
                    Value 1
                </a>

                <a
                    onClick={() =>
                        router.push("/?value=2", undefined, { shallow: true })
                    }
                >
                    Value 2
                </a>
            </>
        </div>
    );
};
