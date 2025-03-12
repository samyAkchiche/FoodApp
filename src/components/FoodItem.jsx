import styles from "./fooditem.module.css";

export default function FoodItem({ food, setFoodId, darkMode }) {
    return (
        <div
            className={styles.itemContainer}
            style={{ backgroundColor: !darkMode ? "#282828" : "" }}
        >
            <img className={styles.itemImage} src={food.image} alt="" />
            <div className={styles.itemContent}>
                <p
                    className={styles.itemName}
                    style={{ color: !darkMode ? "#fff" : "" }}
                >
                    {food.title}
                </p>
            </div>
            <div className={styles.buttonContainer}>
                <button
                    onClick={() => {
                        console.log(food.id);
                        setFoodId(food.id);
                    }}
                    className={styles.itemButton}
                >
                    View Recipe
                </button>
            </div>
        </div>
    );
}
