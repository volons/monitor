import { h, Component } from 'preact';
import Helmet from 'preact-helmet';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
import About from '../routes/about';

export default class App extends Component {
    handleRoute = e => {
        this.currentUrl = e.url;
    };

    render() {
        return (
            <div id="app">
                <Helmet
                    htmlAttributes={{ lang: 'en', amp: undefined }} // amp takes no value
                    title="Volons - Monitor"
                    titleAttributes={{ itemprop: 'name', lang: 'en' }}
                    meta={[{ name: 'charset', content: 'UTF-8' }]}
                />

                <Header />

                <Router onChange={this.handleRoute}>
                    <Home path="/" />
                    <About path="/about" />
                </Router>
            </div>
        );
    }
}
