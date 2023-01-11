import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';

function App() {
  const [state, setState] = useState({
    query: '',
    list: []
  })
  const maxleng: number = 200
  const [qa, setQa] = useState([])
  const [query, setQuery] = useState('')
//   {
//     "id": 1,
//     "question": "Question 1",
//     "answer": "Answer 1 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
//     "tags": [
//         "Tag1",
//         "Tag2"
//     ]
// },
  const handleChange = (e: { target: { value: string; }; }) => {
    const results = qa.filter((element: any) => {
      if (e.target.value === "") return qa
      if (element.question.toLowerCase().includes(e.target.value.toLowerCase())) {
        return element.element.toLowerCase().includes(e.target.value.toLowerCase())
      }
      else if (element.answer.toLowerCase().includes(e.target.value.toLowerCase())) {
        return element.answer.toLowerCase().includes(e.target.value.toLowerCase())
      }
      else if (element.id === e.target.value) {
        return e.target.value
      }
      else {
        return []
      }
    })
    setState({
      query: e.target.value,
      list: results
    })
  }
  useEffect(() => {
    fetch("https://qmbasefunctions.azurewebsites.net/api/questions?code=Y5DGbEq3YHjpTKgrwq9czVdm7ZxR8zy26Z_yNh8q4DFKAzFudvB65w==")
      .then(response => response.json())
      .then(data => setQa(data));
  }, []);
  const listItems = qa.map((qa: any) =>
    <><li key={qa.id.toString()}><span className="qaQuestions">{qa.question}</span><br /><textarea
      value={qa.answer}
      readOnly
      className="qaAnswers"
      maxLength={maxleng}
    /></li></>
  );
  return (
    <div className="App">
      <header className="App-header">
        <h1>Frequent questions</h1>
        <h4>simple answers to your most common questions</h4>
        <form>
          <input onChange={handleChange} value={state.query} type="search" />
        </form>
        <ul>
          {(state.query === '' ? "" : qa.map((qq: any) => {
            return <li key={qq.id.toString()}> {qq.answer}</li>
          }))}
        </ul>
        <div className="personalGrid">{listItems}</div>
      </header>
    </div>
  );
}

export default App;