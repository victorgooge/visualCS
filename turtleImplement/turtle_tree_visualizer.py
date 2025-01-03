import turtle
import math
from queue import Queue

# draw node specific position
def draw_node(drawer, x, y, value, color="white"):
    drawer.penup()
    drawer.goto(x, y - 15)
    drawer.pendown()
    drawer.fillcolor(color)
    drawer.begin_fill()
    drawer.circle(15)
    drawer.end_fill()
    drawer.penup()
    drawer.goto(x, y - 5)
    drawer.write(value, align="center", font=("Arial", 12, "normal"))

# draw edge between two nodes
def draw_edge(drawer, x1, y1, x2, y2):
    drawer.penup()
    drawer.goto(x1, y1 - 15)
    drawer.pendown()
    drawer.goto(x2, y2 + 15)

# draw the binary tree based on array input
def draw_tree(drawer, screen, arr):
    if not arr:
        return

    global node_positions
    node_positions = {}
    level = 0
    queue = Queue()

    # init queue with the root node
    queue.put((0, 0, 0))  # (index, x, y)

    while not queue.empty():
        index, x, y = queue.get()

        if index >= len(arr) or arr[index] is None:
            continue

        # draw current node
        draw_node(drawer, x, y, arr[index])
        node_positions[index] = (x, y)

        # calculate positions for child nodes
        x_offset = 200 / (2 ** (level + 1))
        y_offset = -50

        # left child
        left_index = 2 * index + 1
        if left_index < len(arr) and arr[left_index] is not None:
            queue.put((left_index, x - x_offset, y + y_offset))
            draw_edge(drawer, x, y, x - x_offset, y + y_offset)

        # right child
        right_index = 2 * index + 2
        if right_index < len(arr) and arr[right_index] is not None:
            queue.put((right_index, x + x_offset, y + y_offset))
            draw_edge(drawer, x, y, x + x_offset, y + y_offset)

        if queue.empty() or queue.queue[0][2] < y:
            level += 1

# perform and visualize level order traversal
def visualize_level_order(drawer, screen, arr):
    if not arr:
        return

    queue = Queue()
    queue.put(0)
    visited = []

    while not queue.empty():
        index = queue.get()
        if index >= len(arr) or arr[index] is None:
            continue

        visited.append(arr[index])

        # highlight node visited
        x, y = node_positions[index]
        draw_node(drawer, x, y, arr[index], color="yellow")
        screen.update()
        turtle.time.sleep(0.5)
        draw_node(drawer, x, y, arr[index], color="white")
        screen.update()

        # add child nodes to queue
        left_index = 2 * index + 1
        right_index = 2 * index + 2

        if left_index < len(arr):
            queue.put(left_index)
        if right_index < len(arr):
            queue.put(right_index)

    print("Level Order Traversal:", visited)



# pre-order traversal
def visualize_pre_order(drawer, screen, arr, index=0):
    if index >= len(arr) or arr[index] is None:
        return

    # highlight
    x, y = node_positions[index]
    draw_node(drawer, x, y, arr[index], color="yellow")
    screen.update()
    turtle.time.sleep(0.5)
    draw_node(drawer, x, y, arr[index], color="white")
    screen.update()

    # visit left child
    visualize_pre_order(drawer, screen, arr, 2 * index + 1)
    # visit right child
    visualize_pre_order(drawer, screen, arr, 2 * index + 2)



# in-order traversal
def visualize_in_order(drawer, screen, arr, index=0):
    if index >= len(arr) or arr[index] is None:
        return

    # left child
    visualize_in_order(drawer, screen, arr, 2 * index + 1)

    # highlight
    x, y = node_positions[index]
    draw_node(drawer, x, y, arr[index], color="yellow")
    screen.update()
    turtle.time.sleep(0.5)
    draw_node(drawer, x, y, arr[index], color="white")
    screen.update()

    # right child
    visualize_in_order(drawer, screen, arr, 2 * index + 2)

# post-order traversal
def visualize_post_order(drawer, screen, arr, index=0):
    if index >= len(arr) or arr[index] is None:
        return

    # left child
    visualize_post_order(drawer, screen, arr, 2 * index + 1)
    # right child
    visualize_post_order(drawer, screen, arr, 2 * index + 2)

    # highlight
    x, y = node_positions[index]
    draw_node(drawer, x, y, arr[index], color="yellow")
    screen.update()
    turtle.time.sleep(0.5)
    draw_node(drawer, x, y, arr[index], color="white")
    screen.update()

# if __name__ == "__main__":
#     screen = turtle.Screen()
#     screen.title("Tree Visualization and Traversals")
#     screen.bgcolor("white")
#     screen.tracer(0)

#     drawer = turtle.Turtle()
#     drawer.speed(0)
#     drawer.hideturtle()

#     # example input array
#     tree_array = [1, 2, 3, 4, 5, None, 7]

#     draw_tree(drawer, screen, tree_array)

#     # visualize traversals
#     visualize_level_order(drawer, screen, tree_array)
#     visualize_pre_order(drawer, screen, tree_array)
#     visualize_in_order(drawer, screen, tree_array)
#     visualize_post_order(drawer, screen, tree_array)

#     turtle.done()
