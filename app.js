// ڕێکخستنی زمان و ئاڵاکان
const languageFlags = {
    'german': '🇩🇪',
    'english': '🇬🇧',
    'arabic': '🇸🇦',
    'french': '🇫🇷'
};

// ڕێکخستنی ئاستەکان بەپێی خاڵەکانی XP
function getLevelIcon(xp) {
    if (xp < 100) return '🪵';
    if (xp < 300) return '🥉';
    if (xp < 600) return '🥈';
    if (xp < 1000) return '🥇';
    return '💎';
}

// نوێکردنەوەی داتاکانی سەرەوە (شریتی XP و ئاڵاکان)
function updateUserData(language, currentXP, maxXP) {
    const flagElement = document.getElementById('country-flag');
    if(flagElement) flagElement.innerText = languageFlags[language] || '🇩🇪';

    const levelElement = document.getElementById('lang-flag');
    if(levelElement) levelElement.innerText = getLevelIcon(currentXP);

    const xpProgress = document.getElementById('xp-progress');
    if(xpProgress) {
        let percentage = (currentXP / maxXP) * 100;
        if(percentage > 100) percentage = 100;
        xpProgress.style.width = percentage + '%';
    }
}

// ==========================================
// بەشی نوێ: لۆژیکی جووڵەی کەسەکە لەناو مەتاهەکە
// ==========================================

// ئەمە ئەو خاڵانەن کە کەسەکە پێیدا دەڕوات. (دەتوانیت دواتر ئەم ژمارانە کەم و زیاد بکەیت بۆ ئەوەی ڕێک بکەوێتە سەر ڕێگا بەتاڵەکانی وێنەکەت)
const mazePathPoints = [
    { top: 5, left: 10 },   // خاڵی دەستپێک (کاتێک XP سفرە)
    { top: 20, left: 30 },  // قۆناغی دووەم
    { top: 40, left: 50 },  // قۆناغی سێیەم
    { top: 60, left: 70 },  // قۆناغی چوارەم
    { top: 85, left: 90 }   // خاڵی دەرچوون (کاتێک XP دەگاتە کۆتایی)
];

function updateMazePlayerPosition(currentXP, maxXP) {
    const playerIcon = document.getElementById('maze-player');
    if(!playerIcon) return; // ئەگەر مەتاهەکە لە پەڕەکەدا نەبوو، هیچ مەکە
    
    // دۆزینەوەی ڕێژەی سەدی XP (لەنێوان 0 و 1)
    let percentage = (currentXP / maxXP);
    if (percentage > 1) percentage = 1;
    if (percentage < 0) percentage = 0;

    // دۆزینەوەی شوێنی کەسەکە بەپێی XP
    const totalPoints = mazePathPoints.length - 1;
    const exactPosition = percentage * totalPoints; 
    const currentIndex = Math.floor(exactPosition); 
    
    if (currentIndex >= totalPoints) {
        playerIcon.style.top = mazePathPoints[totalPoints].top + '%';
        playerIcon.style.left = mazePathPoints[totalPoints].left + '%';
        return;
    }

    const nextIndex = currentIndex + 1;
    const remainder = exactPosition - currentIndex; 

    const currentPoint = mazePathPoints[currentIndex];
    const nextPoint = mazePathPoints[nextIndex];

    // حیسابکردنی جووڵەی نەرم لە نێوان دوو خاڵدا
    const finalTop = currentPoint.top + ((nextPoint.top - currentPoint.top) * remainder);
    const finalLeft = currentPoint.left + ((nextPoint.left - currentPoint.left) * remainder);

    // جێگیرکردنی کەسەکە لە شوێنی نوێ
    playerIcon.style.top = finalTop + '%';
    playerIcon.style.left = finalLeft + '%';
}

// جێبەجێکردنی فەرمانەکان کاتێک پەڕەکە دەکرێتەوە
document.addEventListener("DOMContentLoaded", () => {
    // لێرەدا دەتوانیت XP بگۆڕیت و تاقیی بکەیتەوە
    let userCurrentXP = 800; // ئێستا دانراوە لەسەر 800
    let userMaxXP = 2000;    // کۆی گشتی 2000

    updateUserData('german', userCurrentXP, userMaxXP); 
    updateMazePlayerPosition(userCurrentXP, userMaxXP);
});
