import React from 'react';
import ReactDOM from 'react-dom';

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
                    {id: 1, label: 'Node 1', image: 'lib/images/icons/actor-node.svg', shape: 'image'},
                    {id: 2, label: 'Node 2'},
                    {id: 3, label: 'Node 3'},
                    {id: 4, label: 'Node 4'},
                    {id: 5, label: 'Node 5'}
                ],
                edges: [
                    {from: 1, to: 3},
                    {from: 1, to: 2},
                    {from: 2, to: 4},
                    {from: 2, to: 5}
                ]
            },
            modal: false
        }
        this.createItem = this.createItem.bind(this);
        this.addNode = this.addNode.bind(this);
        this.addEdge = this.addEdge.bind(this);
        this.deleteNode = this.deleteNode.bind(this);
        this.deleteEdge = this.deleteEdge.bind(this);
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
                Math,nodes.map(function(obj) {
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
        edges.push({
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
                    closeModal={this.closeModal}
                    addNode={this.addNode}
                    addEdge={this.addEdge}
                    updateOptions={this.updateOptions}
                />
                <Content>
                    <Display data={this.state.graph} />
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