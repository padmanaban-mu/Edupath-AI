const textElement = document.getElementById("typing-text");
const phrase = "AI-Guided Roadmap";
let index = 0;

function type() {
    if (index < phrase.length) {
        textElement.innerHTML += phrase.charAt(index);
        index++;
        setTimeout(type, 100);
    }
}


window.onload = type;