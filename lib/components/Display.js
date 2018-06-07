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
            },
            dragStart: function (params) {
                console.log('dragStart:', JSON.stringify(params, null, 4));
                console.log('dragStart Event:', params);
                console.log('dragStart event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM));
            },
            dragging: function (params) {
                console.log('dragging:', JSON.stringify(params, null, 4));
            },
            dragEnd: function (params) {
                console.log('dragEnd:', JSON.stringify(params, null, 4));
                console.log('dragEnd Event:', params);
                console.log('dragEnd event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM));
            }
        }
        this.options = {
            autoResize: true,
            height: '100%',
            width: '100%',
            interaction: {
                hover: true,
                dragView: false,
                navigationButtons: true,
                hoverConnectedEdges: false,
                selectConnectedEdges: false
            },
            manipulation: {
				enabled: true,
                addEdge: function (data, callback) {
                    console.log('add edge', data);
                    if (data.from == data.to) {
                      var r = confirm("Do you want to connect the node to itself?");
                      if (r === true) {
                          callback(data);
                      }
                    }
                    else {
                      callback(data);
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
    render() {
        return(
            <section className="display">
                {this.props.data.nodes.length > 0 || this.props.data.edges.length > 0
                    ? <Graph graph={this.props.data} options={this.options} events={this.events} />
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