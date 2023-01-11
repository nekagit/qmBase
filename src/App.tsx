import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';

function App() {
  const [qa, setQa] = useState([])
  useEffect(() => {
    fetch("https://qmbasefunctions.azurewebsites.net/api/questions?code=Y5DGbEq3YHjpTKgrwq9czVdm7ZxR8zy26Z_yNh8q4DFKAzFudvB65w==")
      .then(response => response.json())
      .then(data => setQa(data));
  }, []);
  const listItems = qa.map((qa: any) =>
  <><li key={qa.id.toString()}><span className="qaQuestions">{qa.question}</span><br/><span className='qaAnswers'>{qa.answer}</span></li></>
);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Frequent questions</h1>
        <h4>simple answers to your most common questions</h4>
        <Button variant="dark">Dark</Button>
        <Button variant="dark">Dark</Button>
        <input type="text" className="search" placeholder="Search" />
        <div className="personalGrid">{listItems}</div>
      </header>
    </div>
  );
}

export default App;