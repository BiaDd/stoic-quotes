import { useState } from 'react'
import { Button } from 'primereact/button';

import './App.css'

const STOIC_QUOTE_API_URL = "https://stoic-quotes.com/api/quote"
const IMAGE_API_URL = "https://picsum.photos/200/300?grayscale"

function App() {
  const [quoteInfo, setQuoteInfo] = useState({ quote: "", author: "" });
  const [imageUrl, setImageUrl] = useState("");

  const getData = async (apiUrl: string) => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error fetching image, response status: ${response.status}`);
      }
      const json = await response.json();
      return json
    } catch (error: any) {
      console.error(error.message);
    }
  }

  const getQuoteData = () => {
    const uniqueParam = new Date().getTime(); // Or use any unique value
    setImageUrl(`${IMAGE_API_URL}&time=${uniqueParam}`);
    setTimeout(async () => {
      const { text, author } = await getData(STOIC_QUOTE_API_URL)
      setQuoteInfo(quoteInfo => ({ ...quoteInfo, quote: text, author: author }));
    }, 1000);
  }

  return (
    <>
      <img src={imageUrl}></img>
      <div className='quote-text'>
        <span>
          {quoteInfo.quote}
        </span>
        <p>
          - {quoteInfo.author}
        </p>
      </div>
      <Button label="Get Quote" onClick={() => getQuoteData()}
      />
    </>
  )
}

export default App
