function loadimage() {
    virusimage = new Image;
    virusimage.src = "v1.png";
    playerimg = new Image;
    playerimg.src = "superhero.png";
    gemimage = new Image;
    gemimage.src = "gemm.png";
    dead = new Audio();
    eat = new Audio();
    up = new Audio();
    right = new Audio();
    dead.src = "dead.mp3";
    eat.src = "eat.mp3";
    up.src = "up.mp3";
    right.src = "right.mp3";
}


function init() {
    canvas = document.getElementById("canvas");
    console.log(canvas);
    canvas.width = 700;
    canvas.height = 400;
    pen = canvas.getContext('2d');
    console.log(pen);
    Score = 0;
    gameover = false;
    bird1 = {
        x: 100,
        y: 50,
        w: 60,
        h: 60,
        v: 20
    };
    bird2 = {
        x: 250,
        y: 150,
        w: 60,
        h: 60,
        v: 10
    };
    bird3 = {
        x: 450,
        y: 20,
        w: 60,
        h: 60,
        v: 30
    };
    enemy = [bird1, bird2, bird3];
    player = {
        x: 20,
        y: 200,
        w: 60,
        h: 60,
        v: 10,
        state: "false"

    };
    gemm = {
        x: 600,
        y: 200,
        w: 60,
        h: 60,
    };

    document.addEventListener('keydown', function(e) {

        console.log(e);
        if (e.key == 'a') {
            player.state = true;
        }

    });
    document.addEventListener('keydown', function(e) {

        console.log(e);
        if (e.key == 'b') {
            player.state = false;
        }

    });
}

function draw() {
    pen.clearRect(0, 0, 700, 400);
    pen.fillStyle = "red";
    pen.drawImage(playerimg, player.x, player.y, player.w, player.h);
    pen.drawImage(gemimage, gemm.x, gemm.y, gemm.w, gemm.h);
    for (let i = 0; i < enemy.length; i++) {
        bird = enemy[i];
        pen.drawImage(virusimage, bird.x, bird.y, bird.w, bird.h);
    }
    pen.fillStyle = "white";
    pen.fillText("score " + Score, 10, 10);
}

function collideornot(b1, b2) {
    if (Math.abs(b1.x - b2.x) <= 30 && Math.abs(b1.y - b2.y) <= 30) {
        return true;
    }
    return false;
}

function update() {
    if (player.state == true) {
        eat.play();
        player.x = player.x + player.v;
        Score += 20;
    }
    for (let j = 0; j < enemy.length; j++) {
        if (collideornot(enemy[j], player)) {
            dead.play();
            Score = Score - j * 50;
        }
        if (Score < 0) {
            up.play();
            gameover = true;
            alert("Game Over");
        }
    }
    if (collideornot(gemm, player)) {
        right.play();
        gameover = true;
        draw();
        alert("You Won !" + Score);
    }
    for (let i = 0; i < enemy.length; i++) {
        bird = enemy[i];
        bird.y = bird.y + bird.v;
        if (bird.y <= 0 || bird.y > 400 - bird.h) {
            bird.v = bird.v * -1;
        }
    }
}

function loop() {
    if (gameover == true) {
        clearInterval(t);
    }
    draw();
    update();
}
loadimage();
init();
setInterval(loop, 100);
var t = setInterval(loop, 100);