import FoodItem from "./FoodItem";

export default function FoodList({ foodData, setFoodId }) {
    console.log(foodData);
    return (
        <div>
            {foodData.map((food) => (
                <FoodItem setFoodId={setFoodId} key={food.id} food={food} />
            ))}
        </div>
    );
}
