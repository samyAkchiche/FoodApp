import styles from "./ingredient.module.css";

export default function Ingredient({ item }) {
    return (
        <div className={styles.container}>
            <ul>
                <li key={item.id}>
                    {item.name} {item.amount} {item.unit}
                </li>
            </ul>
        </div>
    );
}
