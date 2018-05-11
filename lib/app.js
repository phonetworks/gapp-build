import React from 'react';
import {render} from 'react-dom';

import Container from './components/Container.js';
import Navigation from './components/Navigation.js';
import Content from './components/Content.js';
import Toolbar from './components/Toolbar.js';
import Modal from './components/Modal.js';
import Display from './components/Display.js';
import Options from './components/Options.js';

import './styles/common.less';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: {
                nodes: [
                    {id: 0, type: 'actor', label: 'Actor #1', image: 'lib/images/icons/actor-node.svg', shape: 'image'},
                    {id: 1, type: 'actor', label: 'Actor #2', image: 'lib/images/icons/actor-node.svg', shape: 'image'},
                    {id: 2, type: 'actor', label: 'Actor #3', image: 'lib/images/icons/actor-node.svg', shape: 'image'},
                    {id: 3, type: 'object', label: 'Object #1', image: 'lib/images/icons/object-node.svg', shape: 'image'},
                    {id: 4, type: 'object', label: 'Object #2', image: 'lib/images/icons/object-node.svg', shape: 'image'},
                    {id: 5, type: 'graph', label: 'Graph #1', image: 'lib/images/icons/graph-node.svg', shape: 'image'}
                ],
                edges: [
                    {id: 0, type: 'read', label: 'Post', from: 3, to: 5},
                    {id: 1, type: 'read', label: 'Create', from: 4, to: 5},
                    {id: 2, type: 'subscribe', label: 'Follow', from: 1, to: 4},
                    {id: 3, type: 'subscribe', label: 'Join', from: 2, to: 4},
                    {id: 4, type: 'subscribe', label: 'Status', from: 0, to: 3},
                    {id: 5, type: 'mention', label: 'Status', from: 0, to: 0},
                    {id: 6, type: 'notify', label: 'Status', from: 2, to: 2},
                    {id: 8, type: 'mention', label: 'Comment', from: 1, to: 5}
                ]
            },
            modal: false,
            options: false
        }
        this.createItem = this.createItem.bind(this);
        this.addNode = this.addNode.bind(this);
        this.addEdge = this.addEdge.bind(this);
        this.deleteNode = this.deleteNode.bind(this);
        this.deleteEdge = this.deleteEdge.bind(this);
        this.showOptions = this.showOptions.bind(this);
        this.hideOptions = this.hideOptions.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    createItem(type, name) {
        this.setState({
            modal: {
                model: 'add' + type.charAt(0).toUpperCase() + type.substr(1),
                specs: {
                    type: name
                }
            }
        });
    }
    addNode(type, label) {
        let nodes = Array.from(this.state.graph.nodes);
        let edges = Array.from(this.state.graph.edges);
        let id;
        if(nodes.length > 0) {
            id = Math.max.apply(
                Math, nodes.map(function(obj) {
                    return obj.id;
                })
            ) + 1;
        } else {
            id = 0;
        }
        nodes.push({
            id: id,
            label: label,
            type: type,
            image: 'lib/images/icons/' + type + '-node.svg',
            shape: 'image'
        });
        this.setState({
            graph: {
                nodes: nodes,
                edges: edges
            },
            modal: false
        });
    }
    addEdge(type, from, to) {
        let nodes = Array.from(this.state.graph.nodes);
        let edges = Array.from(this.state.graph.edges);
        let id;
        if(edges.length > 0) {
            id = Math.max.apply(
                Math, edges.map(function(obj) {
                    return obj.id;
                })
            ) + 1;
        } else {
            id = 0;
        }
        edges.push({
            id: id,
            type: type,
            from: from,
            to: to
        });
        this.setState({
            graph: {
                nodes: nodes,
                edges: edges
            },
            modal: false
        });
    }
    deleteNode(item) {
        console.log(item)
    }
    deleteEdge(item) {
        console.log(item)
    }
    showOptions(type, id) {
        console.log(type, id)
        this.setState({
            options: {
                type: type,
                id: id
            }
        });
    }
    hideOptions(type, id) {
        this.setState({
            options: false
        });
    }
    updateOptions(item) {
        console.log(item)
    }
    closeModal() {
        this.setState({
            modal: false
        });
    }
    render() {
        return(
            <Container>
                <Navigation />
                <Toolbar createItem={this.createItem} />
                <Modal
                    data={this.state.modal}
                    nodes={this.state.graph.nodes}
                    edges={this.state.graph.edges}
                    closeModal={this.closeModal}
                    addNode={this.addNode}
                    addEdge={this.addEdge}
                    updateOptions={this.updateOptions}
                />
                <Content option={this.state.options ? true : false}>
                    <Display data={this.state.graph} showOptions={this.showOptions} hideOptions={this.hideOptions} />
                    <Options data={this.state.graph} scope={this.state.options} />
                </Content>
            </Container>
        )
    }
}

render(
    <App />,
    document.getElementById('root')
);