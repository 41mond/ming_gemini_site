// 注意：API Key 已经从这里移除了！

const promptInput = document.getElementById('prompt-input');
const sendButton = document.getElementById('send-button');
const resultOutput = document.getElementById('result-output');

sendButton.addEventListener('click', async () => {
    const prompt = promptInput.value;
    if (!prompt) {
        alert('请输入你的问题！');
        return;
    }

    sendButton.disabled = true;
    resultOutput.innerText = '正在分析中...';

    try {
        // 向我们自己的后端服务器发送请求
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt }) // 把 prompt 包在 JSON 对象里
        });

        if (!response.ok) {
            // 如果服务器返回错误状态码
            throw new Error(`服务器错误: ${response.statusText}`);
        }

        const data = await response.json();
        
        resultOutput.innerText = data.text; // 从后端返回的数据中获取 text

    } catch (error) {
        console.error('Error:', error);
        resultOutput.innerText = '出错了，请稍后再试。';
    } finally {
        sendButton.disabled = false;
    }
});