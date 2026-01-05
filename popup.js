let currentText = null;

async function explainText(mode = null) {
    const originalDiv = document.getElementById("original");
    const explanationDiv = document.getElementById("explanation");
    const actionsDiv = document.getElementById("actions");
    const modeSelect = document.getElementById("mode");
    const apiBadge = document.getElementById("api-badge");

    if (!mode) {
        mode = modeSelect.value;
    }

    try {
        const data = await chrome.storage.local.get("lastText");

        if (!data.lastText) {
            originalDiv.textContent = "";
            explanationDiv.innerHTML = "Select text and right-click → <strong>'Explain simply'</strong>";
            actionsDiv.style.display = "none";
            return;
        }

        currentText = data.lastText;

        originalDiv.innerHTML = `<strong>Selected Text:</strong><br>${data.lastText}`;

        explanationDiv.innerHTML = "<strong>⚡ Generating explanation...</strong>";
        explanationDiv.classList.add("loading");
        actionsDiv.style.display = "none";

        console.log("Sending request to backend...");

        const res = await fetch("http://localhost:3000/explain", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: data.lastText,
                mode: mode
            })
        });

        console.log("Response status:", res.status);

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.details || errorData.error || `Server error: ${res.status}`);
        }

        const result = await res.json();
        console.log("Success:", result);

        explanationDiv.classList.remove("loading");

        const apiConfig = {
            groq: { emoji: "⭐", name: "Groq (14k/day)", class: "groq" },
            cohere: { emoji: "🟣", name: "Cohere (5k/month)", class: "cohere" },
            gemini: { emoji: "🔷", name: "Gemini (1.5k/day)", class: "gemini" }
        };

        const config = apiConfig[result.api] || { name: result.api, class: "" };
        apiBadge.textContent = config.emoji;
        apiBadge.className = config.class;
        apiBadge.title = config.name;

        const modeNames = {
            simple: "Simple",
            eli5: "ELI5",
            summary: "Summary",
            detailed: "Detailed",
            bullet: "Bullets",
            technical: "Technical"
        };

        const modeBadge = `<span class="mode-badge">${modeNames[result.mode] || result.mode}</span>`;
        const apiLabel = `<span class="api-badge-inline ${result.api}">${result.api.toUpperCase()}</span>`;

        explanationDiv.innerHTML =
            `<strong>Explanation:${modeBadge}${apiLabel}</strong><br>${result.explanation}`;

        actionsDiv.style.display = "block";

    } catch (error) {
        console.error("Full error:", error);

        explanationDiv.classList.remove("loading");
        actionsDiv.style.display = "none";

        let errorMessage = "Failed to explain text.";

        if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
            errorMessage = `<strong>Cannot connect to backend</strong><br><br>
                Make sure the backend is running:<br>
                <code style="background: #0f1624; padding: 4px 8px; border-radius: 4px; display: block; margin-top: 8px;">node server.js</code>`;
        } else if (error.message.includes("rate limit") || error.message.includes("All APIs")) {
            errorMessage = `⏳ <strong>Rate Limit Reached</strong><br><br>
                ${error.message}<br><br>
                <small>Tip: Try again in a few minutes.</small>`;
        } else {
            errorMessage = `<strong>Error:</strong><br>${error.message}`;
        }

        explanationDiv.innerHTML = `<div style="color: #ff6b6b;">${errorMessage}</div>`;
    }
}

explainText();

document.getElementById("mode").addEventListener("change", () => {
    if (currentText) {
        explainText();
    }
});

document.getElementById("regenerate-btn").addEventListener("click", () => {
    if (currentText) {
        explainText();
    }
});

document.getElementById("copy-btn").addEventListener("click", () => {
    const explanation = document.getElementById("explanation").innerText;
    navigator.clipboard.writeText(explanation).then(() => {
        const btn = document.getElementById("copy-btn");
        const originalText = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error("Copy failed:", err);
    });
});