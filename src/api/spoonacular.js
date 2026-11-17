// All recipe requests go through /api/spoonacular, which is the Netlify function
// in production and the Vite dev proxy locally. The API key is added server-side.
const API_BASE = "/api/spoonacular";

async function request(path, signal) {
    const response = await fetch(`${API_BASE}${path}`, { signal });
    if (!response.ok) {
        throw new Error(
            `Spoonacular request failed: ${response.status} ${response.statusText}`
        );
    }
    return response.json();
}

export function searchRecipes(query, signal) {
    return request(
        `/recipes/complexSearch?query=${encodeURIComponent(query)}`,
        signal
    );
}

export function getRecipeInformation(foodId, signal) {
    return request(
        `/recipes/${encodeURIComponent(foodId)}/information`,
        signal
    );
}

export function isAbortError(error) {
    return error?.name === "AbortError";
}
