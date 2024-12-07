export default function Ingredient({ item }) {
    return (
        <div>
            <ul>
                <li key={item.id}>
                    {item.amount} {item.unit} {item.name}
                </li>
            </ul>
        </div>
    );
}
