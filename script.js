const starfield = document.getElementById('starfield');
const starCount = 100;

for (let i = 0; i < starCount; i++) {
    let star = document.createElement('div');
    star.className = 'star';
    let duration = Math.random() * 3 + 2;
    let size = Math.random() * 2 + 1;
    
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.animationDuration = duration + 's';
    
    starfield.appendChild(star);
}

const input = document.getElementById('messageInput');
const counter = document.getElementById('charCount');
const sendBtn = document.getElementById('sendBtn');
const stream = document.getElementById('thought-stream');

input.addEventListener('input', () => {
    const currentLength = input.value.length;
    counter.innerText = `${currentLength}/60`;
    
    if(currentLength > 0) {
        sendBtn.style.opacity = "0.6";
    } else {
        sendBtn.style.opacity = "0.2";
    }
});

sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    const bubble = document.createElement('div');
    bubble.className = 'thought-bubble';
    bubble.innerText = text;

    const moveX = (Math.random() * 200 - 100) + 'px';
    const moveY = (Math.random() * 200 - 100) + 'px';
    
    bubble.style.left = Math.random() * 80 + 10 + '%';
    bubble.style.top = Math.random() * 80 + 10 + '%';
    bubble.style.setProperty('--move-x', moveX);
    bubble.style.setProperty('--move-y', moveY);
    
    stream.appendChild(bubble);

    input.value = '';
    counter.innerText = '0/60';
    sendBtn.style.opacity = "0.2";

    setTimeout(() => {
        bubble.style.opacity = 0;
        setTimeout(() => bubble.remove(), 1000);
    }, 15000);
}