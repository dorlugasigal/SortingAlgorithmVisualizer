import React from "react";
import "antd/dist/antd.css";
import { Header, Main, Footer } from "@components/scss";

const Home: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                height: "100%",
            }}
        >
            <Header />
            <Main />
            <Footer />
        </div>
    );
};

export default Home;
