import connect2db from '../lib/mongodb';
import Link from 'next/link';
import styles from '../styles/global-back.module.scss'
 
const Home = ({ tests }) => {
    return (
        <>
            <title>Выбор теста</title>
            <div>
                {tests?.map(({ id, title }) => (
                    <div key={id}>
                        <Link href={`/${id}`}>{title}</Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;

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