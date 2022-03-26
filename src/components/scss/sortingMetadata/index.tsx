import React, { useState } from "react";
import styles from "./index.module.scss";
import { Slider, InputNumber, Row, Col } from "antd";

export type ISortingMetadata = {
    onChange: (text: any) => void;
    defaultValue: number;
};

export const SortingMetadata: React.FC<ISortingMetadata> = ({
    children,
    ...props
}) => {
    return (
        <Slider
            style={{ width: "50%" }}
            min={10}
            max={100}
            defaultValue={props.defaultValue}
            tooltipVisible
            onChange={props.onChange}
        />
    );
};
