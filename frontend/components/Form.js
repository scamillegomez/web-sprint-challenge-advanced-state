import React from 'react'
import { connect } from 'react-redux'
import { inputChange, postQuiz } from '../state/action-creators'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

  const onChange = evt => {
    props.inputChange(evt.target.id, evt.target.value);
  }

  const onSubmit = evt => {
    evt.preventDefault();
    console.log(props.form);
    props.postQuiz(props.form.newQuestion,props.form.newTrueAnswer, props.form.newFalseAnswer);
  }

  const allValuesFilled = evt => {
    const {newQuestion , newTrueAnswer, newFalseAnswer} = props.form;
    return [newQuestion , newTrueAnswer, newFalseAnswer].every(
      field => field.trim().length>0
    );
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={props.form.newQuestion}/>
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={props.form.newTrueAnswer}/>
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={props.form.newFalseAnswer}/>
      <button id="submitNewQuizBtn" disabled={!allValuesFilled()}>Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    form: state.form
  }
}

export default connect(mapStateToProps, {inputChange, postQuiz})(Form)
