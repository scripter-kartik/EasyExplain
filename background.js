// background.js
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "easyexplain",
        title: "Explain simply",
        contexts: ["selection"]
    })
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "easyexplain" && info.selectionText) {
        await chrome.storage.local.set({
            lastText: info.selectionText,
            timestamp: Date.now()
        })
    }
})