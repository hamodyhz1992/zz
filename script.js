const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let gameOver = false;

function createFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw walls
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, 10);
    ctx.fillRect(0, 0, 10, canvas.height);
    ctx.fillRect(0, canvas.height - 10, canvas.width, 10);
    ctx.fillRect(canvas.width - 10, 0, 10, canvas.height);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);

    // Draw snake
    ctx.fillStyle = 'green';
    for (let segment of snake) {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    }
}

function update() {
    if (gameOver) return;

    let head = { x: snake[0].x + direction.x * 10, y: snake[0].y + direction.y * 10 };

    // Check collision with walls
    if (head.x < 10 || head.x >= canvas.width - 10 || head.y < 10 || head.y >= canvas.height - 10) {
        gameOver = true;
        alert('Game Over!');
        resetGame();
        return;
    }

    // Check collision with food
    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head);
        createFood();
    } else {
        snake.unshift(head);
        snake.pop();
    }
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    createFood();
    gameOver = false;
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
            break; // Prevent default behavior
    }
}

document.getElementById('up').addEventListener('click', () => direction = { x: 0, y: -1 });
document.getElementById('down').addEventListener('click', () => direction = { x: 0, y: 1 });
document.getElementById('left').addEventListener('click', () => direction = { x: -1, y: 0 });
document.getElementById('right').addEventListener('click', () => direction = { x: 1, y: 0 });

createFood();
setInterval(() => {
    update();
    draw();
}, 100);