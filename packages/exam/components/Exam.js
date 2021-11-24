/** @format */

import React, { useState, useEffect } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import QuestionGroup from './QuestionGroup';
import Timer from './Timer';
import Webcam from './Webcam';

const DUMMY = [
  {
    content: 'Ce inaltime are Everest?',
    answers: ['100m', '200m', '8849m', '1234m'],
  },
  {
    content: 'Ce inaltime are Fabian JR.?',
    answers: ['1m', '4.5m', '8.12m', '2.12m'],
  },
  {
    content: 'Cand este ziua lui David Popescu?',
    answers: ['20 Octombrie 2001', '25 Noiembrie 2000', '20 Noiembrie 2000', '20 Noiembrie 2001'],
  },
];

const Exam = () => {
  const handle = useFullScreenHandle();

  const [active, setActive] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    handle.enter();
  }, []);

  return (
    <FullScreen handle={handle}>
      <div className="vh-100 bg-white">
        <div className="container py-5">
          <Webcam />
          {DUMMY.map((group, idx) => (
            <React.Fragment key={idx}>
              {active === idx ? (
                <>
                  <div className="d-flex align-items-center justify-content-between">
                    <h5>
                      {idx + 1}/{DUMMY.length}
                    </h5>
                    <Timer />
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
              onClick={() => {
                if (active < DUMMY.length - 1) {
                  setActive(active + 1);
                }
              }}
            >
              Inainte
            </button>
            <button type="button" className="btn btn-outline-danger px-3 rounded ms-2">
              Termina examen
            </button>
          </div>
        </div>
      </div>
    </FullScreen>
  );
};

export default Exam;
