const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // 加载 .env 文件中的环境变量

const app = express();
const port = process.env.PORT || 3000;

// 初始化 Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Middlewares
app.use(express.static('public')); // 告诉 Express 去哪里找前端文件 (html, css, js)
app.use(express.json());       // 让 Express 能够解析 JSON 格式的请求体

// 创建一个 API 端点来处理来自前端的请求
app.post('/api/gemini', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ text }); // 将结果以 JSON 格式返回给前端

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: 'Failed to call Gemini API' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


