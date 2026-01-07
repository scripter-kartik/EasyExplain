const translations = {
    en: {
        title: '<h1 style="display:inline;margin:0;padding:0;font-size:30px;color:#4db8ff;font-weight:700;">E</h1>asy<h1 style="display:inline;margin:0;padding:0;font-size:30px;color:#4db8ff;font-weight:700;">E</h1>xplain',
        style: "Style:",
        mode_simple: "Simple",
        mode_eli5: "ELI5",
        mode_summary: "Summary",
        mode_detailed: "Detailed",
        mode_bullet: "Bullets",
        mode_technical: "Technical",
        copy: "Copy",
        copied: "✓ Copied!",
        selected_text: "Selected Text:",
        explanation_label: "Explanation:",
        generating: "Generating explanation...",
        select_instruction: "Select text and right-click → 'Explain simply'",
        error_connect: "Cannot connect to backend",
        error_backend: "Make sure the backend is running:",
        error_rate_limit: "⏳ Rate Limit Reached",
        error_tip: "Tip: Try again in a few minutes."
    },
    es: {
        title: '<h1 style="display:inline;margin:0;padding:0;font-size:20px;color:#4db8ff;font-weight:700;">E</h1>xplicación<h1 style="display:inline;margin:0;padding:0;font-size:20px;color:#4db8ff;font-weight:700;">F</h1>ácil',
        style: "Estilo:",
        mode_simple: "Simple",
        mode_eli5: "Como para niños",
        mode_summary: "Resumen",
        mode_detailed: "Detallado",
        mode_bullet: "Puntos",
        mode_technical: "Técnico",
        copy: "Copiar",
        copied: "✓ ¡Copiado!",
        selected_text: "Texto seleccionado:",
        explanation_label: "Explicación:",
        generating: "Generando explicación...",
        select_instruction: "Selecciona texto y haz clic derecho → 'Explicar simplemente'",
        error_connect: "No se puede conectar al backend",
        error_backend: "Asegúrate de que el backend esté ejecutándose:",
        error_rate_limit: "⏳ Límite de tasa alcanzado",
        error_tip: "Consejo: Inténtalo de nuevo en unos minutos."
    },
    fr: {
        title: '<h1 style="display:inline;margin:0;padding:0;font-size:20px;color:#4db8ff;font-weight:700;">E</h1>xplication<h1 style="display:inline;margin:0;padding:0;font-size:20px;color:#4db8ff;font-weight:700;">F</h1>acile',
        style: "Style :",
        mode_simple: "Simple",
        mode_eli5: "Pour enfants",
        mode_summary: "Résumé",
        mode_detailed: "Détaillé",
        mode_bullet: "Points",
        mode_technical: "Technique",
        copy: "Copier",
        copied: "✓ Copié !",
        selected_text: "Texte sélectionné :",
        explanation_label: "Explication :",
        generating: "Génération de l'explication...",
        select_instruction: "Sélectionnez du texte et cliquez droit → 'Expliquer simplement'",
        error_connect: "Impossible de se connecter au backend",
        error_backend: "Assurez-vous que le backend est en cours d'exécution :",
        error_rate_limit: "⏳ Limite de taux atteinte",
        error_tip: "Conseil : Réessayez dans quelques minutes."
    },
    de: {
        title: '<h1 style="display:inline;margin:0;padding:0;font-size:20px;color:#4db8ff;font-weight:700;">E</h1>infach<h1 style="display:inline;margin:0;padding:0;font-size:20px;color:#4db8ff;font-weight:700;">E</h1>rklärt',
        style: "Stil:",
        mode_simple: "Einfach",
        mode_eli5: "Für Kinder",
        mode_summary: "Zusammenfassung",
        mode_detailed: "Detailliert",
        mode_bullet: "Punkte",
        mode_technical: "Technisch",
        copy: "Kopieren",
        copied: "✓ Kopiert!",
        selected_text: "Ausgewählter Text:",
        explanation_label: "Erklärung:",
        generating: "Erklärung wird generiert...",
        select_instruction: "Text auswählen und Rechtsklick → 'Einfach erklären'",
        error_connect: "Verbindung zum Backend nicht möglich",
        error_backend: "Stellen Sie sicher, dass das Backend läuft:",
        error_rate_limit: "⏳ Ratenlimit erreicht",
        error_tip: "Tipp: Versuchen Sie es in ein paar Minuten erneut."
    },
    hi: {
        title: '<h1 style="display:inline;margin:0;padding:0;font-size:20px;color:#4db8ff;font-weight:700;">आ</h1>सानव्याख्या',
        style: "शैली:",
        mode_simple: "सरल",
        mode_eli5: "बच्चों के लिए",
        mode_summary: "सारांश",
        mode_detailed: "विस्तृत",
        mode_bullet: "बिंदु",
        mode_technical: "तकनीकी",
        copy: "कॉपी करें",
        copied: "✓ कॉपी हो गया!",
        selected_text: "चयनित पाठ:",
        explanation_label: "व्याख्या:",
        generating: "व्याख्या तैयार की जा रही है...",
        select_instruction: "पाठ चुनें और राइट-क्लिक करें → 'सरलता से समझाएं'",
        error_connect: "बैकएंड से कनेक्ट नहीं हो सकता",
        error_backend: "सुनिश्चित करें कि बैकएंड चल रहा है:",
        error_rate_limit: "⏳ दर सीमा पहुंच गई",
        error_tip: "सुझाव: कुछ मिनटों में फिर से प्रयास करें।"
    },
    zh: {
        title: '<h1 style="display:inline;margin:0;padding:0;font-size:20px;color:#4db8ff;font-weight:700;">简</h1>单解释',
        style: "风格：",
        mode_simple: "简单",
        mode_eli5: "儿童级",
        mode_summary: "摘要",
        mode_detailed: "详细",
        mode_bullet: "要点",
        mode_technical: "技术",
        copy: "复制",
        copied: "✓已复制！",
        selected_text: "选中的文本：",
        explanation_label: "解释：",
        generating: "正在生成解释...",
        select_instruction: "选择文本并右键单击 → '简单解释'",
        error_connect: "无法连接到后端",
        error_backend: "确保后端正在运行：",
        error_rate_limit: "⏳ 达到速率限制",
        error_tip: "提示：几分钟后再试。"
    }
};

