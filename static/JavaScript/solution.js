let numberOfResources, numberOfProcesses, sum = 0;
let data = document.getElementById("data");
data = data.textContent;
data = data.split(" ");
numberOfResources = parseInt(data[0]);
numberOfProcesses = parseInt(data[1]);
const resources = [];
const processesNeed = [];
const processesAllocate = [];
let flag = [];
let HeadingX = 470, HeadingY = 100, counter = 2;
let cells = [];
let queue1 = [];
let queue2 = [];
let ready;
let processed;
let remainingNeed = [];
let updatedResources = [];
let cellWidth = 200;
let cellHeight = 60;
let QueueDistance = 30;
let gap = 15, end;
function setup(){
    createCanvas(1520, 700);
    for(let i = 0; i < numberOfResources; i++) {
        resources[i] = parseInt(data[counter]);
        counter++;
    }
    for(let i = 0; i < numberOfProcesses; i++) {
        let arr = [];
        for(let j = 0; j < numberOfResources; j++) {
            arr[j] = parseInt(data[counter]);
            counter++;
        }
        processesNeed[i] = arr;
        flag[i] = false;
    }

    for(let i = 0; i < numberOfProcesses; i++) {
        let arr = [];
        for(let j = 0; j < numberOfResources; j++) {
            arr[j] = parseInt(data[counter]);
            counter++;
        }
        processesAllocate[i] = arr;
    }

    for(let i = 0; i < numberOfResources; i++) {
        for(let j = 0; j < numberOfProcesses; j++) {
            sum += processesAllocate[j][i];
        }
        updatedResources[i] = resources[i] - sum;
        sum = 0;
    }

   
    for(let i = 0; i < numberOfProcesses; i++)
    {
        let arr = [];
        for(let j = 0; j < numberOfResources; j++)
        {
            arr[j] = processesNeed[i][j] - processesAllocate[i][j];
        }
        remainingNeed[i] = arr;
    }
    
    ready = new readyQueue(numberOfProcesses, QueueDistance, gap, cellWidth, cellHeight);
    ready.get();

    processed = new processedQueue(numberOfProcesses, QueueDistance, gap, cellWidth, cellHeight);
    processed.get();    
}

function draw() {
    background(0);
    stroke(255, 255, 255);
    strokeWeight(1.5);
    ready.plot();
    processed.plot();
    let string = "";
    for(let i = 0; i < updatedResources.length; i++)
    {
        if(i == updatedResources.length-1)
        {
            string += " " + updatedResources[i];
        }
        else string = string + " " + updatedResources[i] + " ,";
    }
    noFill();
    textSize(60/1.8);
    text("Ready Queue", 2*gap + QueueDistance + cellWidth + 20, 700 - QueueDistance - gap);
    text("Processed Queue", 1520 - (2*gap + QueueDistance + cellWidth + 270), 700 - QueueDistance - gap);
    textSize(cellHeight/1.8);
    text("Remaining resources", QueueDistance + gap + cellWidth/2 + 650, 700 - QueueDistance - gap - ((cellHeight*(2*(numberOfProcesses-1) + 1))/2 + (numberOfProcesses-1)*gap) + 90 + gap)
    text(string,QueueDistance + gap + cellWidth/2 + 650, 700 - QueueDistance - gap - ((cellHeight*(2*(numberOfProcesses-1) + 1))/2 + (numberOfProcesses-1)*gap) + 130 + gap);
    textSize(60);
    text("Banker's Algorithm", HeadingX, HeadingY);
    Play()
    noLoop();
}

let loopCount = 0;

async function Play() {
    let id = 0;
    execute()
    .then(() => {
        UP_(id);
        return execute();
    })
    .then(() => {
        RIGHT_(id);
        return execute();
    })
    .then(() => {
        DOWN_(id);
        return execute();
    })
    .then(() => {
        return compare(id);
    })
    .then(() => {
        console.log("resolve");
        Plot("<")
        execute()
        .then(() => {
            DOWN_(id, "");
            return execute();
        })
        .then(() => {
            _RIGHT(id);
            return execute();
        })
        .then(() => {
            return ADJUSTpc();
        })
        .then(() => {
            if(ready.numberOfProcesses > 0)
            {
                Play();
                loopCount = 0;
                end = false;
            }
            else end = true;
            return execute();
        })
        .then(() => {
            if(end)
            text("-> Safe State", HeadingX, HeadingY + 60);
        })
    })
    .catch(() => {
        console.log("reject");
        Plot(">")
        execute()
        .then(() => {
            DOWN_(id, "");
            return execute();
        })
        .then(() => {
            LEFT_(id, ">");
            return execute();
        })
        .then(() => {
            return ADJUSTrd();
        })
        .then(() => {
            if(loopCount < ready.numberOfProcesses) {
                Play();
                loopCount++;
                end = false;
            }
            else end = true;
            return execute();
        })
        .then(() => {
            if(end)
            text("-> Deadlock", HeadingX, HeadingY + 60);
        })
    })
    
}

function execute() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    })
}

async function RIGHT_(id) {
    await moveRight(id);
    await Plot();
    return new Promise((resolve, reject) => {
        resolve();
    });
}

async function UP_(id) {
    await moveUp(id);
    await Plot();
    return new Promise((resolve, reject) => {
        resolve();
    });
}

async function DOWN_(id, variable) {
    await moveDown(id, variable);
    await Plot();
    return new Promise((resolve, reject) => {
        resolve();
    });
}

async function LEFT_(id) {
    await moveLeft(id);
    await Plot();
    return new Promise((resolve, reject) => {
        resolve();
    });
}

async function ADJUSTrd() {
    await adjustReadyQueue();
    await Plot();
    return new Promise((resolve, reject) => {
        resolve();
    });
}

