// Proxies the handful of Spoonacular endpoints FoodApp needs.
// SPOONACULAR_API_KEY only ever exists here, on the server, so it never reaches
// the browser bundle.

const API_BASE = "https://api.spoonacular.com";

// Only the endpoints the app calls are allowed through, so this cannot be used
// as an open proxy: /recipes/complexSearch and /recipes/656329/information
const ALLOWED_PATH = /^\/recipes\/[A-Za-z0-9_-]+(?:\/[A-Za-z]+)?$/;

function json(statusCode, payload) {
    return {
        statusCode,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
    };
}

export const handler = async (event) => {
    const apiKey = process.env.SPOONACULAR_API_KEY;
    if (!apiKey) {
        return json(500, {
            error: "SPOONACULAR_API_KEY is not configured for this site.",
        });
    }

    // Netlify passes the original path through the rewrite, but the function can
    // also be called directly — strip either prefix.
    const path = (event.path ?? "").replace(
        /^\/(?:api\/spoonacular|\.netlify\/functions\/spoonacular)/,
        ""
    );

    if (!ALLOWED_PATH.test(path)) {
        return json(400, { error: `Unsupported Spoonacular path: ${path}` });
    }

    const url = new URL(`${API_BASE}${path}`);
    for (const [key, value] of Object.entries(
        event.queryStringParameters ?? {}
    )) {
        // Ignore any apiKey the caller sends: the key is ours to provide.
        if (key !== "apiKey" && value != null) {
            url.searchParams.set(key, value);
        }
    }
    url.searchParams.set("apiKey", apiKey);

    try {
        const response = await fetch(url);
        return {
            statusCode: response.status,
            headers: {
                "content-type":
                    response.headers.get("content-type") ?? "application/json",
            },
            body: await response.text(),
        };
    } catch (error) {
        console.error("Spoonacular proxy request failed:", error);
        return json(502, { error: "Could not reach the Spoonacular API." });
    }
};
