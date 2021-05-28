const score = document.querySelector('.score');

const startScreen = document.querySelector('.startScreen');

 const gameArea= document.querySelector('.gameArea');

startScreen.addEventListener('click',start);

let player = {speed:10, score:0};

let keys = { ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false}


document.addEventListener('keydown',keyDown);

document.addEventListener('keyup',keyUp);

function keyDown(e){
   
    e.preventDefault();
   
    keys[e.key] = true;

}

function keyUp(e){
  
    e.preventDefault();
  
    keys[e.key] = false;

}

function collide(a,b){
    aa = a.getBoundingClientRect();
    
    bb = b.getBoundingClientRect();

    return !((aa.bottom < bb.top) || (aa.top>bb.bottom) || (aa.right < bb.left) || (aa.left > bb.right ))
}

function crash(){

        startScreen.innerHTML = "<p>Boom Boom !!. You crashed. <br> Your Final score is "+ player.score + ". <br> Click here to play again. </p> "
        
        startScreen.classList.remove('hide');
        
        player.start = False;
        
}


function moveEnemy(car){
    
    let enemy = document.querySelectorAll('.enemy');
    
    enemy.forEach(function(item){
    
        item.y = (item.y + player.speed);
    
        if(collide(car,item))
        {
    
            crash();
    
        }
    
        if(item.y>=850)
        {
    
            let random_number = Math.floor(Math.random()*450);
    
            item.y = 0;
    
            item.style.left = 670.5 +  random_number + "px";
    
            random_number%=4;
    
            item.style.backgroundImage = "url('enemy" +random_number+  ".png')";
    
        }
    
        item.style.top = item.y + "px";
    
    })
}

function moveLines(){
    
    let lines = document.querySelectorAll('.lines');
    
    lines.forEach(function(item){
    
        item.y = (item.y + player.speed)%850;
    
        item.style.top = item.y + "px";
    
    })
}

function gamePlay(){
    
    console.log("hey");
    
    let car = document.querySelector('.car')
    
    let road = gameArea.getBoundingClientRect();
    
    moveLines();

    moveEnemy(car);
    
    if(player.start)
    {
    
        if(keys.ArrowUp && player.y > 300 ) {player.y -= player.speed}
    
        if(keys.ArrowDown && player.y < road.bottom - 90) {player.y += player.speed}
    
        if(keys.ArrowLeft && player.x>road.x*(1.00113141)) {player.x -= player.speed}
    
        if(keys.ArrowRight && player.x < road.x+road.width - 50) {player.x += player.speed}

        car.style.top = player.y + "px";
    
        car.style.left= player.x + "px"
    
    }
    
    window.requestAnimationFrame(gamePlay);
    
    player.score++;
    
    score.innerText = "Score is "+ player.score;

}

function start(){
    
    startScreen.classList.add('hide');
    
    let car = document.createElement('div');
    
    gameArea.innerHTML="";
    
    
    for( x=0; x<7; x++)
    {
        let road_line = document.createElement('div');

        road_line.setAttribute('class', 'lines');
        
        road_line.y = (x*200);
        
        road_line.style.top = road_line.y + "px";
        
        gameArea.appendChild(road_line);
    
    }


    car.setAttribute('class','car');
    
    gameArea.appendChild(car);
    
    player.x = car.offsetLeft;
    
    player.y = car.offsetTop;
    
    player.start = true;
    
    player.score = 0;


    for( x = 0; x < 3; x++ )
    {
        let enemyCar = document.createElement('div');

        enemyCar.setAttribute('class','enemy');

        enemyCar.y = x*150;
        
        enemyCar.style.top = enemyCar.y + "px";
        
        let random_number = Math.floor(Math.random()*450);
        
        enemyCar.style.left = 670.5 +  random_number + "px";
        
        random_number%=4;
        
        enemyCar.style.backgroundImage = "url('enemy" +random_number+  ".png')";
        
        gameArea.appendChild(enemyCar);
    }
    
    window.requestAnimationFrame(gamePlay);
}
