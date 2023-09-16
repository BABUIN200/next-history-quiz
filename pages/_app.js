import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../store';
import { createContext, useState } from 'react';

export const TimerContext = createContext();

function MyApp({ Component, pageProps }) {
    return (
        <TimerContext.Provider value={useState(false)}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </TimerContext.Provider>
    );
}

export default MyApp;