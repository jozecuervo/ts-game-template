import { CANVAS_WIDTH, CANVAS_HEIGHT, FRAME_LENGTH } from 'app/gameConstants';

const mainCanvas = document.getElementById('mainCanvas') as HTMLCanvasElement;
// `!` here is the "Non-null assertion operator", which we need to use here if we have strict null checks enabled.
const mainContext = mainCanvas.getContext('2d')!;
mainContext.imageSmoothingEnabled = false;

const STEP = 6;

// Object to store the game state on.
const state = {
    time: 0,
    lastRender: -1,
    xa: 1,
    ya: 1,
    xb:0,
    yb:0,
    xav:1,
    yav:2,
    xbv:-2,
    ybv:-1,
    colour: 0,
};

// Update function advances the state of the game every FRAME_LENGTH milliseconds.
function update() {
    state.time += FRAME_LENGTH;
    if (state.xa > CANVAS_WIDTH-10 || state.xa<1) state.xav*=-1;
    if (state.xb > CANVAS_WIDTH-10 || state.xb<1) state.xbv*=-1;
    if (state.ya > CANVAS_HEIGHT-10 || state.ya<1) state.yav*=-1;
    if (state.yb > CANVAS_HEIGHT-10 || state.yb<1) state.ybv*=-1;
    state.xa += state.xav * STEP;
    state.xb += state.xbv * STEP;
    state.ya +=state.yav * STEP;
    state.yb +=state.ybv * STEP;
    state.colour++;
}

// Render will display the current state of the game.
function render() {
    // Only render if the state has been updated since the last render.
    if (state.lastRender >= state.time) {
        return;
    }
    state.lastRender = state.time;

    // Draw an translucent black background:
    mainContext.fillStyle = '#0001';
    mainContext.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    mainContext.strokeStyle = `rgb(
        ${state.colour % 255},
        ${(state.colour * 1.2) % 255},
        ${(state.colour * 1.7) % 255})`;
    mainContext.beginPath();
    mainContext.moveTo(state.xa, state.ya);
    mainContext.lineTo(state.xb, state.yb);
    mainContext.stroke();
}

// Start update loop:
update();
setInterval(update, FRAME_LENGTH);

function renderLoop() {
    try {
        render();
        window.requestAnimationFrame(renderLoop);
    } catch (error: unknown) {
        console.error(error);
    }
}
renderLoop();
