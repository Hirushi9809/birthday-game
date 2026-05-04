const birthdayData = [
    { q: "What's my fav color?", a: ["Red", "Blue"], correct: 1, gift: "Check your car!" },
    { q: "Our first movie?", a: ["Batman", "Dune"], correct: 0, gift: "Under the pillow" },
    // Add all 25 here...
];

// LocalStorage to save progress
let unlocked = JSON.parse(localStorage.getItem('wonGifts')) || [];

function init() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    
    for (let i = 1; i <= 25; i++) {
        const div = document.createElement('div');
        div.className = `grid-item ${unlocked.includes(i) ? 'won' : ''}`;
        div.innerText = i;
        div.onclick = () => openGift(i);
        grid.appendChild(div);
    }
}

function openGift(id) {
    if (unlocked.includes(id)) return;
    
    const data = birthdayData[id-1] || { q: "Sample Q?", a: ["A", "B"], correct: 0, gift: "Gift" };
    
    document.getElementById('modal-title').innerText = `Gift #${id}`;
    document.getElementById('question-text').innerText = data.q;
    document.getElementById('penalty').style.display = 'none';
    
    const btn0 = document.getElementById('opt0');
    const btn1 = document.getElementById('opt1');
    
    btn0.innerText = data.a[0];
    btn1.innerText = data.a[1];
    
    btn0.onclick = () => check(id, 0);
    btn1.onclick = () => check(id, 1);
    
    document.getElementById('modal').style.display = 'flex';
}

function check(id, choice) {
    const data = birthdayData[id-1] || { correct: 0, gift: "Gift" };
    if (choice === data.correct) {
        confetti();
        unlocked.push(id);
        localStorage.setItem('wonGifts', JSON.stringify(unlocked));
        document.getElementById('modal').style.display = 'none';
        init();
        if (unlocked.length === 25) showFinal();
    } else {
        document.getElementById('penalty').style.display = 'block';
    }
}

function showFinal() {
    document.getElementById('game-view').style.display = 'none';
    document.getElementById('final-screen').style.display = 'block';
}

init();