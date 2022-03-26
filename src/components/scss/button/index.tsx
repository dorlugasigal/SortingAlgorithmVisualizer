import React from "react";
import { Button } from "antd";
import styles from "./index.module.scss";

export const MyButton: React.FC<IButton> = ({ ...props }) => {
    return (
        <Button
            className={styles.button}
            onClick={props.onClick}
            type="primary"
            size="large"
        >
            {props.label}
        </Button>
    );
};

type IButton = {
    label: string;
    onClick: () => void;
};
