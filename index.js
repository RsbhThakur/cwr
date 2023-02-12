const gameBtn = document.getElementById("gameplay");
const ctrlBtn = document.getElementById("help");
const creditsBtn = document.getElementById("about");
const road = document.getElementById("road");
const tomContainer = document.getElementById("tomContainer");
const pauseBtn = document.querySelector('.pause');
const royContainer = document.getElementById("royContainer");
const tom = document.getElementById("tom");
const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
let hC = localStorage.getItem('highScoreCWR');
var highScore = (hC != null)&&(hC != NaN) ? hC : 0;
var xi, xf, yi, yf;
const scoreBox = document.querySelector('.scoreBox');
var score = 0;
const storyImages = ["res/theme.png", "res/hateTom.png", "res/killTom.png", "res/loser.png", "res/loser.png"];
const storyText = [
    "Once Roy was stealing a jewel when suddenly tom saw him and told everybody!",
    "But Nobody beleived him and everybody started hating Tom!",
    "Now Roy wants to attack tom and you need to protect him!",
    // "Select Your Level!",
    null
];
var storyCount = 3; // 0, 1, 2, 3 story ,,, 4-> game over
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
        para.style.padding = '0vw';
        if(str.indexOf(e)==0){
            para.style.fontSize = '2.4vw';
        }
        para.appendChild(text);
        play.appendChild(para);
    });
}
function gamePause(ry, ty){
    StoryBtnclicked = false;
    pauseBtn.style.display = "none";
    scoreBox.style.display = "none";
    road.style.display="none";
    tomContainer.style.display="none";
    royContainer.style.display="none";
    document.body.style.backgroundImage = `url('${storyImages[3]}')`;
    let textNode = document.createTextNode(`You have paused the game at score: ${score}, click play button to resume.`);
    let box = document.createElement('p');
    let nextBtn = document.createElement('img');
    box.appendChild(textNode);
    box.classList.add('story');
    nextBtn.classList.add('next');
    nextBtn.src= "res/play.png";
    nextBtn.alt = "play";
    document.body.children[0].appendChild(nextBtn);
    document.body.children[0].appendChild(box);
    nextBtn.addEventListener('click', ()=>{
        document.body.children[0].removeChild(nextBtn);
        document.body.children[0].removeChild(box);
        gameStarted = true;
        gamePaused = false;
        clearInterval(gameInt);
        startGame(ry, ty);
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
        "Swipe in Phone to move in any direction",
        "Press SpaceBar or pause button to pause the game",
        "Press Enter or Reload to go on homepage"
    ]);
});
creditsBtn.addEventListener("click", ()=>{
    changeText([
        "Credits",
        "Creator: Rishabh",
        "Special Thanks: Pranav, Rishi"
    ]);
});
pauseBtn.addEventListener("click",()=>{
    gamePaused = true;
    gameStarted = false;
    ry = royContainer.style.top;
    ty = tomContainer.style.top;
    clearInterval(gameInt);
    gamePause(ry, ty);
});
screen.orientation.addEventListener('change', ()=>{
    if(screen.orientation.type == 'portrait-primary'){
        document.location.reload();
    }
});

document.addEventListener("keydown",(e)=>{
    if(e.key=='ArrowUp' && originalTop>0){
        tomContainer.style.top = `${originalTop-20}vh`;
    }
    else if(e.key == 'ArrowDown' && originalTop<80){
        tomContainer.style.top = `${originalTop+20}vh`;
    }
    else if(e.key=='ArrowLeft' && originalLeft>0){
        tomContainer.style.left = `${originalLeft-10}vw`;
    }
    else if(e.key=='ArrowRight' && originalLeft<80){
        tomContainer.style.left = `${originalLeft+10}vw`;
    }
    else if(e.key=='Enter' && gamePaused){
        location.reload();
    }
    else if(e.code=='Space'){
        gamePaused = true;
        gameStarted = false;
        ry = royContainer.style.top;
        ty = tomContainer.style.top;
        clearInterval(gameInt);
        gamePause(ry, ty);
    }
});

document.addEventListener('touchstart', (e)=>{
    xi = e.touches[0].clientX;
    yi = e.touches[0].clientY;
});

document.addEventListener('touchend', (e)=>{
    xf =  e.changedTouches[0].clientX - xi
    yf =  e.changedTouches[0].clientY - yi
    if (xf>50  && originalLeft<80){
        tomContainer.style.left = `${originalLeft+10}vw`;
    }
    if (xf<-50 && originalLeft>0){
        tomContainer.style.left = `${originalLeft-10}vw`;
    }
    if(yf<-50 && originalTop>0){
        tomContainer.style.top = `${originalTop-20}vh`;
    }
    if(yf>50 && originalTop<80){
        tomContainer.style.top = `${originalTop+20}vh`;
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
        if(count+1<storyCount){
            displayStory(count+1);
        } else{
            document.body.children[0].removeChild(nextBtn);
            document.body.children[0].removeChild(box);
            gameStarted = true;
            gamePaused = false;
            startGame(0, 0);
        }
    });
}

function gameInterval() {
    originalTop = parseInt(tomContainer.style.top);
    originalLeft = parseInt(tomContainer.style.left);
    rxp = parseInt(window.getComputedStyle(royContainer).getPropertyValue('right'));
    rx = parseInt(window.getComputedStyle(royContainer).getPropertyValue('left'));
    tx = parseInt(window.getComputedStyle(tomContainer).getPropertyValue('left'));
    near = (Math.abs(rx-tx)<=(width*0.119));
    sameLine = (royContainer.style.top == tomContainer.style.top);
    if(rxp<=0.25*width){
        royContainer.style.top = tomContainer.style.top;
    }
    if (near && sameLine) {
        localStorage.setItem('highScoreCWR', highScore)
        gameStarted = false;
        gamePaused= true;
        storyText.pop();
        storyText.push(`Game Over at Score: ${Math.floor(0.5+ score)}, click next to retry or click enter to go to homepage!`);
        score = 0;
        displayStory(storyCount);
    } else if (near && !sameLine){
        score += 1;
        highScore = highScore>score ? highScore : score;
        if (score<=50) {
            royContainer.style.animation = `go 1.3s linear infinite`;
        } else if (score<=150){
            royContainer.style.animation = `go 1.2s linear infinite`;
        } else if(score<=400){
            royContainer.style.animation = `go 1s linear infinite`;
        } else if (score<=600){
            royContainer.style.animation = `go 0.9s linear infinite`;
        } else if (score<=800){
            royContainer.style.animation = `go 0.8s linear infinite`;
        }
    }
    scoreBox.textContent = `High Score: ${highScore} | Current Score: ${Math.floor(0.5+ score)}`;
}

function startGame(ry, ty){
    pauseBtn.style.display = "block";
    scoreBox.style.display = "block";
    road.style.display="block";
    tomContainer.style.display="block";
    royContainer.style.display="block";
    tomContainer.style.top=`${ty}`;
    tomContainer.style.left=`0vw`;
    royContainer.style.top=`${ry}`;
    royContainer.style.right=`0vw`;
    gameInt = setInterval(gameInterval , 50);
}



