import React from "react";
import { Slider } from "antd";

export type ISortingMetadata = {
    onChange: () => void;
    defaultValue: number;
};

export const SortingMetadata: React.FC<ISortingMetadata> = ({ ...props }) => {
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
