<script>
  import Board from "./Board.svelte";
  let history = [{
    squares: Array(16).fill(undefined),
  }];
  let stepNumber = 0;
  $: current = history[stepNumber];
  $: xIsNext = stepNumber % 2 === 0;
  $: winner = calculateWinner(current.squares);
  $: status = winner ? "Winner: " + winner : "Next player: " + (xIsNext ? "X" : "O");

  function handleClick(i) {
    if(winner || current.squares[i]) {
      return;
    }
    const squares = history[stepNumber].squares.slice();
    squares[i] = xIsNext ? "X" : "O";
    history = history.slice(0, stepNumber + 1).concat({squares: squares})
    stepNumber += 1;
  }

  function calculateWinner(squares) {
    const winIndexes = [
      //horizontals
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
      //verticals
      [0, 4, 8, 12],
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
      //2-by-2s
      [0, 1, 4, 5],
      [1, 2, 5, 6],
      [2, 3, 6, 7],
      [4, 5, 8, 9],
      [5, 6, 9, 10],
      [6, 7, 10, 11],
      [8, 9, 12, 13],
      [9, 10, 13, 14],
      [10, 11, 14, 15],
      //diagonals
      [0, 5, 10, 15],
      [3, 6, 9, 12],
    ];
    for (let i = 0; i < winIndexes.length; i++) {
      const [a, b, c, d] = winIndexes[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c] &&
        squares[a] === squares[d]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function jumpToMove(move) {
    stepNumber = move;
  }
</script>

<main>
  <Board handleClick={handleClick} squares={current.squares}/>
  <div class="game-info">
    <div>{status}</div>
    <ol>
      {#each history as _, move (move)}
        <li>
          <button on:click={() => jumpToMove(move)}>{move ? "Go to move #" + move : "Go to game start"}</button>
        </li>
      {/each}
    </ol>
  </div>
  <p>Win by getting 4 in a 2x2 square or 4 in a row.</p>
</main>

<style>
.game-info {
  margin-left: 20px;
}

main {
  display: flex;
  flex-direction: row;
}
</style>