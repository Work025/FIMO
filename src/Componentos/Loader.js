import React, { useEffect, useState } from "react";
import logoVideo from "../Assets/Logo-vd.mp4";
import "../Styles/Loader.css";

const Loader = ({ onFinish }) => {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        // Automatically hide loader after 3 seconds or when video ends
        const timer = setTimeout(() => {
            setHidden(true);
            setTimeout(onFinish, 800); // Wait for transition animation
        }, 3200);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className={`loader-overlay ${hidden ? "fade-out" : ""}`}>
            <div className="loader-content">
                <video
                    autoPlay
                    muted
                    playsInline
                    className="loader-video"
                    onEnded={() => setHidden(true)}
                >
                    <source src={logoVideo} type="video/mp4" />
                </video>
            </div>
        </div>
    );
};

export default Loader;
