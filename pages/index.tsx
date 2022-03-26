import React from "react";

import { Header,  AlgorithmContainer, Footer } from "@components/scss";

const Home: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Header />
            <AlgorithmContainer />
            <Footer />
        </div>
    );
};

export default Home;
