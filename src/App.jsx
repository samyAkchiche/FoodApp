import { useState } from "react";
import Search from "./components/Search";
import FoodList from "./components/FoodList";
import Nav from "./components/Nav";
import "./App.css";
import Container from "./components/Container";
import InnerContainer from "./components/InnerContainer";
import FoodDetails from "./components/FoodDetails";

function App() {
    const [foodData, setFoodData] = useState([]);
    const [foodId, setFoodId] = useState("656329");
    const [darkMode, setDarkMode] = useState(false);
    return (
        <div className={darkMode ? "App" : "darkDisplay"}>
            <Nav darkMode={darkMode} setDarkMode={setDarkMode} />
            <Search
                foodData={foodData}
                setFoodData={setFoodData}
                darkMode={darkMode}
            />
            <Container>
                <InnerContainer>
                    <FoodList
                        setFoodId={setFoodId}
                        foodData={foodData}
                        darkMode={darkMode}
                    />
                </InnerContainer>
                <InnerContainer>
                    <FoodDetails foodId={foodId} darkMode={darkMode} />
                </InnerContainer>
            </Container>
        </div>
    );
}

export default App;
