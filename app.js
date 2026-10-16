// ڕێکخستنی زمان و ئاڵاکان
const languageFlags = {
    'german': '🇩🇪',
    'english': '🇬🇧',
    'arabic': '🇸🇦',
    'french': '🇫🇷'
};

// ڕێکخستنی ئاستەکان بەپێی خاڵەکانی XP
function getLevelIcon(xp) {
    if (xp < 100) return '🪵'; // دار
    if (xp < 300) return '🥉'; // بڕۆنز
    if (xp < 600) return '🥈'; // زیو
    if (xp < 1000) return '🥇'; // ئاڵتوون
    return '💎'; // ئەڵماس
}

// نوێکردنەوەی شاشەکە
function updateUserData(language, currentXP, maxXP) {
    const flagElement = document.getElementById('country-flag');
    flagElement.innerText = languageFlags[language] || '🇩🇪';

    const levelElement = document.getElementById('lang-flag');
    levelElement.innerText = getLevelIcon(currentXP);

    const xpProgress = document.getElementById('xp-progress');
    let percentage = (currentXP / maxXP) * 100;
    if(percentage > 100) percentage = 100;
    xpProgress.style.width = percentage + '%';
}

// جێبەجێکردنی کاتێک پەڕەکە دەکرێتەوە
document.addEventListener("DOMContentLoaded", () => {
    // لێرەدا دەتوانیت XP و زمانەکە بگۆڕیت (ئێستا ١٥٠٠ دانراوە کە دەکاتە ئەڵماس)
    updateUserData('german', 1500, 2000); 
});
