import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    result: 0,
    questionsStatuses: [],
};

const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        addAnswer(
            state,
            {
                payload: { id, content, isRight },
            }
        ) {
            if (isRight) state.result++;
            state.questionsStatuses = state.questionsStatuses.map(question =>
                question.id === id
                    ? {
                          ...question,
                          isAnswered: true,
                          userAnswer: content,
                          isRight,
                      }
                    : question
            );
        },
        zeroing(
            state,
            { payload: { timeouts } }
        ) {
            state.result = 0;
            state.questionsStatuses = timeouts.map((timeout, index) => ({
                id: `${index}`,
                isAnswered: false,
                timeout,
                allTime: timeout,
                userAnswer: '',
                isRight: null,
            }));
        },
        minusSecond(state, { payload: { id } }) {
            state.questionsStatuses = state.questionsStatuses.map(question =>
                question.id === id
                    ? {
                          ...question,
                          timeout:
                              question.timeout >= 1 ? question.timeout - 1 : 0,
                      }
                    : question
            );
        },
    },
});

export const { zeroing, addAnswer, minusSecond } = resultSlice.actions;
export default resultSlice.reducer;