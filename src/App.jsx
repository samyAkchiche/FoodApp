import { useRef, useState } from "react";
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
    const [theme, setTheme] = useState("light");
    const [apiError, setApiError] = useState(false);

    const foodDetailsRef = useRef(null);

    const scrollToFoodDetails = () => {
        if (foodDetailsRef.current) {
            foodDetailsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const toggleTheme = () => {
        setTheme((current) => (current === "dark" ? "light" : "dark"));
    };

    return (
        <div className={theme === "dark" ? "theme-dark" : ""}>
            {apiError ? (
                <div className="dialogueOverlay">
                    <Dialogue />
                </div>
            ) : (
                <>
                    <Nav theme={theme} onToggleTheme={toggleTheme} />
                    <Search
                        setApiError={setApiError}
                        setFoodData={setFoodData}
                    />
                    <Container>
                        <InnerContainer>
                            <FoodList
                                setFoodId={setFoodId}
                                foodData={foodData}
                                scrollToFoodDetails={scrollToFoodDetails}
                            />
                        </InnerContainer>
                        <InnerContainer>
                            <div ref={foodDetailsRef}>
                                <FoodDetails
                                    setApiError={setApiError}
                                    foodId={foodId}
                                />
                            </div>
                        </InnerContainer>
                    </Container>
                </>
            )}
        </div>
    );
}

export default App;
