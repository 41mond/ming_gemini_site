// 注意：API Key 已经从这里移除了！

const promptInput = document.getElementById('prompt-input');
const sendButton = document.getElementById('send-button');
const resultOutput = document.getElementById('result-output');

sendButton.addEventListener('click', async () => {
    const prompt = promptInput.value;
    if (!prompt) {
        alert('一言不发，不正是那段噤若寒蝉的历史吗？');
        return;
    }

    sendButton.disabled = true;
    resultOutput.innerText = '今宵水国吟...';

    try {
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt })
        });

        if (!response.ok) {
            throw new Error(`服务器错误: ${response.statusText}`);
        }

        const data = await response.json();
        
        resultOutput.innerText = data.text;

    } catch (error) {
        console.error('Error:', error);
        resultOutput.innerText = '出错了，请稍后再试。';
    } finally {
        sendButton.disabled = false;
    }
});