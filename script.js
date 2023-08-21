const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//Show Loading Spinner
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
//Hide Loading Spinner
function hideLoadingspinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Show New Quote
function newQuote() {
  showLoadingSpinner();
  //Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is blank and replace it with 'Unknown'
  // authorText.textContent = quote.author ?? "Unknown";

  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // console.log(authorText.textContent);

  // Check Quote length to determine styling with '.long-quote' or not.
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //SetQuote, Hide Loader
  quoteText.textContent = quote.text;
  hideLoadingspinner();
}

// GET Quotes From API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //Catch Error Here
    apiQuotes = localQuotes;
  }
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On Load
getQuotes();

/*
//For local json object files(quotes.js)

function newQuote() {
  const quote =
    localQuotes[Math.floor(Math.random() * Math.floor(localQuotes.length))];
  console.log(quote);
}

newQuote();
*/

/*
Rough
function newQuote() {
  const quote = localQuotes[15];
  console.log(quote);
  // Check if Author field is blank and replace it with 'Unknown'
  // authorText.textContent = quote.author ? quote.author : "Unknown";
  authorText.textContent = quote.author ?? "Unknown";
  console.log(authorText.textContent);

  authorText.textContent = quote.author;

  quoteText.textContent = quote.text;
}
newQuote();
*/
