import React from 'react';
import ReactDOM from 'react-dom';

import Container from './components/Container.js';
import Navigation from './components/Navigation.js';
import Content from './components/Content.js';
import Toolbar from './components/Toolbar.js';
import Graph from './components/Graph.js';
import Options from './components/Options.js';

import './styles/common.less';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleNewItem = this.handleNewItem.bind(this);
    }
    handleNewItem(item) {
        console.log(item)
    }
    render() {
        return(
            <Container>
                <Navigation />
                <Toolbar callback={this.handleNewItem} />
                <Content>
                    <Graph />
                    <Options />
                </Content>
            </Container>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);