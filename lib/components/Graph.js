import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/components/graph.less';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <section className="graph">
                Graph goes here.
            </section>
        )
    }
}