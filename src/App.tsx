import { useState } from 'react'
import './App.css'

const STOIC_QUOTE_API_URL = "https://stoic-quotes.com/api/quote"
const IMAGE_API_URL = "https://picsum.photos/200/300?grayscale"

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const getData = async (apiUrl: string) => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error fetching image, response status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
      return json
    } catch (error: any) {
      console.error(error.message);
    }
  }

  const getQuoteData = async () => {
    const quote = await getData(STOIC_QUOTE_API_URL)
    setQuote(quote["text"]);
    setAuthor(quote["author"]);
    const uniqueParam = new Date().getTime(); // Or use any unique value
    setImageUrl(`${IMAGE_API_URL}&time=${uniqueParam}`);
  }

  return (
    <>
      <img src={imageUrl}></img>
      <div>
        {quote}
        <p>
          {author}
        </p>
      </div>
      <button onClick={() => getQuoteData()}>
        Get Quote
      </button>
    </>
  )
}

export default App
