import React from 'react'
import { fetchQuiz, selectAnswer,postAnswer, setMessage } from '../state/action-creators'
import { connect } from 'react-redux'
import { useEffect } from 'react'

const Quiz = (props) => {

  useEffect(() => {
    const fetchInitialQuiz = async () => {
        if (!props.quiz) {
            await props.fetchQuiz();
        }
    };
    fetchInitialQuiz();
}, []);

  const handleSubmit = (quizId, answerId) => {
    console.log('Quiz ID:', quizId);
    console.log('Answer ID:', answerId);
    console.log('Selected Answer:', props.selectedAnswer);
    props.postAnswer(quizId, answerId);
    // props.fetchQuiz();
  }

  const handleSelectAnswer = (answer) => {
    props.selectAnswer(answer);
    props.setMessage('');
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div className={props.selectedAnswer === props.quiz.answers[0]? 'answer selected' : 'answer'}>
                {props.quiz.answers[0].text}
                <button
                  onClick={()=>handleSelectAnswer(props.quiz.answers[0])}
            
                >
                  {props.selectedAnswer === props.quiz.answers[0]? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div className={props.selectedAnswer === props.quiz.answers[1]? 'answer selected' : 'answer'}>
              {props.quiz.answers[1].text}
                <button
                  onClick={()=>handleSelectAnswer(props.quiz.answers[1])}
                >
                  {props.selectedAnswer === props.quiz.answers[1] ? 'SELECTED' : 'Select'}
                </button>
              </div>
            </div>

            <button 
              id="submitAnswerBtn" 
              onClick={()=>handleSubmit(props.quiz.quiz_id, props.selectedAnswer.answer_id )}
              disabled={!props.selectedAnswer}
              >
                Submit answer
            </button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    quiz: state.quiz,
    infoMessage: state.infoMessage,
    selectedAnswer: state.selectedAnswer
  }
}

export default connect(mapStateToProps, {fetchQuiz, selectAnswer, postAnswer, setMessage})(Quiz);
