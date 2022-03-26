import { useState, useEffect } from "react";

interface WindowDimensions {
    width: number | null;
    height: number | null;
}

export default function useWindowDimensions(): WindowDimensions {
    const hasWindow = typeof window !== "undefined";

    function getWindowDimensions(): WindowDimensions {
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;
        return {
            width,
            height,
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions(),
    );

    function handleResize() {
        setWindowDimensions(getWindowDimensions());
    }

    useEffect(() => {
        if (hasWindow) {
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [hasWindow]);

    return windowDimensions;
}
