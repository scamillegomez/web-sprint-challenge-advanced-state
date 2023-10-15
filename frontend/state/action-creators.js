// ❗ You don't need to add extra action creators to achieve MVP
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM } from './action-types'
import axios from 'axios'

export const moveClockwise = () => {
    return {type: MOVE_CLOCKWISE}
 }

export const moveCounterClockwise = () => {
  return {type: MOVE_COUNTERCLOCKWISE}
}
export const selectAnswer =(answer) => {
  console.log(answer.answer_id);
  return {type: SET_SELECTED_ANSWER, payload: answer}
 }

export const setMessage = (message) => {
    return { type: SET_INFO_MESSAGE, payload: message}
 }

export const setQuiz = (quiz) => {
  return {type: SET_QUIZ_INTO_STATE, payload: quiz}
 }
export const inputChange = (name,value) => {
  return {type: INPUT_CHANGE, payload: {[name]: value}}
 }

export const resetForm = () => {
  return {type: RESET_FORM}
 }

// ❗ Async action creators
export const fetchQuiz = () => dispatch => {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    //dispatch(setMessage('Loading next quiz...'));
      axios
        .get(`http://localhost:9000/api/quiz/next`)
        .then(res=>{
          //console.log(res.data);
          dispatch(setQuiz(res.data));
          console.log(res.data)
        })
        .catch(err=>console.log(err));   
  }

export const postAnswer =  (quizId,answerId) => async dispatch => {
  
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    dispatch(selectAnswer(''));
    try {
      const res = await axios.post('http://localhost:9000/api/quiz/answer', {
        quiz_id: quizId,
        answer_id: answerId
      });
      console.log('Response:', res.data);
      dispatch(setMessage(res.data.message));
    } catch(error) {
      console.error('error submitting answer:',error);
      if(error.res) {
        console.error('Response data:', error.res.data);
        console.error('Response status:', error.res.status);
      } 
    } finally {
        dispatch(fetchQuiz());
    }
  
}
export const postQuiz = (question,trueAnswer,falseAnswer) => async dispatch => {
    try {
      const res = await axios.post('http://localhost:9000/api/quiz/new', {
        question_text: question,
        true_answer_text: trueAnswer,
        false_answer_text: falseAnswer
      });
      console.log('response:',res.data.question);
      dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`));
    } catch(error) {
      console.error('error submitting new quiz:', error.res.data);
      console.error('Response status:', error.res.status);
    } finally {
      dispatch(resetForm());
    }
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