async function ADJUSTpc() {
    await adjustProcessesQueue(0);
    await Plot();
    return new Promise((resolve, reject) => {
        resolve();
    });
}

async function _RIGHT(id) {
    await moveRight2(id);
    await Plot();
    return new Promise((resolve, reject) => {
        resolve();
    });
}

function moveRight2(id) {
    let x = queue1[id].position.x;
    let y = queue1[id].position.y;
    queue1[id].position = createVector(1520 - (QueueDistance + gap + cellWidth/2), y);
    
    return new Promise((resolve, reject) => {
        resolve();
    });
}

function adjustProcessesQueue(id)
{
    queue2[processed.n] = queue1[id];
    for(let i = 0; i < updatedResources.length; i++)
    {
        updatedResources[i] += processesAllocate[queue1[id].id][i];
    }
    processed.n = processed.n + 1;
    ready.numberOfProcesses = ready.numberOfProcesses - 1;
    for(let i = 0; i < ready.numberOfProcesses; i++)
    {
        queue1[i+1].position = createVector(QueueDistance + gap + cellWidth/2, 700 - QueueDistance - gap - ((cellHeight*(2*(numberOfProcesses-1-i) + 1))/2 + (numberOfProcesses-1-i)*gap));
    }
    for(let i = 0; i < ready.numberOfProcesses; i++)
    {
        queue1[i] = queue1[i+1];
    }
    queue1[ready.numberOfProcesses] = undefined;
    return new Promise((resolve, reject) => {
        resolve();
    });
}

function moveRight(id) {
    let x = queue1[id].position.x;
    let y = queue1[id].position.y;
    let step = 500;
    queue1[id].position = createVector(x + step, y);
    return new Promise((resolve, reject) => {
        resolve();
    });
}

function moveUp(id)
{
    let x = queue1[id].position.x;
    let y = queue1[id].position.y;
    let step = 100 + id*(cellHeight +  gap);
    queue1[id].position = createVector(x, y-step);
    return new Promise((resolve, reject) => {
        resolve();
    });
}

function moveDown(id, variable)
{
    let x = queue1[id].position.x;
    let y = queue1[id].position.y;
    let step = 230;
    if(variable === undefined)
    queue1[id].position = createVector(x, y + step);
    else
    queue1[id].position = createVector(x, 700 - QueueDistance - gap - ((cellHeight*(2*(0) + 1))/2 + (0)*gap) + 40);
    return new Promise((resolve, reject) => {
        resolve();
    });
}

function moveLeft(id)
{
    let x = queue1[id].position.x;
    let y = queue1[id].position.y;
    queue1[id].position = createVector(QueueDistance + gap + cellWidth/2, y);
    return new Promise((resolve, reject) => {
        resolve();
    });
}

function Plot(variable)
{
    clear();
    background(0);
    stroke(255, 255, 255);
    strokeWeight(1.5);
    ready.plot();
    processed.plot();
    let string = "";
    for(let i = 0; i < updatedResources.length; i++)
    {
        if(i == updatedResources.length-1)
        {
            string += " " + updatedResources[i];
        }
        else string = string + " " + updatedResources[i] + " ,";
    }
    noFill();
    textSize(60/1.8);
    text("Ready Queue", 2*gap + QueueDistance + cellWidth + 20, 700 - QueueDistance - gap);
    text("Processed Queue", 1520 - (2*gap + QueueDistance + cellWidth + 270), 700 - QueueDistance - gap);
    textSize(cellHeight/1.8);
    text("Remaining resources", QueueDistance + gap + cellWidth/2 + 650, 700 - QueueDistance - gap - ((cellHeight*(2*(numberOfProcesses-1) + 1))/2 + (numberOfProcesses-1)*gap) + 90 + gap)
    if(variable !== undefined)
    text(variable + " " + string,QueueDistance + gap + cellWidth/2 + 650, 700 - QueueDistance - gap - ((cellHeight*(2*(numberOfProcesses-1) + 1))/2 + (numberOfProcesses-1)*gap) + 130 + gap);
    else text(string,QueueDistance + gap + cellWidth/2 + 650, 700 - QueueDistance - gap - ((cellHeight*(2*(numberOfProcesses-1) + 1))/2 + (numberOfProcesses-1)*gap) + 130 + gap);
    textSize(60);
    text("Banker's Algorithm", HeadingX, HeadingY);
    return new Promise((resolve, reject) => {
        resolve();
    });
}


function compare(id)
{
    return new Promise((resolve, reject) => {
        let Need = queue1[id].process;
        for(let i = 0; i < updatedResources.length; i++)
        {
            if(Need[i] > updatedResources[i])
            {
                reject();
            }
        }
        resolve();
    });
    
}

function adjustReadyQueue() {
    for(let i = ready.numberOfProcesses-1; i >= 2; i--)
    {
        queue1[i].position = queue1[i-1].position;
    }
    if(ready.numberOfProcesses > 1)
    queue1[1].position = createVector(QueueDistance + gap + cellWidth/2, 700 - QueueDistance - gap - ((cellHeight*(2*(numberOfProcesses-1) + 1))/2 + (numberOfProcesses-1)*gap));
    let last = queue1[0];
    let i = ready.numberOfProcesses - 1;
    last.position = createVector(QueueDistance + gap + cellWidth/2, 700 - QueueDistance - gap - ((cellHeight*(2*(numberOfProcesses-1-i) + 1))/2 + (numberOfProcesses-1-i)*gap))
    for(let i = 0; i < ready.numberOfProcesses-1; i++)
    {
        queue1[i] = queue1[i+1];
    }
    queue1[ready.numberOfProcesses-1] =last;
    return new Promise((resolve, reject) => {
        resolve();
    });
}