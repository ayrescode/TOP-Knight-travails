/**
 * Creates a node for the search algorithm. Each node represents a square on the board.
 * @param {Array<number>} position - The [x, y] coordinates of the square.
 * @param {object | null} parent - The node that led to this one, used for path reconstruction.
 * @returns {object} A move node object.
 */
function createMoveNode(position, parent = null) {
  return {
    position,
    parent,
  };
}

/**
 * Calculates all 8 possible knight moves from a given position and filters out
 * any moves that would go off the 8x8 chessboard.
 * @param {Array<number>} position - The starting [x, y] coordinates.
 * @returns {Array<Array<number>>} An array of valid move coordinates.
 */
function getValidMoves(position) {
  const [x, y] = position;
  // All 8 potential "L-shaped" moves a knight can make.
  const allPossibleMoves = [
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x - 2, y + 1],
    [x - 2, y - 1],
    [x + 1, y + 2],
    [x + 1, y - 2],
    [x - 1, y + 2],
    [x - 1, y - 2],
  ];

  // Return only the moves that are on the 8x8 board (indices 0-7).
  return allPossibleMoves.filter((move) => {
    const [mx, my] = move;
    return mx >= 0 && mx < 8 && my >= 0 && my < 8;
  });
}

/**
 * Finds the shortest path for a knight between two squares on a chessboard
 * using a Breadth-First Search (BFS) algorithm.
 * @param {Array<number>} startingPosition - The starting [x, y] coordinates.
 * @param {Array<number>} endingPosition - The target [x, y] coordinates.
 * @returns {Array<Array<number>> | undefined} The shortest path as an array of coordinates, or undefined if no path exists.
 */
function knightMoves(startingPosition, endingPosition) {
  // A queue to manage the squares to visit next (FIFO for BFS).
  let queue = [];
  // Add the starting square to the queue.
  queue.push(createMoveNode(startingPosition));
  // A set to keep track of visited squares to prevent infinite loops and redundant work.
  const visited = new Set();
  visited.add(startingPosition.toString());

  // Loop as long as there are squares to explore.
  while (queue.length > 0) {
    // Dequeue the next square to visit.
    let currentNode = queue.shift();

    // Check if we've reached the destination.
    if (currentNode.position[0] == endingPosition[0] && currentNode.position[1] == endingPosition[1]) {
      // If so, reconstruct the path by walking backward from the destination using the 'parent' pointers.
      let path = [];
      path.unshift(currentNode.position);
      while (currentNode.parent != null) {
        path.unshift(currentNode.parent.position);
        currentNode = currentNode.parent;
      }
      // Log the result and return the path.
      console.log(`You have reached it in ${path.length - 1} steps`);
      path.forEach((pos) => console.log(pos));
      return path;
    }

    // Get all valid moves from the current position.
    const moves = getValidMoves(currentNode.position);
    for (let move of moves) {
      const moveString = move.toString();
      // If the move has not been visited yet...
      if (!visited.has(moveString)) {
        // ...mark it as visited...
        visited.add(moveString);
        // ...create a new node for it...
        const newMove = createMoveNode(move, currentNode);
        // ...and add it to the queue to be explored later.
        queue.push(newMove);
      }
    }
  }
}

// Example: Find the shortest path from the top-left corner [0, 0] to the bottom-right corner [7, 7].
knightMoves([0, 0], [7, 7]);
