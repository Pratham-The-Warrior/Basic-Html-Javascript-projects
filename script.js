const api_url = "https://api.adviceslip.com/advice";

const quote = document.getElementById("quote");
const author = document.getElementById("author");

async function getQuote() {
  try {
    const response = await fetch(api_url, { cache: "no-cache" }); // Avoid cached advice
    if (!response.ok) throw new Error("Network error");

    const data = await response.json();
    quote.innerHTML = `"${data.slip.advice}"`;
    author.innerHTML = `King Pratham The Great`;
  } catch (err) {
    quote.innerHTML = "⚠️ Failed to load quote.";
    author.innerHTML = "";
    console.error("Fetch error:", err);
  }
}

function share() {
  const quoteText = quote.innerText;
  const authorText = author.innerText;
  const shareText = `${quoteText} ${authorText}`;

  const shareData = {
    title: "Quote of the Day",
    text: shareText,
    url: window.location.href,
  };

  if (navigator.share) {
    navigator
      .share(shareData)
      .then(() => console.log("Quote shared successfully!"))
      .catch((err) => console.error("Sharing failed:", err));
  } else {
    alert("Web Share API is not supported in this browser.");
  }
}

// Load first quote when page loads
getQuote();
