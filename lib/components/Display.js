import React from 'react';
import ReactDOM from 'react-dom';

import Graph from 'react-graph-vis';

import '../styles/components/display.less';

const options = {
    autoResize: true,
    height: '100%',
    width: '100%',
    edges: {
        color: "#00B669"
    }
}

const events = {
    select: function(event) {
        let {nodes, edges} = event;
        console.log('Selected nodes:', nodes);
        console.log('Selected edges:', edges);
    }
}

export default class Display extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.data)
        return(
            <section className="display">
                {this.props.data.nodes.length > 0 || this.props.data.edges.length > 0 ? (
                    <Graph graph={this.props.data} options={options} events={events} style={{ height: "640px" }} />
                ) : (
                    <p>There is no data to display.</p>
                )}
            </section>
        )
    }
}