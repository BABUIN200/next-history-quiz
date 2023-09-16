import { Navbar } from './Navbar';
import { Header } from './Header';
import { useRouter } from 'next/router';
import Image from 'next/image';

export const Layout = ({ length, title, children, timeLimit }) => {
    const { back } = useRouter();
    const { pathname, push } = useRouter();
    return (
        <div className="flex">
            <div style={{ boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.06)' }}>
                <div className={'h-32 flex justify-center items-center'}>
                    <div
                        onClick={
                            pathname.includes('results')
                                ? () => push('/')
                                : back
                        }
                    >
                        <Image
                            src="/layout/back.svg"
                            alt=""
                            width={10}
                            height={18}
                        />
                    </div>
                </div>
                {!pathname.includes('results') && pathname !== '/[testId]' && (
                    <Navbar length={length} />
                )}
            </div>
            <div>
                <Header timeout={timeLimit} length={length}>
                    {title}
                </Header>
                <main>{children}</main>
            </div>
        </div>
    );
};