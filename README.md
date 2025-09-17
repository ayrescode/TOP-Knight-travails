# Knight Travails ♞

A JavaScript project that solves the "knight's tour" problem for finding the shortest path between two squares on a standard 8x8 chessboard. This was created as part of The Odin Project's curriculum to demonstrate graph traversal algorithms.

---
## How It Works

The solution treats the chessboard as an unweighted graph where:
- Each square is a **node** (or vertex).
- A legal knight's move between two squares is an **edge**.

To find the shortest path, a **Breadth-First Search (BFS)** algorithm is used. BFS explores the graph layer by layer, starting from the initial square. Because it explores all possible paths of a certain length before moving on to longer paths, the first time it reaches the destination square, it is guaranteed to have found a shortest path.

A `queue` is used to manage the squares to visit next, and a `Set` is used to keep track of `visited` squares to prevent infinite loops.

---
## Features

-   Finds the shortest path (in number of moves) for a knight between any two squares on an 8x8 board.
-   Prints the number of moves to the console.
-   Prints the sequence of coordinates in the path from start to finish.

---
## Usage

The project is a single JavaScript file containing all the necessary functions. To use it, simply call the `knightMoves` function with your desired starting and ending coordinates.

### Prerequisites

You need to have Node.js installed to run the script from the command line.

### Running the Script

1.  Save the code in a file (e.g., `knight.js`).
2.  Run the file using Node.js in your terminal:
    ```bash
    node knight.js
    ```

### Example

The main function takes a starting and ending position as an array of `[x, y]` coordinates.

```javascript
// Find the shortest path from [0, 0] to [7, 7]
knightMoves([0, 0], [7, 7]);

// Find the shortest path from [3, 3] to [4, 3]
knightMoves([3, 3], [4, 3]);
