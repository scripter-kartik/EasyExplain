async function explainText() {
    const originalDiv = document.getElementById("original");
    const explanationDiv = document.getElementById("explanation");

    try {
        const data = await chrome.storage.local.get("lastText");

        if (!data.lastText) {
            originalDiv.textContent = "";
            explanationDiv.innerHTML = "Select text and right-click → <strong>'Explain simply'</strong>";
            return;
        }

        originalDiv.innerHTML = `<strong>Selected Text:</strong><br>${data.lastText}`;
        
        explanationDiv.innerHTML = "<strong>⚡ Generating explanation...</strong>";
        explanationDiv.classList.add("loading");

        console.log("Sending request to backend...");

        const res = await fetch("http://localhost:3000/explain", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: data.lastText })
        });

        console.log("Response status:", res.status);

        if (res.status === 429) {
            const errorData = await res.json();
            throw new Error("RATE_LIMIT");
        }

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || `Server error: ${res.status}`);
        }

        const result = await res.json();
        console.log("Success:", result);
        
        explanationDiv.classList.remove("loading");
        
        const modelInfo = result.model ? `<small style="opacity: 0.6;">(${result.model})</small>` : '';
        explanationDiv.innerHTML = 
            `<strong>Simple Explanation:</strong> ${modelInfo}<br>${result.explanation}`;

    } catch (error) {
        console.error("Full error:", error);
        
        explanationDiv.classList.remove("loading");
        
        let errorMessage = "Failed to explain text.";
        
        if (error.message === "RATE_LIMIT") {
            errorMessage = `⏳ <strong>Rate Limit Reached</strong><br><br>
                You've used your free quota. Please wait 1-2 minutes and try again.<br><br>
                <small>Tip: The free tier has daily limits.</small>`;
        } else if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
            errorMessage = `<strong>Cannot connect to backend</strong><br><br>
                Make sure:<br>
                • Backend is running (node server.js)<br>
                • It's on http://localhost:3000`;
        } else {
            errorMessage = `<strong>Error:</strong><br>${error.message}`;
        }
        
        explanationDiv.innerHTML = `<div style="color: #ff6b6b;">${errorMessage}</div>`;
    }
}

explainText();