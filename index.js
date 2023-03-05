
    const grid = document.querySelector('.grid');
    const doodler = document.getElementById('doodlerImage');
    const showScore = document.getElementById('showScore');
    let doodlersLeft = 50;
    let startPoint = 150;
    let doodlersBottom = startPoint;
    let isGameOver = false;
    let platformCount = 5 + Math.random() *5;
    let platforms = [];
    let upTimerId;
    let downTimerId;
    let isJumping = true;
    let isGoingLeft = false;
    let isGoingRight = false;
    let leftTimerId;
    let rightTimerId;
    let score = 0;

    
    function createDoodler(){
        doodlersLeft = platforms[0].left;
        doodler.style.left = doodlersLeft + "px";
        doodler.style.bottom = doodlersBottom + "px";
    }
    
class Platform {
    constructor(newPlatBottom){
        this.bottom = newPlatBottom;
        this.left = Math.random() * 315;
        this.visual = document.createElement('div');
        const visual = this.visual;
        visual.classList.add('platform');
        visual.style.left = this.left + "px";
        visual.style.bottom = this.bottom + "px";
        grid.appendChild(visual);

    }
}
function createPlatforms() {
    for (let i = 0; i < platformCount; i++){
        let platGap = 600 / platformCount;
        let newPlatBottom = 100 + i * platGap;
        let newPlatform = new Platform(newPlatBottom);
        platforms.push(newPlatform)
    }
}
function movePlatforms(){
    if (doodlersBottom > 200){
        platforms.forEach(platform =>{
            platform.bottom -= 4;
            let visual = platform.visual;
            visual.style.bottom = platform.bottom + "px";
            
            if(platform.bottom < 10){
                let firstPlatform = platforms[0].visual;
                firstPlatform.classList.remove('platform');
                platforms.shift();
                score++;
                let newPlatform = new Platform(600);
                platforms.push(newPlatform);
            }
        })
    } 
}


function jump() {
    clearInterval(downTimerId);
    isJumping = true;
    upTimerId = setInterval(function (){
        doodlersBottom += 20;
        doodler.style.bottom = doodlersBottom + "px";
        if(doodlersBottom > startPoint + 200){
            fall()
        }
    },30)
}
    function fall(){
        clearInterval(upTimerId);
        isJumping = false;
        downTimerId = setInterval(function () {
            doodlersBottom -= 5;
            doodler.style.bottom = doodlersBottom + "px";
            if(doodlersBottom <= 0){
                GameOver()
            }
            platforms.forEach(platform => {
                if(
                    (doodlersBottom >= platform.bottom) &&
                    (doodlersBottom <= platform.bottom + 15) &&
                    ((doodlersLeft + 60) >= platform.left) &&
                    (doodlersLeft <= (platform.left + 85)) &&
                    !isJumping
                        ){
                            startPoint = doodlersBottom
                            jump();
                        }
            })
        },30)
    }

    function GameOver(){
        isGameOver = true;
        while(grid.firstChild){
            grid.removeChild(grid.firstChild)
        }
        showScore.innerHTML = score;
        clearInterval(upTimerId);
        clearInterval(downTimerId);
        clearInterval(leftTimerId);
        clearInterval(rightTimerId);
    }

    function control(e){
        if(e.key === "ArrowLeft"){
            moveLeft();
        }else if(e.key === "ArrowRight"){
            moveRight();
        }
    }

    function moveLeft(){
        if(isGoingRight){
            clearInterval(rightTimerId);
            isGoingRight = false;
        }
        isGoingLeft = true;
        leftTimerId = setInterval(function (){
            if(doodlersLeft >= 0){
                doodlersLeft -=5;
                doodler.style.left = doodlersLeft + "px";
            }else moveRight();
            
        },30)
    }

    function moveRight(){
        if(isGoingLeft){
            clearInterval(leftTimerId);
            isGoingLeft = false;
        }
        isGoingRight = true;
        leftTimerId = setInterval(function (){
            if(doodlersLeft <= 340){
                doodlersLeft +=5;
                doodler.style.left = doodlersLeft + "px";
            }else moveLeft();
            
        },30)
    }




    function start() {
        if(!isGameOver){
            createPlatforms();
            createDoodler();
            setInterval(movePlatforms,100)
            jump();
            document.addEventListener('keyup',control)
        }
    }
    start();