let currentLang = "en";
let currentText = null;

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get("language", (data) => {
        if (data.language) {
            currentLang = data.language;
            updateLanguage(currentLang);
            document.querySelectorAll(".lang-btn").forEach(btn => {
                if (btn.dataset.lang === currentLang) {
                    btn.classList.add("active");
                } else {
                    btn.classList.remove("active");
                }
            });
        }
    });

    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const lang = btn.dataset.lang;
            currentLang = lang;
            
            document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            chrome.storage.local.set({ language: lang });
            updateLanguage(lang);
            
            if (currentText) {
                explainText();
            }
        });
    });

    document.getElementById("mode").addEventListener("change", () => {
        if (currentText) {
            explainText();
        }
    });

    document.getElementById("regenerate-btn").addEventListener("click", () => {
        if (currentText) {
            const btn = document.getElementById("regenerate-btn");
            btn.classList.add("generating");
            explainText().finally(() => {
                btn.classList.remove("generating");
            });
        }
    });

    document.getElementById("copy-btn").addEventListener("click", () => {
        const t = translations[currentLang] || translations.en;
        const explanation = document.getElementById("explanation").innerText;
        navigator.clipboard.writeText(explanation).then(() => {
            const btn = document.getElementById("copy-btn");
            const originalText = btn.textContent;
            btn.textContent = t.copied;
            btn.classList.add("copied");
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove("copied");
            }, 2000);
        }).catch(err => {
            console.error("Copy failed:", err);
        });
    });

    explainText();
});

function updateLanguage(lang) {
    const t = translations[lang] || translations.en;
    
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        if (t[key]) {
            if (key === 'title') {
                el.innerHTML = t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });
}

