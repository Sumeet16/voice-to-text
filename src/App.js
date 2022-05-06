import React, { useEffect, useState } from 'react';
import './App.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition();

mic.continous = true;
mic.interimResults = true;
mic.lang = 'en-US';


function App() {
  const [isListening, setisListening] = useState(false);
  const [note, setnote] = useState(null);
  const [savedNotes, setsavedNotes] = useState([]);

  useEffect(() => {
    hanleListen()
  }, [isListening])

  const hanleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue...");
        mic.start();
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click');
      }
    }
    mic.onstart = () => {
      console.log('Mics on');
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript);
      setnote(transcript)
      mic.onerror = event => {
        console.log(event.error);
      }
    }
  }

  const handleSavedNotes = () => {
    setsavedNotes([...savedNotes, note])
    setnote('')
  }

  return (
    <>
      <h1>Voice Notes</h1>
      <div className="container">
        <div className="box">
          <h2>Current Notes</h2>
          {isListening ? <span>🎙️</span> : <span>🔴🎙️</span>}
          <button onClick={() => setisListening(prevState => !prevState)}>Start/Stop</button>
          <button onClick={handleSavedNotes} disabled={!note}>Save Notes</button>
          <p>{note}</p>
        </div>
        <div className="box">
          <h2>Notes</h2>
          {savedNotes.map(p => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
