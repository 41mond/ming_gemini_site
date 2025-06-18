const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
// 注意：在Vercel上，端口由环境自动管理，我们不需要自己指定
// const port = process.env.PORT || 3000; 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // 使用你确认可用的模型名称

// Middlewares
app.use(express.static('public'));
app.use(express.json());

// API 端点 (这部分不需要修改)
app.post('/api/gemini', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ text });

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: 'Failed to call Gemini API' });
    }
});

/*
// 在 Vercel (无服务器环境) 中，我们不需要手动监听端口。
// Vercel 会自动处理请求的传入和监听。
// 因此，我们需要注释掉或者删除 app.listen() 这部分。
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
*/

// 将 Express 应用实例导出，以便 Vercel 的运行时环境可以调用它。
// 这是在 Vercel 上部署 Express 应用的关键！
module.exports = app;