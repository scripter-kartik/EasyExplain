import dotenv from "dotenv";
dotenv.config();

async function checkAPI() {
    const apiKey = process.env.GEMINI_API_KEY;
    
    console.log("API Key:", apiKey ? `${apiKey.substring(0, 10)}...` : "MISSING");
    
    const testUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    
    try {
        const response = await fetch(testUrl);
        const data = await response.json();
        
        console.log("\nAPI Response Status:", response.status);
        console.log("\nAvailable Models:");
        
        if (data.models) {
            data.models.forEach(model => {
                console.log(`- ${model.name}`);
                if (model.supportedGenerationMethods) {
                    console.log(`  Methods: ${model.supportedGenerationMethods.join(', ')}`);
                }
            });
        } else {
            console.log("Error:", JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

checkAPI();