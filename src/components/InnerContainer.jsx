import styles from "./innerContainer.module.css";

export default function ({ children }) {
    return <div className={styles.innerContainer}>{children}</div>;
}
