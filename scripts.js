GRID_W = 8;
GRID_H = 7;
START_LENGTH = 3;
FPS = 10;

var velocity = null;
var snake_length = START_LENGTH;
var grid = document.querySelector(".grid");

// make board:
for (let i = 0; i < GRID_W*GRID_H; i++) {
    let square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
}

document.addEventListener("keydown", (e) => {
    velocity = e.key;
});

var snakes = [[Math.floor(GRID_W/2),Math.floor(GRID_H/2)]];

// make an apple:
var apple_x;
var apple_y;
new_apple();
function new_apple() {
    let [x,y] = snakes[snakes.length - 1];
    do {
        apple_x = Math.floor(Math.random() * GRID_W);
        apple_y = Math.floor(Math.random() * GRID_H);
    }

    while (apple_x == x && apple_y == y );

    
}

function draw_apple() {
    let apple = grid.children[apple_y*GRID_W + apple_x];
    if (!apple.classList.contains("apple")) {
        apple.classList.add("apple");
    }

}

setInterval(() => {

    // remove the current snake:
    snakes.forEach(e => {
        let square = grid.children[e[1]*GRID_W + e[0]];
        if (square.classList.contains("snake")) {
            square.classList.remove("snake");
        }
    });

    let [head_x,head_y] = snakes[snakes.length-1];
    console.log(head_x,head_y);
    let new_head_x = head_x;
    let new_head_y = head_y;

    // update, get user input:
    if (velocity) {
        switch(velocity) {
            case "ArrowUp":
                new_head_y--;
                break;
            case "ArrowDown":
                new_head_y++;
                break;
            case "ArrowLeft":
                new_head_x--;
                break;
            case "ArrowRight":
                new_head_x++;
                break;
            default:
                break;
        }
        
        // check in range:
        if (new_head_x >= GRID_W) {
           new_head_x = 0;
        } else if (new_head_x < 0) {
            new_head_x = GRID_W-1;
        }
        if (new_head_y >= GRID_H) {
           new_head_y = 0;
        } else if (new_head_y < 0) {
            new_head_y = GRID_H-1;
        }

        // if head is in snake's body:
        snakes.forEach( e => {
            if (new_head_x == e[0] && new_head_y == e[1]) {
                snake_length = START_LENGTH;           }
        })

        snakes.push([new_head_x,new_head_y]);
        // if head is apple:
        if (apple_x == new_head_x && apple_y == new_head_y) {
            snake_length++;

            // remove apple:
            let apple = grid.children[apple_y*GRID_W + apple_x];
            if (apple.classList.contains("apple")) {
                apple.classList.remove("apple");
            }
            // make new apple:
            new_apple();
        } 

        while(snakes.length > snake_length) {
            snakes.shift();
        }


    }
    // draw snake again:

    snakes.forEach(e => {
        let square = grid.children[e[1]*GRID_W + e[0]];
        if (square.classList.contains("apple")) {
            square.classList.remove("apple");
        }
        square.classList.add("snake");
    });

    // and the apple:
    draw_apple();


}, 1000/FPS);
