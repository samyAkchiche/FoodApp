import FoodItem from "./FoodItem";
import styles from "./foodList.module.css";

export default function FoodList({ foodData, setFoodId, darkMode }) {
    console.log(foodData);
    return (
        <div className={styles.foodList}>
            {foodData.map((food) => (
                <FoodItem
                    setFoodId={setFoodId}
                    key={food.id}
                    food={food}
                    darkMode={darkMode}
                />
            ))}
        </div>
    );
}
