/** @format */

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import QuestionGroup from './QuestionGroup';
import Timer from './Timer';
import postRequest from '../../redux/actions/postActions';
import Webcam from './Webcam';
import { makeRequest } from '../../redux/actions/makeRequest';
import { Link } from 'react-router-dom';

const Exam = props => {
  const handle = useFullScreenHandle();
  const [ questions, setQuestions ] = useState([]);
  const [ error, setError ] = useState(null);

  const [active, setActive] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const onNext = () => {
    if (active < questions?.length - 1) {
      setActive(active + 1);
    }
  };

  useEffect(async () => {
    if ( questions?.length === 0 ) {
      const result = await postRequest("users/start-exam", {
        user_id: localStorage.getItem("localId"),
        exam_id: props.match.params.exam_id
      });

      let _answers = [];

      for ( const question of result ) {
        _answers.push({id: question.id, answer: 0});
      }

      setAnswers(_answers);
      setQuestions(result);
    }

    localStorage.removeItem('@ANSWERS');
    handle.enter();
  }, []); 

  return (
    <FullScreen handle={handle}>
      <div className="vh-100 bg-white">
        <div className="container py-5">
          {error ? 
            <div className="text-danger">{error}</div> 
            : 
            null
          }
          <Webcam />
          {
            !finished ? 
              <>
                {questions?.map((group, idx) => (
                  <React.Fragment key={idx}>
                    {active === idx ? (
                      <>
                        <div className="d-flex align-items-center justify-content-between">
                          <h5>
                            {idx + 1}/{questions.length}
                          </h5>
                          <Timer finishDate={questions[0]?.finish_date} />
                        </div>
                        <QuestionGroup answers={answers} setAnswers={setAnswers} group={group} key={idx} />
                      </>
                    ) : null}
                  </React.Fragment>
                ))}
                <div className="float-end">
                  <button
                    type="button"
                    className="btn btn-dark text-white px-3 border-0 rounded ms-2"
                    onClick={() => {
                      if (active > 0) {
                        setActive(active - 1);
                      }
                    }}
                  >
                    Inapoi
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark text-white px-3 border-0 rounded ms-2"
                    onClick={onNext}
                  >
                    Inainte
                  </button>
                  <button type="button" className="btn btn-outline-danger px-3 rounded ms-2" onClick={async () => {
                    let isOk = true;

                    for ( const answer of answers ) {
                      if ( answer.answer === 0 ) {
                        isOk = false;
                        break;
                      }
                    }
                    console.log(isOk)
                    if ( !isOk ) {
                      setError("Raspunde la toate intrebariile inainte de a trimite raspunsurile!");
                    }
                    else
                    {
                      setError(null);
                      setFinished(true);

                      const result = await postRequest("users/finish-exam", {
                        user_id: localStorage.getItem("localId"),
                        exam_id: props.match.params.exam_id,
                        answers: answers
                      });
                    }
                  }}>
                    Termina examen
                  </button>
                </div>
              </>
            :
            <div>Examenul s-a terminat! <br /><Link to="/">Inapoi la pagina principala!</Link></div> 
          }
        </div>
      </div>
    </FullScreen>
  );
};

export default Exam;
