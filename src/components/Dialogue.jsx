import styles from "./dialogue.module.css";

export default function Dialogue() {
    return (
        <div className={styles.card}>
            <h2>⚠️ API Request Limit Reached</h2>
            <p>
                The maximum number of API requests has been reached for today.
                Please try again after 24 hours.
            </p>
            <button onClick={() => window.close()} className={styles.button}>
                OK
            </button>
        </div>
    );
}
