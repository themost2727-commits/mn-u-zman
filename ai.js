const setupContainer = document.getElementById('setup-container');
const chatContainer = document.getElementById('chat-container');
const aiNameInput = document.getElementById('ai-name-input');
const saveBtn = document.getElementById('save-btn');
const displayAiName = document.getElementById('display-ai-name');

const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const chatBox = document.getElementById('chat-box');

// پشکنین بکە بزانە پێشتر ناوەکە پاشەکەوت کراوە یان نا
document.addEventListener("DOMContentLoaded", () => {
    const savedName = localStorage.getItem('ai_teacher_name');
    if (savedName) {
        // ئەگەر پێشتر ناوەکەی سەیڤ کردبوو، ڕاستەوخۆ بڕۆ ناو چاتەکە
        showChat(savedName);
    } else {
        // ئەگەر یەکەمجاری بوو، پۆپ-ئەپەکە پیشان بدە
        setupContainer.classList.remove('hidden');
    }
});

// کردارەکە بۆ پاشەکەوتکردنی ناوەکە
saveBtn.addEventListener('click', () => {
    let name = aiNameInput.value.trim();
    if (name === "") {
        name = "مامۆستا"; // ناوی پێشوەختە گەر هیچی نەنووسی
    }
    
    // پاشەکەوتکردنی ناو لە بیرگەی ناوخۆیی (Browser)
    localStorage.setItem('ai_teacher_name', name);
    showChat(name);
});

function showChat(aiName) {
    setupContainer.classList.add('hidden');
    chatContainer.classList.remove('hidden');
    displayAiName.innerText = "ناو: " + aiName; // دیاریکردنی ناوی دەستپێکراو
}

// لۆژیکی سادەی ناردنی نامە لە چاتدا
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const text = messageInput.value.trim();
    if (text === "") return;

    // نامەی بەکارهێنەر
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.innerText = text;
    chatBox.appendChild(userMsg);

    messageInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // وەڵامێکی ئۆتۆماتیکی سادە (وەک نموونە) لە لایەن AI دوای ١ چرکە
    setTimeout(() => {
        const savedName = localStorage.getItem('ai_teacher_name') || 'مامۆستا';
        const aiMsg = document.createElement('div');
        aiMsg.className = 'message ai';
        aiMsg.innerText = `من وەک ${savedName} ئامادەم یارمەتیت بدەم لەسەر هەموو بابەتێک.`;
        chatBox.appendChild(aiMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
}
