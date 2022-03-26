import React from "react";
import { Button } from "antd";
import styles from "./index.module.scss";
import { eventNames } from "process";

export const MyButton: React.FC<IButton> = ({ children, ...props }) => {
    return (
        <Button
            onClick={props.onClick}
            type="primary"
            shape="round"
            size="large"
        >
            {props.label}
        </Button>
    );
};

type IButton = {
    label: string;
    onClick: (text: any) => void;
};
