import React, { useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from '../utils/api/index'; 

function AddCard({deck, setDeck, card, setCard}) {
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    async function loadDecks() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDecks();
  }, [deckId, setDeck]);

  function changeFront(event){
    setCard({ ...card, front: event.target.value })
  }

  function changeBack(event){
    setCard({ ...card, back: event.target.value })
  }

  function handleDone() {
    history.push(`/decks/${deck.id}`)
  }

  function handleSave(event) {
    event.preventDefault();
    async function updateCard() {
      await createCard(deckId, card);
    };
    updateCard();
    setCard({
      front: "",
      back: "",
      deckId: deckId,
    })
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   const newDeck = {deckName, deckDescription}
  //   createDeck(newDeck).then((response) => history.push(`/decks/${response.id}`));
  // }


  return (
    <div>
          <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
          <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
      </nav>

    <form>
      <h1>{deck.name}: Add Card</h1>
    <div className="mb-3">
      <label 
      className="form-label">Front</label>
      <textarea
        type="text" className="form-control" 
        id="front"
        placeholder="Front side of card"
        rows="3"
        onChange={changeFront}/> 
    </div>
    <div className="mb-3">
      <label className="form-label">Back</label>
      <textarea className="form-control" id="back" 
      placeholder="Back side of card"
      rows="3"
      onChange={changeBack}
      />
    </div>

    <button type="done" className="btn btn-secondary" onClick={handleDone}>Done</button>

    <button type="submit" className="btn btn-primary" onClick={handleSave}>Save</button>
    </form>

  </div>
    </div>
  )
}

export default AddCard
