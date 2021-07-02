const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuote = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuote() {
  showLoadingSpinner();
  const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];

  if (!quote.author) {
    quoteAuthor.textContent = 'Uhknown';
  } else {
    quoteAuthor.textContent = quote.author;
  }

  if (quote.text.length > 110) {
    quoteText.classList.add('long-text');
  } else {
    quoteText.classList.remove('long-text');
  }
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, '_blank');
}

twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);

async function getQuote() {
  showLoadingSpinner();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuote = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
  };
}

getQuote();