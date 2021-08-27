<script>
  export let handleClick, squares;
  const indexes = [0, 1, 2, 3];
  import Square from "./Square.svelte";
</script>

<div>
  {#each indexes as row (row)}
    <div key={row} class="board-row">
      {#each indexes as col (col)}
        <Square
          value={squares[row * indexes.length + col]}
          on:click={() => handleClick(row * indexes.length + col)}
        />
      {/each}
    </div>
  {/each}
</div>

<style>
.board-row:after {
  clear: both;
  content: "";
  display: table;
}
</style>
