import React from 'react';

import Graph from 'react-graph-vis';

export default class Display extends React.Component {
    constructor(props) {
        super(props);
        let self = this;
        this.events = {
            select: function(event) {
                let {nodes, edges} = event;
                if(nodes.length > 0 || edges.length > 0) {
                    if(nodes.length > 0) {
                        self.props.showOptions('node', nodes[0]);
                    } else {
                        self.props.showOptions('edge', edges[0]);
                    }
                } else {
                    self.props.hideOptions();
                }
            }
        }
        this.options = {
            autoResize: true,
            height: '100%',
            width: '100%',
            interaction: {
                hover: true,
                dragView: false,
                hoverConnectedEdges: false,
                selectConnectedEdges: false
            },
            edges: {
                width: 2,
                color: {
                    color: 'rgb(0, 182, 105)'
                }
            }
        }
    }
    render() {
        return(
            <section className="display">
                {this.props.data.nodes.length > 0 || this.props.data.edges.length > 0
                    ? <Graph graph={this.props.data} options={this.options} events={this.events} style={{ height: "640px" }} />
                    : <div className="empty">
                        <p>
                            There is no data to display.
                            <br />
                            Start adding nodes and edges.
                        </p>
                    </div>
                }
            </section>
        )
    }
}