const GRID_W = 8;
const GRID_H = 7;
const START_LENGTH = 3;
const FPS = 6;

var fps = FPS;
var velocity = null;
var snake_length = START_LENGTH;
const grid = document.querySelector(".grid");
const speed_div = document.querySelector(".speed");
const speed_dial = document.querySelector(".dial");

// make board:
for (let i = 0; i < GRID_W*GRID_H; i++) {
    let square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
}

// speed dial:
speed_div.innerHTML = "FPS: " + FPS;
speed_dial.value = FPS;

speed_dial.addEventListener("input", (e) => {
    fps = e.target.value;
    speed_div.innerHTML = "FPS: " + fps;

})
    // blocking keyboard input for the dial -- because it's confusing
speed_dial.addEventListener("keydown", (e) =>{
    e.preventDefault();
})

var snakes = [[Math.floor(GRID_W/2) -1 ,Math.floor(GRID_H/2)]];
var wanted_velocity = null;

// make an apple:
var apple_x;
var apple_y;
new_apple();

function new_apple() {
    let x,y;
    let done = false;
    while(!done) {
        done = true;
        x = Math.floor(Math.random() * GRID_W);
        y = Math.floor(Math.random() * GRID_H);
        for (let e of snakes) {
            if (x === e[0] && y === e[1]) {
                done = false;
                break;
            }
        }
    }
    apple_y = y;
    apple_x = x;
}

function draw_apple() {
    let apple = grid.children[apple_y*GRID_W + apple_x];
    if (!apple.classList.contains("apple")) {
        apple.classList.add("apple");
    }

}

// to check user input -- ARROW KEYS:
document.addEventListener("keydown", (e) => {
    switch(e.key) {
        case "ArrowDown":
            if (velocity !== "ArrowUp")  {
                velocity = e.key;                                           
            }
            break;
         
        case "ArrowUp":
            if (velocity !== "ArrowDown")  {
                velocity = e.key;                                           
            }
            break;
        case "ArrowLeft":
            if (velocity !== "ArrowRight")  {
                velocity = e.key;                                           
            }
            break;
        case "ArrowRight":
            if (velocity !== "ArrowLeft")  {
                velocity = e.key;                                           
            }
            break;
        default:
            break;
    }
});

// call game in loops using nested setTimeout,
// this is not recursive
setTimeout(game, 1000/fps);



// this is called every frame:

function game() {
    // remove the current onboard-snake --
    // so we can draw a new one later...
    snakes.forEach(e => {
        let square = grid.children[e[1]*GRID_W + e[0]];
        if (square.classList.contains("snake")) {
            square.classList.remove("snake");
        }
    });

    // the new head:
    let [head_x,head_y] = snakes[snakes.length-1];
    let new_head_x = head_x;
    let new_head_y = head_y;

    // GET KEYBOARD INPUT AND UPDATE GAME:
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
        
        // check borders:
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


        // if new head is on snake's body:
        snakes.forEach( e => {
            if (new_head_x == e[0] && new_head_y == e[1]) {
                snake_length = START_LENGTH;           }
        })


        // if head is on an apple:
        if (apple_x == new_head_x && apple_y == new_head_y) {
            snake_length++;

            // remove apple:
            let apple = grid.children[apple_y*GRID_W + apple_x];
            if (apple.classList.contains("apple")) {
                apple.classList.remove("apple");
            }
            // make new apple on map:
            new_apple();
        } 

        // and add new head...
        snakes.push([new_head_x,new_head_y]);

        // finally, we control the snake's length:
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

    setTimeout(game, 1000/fps);

}