function formatBulletPoints(text) {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    let inList = false;
    let result = [];
    let listItems = [];
    let isNumberedList = false;
    
    lines.forEach(line => {
        const isBullet = /^[•\-\*]\s+/.test(line);
        const isNumbered = /^\d+\.\s+/.test(line);
        
        if (isBullet || isNumbered) {
            if (!inList) {
                inList = true;
                listItems = [];
                isNumberedList = isNumbered;
            }
            const content = line.replace(/^[•\-\*]\s+/, '').replace(/^\d+\.\s+/, '');
            listItems.push(content);
        } else {
            if (inList) {
                result.push(isNumberedList 
                    ? `<ol>${listItems.map(item => `<li>${item}</li>`).join('')}</ol>`
                    : `<ul>${listItems.map(item => `<li>${item}</li>`).join('')}</ul>`
                );
                inList = false;
                listItems = [];
            }
            if (line) {
                result.push(`<p style="margin: 8px 0;">${line}</p>`);
            }
        }
    });
    
    if (inList && listItems.length > 0) {
        result.push(isNumberedList
            ? `<ol>${listItems.map(item => `<li>${item}</li>`).join('')}</ol>`
            : `<ul>${listItems.map(item => `<li>${item}</li>`).join('')}</ul>`
        );
    }
    
    return result.join('');
}

async function explainText(mode = null) {
    const t = translations[currentLang] || translations.en;
    const originalDiv = document.getElementById("original");
    const explanationDiv = document.getElementById("explanation");
    const actionsDiv = document.getElementById("actions");
    const modeSelect = document.getElementById("mode");

    if (!mode) {
        mode = modeSelect.value;
    }

    try {
        const data = await chrome.storage.local.get("lastText");

        if (!data.lastText) {
            originalDiv.textContent = "";
            explanationDiv.innerHTML = t.select_instruction;
            actionsDiv.style.display = "none";
            return;
        }

        currentText = data.lastText;
        originalDiv.innerHTML = `<strong>${t.selected_text}</strong><br>${data.lastText}`;
        explanationDiv.innerHTML = `<strong>${t.generating}</strong>`;
        explanationDiv.classList.add("loading");
        actionsDiv.style.display = "none";

        const res = await fetch("http://localhost:3000/explain", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: data.lastText,
                mode: mode,
                language: currentLang
            })
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.details || errorData.error || `Server error: ${res.status}`);
        }

        const result = await res.json();
        explanationDiv.classList.remove("loading");

        const modeNames = {
            simple: t.mode_simple,
            eli5: t.mode_eli5,
            summary: t.mode_summary,
            detailed: t.mode_detailed,
            bullet: t.mode_bullet,
            technical: t.mode_technical
        };

        const modeBadge = `<span class="mode-badge">${modeNames[result.mode] || result.mode}</span>`;
        const apiLabel = `<span class="api-badge-inline ${result.api}">${result.api.toUpperCase()}</span>`;

        let formattedExplanation = result.explanation;
        if (mode === "bullet") {
            formattedExplanation = formatBulletPoints(result.explanation);
        }

        explanationDiv.innerHTML = `<strong>${t.explanation_label}${modeBadge}${apiLabel}</strong><br>${formattedExplanation}`;
        actionsDiv.style.display = "block";

    } catch (error) {
        console.error("Full error:", error);
        explanationDiv.classList.remove("loading");
        actionsDiv.style.display = "none";

        let errorMessage = t.error_connect;

        if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
            errorMessage = `<strong>${t.error_connect}</strong><br><br>${t.error_backend}<br><code style="background: #0f1624; padding: 4px 8px; border-radius: 4px; display: block; margin-top: 8px;">node server.js</code>`;
        } else if (error.message.includes("rate limit") || error.message.includes("All APIs")) {
            errorMessage = `${t.error_rate_limit}<br><br>${error.message}<br><br><small>${t.error_tip}</small>`;
        } else {
            errorMessage = `<strong>Error:</strong><br>${error.message}`;
        }

        explanationDiv.innerHTML = `<div style="color: #ff6b6b;">${errorMessage}</div>`;
    }
}