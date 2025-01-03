// TREE ILLUSTRATION
const treeContainer = document.getElementById("tree");
const arrayContainer = document.getElementById("arrayContainer");
let traversalTimeouts = []; // array to store timeouts for traversal animations
// EXAMPLE
const binaryTree = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, null, null, 12, 13];
const nodes = drawTree(binaryTree);

function drawNode(x, y, value) {
    const node = document.createElement("div");
    node.classList.add("node");
    node.textContent = value;
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    treeContainer.appendChild(node);
    return node;
}

function drawEdge(x1, y1, x2, y2) {
    const edge = document.createElement("div");
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    edge.classList.add("edge");
    edge.style.width = `${length}px`;
    edge.style.left = `${x1}px`;
    edge.style.top = `${y1}px`;
    edge.style.transform = `rotate(${angle}deg)`;
    treeContainer.appendChild(edge);
}

function drawTree(arr) {
    const nodeRadius = 30; // half the new node size (60px)
    const yOffset = 140; // vertical spacing
    const horizontalSpacing = 600; // horizontal spacing
    const nodes = []; // store node references

    function helper(index, x, y, levelWidth) {
        if (index >= arr.length || arr[index] === null) return;

        // draw current node
        const currentNode = drawNode(x, y, arr[index]);
        nodes[index] = currentNode;

        // calculate positions for child nodes
        const childXOffset = levelWidth / 2;

        // draw left child and edge
        const leftIndex = 2 * index + 1;
        if (leftIndex < arr.length && arr[leftIndex] !== null) {
            const leftX = x - childXOffset;
            const leftY = y + yOffset;
            drawEdge(
                x + nodeRadius * 1.2, 
                y + nodeRadius * 2.2, 
                leftX + nodeRadius, 
                leftY
            );
            helper(leftIndex, leftX, leftY, levelWidth / 2);
        }

        // draw right child and edge
        const rightIndex = 2 * index + 2;
        if (rightIndex < arr.length && arr[rightIndex] !== null) {
            const rightX = x + childXOffset;
            const rightY = y + yOffset;
            drawEdge(
                x + nodeRadius * 1.2, 
                y + nodeRadius * 2.2, 
                rightX + nodeRadius, 
                rightY
            );
            helper(rightIndex, rightX, rightY, levelWidth / 2);
        }
    }

    helper(0, treeContainer.offsetWidth / 2, 40, horizontalSpacing);

    initializeEmptyVisualArray(arr);

    return nodes;
}

function initializeEmptyVisualArray(arr) {
    arrayContainer.innerHTML = ""; // clear array container
    arr.forEach(() => {
        const element = document.createElement("div");
        element.classList.add("array-element");
        arrayContainer.appendChild(element);
    });
}




// TRAVERSAL ANIMATIONS
function highlightNodes(order) {
    resetTree(); // reset tree before starting new traversal
    traversalTimeouts = []; // clear previous timeouts
    let delay = 0;

    order.forEach((index, i) => {
        const timeout = setTimeout(() => {
            nodes[index].classList.add("visited");
            updateVisualArray(i, binaryTree[index]);
        }, delay);
        traversalTimeouts.push(timeout);
        delay += 1000;
    });
}

function updateVisualArray(position, value) {
    const arrayElements = document.querySelectorAll(".array-element");
    const element = arrayElements[position];
    if (element) {
        element.classList.add("visited");
        element.textContent = value;
    }
}

function resetTree() {
    // cancel all ongoing animations
    traversalTimeouts.forEach(timeout => clearTimeout(timeout));
    traversalTimeouts = []; // clear timeout array

    // reset all nodes to white
    nodes.forEach(node => {
        if (node) node.classList.remove("visited");
    });

    initializeEmptyVisualArray(binaryTree);
}


// level-order
function startLevelOrder() {
    const queue = [0];
    const order = [];
    while (queue.length > 0) {
        const index = queue.shift();
        if (nodes[index]) {
            order.push(index);
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            if (left < nodes.length) queue.push(left);
            if (right < nodes.length) queue.push(right);
        }
    }
    highlightNodes(order);
}

// pre-order
function startPreOrder() {
    const order = [];
    function preOrder(index) {
        if (index >= nodes.length || !nodes[index]) return;
        order.push(index);
        preOrder(2 * index + 1); // Left
        preOrder(2 * index + 2); // Right
    }
    preOrder(0);
    highlightNodes(order);
}

// in-order
function startInOrder() {
    const order = [];
    function inOrder(index) {
        if (index >= nodes.length || !nodes[index]) return;
        inOrder(2 * index + 1); // Left
        order.push(index);
        inOrder(2 * index + 2); // Right
    }
    inOrder(0);
    highlightNodes(order);
}

// post-order
function startPostOrder() {
    const order = [];
    function postOrder(index) {
        if (index >= nodes.length || !nodes[index]) return;
        postOrder(2 * index + 1); // Left
        postOrder(2 * index + 2); // Right
        order.push(index);
    }
    postOrder(0);
    highlightNodes(order);
}