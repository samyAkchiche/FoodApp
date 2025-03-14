import { useState } from "react";
import Search from "./components/Search";
import FoodList from "./components/FoodList";
import Nav from "./components/Nav";
import "./App.css";
import Container from "./components/Container";
import InnerContainer from "./components/InnerContainer";
import FoodDetails from "./components/FoodDetails";
import Dialogue from "./components/Dialogue";

function App() {
    const [foodData, setFoodData] = useState([]);
    const [foodId, setFoodId] = useState("656329");
    const [darkMode, setDarkMode] = useState(false);
    const [apiError, setApiError] = useState(false);
    return (
        <div className={darkMode ? "App" : "darkDisplay"}>
            {apiError ? (
                <div className="dialogueOverlay">
                    <Dialogue />
                </div>
            ) : (
                <>
                    <Nav darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Search
                        setApiError={setApiError}
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
                            <FoodDetails
                                setApiError={setApiError}
                                foodId={foodId}
                                darkMode={darkMode}
                            />
                        </InnerContainer>
                    </Container>
                </>
            )}
        </div>
    );
}

export default App;
