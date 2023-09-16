import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Default } from '../../components/Default';
import { TimerContext } from '../_app';
import connect2db from '../../lib/mongodb';
import { useDispatch, useSelector } from 'react-redux';
import { zeroing } from '../../store/slices/resultSlice';
import { Layout } from '../../components/Layout';
import { Results } from '../../components/Results';

const ResultsPage = ({ tests }) => {
    const setIsCounting = useContext(TimerContext)[1];
    const dispatch = useDispatch();
    const { query, push } = useRouter();
    const { testId } = query;
    const test = tests.find(({ id }) => id.toString() === testId);
    const { result } = useSelector(state => state.resultReducer);
    if (!test) return <Default />;
    const { questions, id } = test;
    return (
        <>
            <Head>
                <title>Результаты</title>
            </Head>
            <Layout length={questions.length} {...test}>
                <div className="flex flex-col items-center jus">
                    <div className="text-2xl text-center mt-10">
                        Ваш результат: {result}/{questions.length}
                    </div>
                    <button
                        className="mt-10"
                        onClick={() => {
                            push(`/${id}/0`);
                            dispatch(
                                zeroing({
                                    timeouts: questions.map(
                                        ({ timeLimit }) => timeLimit
                                    ),
                                })
                            );
                            setIsCounting(true);
                        }}
                    >
                        Пройти заново
                    </button>
                    <br />
                    <h3 className="text-2xl mb-5">Подробные результаты:</h3>
                    <Results />
                </div>
            </Layout>
        </>
    );
};

export default ResultsPage;

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