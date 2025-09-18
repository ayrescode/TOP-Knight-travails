function createMoveNode(position, parent = null) {
  return {
    position,
    parent,
  };
}
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
function knightMoves(startingPosition, endingPosition) {
  let queue = [];
  queue.push(createMoveNode(startingPosition));
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
      if (!visited.has(moveString)) {
        visited.add(moveString);
        const newMove = createMoveNode(move, currentNode);
        queue.push(newMove);
      }
    }
  }
}
// Example: Find the shortest path from the top-left corner [0, 0] to the bottom-right corner [7, 7].
knightMoves([0, 0], [7, 7]);
