// ڕێکخستنی زمان و ئاڵاکان
const languageFlags = {
    'german': '🇩🇪',
    'english': '🇬🇧',
    'arabic': '🇸🇦',
    'french': '🇫🇷'
};

// ڕێکخستنی ئاستەکان بەپێی خاڵەکانی XP
function getLevelIcon(xp) {
    if (xp < 100) return '🪵'; // دار (سەرەتا)
    if (xp < 300) return '🥉'; // بڕۆنز
    if (xp < 600) return '🥈'; // زیو
    if (xp < 1000) return '🥇'; // ئاڵتوون
    return '💎'; // ئەڵماس
}

// فانکشنێک بۆ نوێکردنەوەی شاشەکە
function updateUserData(language, currentXP, maxXP) {
    // ١. گۆڕینی ئاڵاکە
    const flagElement = document.getElementById('country-flag');
    flagElement.innerText = languageFlags[language] || '🇩🇪';

    // ٢. گۆڕینی ئایکۆنی ئاستەکە
    const levelElement = document.getElementById('lang-flag');
    levelElement.innerText = getLevelIcon(currentXP);

    // ٣. پڕکردنەوەی شریتی XP
    const xpProgress = document.getElementById('xp-progress');
    let percentage = (currentXP / maxXP) * 100;
    if(percentage > 100) percentage = 100;
    xpProgress.style.width = percentage + '%';
}

// تاقیکردنەوە: با وا دابنێین بەکارهێنەر زمانی ئەڵمانی هەڵبژاردووە و ١٥٠٠ XP هەیە
// گەر XP بکەیتە ٥٠، ئەوا دەبێتە دار 🪵، گەر بیکەیتە ١٥٠٠ دەبێتە ئەڵماس 💎
document.addEventListener("DOMContentLoaded", () => {
    updateUserData('german', 1500, 2000); 
});
