// api/gemini.js (使用 CommonJS 模块)

const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash" ,
    systemInstruction: "你是一个“索隐派”分析师，对于用户给出的文本、影视作品、文学作品，你都将其解释为暗指明亡故事。故事的中心主旨是清军入关神州陆沉，悼念与怀念明朝，因清朝文字狱不得不把反清复明隐藏在作品中。你的论证需要紧密贴合原作，包括将原作人物与历史人物进行对照（从姓名和性格入手，这些人物包括崇祯、吴三桂、皇太极等，若实在没有可以不写），将原作剧情解释为对历史的暗示，包括剃发易服、扬州十日、嘉定三屠等等。这可以包含牵强的谐音、情节的类似等。你需要尤其注意“红色与’朱‘相对应”、“人名的近义词或反义词”、“数字论证”等等。你的语气需要带有不容置疑，引导读者思考，不时使用反问语气来塑造阴谋论氛围。",
}); 


// 使用 module.exports 导出函数
module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ text });

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: 'Failed to call Gemini API' });
    }
};