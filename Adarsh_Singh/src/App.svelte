<!-- calculator.svelte -->
<script>
  let fn = "";
  let sn = "";
  let operators = null;
  let Result = null;

  function handleNumberClick(event) {
    if (operators === null) {
      fn += event.target.innerText;
    } else {
      sn += event.target.innerText;
    }
  }

  function handleDecimalClick(event) {
    if (operators === null && !fn.includes('.')) {
      fn += event.target.innerText;
    } else if (operators !== null && !sn.includes('.')) {
      sn += event.target.innerText;
    }
  }

  function handleOperatorClick(event) {
    operators = event.target.innerText;
  }

  function handleEqualClick() {
    switch (operators) {
      case '+':
        Result = parseFloat(fn) + parseFloat(sn);
        break;
      case '-':
        Result = parseFloat(fn) - parseFloat(sn);
        break;
      case '*':
        Result = parseFloat(fn) * parseFloat(sn);
        break;
      case '/':
        Result = parseFloat(fn) / parseFloat(sn);
        break;
      default:
        break;
    }

    fn = Result.toString();
    sn = "";
    operators = null;
    Result = null;
  }

  function handleClearClick() {
    fn = "";
    sn = "";
    operators = null;
    Result = null;
  }
</script>

<style>
  .buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
</style>

<h1>Calculator by ADARSH SINGH</h1>

<div class="display">
  {#if Result !== null}
    <span class="result">{Result}</span>
  {:else}
    <span class="num">{fn}</span>
    {#if operators !== null}
      <span class="operator">{operators}</span>
    {/if}
    <span class="num">{sn}</span>
  {/if}
</div>

<div class="buttons">
  <button on:click={handleNumberClick}>1</button>
  <button on:click={handleNumberClick}>2</button>
  <button on:click={handleNumberClick}>3</button>
  <button on:click={handleOperatorClick}>+</button>
  
  <button on:click={handleNumberClick}>4</button>
  <button on:click={handleNumberClick}>5</button>
  <button on:click={handleNumberClick}>6</button>
  <button on:click={handleOperatorClick}>-</button>
  
  <button on:click={handleNumberClick}>7</button>
  <button on:click={handleNumberClick}>8</button>
  <button on:click={handleNumberClick}>9</button>
  <button on:click={handleOperatorClick}>*</button>
  
  <button on:click={handleClearClick}>C</button>
  <button on:click={handleNumberClick}>0</button>
  <button on:click={handleDecimalClick}>.</button>
  <button on:click={handleOperatorClick}>/</button>
  <button on:click={handleEqualClick}>=</button>
</div>
