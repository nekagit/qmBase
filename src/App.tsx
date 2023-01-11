import React, { useCallback } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

// React Component showing Q@A Answers from qmBase most common questions
// enabling a list of all ansers and a search&filter function
function App() {

  const maxleng: number = 200 // max length of Anwers
  const [qa, setQa] = useState([]) // State fo fetched answers
  const [state, setState] = useState({
    query: '',
    list: []
  }) // State of Searching

  const [stateAdding, setStateAdding] = useState({
    question: '',
    answer: "",
  }) // State of Searching

  // Fetching all answers
  useEffect(() => {
    fetch("https://qmbasefunctions.azurewebsites.net/api/questions?code=Y5DGbEq3YHjpTKgrwq9czVdm7ZxR8zy26Z_yNh8q4DFKAzFudvB65w==")
      .then(response => response.json())
      .then(data => setQa(data));
  }, []);

  // Think of memoization as caching a value so that it does not need to be recalculated.
  // This allows us to isolate resource intensive functions so 
  // that they will not automatically run on every render.
  const handleChange = useCallback((e: { target: { value: string; }; }) => {
    const results = qa.filter((element: any) => {
      if (e.target.value === "") return qa
      if (element.question.toLowerCase().includes(e.target.value.toLowerCase())) {
        return true
      }
      else if (element.answer.toLowerCase().includes(e.target.value.toLowerCase())) {
        return true
      }

      else {
        return false
      }
    })
    setState({
      query: e.target.value,
      list: results
    })
  }, [qa, setState])

  // TSX of the answers
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
      <header className="App-header pt-3">
        <h1>Frequent questions</h1>
        <h6>simple answers to your most common questions</h6>
        <hr />
        <form className='d-flex flex-column'>
          <input className='Input' onChange={handleChange} value={state.query} type="search" placeholder='Search for Question/Answer' />
        <hr />
          <input className='Input' value={stateAdding.question} type="search"  placeholder='Input Question' />
          <input className='Input' value={stateAdding.answer} type="search"  placeholder='Input Answer' />
          <button className='btn btn-info mt-2'>Submit</button>
        </form>
        <ul>
          {(state.query === '' ? "" : state.list.map((qq: any) => {
            return <li key={qq.id.toString()}> {qq.answer}</li>
          }))}
        </ul>
        <div className="personalGrid">{listItems}</div>
      </header>
    </div>
  );
}

export default App;