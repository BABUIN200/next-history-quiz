import React from 'react';
import { useSelector } from 'react-redux';

export const Results = () => {
    const { questionsStatuses } = useSelector(state => state.resultReducer);
    return (
        <div
            className={`h-[${
                questionsStatuses.length * 50
            }px] flex flex-col justify-around`}
        >
            {questionsStatuses.map(({ id, userAnswer, isRight }) => (
                <div key={id} className="text-lg">
                    {+id+1}.{' '}
                    <span
                        className={`opacity-${isRight ? 100 : 60} text-${
                            isRight ? 'green' : 'red'
                        }-500`}
                    >
                        {userAnswer ? userAnswer : 'нет ответа'}
                    </span>
                </div>
            ))}
        </div>
    );
};