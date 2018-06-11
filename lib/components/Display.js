import React from 'react';

import Graph from 'react-graph-vis';

export default class Display extends React.Component {
    constructor(props) {
        super(props);
        this.setNetworkInstance = this.setNetworkInstance.bind(this);
        let self = this;
        this.events = {
            select: function(event) {
                let {nodes, edges} = event;
                if(nodes.length > 0 || edges.length > 0) {
                    if(nodes.length > 0) {
                        self.props.showOptions('node', nodes[0]);
                    } else {
                        let master;
                        self.props.data.edges.forEach(function(item) {
                            if(item.id == edges[0]) {
                                master = item.hasOwnProperty('master') ? item.master : edges[0];
                            }
                        });
                        self.props.showOptions('edge', master);
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
                hoverConnectedEdges: false,
                selectConnectedEdges: false,
                navigationButtons: true
            },
            manipulation: {
				enabled: true,
                addEdge: function (data, callback) {
                    if (data.from == data.to) {
                        let approval = confirm('Do you want to connect the node to itself?');
                        if (approval === true) {
                            self.props.changeOptions('drawEdge', [data.from, data.to]);
                            //self.props.addEdge('read', 'undefined', data.from, data.to, {tails: [], heads: []});
                        }
                    }
                    else {
                        self.props.changeOptions('drawEdge', [data.from, data.to]);
                        //self.props.addEdge('read', 'undefined', data.from, data.to, {tails: [], heads: []});
                    }
                }
			},
            edges: {
                width: 2,
                color: {
                    color: 'rgb(0, 182, 105)'
                }
            }
        }
    }
    setNetworkInstance(network) {
        this.network = network;
    }
    render() {
        if(this.props.drawing) {
            this.network && this.network.addEdgeMode();
        } else {
            this.network && this.network.disableEditMode();
        }
        return(
            <section className="display">
                {this.props.data.nodes.length > 0 || this.props.data.edges.length > 0
                    ? <Graph graph={this.props.data} options={this.options} events={this.events} getNetwork={this.setNetworkInstance} />
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