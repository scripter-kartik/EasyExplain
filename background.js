chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "easyExplain",
        title: "Explain simply",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "easyExplain") {
        chrome.tabs.sendMessage(tab.id, {
            type: "SELECTED_TEXT",
            text: info.selectionText
        });
    }
});