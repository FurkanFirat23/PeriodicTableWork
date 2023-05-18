import Speller from "./speller.js";

if (/complete|interactive|loaded/.test(document.readyState)) {
  ready();
} else {
  document.addEventListener("DOMContentLoaded", ready);
}

// ****************************

function ready() {
  var enterWordEl = document.getElementById("enter-word");
  var spellBtn = document.getElementById("spell-btn");
  var wordSpellingEl = document.getElementById("word-spelling");

  enterWordEl.addEventListener("keydown", onKeydown, false);
  spellBtn.addEventListener("click", checkWord, false);

  // ********************************

  function onKeydown(evt) {
    if (evt.key == "Enter") {
      checkWord();
    }
  }

  function checkWord() {
    var inputWord = enterWordEl.value.toLowerCase().trim();
    enterWordEl.value = inputWord;

    // validate the input
    if (!/^[a-z]{3,}$/.test(inputWord)) {
      alert("Enter a word at least 3 letters long!");
      return;
    }

    // attempt to spell word
    var symbols = Speller.check(inputWord);

    // was a valid spelling found?
    if (symbols.length > 0) {
      enterWordEl.value = "";
      spellWord(symbols);
    } else {
      wordSpellingEl.innerHTML = "<strong>-- couldn't spell it! --</strong>";
    }
  }

  function spellWord(symbols) {
    wordSpellingEl.innerHTML = "";

    for (let symbol of symbols) {
      let elementEntry = Speller.lookup(symbol);
      let elementDiv = document.createElement("div");
      elementDiv.className = "element";
      elementDiv.innerHTML = `
				<div class="number">${elementEntry.number}</div>
				<div class="symbol">${elementEntry.symbol}</div>
				<div class="name">${elementEntry.name}</div>
			`;
      wordSpellingEl.appendChild(elementDiv);
    }
  }
}
