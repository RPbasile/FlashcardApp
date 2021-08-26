import React from 'react'
import { useHistory } from "react-router-dom";
import { createDeck } from '../utils/api/index'; 

function CreateDeck({deck, setDeck}) {
  let history = useHistory();

    //change deck state when name changes
    function changeName(event) {
      setDeck({ ...deck, name: event.target.value });
    }
    //change deck state when description changes
    function changeDesc(event) {
      setDeck({ ...deck, description: event.target.value });
    }

  function handleCancel(event) {
    event.preventDefault();
    history.push("/");
  }

  function handleSubmit(event) {
    event.preventDefault();
    createDeck(deck).then((response) => history.push(`/decks/${response.id}`));
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>

    <form>
      <h1>Create Deck</h1>
    <div className="mb-3">
      <label 
      className="form-label">Name</label>
      <input 
        type="text" className="form-control" 
        id="name"
        placeholder="Deck Name"
        required
        onChange={changeName}/> 
    </div>
    <div className="mb-3">
      <label className="form-label">Description</label>
      <textarea className="form-control" id="description" 
      placeholder="Brief description of the deck"
      rows="5"
      required
      onChange={changeDesc}
      />
    </div>

    <button type="submit" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>

    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </form>

  </div>
  )
}

export default CreateDeck
