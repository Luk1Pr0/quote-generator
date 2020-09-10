const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
};

const hideLoadingSpinner = () => {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
};

//Get quote from API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //If author is empty, add Unknown as author
        if (data.quoteAuthor === "") {
            authorText.innerText = "Unknown";
        } else {
        authorText.innerText = data.quoteAuthor;
        }
        //Reduce font size for quotes above 120 characters
        if (data.quoteText.length > 120) {
            quoteText.classList.add("long-quote");
        } else {
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data.quoteText;
        //Stop loader and display the quote
        hideLoadingSpinner();
    } catch (error) {
        getQuote();
    }
}

const tweetQuote = () => {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
}

//Event listeners
newQuoteButton.addEventListener("click", getQuote);

twitterButton.addEventListener("click", tweetQuote);

//On load
getQuote();