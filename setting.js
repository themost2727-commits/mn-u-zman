const languageSelect = document.getElementById('language-select');
const soundToggle = document.getElementById('sound-toggle');
const musicToggle = document.getElementById('music-toggle');
const saveBtn = document.getElementById('save-settings-btn');
const resetBtn = document.getElementById('reset-btn');

// هێنانەوەی ڕێکخستنەکان لە بیرگەی وێبگەڕ لە کاتی کردنەوەی پەڕەکە
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem('app_language');
    if (savedLang) languageSelect.value = savedLang;

    const savedSound = localStorage.getItem('app_sound');
    if (savedSound !== null) soundToggle.checked = savedSound === 'true';

    const savedMusic = localStorage.getItem('app_music');
    if (savedMusic !== null) musicToggle.checked = savedMusic === 'true';
});

// پاشەکەوتکردنی گۆڕانکارییەکان
saveBtn.addEventListener('click', () => {
    localStorage.setItem('app_language', languageSelect.value);
    localStorage.setItem('app_sound', soundToggle.checked);
    localStorage.setItem('app_music', musicToggle.checked);
    
    alert("ڕێکخستنەکان پاشەکەوت کران!");
    window.location.href = 'index.html'; // گەڕانەوە بۆ پەڕەی سەرەکی
});

// سڕینەوەی داتاکان
resetBtn.addEventListener('click', () => {
    const confirmReset = confirm("ئایا دڵنیایت کە دەتەوێت هەموو ئاست و خاڵەکانت بسڕیتەوە؟");
    if (confirmReset) {
        localStorage.clear(); // هەموو شتێک دەسڕێتەوە، تەنانەت ناوی مامۆستای AIـیش
        alert("داتاکان سڕانەوە. ئەپەکە وەک یەکەمجاری لێهاتەوە.");
        window.location.href = 'index.html';
    }
});
