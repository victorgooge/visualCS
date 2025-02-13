const container = document.getElementById("graph-container");
const nodes = {};
const edges = [];
const traversalTimeouts = [];

function drawNode(x, y, label) {
    const node = document.createElement("div");
    node.classList.add("node");
    node.textContent = label;
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    container.appendChild(node);
    nodes[label] = { element: node, x, y };
}

function drawEdge(from, to, directed = false) {
    const edge = document.createElement("div");
    edge.classList.add("edge");

    const x1 = nodes[from].x + 20; 
    const y1 = nodes[from].y + 20;
    const x2 = nodes[to].x + 20;
    const y2 = nodes[to].y + 20;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);

    edge.style.width = `${length}px`;
    edge.style.left = `${x1}px`;
    edge.style.top = `${y1}px`;
    edge.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;

    container.appendChild(edge);

    if (directed) {
        const arrow = document.createElement("div");
        arrow.classList.add("arrow");
        arrow.style.borderWidth = "5px 10px 0 10px";
        arrow.style.borderColor = "black transparent transparent transparent";
        arrow.style.left = `${x2 - 10}px`;
        arrow.style.top = `${y2 - 10}px`;
        arrow.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
        container.appendChild(arrow);
    }
}

function startDFS() {
    resetGraphTraversal();
    const visited = new Set();
    let index = 0;

    function dfs(node) {
        if (visited.has(node)) return;
        visited.add(node);
        traversalTimeouts.push(setTimeout(() => {
            nodes[node].element.classList.add("visited");
        }, index++ * 1000));
        graph[node].forEach(neighbor => {
            dfs(neighbor);
        });
    }

    const startNode = Object.keys(graph)[0]; 
    dfs(startNode);
}

function startBFS() {
    resetGraphTraversal();
    const visited = new Set();
    const queue = [];
    let index = 0;

    const startNode = Object.keys(graph)[0]; 
    queue.push(startNode);

    while (queue.length > 0) {
        const node = queue.shift();
        if (visited.has(node)) continue;
        visited.add(node);

        traversalTimeouts.push(setTimeout(() => {
            nodes[node].element.classList.add("visited");
        }, index++ * 1000));

        graph[node].forEach(neighbor => {
            if (!visited.has(neighbor)) {
                queue.push(neighbor);
            }
        });
    }
}

function resetGraph() {
    container.innerHTML = "";
    traversalTimeouts.forEach(timeout => clearTimeout(timeout));
    traversalTimeouts.length = 0;
    createGraph();
}

function resetGraphTraversal() {
    traversalTimeouts.forEach(timeout => clearTimeout(timeout));
    traversalTimeouts.length = 0;
    Object.values(nodes).forEach(node => {
        node.element.classList.remove("visited");
    });
}

// EXAMPLE graph layout and adjacency list
const graph = {
    0: [1, 4],
    1: [0, 2, 3],
    2: [3],
    3: [4, 2],
    4: []
};

const positions = {
    0: { x: 100, y: 100 },
    1: { x: 200, y: 100 },
    2: { x: 300, y: 200 },
    3: { x: 200, y: 300 },
    4: { x: 100, y: 300 }
};

function createGraph() {
    Object.keys(positions).forEach(label => {
        const { x, y } = positions[label];
        drawNode(x, y, label);
    });

    Object.keys(graph).forEach(from => {
        graph[from].forEach(to => {
            drawEdge(from, to, true); 
        });
    });
}

createGraph();
