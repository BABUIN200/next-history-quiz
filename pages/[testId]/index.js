import { useRouter } from 'next/router';
import { Default } from '../../components/Default';
import { Layout } from '../../components/Layout';
import connect2db from '../../lib/mongodb';
import { useDispatch } from 'react-redux';
import { zeroing } from '../../store/slices/resultSlice';
import { useContext } from 'react';
import { TimerContext } from '../_app';

const Index = ({ tests }) => {
    const setIsCounting = useContext(TimerContext)[1];
    const dispatch = useDispatch();
    const { query, push } = useRouter();
    const { testId } = query;
    const test = tests[+testId];
    if (!test) return <Default />;
    const { questions, id, title } = test;
    return (
        <>
            <div>
            <title>Тест &quot;{title}&quot;</title>
            <Layout length={questions.length} {...test}>
                <button
                    onClick={() => {
                      dispatch(
                        zeroing({
                          timeouts: questions.map(
                            ({ alltime }) => alltime
                            ),
                          })
                          );
                          push(`/${id}/0`);
                        setIsCounting(true);
                    }}
                >
                    Приступить к тесту
                </button>
            </Layout>
            </div>
        </>
    );
};

export default Index;

export const getServerSideProps = async () => ({
    props: {
        tests: JSON.parse(
            JSON.stringify(
                await (await connect2db()).db
                    .collection('mydb')
                    .find({})
                    .toArray()
            )
        ),
    },
});