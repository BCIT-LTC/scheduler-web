import { useState } from "react";
import Cookies from "js-cookie";

const Faq = () => {
  const [questionAnswerPairs, setQuestionAnswerPairs] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingPairIndex, setEditingPairIndex] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const handleAddPairClick = () => {
    setEditingPairIndex(null);
    setShowPopup(true);
  };

  const handleEditPairClick = (pairIndex) => {
    setEditingPairIndex(pairIndex);
    setNewQuestion(questionAnswerPairs[pairIndex].question);
    setNewAnswer(questionAnswerPairs[pairIndex].answer);
    setShowPopup(true);
  };

  const handleCancelClick = () => {
    setShowPopup(false);
  };

  const handleQuestionChange = (event) => {
    setNewQuestion(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setNewAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingPairIndex === null) {
      setQuestionAnswerPairs([
        ...questionAnswerPairs,
        { question: newQuestion, answer: newAnswer }
      ]);
    } else {
      const newPairs = [...questionAnswerPairs];
      newPairs[editingPairIndex] = { question: newQuestion, answer: newAnswer };
      setQuestionAnswerPairs(newPairs);
    }
    setShowPopup(false);
  };

  return (
    <>
      <h1>Frequently Asked Questions</h1>
      <ul>
        {faqPairs.map((pair, index) => (
          <li key={index}>
            <h3>{pair.question}</h3>
            <p>{pair.answer}</p>
            {userRole === 'admin' && (
              <button onClick={() => handleEditPairClick(index)}>Edit</button>
            )}
          </li>
        ))}
      </ul>
      {userRole === 'admin' && (
        <button onClick={handleAddPairClick}>Add</button>
      )}
      {showPopup && (
        <div className="popup">
          <form onSubmit={handleSubmit}>
            <label>
              Question:
              <input type="text" value={newQuestion} onChange={handleQuestionChange} />
            </label>
            <label>
              Answer:
              <textarea value={newAnswer} onChange={handleAnswerChange} />
            </label>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Faq;
