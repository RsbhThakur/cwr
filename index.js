const gameBtn = document.getElementById("gameplay");
const ctrlBtn = document.getElementById("help");
const creditsBtn = document.getElementById("about");
const road = document.getElementById("road");
const tomContainer = document.getElementById("tomContainer");
const royContainer = document.getElementById("royContainer");
const tom = document.getElementById("tom");
const scoreBox = document.querySelector('.scoreBox');
var score = 0;
const storyImages = ["res/theme.png", "res/hateTom.png", "res/killTom.png", "res/loser.png"];
const storyText = [
    "Once Roy was stealing a jewel when suddenly tom saw him and told everybody!",
    "But Nobody beleived him and everybody started hating Tom!",
    "Now Roy wants to attack tom and you need to protect him!",
    `Game Over at Score: ${score}, click next to retry or click enter to go to homepage!`
];
var storyCount = 2; // 0, 1, 2 story ,,, 3-> game over
var gameStarted = false;
var gamePaused = true;
function changeText(str) {
    let play = document.getElementsByClassName('play')[0];
    let toHide = play.children;
    for (let i = 0; i < toHide.length; i++) {
        toHide[i].style.display="none";
    }
    str.forEach(e => {
        let text = document.createTextNode(e);
        let para = document.createElement('p');
        para.style.fontSize = '1vw';
        if(str.indexOf(e)==0){
            para.style.fontSize = '2.5vw';
            para.style.padding = '0vw';
        }
        para.appendChild(text);
        play.appendChild(para);
    });
}
gameBtn.addEventListener("click", ()=>{
    if(!gameStarted){
        displayStory(0);
    }
});
ctrlBtn.addEventListener("click", ()=>{
    changeText([
        "Game Controls",
        "Press arrow ↑ to move up",
        "Press arrow ↓ to move down",
        "Press arrow → to move right",
        "Press arrow ← to move left",
        "Press Enter to go on homepage"
    ]);
});
creditsBtn.addEventListener("click", ()=>{
    changeText([
        "Credits",
        "Creator: Rishabh",
        "Special Thanks: Pranav, Rishi"
    ]);
});

document.addEventListener("keydown",(e)=>{
    if(e.key=='ArrowUp' && originalTop>0){
        tomContainer.style.top = `${originalTop-20}vh`;
    } else if(e.key == 'ArrowDown' && originalTop<80){
        tomContainer.style.top = `${originalTop+20}vh`;
    } else if(e.key=='ArrowLeft' && originalLeft>0){
        tomContainer.style.left = `${originalLeft-10}vw`;
    } else if(e.key=='ArrowRight' && originalLeft<80){
        tomContainer.style.left = `${originalLeft+10}vw`;
    } else if(e.key=='Enter' && gamePaused){
        location.reload();
    }
});

function displayStory(count){
    StoryBtnclicked = false;
    let toHide = document.body.children[0].children;
    for (let i = 0; i < toHide.length; i++) {
        toHide[i].style.display= "none";
    }
    document.body.style.backgroundImage = `url('${storyImages[count]}')`;
    let textNode = document.createTextNode(storyText[count]);
    let box = document.createElement('p');
    let nextBtn = document.createElement('img');
    box.appendChild(textNode);
    box.classList.add('story');
    nextBtn.classList.add('next');
    nextBtn.src= "res/next.png";
    nextBtn.alt = "Next";
    document.body.children[0].appendChild(nextBtn);
    document.body.children[0].appendChild(box);
    nextBtn.addEventListener('click', ()=>{
        if(count<storyCount){
            displayStory(count+1);
        } else{
            document.body.children[0].removeChild(nextBtn);
            document.body.children[0].removeChild(box);
            gameStarted = true;
            gamePaused = false;
            startGame();
        }
    });
}

function startGame(){
    storyText.pop()
    scoreBox.style.display = "block";
    road.style.display="block";
    tomContainer.style.display="block";
    tomContainer.style.top="0vh";
    tomContainer.style.left="0vw";
    royContainer.style.display="block";
    royContainer.style.top="0vh";
    royContainer.style.right="0vw";
    setInterval(() => {
        originalTop = parseInt(tomContainer.style.top);
        originalLeft = parseInt(tomContainer.style.left);
        rx = parseInt(window.getComputedStyle(royContainer).getPropertyValue('left'))
        rxp = parseInt(window.getComputedStyle(royContainer).getPropertyValue('right'))
        tx = parseInt(window.getComputedStyle(tomContainer).getPropertyValue('left'))
        near = (Math.abs(rx-tx)<=184.982);
        sameLine = (royContainer.style.top == tomContainer.style.top);
        if(rxp<=300){
            royContainer.style.top = tomContainer.style.top;
        }
        if (near && sameLine) {
            gameStarted = false;
            gamePaused= true;
            storyText.push(`Game Over at Score: ${score}, click next to retry or click enter to go to homepage!`);
            score = 0;
            displayStory(3);
        } else if (near && !sameLine){
            score += 10;
            royContainer.style.animation = 'go 1.7s linear infinite'
        }
        scoreBox.textContent = `Score: ${score}`;
    }, 300);
}



screen.orientation.lock('landscape');