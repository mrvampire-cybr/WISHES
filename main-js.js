// Language translations
const translations = {
    en: {
        title: "🕉️ Maha Shivaratri Blessings 🕉️",
        namePlaceholder: "Enter your name",
        generateButton: "Generate Wish",
        blessingsTitle: "🙏 Blessed Wishes 🙏",
        shareButton: "Share Wish",
        chantTitle: "Om Namah Shivaya Chant Counter",
        chantButton: "Count Chant",
        wishTemplate: "{name} sends blessed Maha Shivaratri wishes! 🕉️",
        chantUpdate: "{name} has chanted {count} times"
    },
    hi: {
        title: "🕉️ महाशिवरात्रि की शुभकामनाएं 🕉️",
        namePlaceholder: "अपना नाम दर्ज करें",
        generateButton: "शुभकामना बनाएं",
        blessingsTitle: "🙏 आशीर्वाद 🙏",
        shareButton: "शेयर करें",
        chantTitle: "ॐ नमः शिवाय मंत्र गणना",
        chantButton: "मंत्र गिनें",
        wishTemplate: "{name} की ओर से महाशिवरात्रि की शुभकामनाएं! 🕉️",
        chantUpdate: "{name} ने {count} बार मंत्र का जाप किया"
    }
};

let currentLanguage = 'en';
let chantCount = 0;
const chantHistory = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    updateUIText();
});

// Language selection
document.getElementById('languageSelect').addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    updateUIText();
});

function updateUIText() {
    const lang = translations[currentLanguage] || translations.en;
    document.getElementById('mainTitle').innerText = lang.title;
    document.getElementById('userName').placeholder = lang.namePlaceholder;
    document.getElementById('generateButton').innerText = lang.generateButton;
    document.getElementById('chantTitle').innerText = lang.chantTitle;
    document.getElementById('chantButton').innerText = lang.chantButton;
}

// Generate wish
document.getElementById('generateButton').addEventListener('click', () => {
    const name = document.getElementById('userName').value;
    if (!name) {
        alert('Please enter your name');
        return;
    }

    const lang = translations[currentLanguage];
    const wishText = lang.wishTemplate.replace('{name}', name);
    
    document.getElementById('wishText').innerText = wishText;
    document.getElementById('wishDisplay').style.display = 'block';

    saveData();
});

// Chant counter
document.getElementById('chantButton').addEventListener('click', () => {
    const name = document.getElementById('userName').value;
    if (!name) {
        alert('Please enter your name first');
        return;
    }

    chantCount++;
    document.getElementById('chantCounter').innerText = chantCount;

    const lang = translations[currentLanguage];
    const chantUpdate = lang.chantUpdate
        .replace('{name}', name)
        .replace('{count}', chantCount);

    chantHistory.unshift(chantUpdate);
    updateChantHistory();
    saveData();
});

// Share functionality
function shareWish(platform) {
    const wishText = document.getElementById('wishText').innerText;
    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(wishText);

    switch (platform) {
        case 'whatsapp':
            window.open(`https://wa.me/?text=${shareText}%20${shareUrl}`);
            break;
        case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`);
            break;
        case 'copy':
            navigator.clipboard.writeText(wishText + '\n' + window.location.href)
                .then(() => alert('Link copied to clipboard!'));
            break;
    }
}

// Helper functions
function updateChantHistory() {
    const historyHTML = chantHistory
        .slice(0, 10)
        .map(update => `<div>${update}</div>`)
        .join('');
    document.getElementById('chantHistory').innerHTML = historyHTML;
}

function saveData() {
    const data = {
        name: document.getElementById('userName').value,
        chantCount,
        chantHistory,
        language: currentLanguage
    };
    localStorage.setItem('shivaratriData', JSON.stringify(data));
}

function loadSavedData() {
    const saved = localStorage.getItem('shivaratriData');
    if (saved) {
        const data = JSON.parse(saved);
        document.getElementById('userName').value = data.name || '';
        chantCount = data.chantCount || 0;
        document.getElementById('chantCounter').innerText = chantCount;
        if (data.chantHistory) {
            chantHistory.push(...data.chantHistory);
            updateChantHistory();
        }
        if (data.language) {
            currentLanguage = data.language;
            document.getElementById('languageSelect').value = currentLanguage;
        }
    }
}
