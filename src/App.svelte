<script>
  import Board from "./Board.svelte";
  let history = [{
    squares: Array(16).fill(undefined),
  }];
  let stepNumber = 0;
  let xIsNext = true;
  function handleClick(i) {
    console.log(history, stepNumber, xIsNext);
    const squares = current.squares.slice();
    squares[i] = xIsNext ? "X" : "O";
    history = history.concat({squares: squares})
    stepNumber += 1;
    xIsNext = !xIsNext;
  }
  $: current = history[stepNumber];
</script>

<main>
  <Board handleClick={handleClick} squares={current.squares}/>
</main>

<style>
main {
  display: flex;
  flex-direction: row;
}
</style>