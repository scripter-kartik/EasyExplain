chrome.storage.local.get("lastText", (data) => {
    const contentDiv = document.getElementById("content");

    if (data.lastText) {
        contentDiv.textContent = data.lastText
    }
})