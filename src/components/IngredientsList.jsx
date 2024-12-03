import Ingredient from "./Ingredient";

export default function IngredientsList({ food, isLoading }) {
    return (
        <div>
            {isLoading ? (
                <div>
                    <h3>Loading</h3>
                </div>
            ) : (
                food.extendedIngredients.map((item) => (
                    <Ingredient item={item} />
                ))
            )}
        </div>
    );
}
