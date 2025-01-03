import tkinter as tk
from tkinter import ttk
import turtle
from turtle_tree_visualizer import draw_tree, visualize_level_order, visualize_pre_order, visualize_in_order, visualize_post_order

class TreeVisualizerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Tree Visualization GUI")

        # tkinter frame for turtle canvas
        self.canvas_frame = tk.Frame(root, width=800, height=600)
        self.canvas_frame.pack()

        # turtle canvas
        self.canvas = tk.Canvas(self.canvas_frame, width=800, height=600)
        self.canvas.pack()
        self.screen = turtle.TurtleScreen(self.canvas)
        self.screen.bgcolor("white")
        self.screen.tracer(0)
        self.drawer = turtle.RawTurtle(self.screen)
        self.drawer.speed(0)
        self.drawer.hideturtle()

        # control buttons
        self.controls_frame = tk.Frame(root)
        self.controls_frame.pack(pady=10)
        ttk.Button(self.controls_frame, text="Level-Order Traversal", command=self.visualize_level_order).pack(side=tk.LEFT, padx=10)
        ttk.Button(self.controls_frame, text="Pre-Order Traversal", command=self.visualize_pre_order).pack(side=tk.LEFT, padx=10)
        ttk.Button(self.controls_frame, text="In-Order Traversal", command=self.visualize_in_order).pack(side=tk.LEFT, padx=10)
        ttk.Button(self.controls_frame, text="Post-Order Traversal", command=self.visualize_post_order).pack(side=tk.LEFT, padx=10)


        # example input tree
        self.tree_array = [8, 3, 10, 1, 6, None, 14, None, None, 4, 7, 13]
        draw_tree(self.drawer, self.screen, self.tree_array)

    def visualize_level_order(self):
        visualize_level_order(self.drawer, self.screen, self.tree_array)

    def visualize_pre_order(self):
        visualize_pre_order(self.drawer, self.screen, self.tree_array)

    def visualize_in_order(self):
        visualize_in_order(self.drawer, self.screen, self.tree_array)

    def visualize_post_order(self):
        visualize_post_order(self.drawer, self.screen, self.tree_array)
    

if __name__ == "__main__":
    root = tk.Tk()
    app = TreeVisualizerApp(root)
    root.mainloop()
