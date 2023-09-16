import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { TimerContext } from '../pages/_app';

export const TestTimer = ({ timeout }) => {
    const { push, query } = useRouter();
    const { testId } = query;
    const [timeLeft, setTimeLeft] = useState(timeout);
    const [isCounting, setIsCounting] = useContext(TimerContext);
    const minutes = Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, '0');
    const seconds = (timeLeft - +minutes * 60).toString().padStart(2, '0');
    useEffect(() => {
        const interval = setInterval(() => {
            isCounting &&
                setTimeLeft(timeLeft => (timeLeft >= 1 ? timeLeft - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [isCounting, timeLeft]);
    if (!timeLeft && isCounting) {
        setIsCounting(false);
        push(`/${testId}/results`);
    }
    return (
        <div>
            <span>
                {minutes}:{seconds}
            </span>
        </div>
    );
};