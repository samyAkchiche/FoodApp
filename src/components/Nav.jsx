import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import styles from "./nav.module.css";

export default function Nav() {
    const [isMoon, setIsMoon] = useState(true);

    const toggleIcon = () => {
        setIsMoon(!isMoon);
    };
    return (
        <div className={styles.nav}>
            {" "}
            🍔 FoodApp
            <button
                className={styles.button}
                onClick={toggleIcon}
                style={{ backgroundColor: isMoon ? "" : "lightblue" }}
            >
                <FontAwesomeIcon
                    icon={isMoon ? faMoon : faSun}
                    style={{
                        fontSize: "1.5rem",
                        display: "hidden",
                        color: isMoon ? "white" : "yellow",
                    }}
                />
            </button>
        </div>
    );
}
