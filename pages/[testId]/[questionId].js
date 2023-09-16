import Head from 'next/head';
import { Layout } from '../../components/Layout';
import { LongButton } from '../../components/longButton/LongButton';
import { SecondaryButton } from '../../components/secondaryButton/SecondaryButton';
import { useForm} from 'react-hook-form';
import { useRouter } from 'next/router';
import connect2db from '../../lib/mongodb';
import { Default } from '../../components/Default';
import { useDispatch, useSelector } from 'react-redux';
import { addAnswer } from '../../store/slices/resultSlice';
import { QuestionTimer } from '../../components/QuestionTimer';
import { TimerContext } from '../_app';
import { useContext } from 'react';
import axios from 'axios';

export function undercut(arr , index ) {
    return arr.slice(index).concat(arr.slice(0, index));
}

export default function QuestionPage({ tests }) {
    const setIsCounting = useContext(TimerContext)[1];
    const { questionsStatuses, result } = useSelector(
        state => state.resultReducer
    );
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { isDirty, isValid },
    } = useForm();
    const { query, push } = useRouter();
    const { questionId, testId } = query;
    const test = tests[+testId];
    if (!test) return <Default />;
    const { questions, id: test_id } = test;
    const question = questions[+questionId];
    if (!question) return <Default />;
    const { text, answers } = question;
    const { timeout } = questionsStatuses.find(({ id }) => id === questionId);
    const onSubmit = ({ answer }) => {
        dispatch(
            addAnswer({
                id: questionId,
                content: answer,
                isRight: answers.find(a=>a.text===answer).valid
            })
        );
        reset();
        if (
            questionsStatuses.every(
                ({ isAnswered, timeout }) => isAnswered || timeout === 0
            )
        ) {
            axios.post('../api/sendResult.js', { test_id, result });
            push(`/${testId}/results`);
            setIsCounting(false);
        } else
            push(
                `/${testId}/${
                    undercut(questionsStatuses, +questionId+1).find(
                        ({ isAnswered, timeout }) => !isAnswered && timeout > 0
                    )?.id
                }`
            );
    };
    if (
        questionsStatuses.every(
            ({ isAnswered, timeout }) => isAnswered || timeout === 0
        )
    ) {
        push(`/${testId}/results`);
        setIsCounting(false);
    }
    if (timeout === 0)
        push(
            `/${testId}/${
                undercut(questionsStatuses, +questionId+1).find(
                    ({ isAnswered, timeout }) => !isAnswered && timeout > 0
                )?.id
            }`
        );

    return (
        <div>
            <Head>
                <title>Вопрос №{+questionId+1}</title>
            </Head>
            <Layout length={questions.length} {...test}>
                <QuestionTimer questionId={questionId} />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={
                        'w-[824px] h-[374px] m-[262px_470px_324px_546px] flex flex-col justify-between'
                    }
                >
                    <div className={'flex flex-col items-center'}>
                        <p
                            className={
                                'text-lg w-[650px] text-center mb-[60px]'
                            }
                        >
                            {text}
                        </p>
                        <div className={'h-[124px] m-0 grid grid-cols-2 gap-6'}>
                            {answers.map((answer, index) => (
                                <LongButton
                                    key={index}
                                    isDisable={false}
                                    id={`${index}`}
                                    content={answer.text}
                                    register={register}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={'flex self-end'}>
                        <div className={'mr-6'}>
                            <SecondaryButton
                                text="ПРОПУСТИТЬ"
                                onClick={() => {
                                    push(
                                        `/${testId}/${
                                            undercut(
                                                questionsStatuses,
                                                +questionId+1
                                            ).find(
                                                ({ isAnswered, timeout }) =>
                                                    !isAnswered && timeout > 0
                                            )?.id
                                        }`
                                    );
                                    reset();
                                }}
                            />
                        </div>
                        <SecondaryButton
                            text={'ОТВЕТИТЬ'}
                            isDisabled={!isDirty || !isValid}
                            type={'submit'}
                        />
                    </div>
                </form>
            </Layout>
        </div>
    );
}

export const getServerSideProps = async () => ({
    props: {
        tests: JSON.parse(
            JSON.stringify(
                await (await connect2db()).db
                    .collection('mydb')
                    .find({})
                    .toArray()
            )
        )
    },
});