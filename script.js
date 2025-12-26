import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getDatabase, ref, push, query, limitToLast, onChildAdded, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCbteU0tkgb1JCUmsKUbvGIzVjvK1QP8rM",
    authDomain: "message-anonymously.firebaseapp.com",
    databaseURL: "https://message-anonymously-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "message-anonymously",
    storageBucket: "message-anonymously.firebasestorage.app",
    messagingSenderId: "811375391888",
    appId: "1:811375391888:web:7a861e558313c9c2761415",
    measurementId: "G-49W7ZMBR2S"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, 'messages');

const input = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const stream = document.getElementById('thought-stream');
const charDisplay = document.getElementById('charNum');
const starfield = document.getElementById('starfield');

const colors = ["#FFD700", "#C77DFF", "#FB7185", "#34D399", "#60A5FA", "#F472B6"];
const fonts = [
    "'Courier New', monospace",
    "'Georgia', serif",
    "'Arial Black', sans-serif",
    "'Brush Script MT', cursive",
    "'Times New Roman', serif",
    "'Verdana', sans-serif"
];

function createStars() {
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const xy = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const size = Math.random() * 2 + 1;
        
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        
        starfield.appendChild(star);
    }
}
createStars();

input.addEventListener('input', () => {
    charDisplay.textContent = input.value.length;
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

sendBtn.addEventListener('click', sendMessage);

function sendMessage() {
    const text = input.value.trim();
    if (text.length === 0 || text.length > 60) return;

    push(messagesRef, {
        text: text,
        createdAt: serverTimestamp()
    }).then(() => {
        input.value = '';
        charDisplay.textContent = '0';
    }).catch((error) => console.error(error));
}

const q = query(messagesRef, limitToLast(50));

onChildAdded(q, (snapshot) => {
    createBubble(snapshot.val().text);
});

function createBubble(text) {
    if(!text) return;
    if (stream.children.length > 50) stream.removeChild(stream.firstChild);
    
    const bubble = document.createElement('div');
    bubble.classList.add('thought-bubble');
    bubble.textContent = text;

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    
    bubble.style.color = randomColor;
    bubble.style.fontFamily = randomFont;

    const startLeft = Math.random() * 90;
    const startTop = Math.random() * 90;
    
    const duration = 5 + Math.random() * 10;
    const size = 0.5 + Math.random() * 1.5; 
    const opacity = 0.4 + Math.random() * 0.6;
    
    const moveX = -100 + Math.random() * 200;
    const moveY = -100 + Math.random() * 200;
    
    const rotStart = -30 + Math.random() * 60;
    const rotEnd = -30 + Math.random() * 60;

    bubble.style.left = `${startLeft}%`;
    bubble.style.top = `${startTop}%`;
    bubble.style.fontSize = `${size}rem`;
    bubble.style.opacity = opacity;
    
    bubble.style.setProperty('--move-x', `${moveX}px`);
    bubble.style.setProperty('--move-y', `${moveY}px`);
    bubble.style.setProperty('--rot-start', `${rotStart}deg`);
    bubble.style.setProperty('--rot-end', `${rotEnd}deg`);
    
    bubble.style.animationDuration = `${duration}s`;

    stream.appendChild(bubble);
}