import React, { useEffect } from 'react'
import { useParams, useHistory } from 
"react-router-dom";
import { readDeck, readCard, updateCard } from '../utils/api/index'; 

function EditCard({ deck, setDeck, card, setCard }) {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck)
    }
    loadDeck();
  }, [deckId, setDeck]);

  useEffect(() => {
    async function loadCard() {
      const cardRead = await readCard(cardId);
      setCard(cardRead)
       }
      loadCard();
    }, [cardId, setCard]);

  function saveHandler (event) {
    event.preventDefault();
    updateCard(card).then((response) => history.push(`/decks/${deck.id}`))
  }

  function handleCancel() {
    history.push(`/decks/${deck.id}`)
  }

  function changeFront(event){
    setCard({ ...card, front: event.target.value })
  }
  
  function changeBack(event){
    setCard({ ...card, back: event.target.value })
  }

  console.log("does the work?" + deck)

  return (
    <div>
      <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
        </ol>
      </nav>
    </div>
    <div>
    <form>
    <h1>Edit Card</h1>
  <div className="mb-3">
    <label 
    className="form-label">Front</label>
    <textarea
      type="text" className="form-control" 
      id="front"
      value={card.front}
      onChange={changeFront}
      rows="3"/> 
  </div>
  <div className="mb-3">
    <label className="form-label">Back</label>
    <textarea className="form-control" id="back"
    value={card.back}
    onChange={changeBack}
    rows="3"
    />
  </div>

  <button type="submit" className="btn btn-primary" onClick={handleCancel}>Cancel</button>

  <button type="submit" className="btn btn-primary" onClick={saveHandler} >Save</button>
  </form>
  </div>
  </div>
  )
}

export default EditCard
