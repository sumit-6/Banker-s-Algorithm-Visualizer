const resources = document.getElementById("resources");
const processesNeed = document.getElementById("processes-need");
const processesAllocate = document.getElementById("processes-allocate");
let data = document.getElementById("data");
data = data.textContent;
data = data.split(" ");
let numberOfResources = parseInt(data[0]);
let numberOfProcesses = parseInt(data[1]);
let ID = 0;

function addField(object, int, statement)
{
    const field = document.createElement("div");
    field.setAttribute("class", "field");
    field.setAttribute("style", "display:inline-block; margin:1rem");
    const label = document.createElement("label");
    label.setAttribute("for", `${int}`);
    label.setAttribute("class", "label is-inline is-medium");
    label.innerHTML = statement;
    const div = document.createElement("div");
    div.setAttribute("class", "control");
    const input = document.createElement("input");
    //input.setAttribute("style", "display:inline-block;");
    input.setAttribute("class", "input is-info");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Enter a number");
    input.setAttribute("name", `${int}`);
    field.appendChild(label);
    div.appendChild(input);
    field.appendChild(div);
    object.appendChild(field);
}

for(let i = 0; i < numberOfResources; i++)
{
    const statement = `Resource ${i}: `;
    addField(resources, ID, statement);
    ID++;
}



for(let i = 0; i < numberOfProcesses; i++)
{
    for(let j = 0; j < numberOfResources; j++)
    {
        const statement = `Allocation of Resource ${j} for Process ${i}: `;
        addField(processesAllocate, ID, statement, true);
        ID++;
        if(j === numberOfResources-1)
        {
            processesAllocate.appendChild(document.createElement("br"));
        }
    }
}

for(let i = 0; i < numberOfProcesses; i++)
{
    for(let j = 0; j < numberOfResources; j++)
    {
        const statement = `Need of Resource ${j} for Process ${i}: `;
        addField(processesNeed, ID, statement);
        ID++;
        if(j === numberOfResources-1)
        {
            processesNeed.appendChild(document.createElement("br"));
        }
    }
}