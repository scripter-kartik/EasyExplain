chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "easyexplain",
        title: "Explain simply",
        contexts: ["selection"]
    })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "easyexplain") {
        chrome.tabs.sendMessage(tab.id, {
            action: "EXPLAIN_TEXT",
            text: info.selectionText
        }).catch(() => {
            console.log("Content script not ready yet.")
        })
    }
})