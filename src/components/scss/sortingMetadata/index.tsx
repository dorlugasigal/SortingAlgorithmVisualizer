import React, { useState } from "react";
import styles from "./index.module.scss";
import { Slider, InputNumber, Row, Col } from "antd";

export type ISortingMetadata = {
    onChange: (text: any) => void;
};

export const SortingMetadata: React.FC<ISortingMetadata> = ({
    children,
    ...props
}) => {
    const [amount, setAmount] = useState(10);
    const onChange = (value: any) => {
        setAmount(value);
        props.onChange(value);
    };

    return (
        <Row className={styles.row}>
            <Col span={12}>
                <Slider
                    min={10}
                    max={100}
                    onChange={onChange}
                    value={typeof amount === "number" ? amount : 0}
                />
            </Col>
            <Col span={4}>
                <InputNumber
                    min={10}
                    max={100}
                    style={{ margin: "0 16px" }}
                    value={amount}
                    onChange={onChange}
                />
            </Col>
        </Row>
    );
};
