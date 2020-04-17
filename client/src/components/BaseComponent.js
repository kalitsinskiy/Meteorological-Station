import React from 'react';

import ErrorBoundary from "./ErrorBoundary";
import Header from './Header'
import Meteoboard from './Meteoboard'
import Footer from './Footer'
import Console from './Console'

const BaseComponent = () => (
    <ErrorBoundary>
        <Header/>

        <Meteoboard/>

        <Footer/>

        <Console/>
    </ErrorBoundary>
);

export default BaseComponent;
