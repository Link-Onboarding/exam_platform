/** @format */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const QuestionOption = ({ qId, answers, setAnswers, answerSelected, selectAnswer, option }) => {
  const [checked, toggleChecked] = useState(false);

  useEffect(() => {
    toggleChecked(answerSelected === option.id);

    for( let answer of answers ) {
      if ( answer.id === qId ) {
        if (answer.answer === option.id) {
          toggleChecked(true);
        };
      }
    }
  }, [answerSelected]);

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        checked={checked}
        onChange={() => {
          selectAnswer(option.id);

          let _answers = answers;

          for( let answer of _answers ) {
            if ( answer.id === qId ) {
              answer.answer = option.id;
            }
          }

          setAnswers(_answers);
        }}
      />
      <label className="form-check-label" htmlFor="flexRadioDefault">
        {option.content}
      </label>
    </div>
  );
};
// QuestionOption.propTypes = {
//   qId: PropTypes.number.isRequired,
//   answers: PropTypes.string,
//   setAnswers: PropTypes.func.isRequired,
//   selected: PropTypes.any,
//   setSelected: PropTypes.func.isRequired,
//   option: PropTypes.string.isRequired,
// };

const QuestionGroup = ({ answers, setAnswers, group }) => {
  const [answerSelected, selectAnswer] = useState(0);

  return (
    <>
    <h4>{group.content}</h4>
      {JSON.parse(group.answers).map((option, idx) => (
          <QuestionOption
          qId={group.id}
          answers={answers}
          setAnswers={setAnswers}
          answerSelected = {answerSelected}
          selectAnswer = {selectAnswer}
          option={option}
          key={idx}
        />
      ))}
    </>
  );
};
// QuestionGroup.propTypes = {
//   answers: PropTypes.string,
//   setAnswers: PropTypes.func.isRequired,
//   group: PropTypes.shape({
//     content: PropTypes.string.isRequired,
//     answers: PropTypes.arrayOf(PropTypes.string).isRequired,
//   }).isRequired,
// };

export default QuestionGroup;
