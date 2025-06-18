// api/gemini.js

const { GoogleGenerativeAI } = require('@google/generative-ai');
// 注意：在 Vercel 环境中，我们直接从环境变量读取，不需要 dotenv
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); // 确保模型名称正确

// 导出一个默认函数，这是 Vercel 处理请求的方式
export default async function handler(req, res) {
    // Vercel 会自动解析请求体，所以我们不需要 express.json()
    // 我们也只关心 POST 请求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { prompt } = req.body; // 从请求体中解构出 prompt
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // 直接返回结果
        res.status(200).json({ text });

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: 'Failed to call Gemini API' });
    }
}