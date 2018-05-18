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
                    {id: 0, type: 'actor', label: 'Actor #1', image: 'lib/images/icons/actor-node.svg', shape: 'image', properties: {expires: 0, editable: true, volatile: false, revisionable: false}},
                    {id: 1, type: 'actor', label: 'Actor #2', image: 'lib/images/icons/actor-node.svg', shape: 'image', properties: {expires: 0, editable: true, volatile: false, revisionable: false}},
                    {id: 2, type: 'actor', label: 'Actor #3', image: 'lib/images/icons/actor-node.svg', shape: 'image', properties: {expires: 0, editable: true, volatile: false, revisionable: false}},
                    {id: 3, type: 'object', label: 'Object #1', image: 'lib/images/icons/object-node.svg', shape: 'image', properties: {expires: 0, editable: true, volatile: false, revisionable: false}},
                    {id: 4, type: 'object', label: 'Object #2', image: 'lib/images/icons/object-node.svg', shape: 'image', properties: {expires: 0, editable: true, volatile: false, revisionable: false}},
                    {id: 5, type: 'graph', label: 'Graph #1', image: 'lib/images/icons/graph-node.svg', shape: 'image', properties: {expires: 0, editable: true, volatile: false, revisionable: false}}
                ],
                edges: [
                    {id: 0, type: 'read', label: 'Post', from: 3, to: 5, properties: {binding: false, multiplicable: true, persistent: true, consumer: true, formative: false}},
                    {id: 1, type: 'read', label: 'Create', from: 4, to: 5, properties: {binding: false, multiplicable: true, persistent: true, consumer: true, formative: false}},
                    {id: 2, type: 'subscribe', label: 'Follow', from: 1, to: 4, properties: {binding: false, multiplicable: true, persistent: true, consumer: true, formative: false}},
                    {id: 3, type: 'subscribe', label: 'Join', from: 2, to: 4, properties: {binding: false, multiplicable: true, persistent: true, consumer: true, formative: false}},
                    {id: 4, type: 'subscribe', label: 'Status', from: 0, to: 3, properties: {binding: false, multiplicable: true, persistent: true, consumer: true, formative: false}},
                    {id: 5, type: 'mention', label: 'Status', from: 0, to: 0, properties: {binding: false, multiplicable: true, persistent: true, consumer: true, formative: false}},
                    {id: 6, type: 'notify', label: 'Status', from: 2, to: 2, properties: {binding: false, multiplicable: true, persistent: true, consumer: true, formative: false}},
                    {id: 7, type: 'mention', label: 'Comment', from: 1, to: 5, properties: {binding: false, multiplicable: true, persistent: true, consumer: true, formative: false}}
                ]
            },
            modal: false,
            options: false
        }
        this.changeModalPage = this.changeModalPage.bind(this);
        this.createItem = this.createItem.bind(this);
        this.changeItem = this.changeItem.bind(this);
        this.changeProperties = this.changeProperties.bind(this);
        this.addNode = this.addNode.bind(this);
        this.changeNode = this.changeNode.bind(this);
        this.deleteNode = this.deleteNode.bind(this);
        this.changeNodeProperties = this.changeNodeProperties.bind(this);
        this.addEdge = this.addEdge.bind(this);
        this.changeEdge = this.changeEdge.bind(this);
        this.deleteEdge = this.deleteEdge.bind(this);
        this.changeEdgeProperties = this.changeEdgeProperties.bind(this);
        this.addAttribute = this.addAttribute.bind(this);
        this.showOptions = this.showOptions.bind(this);
        this.hideOptions = this.hideOptions.bind(this);
        this.changeOptions = this.changeOptions.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount() {
        let self = this;
        /*
        document.getElementById('navigation').addEventListener('click', function() {
            self.setState({
                options: false
            });
        }, false);
        */
        document.getElementById('toolbar').addEventListener('click', function() {
            self.setState({
                options: false
            });
        }, false);
    }
    changeModalPage() {
        this.setState({
            modal: {
                model: this.state.modal.model,
                specs: {
                    category: this.state.modal.specs.category,
                    id: this.state.modal.specs.id
                },
                page: this.state.modal.page + 1
            }
        });
    }
    createItem(category, type) {
        this.setState({
            modal: {
                model: 'add' + category.charAt(0).toUpperCase() + category.substr(1),
                specs: {
                    type: type
                }
            }
        });
    }
    changeOptions(func, args) {
        switch(func) {
            case 'changeItem':
                this.changeItem(...args);
                break;
            case 'changeProperties':
                this.changeProperties(...args);
                break;
            case 'addAttribute':
                this.addAttribute(...args);
                break;
            default:
                //No available function
        }
    }
    changeItem(category, id) {
        this.setState({
            modal: {
                model: 'change' + category.charAt(0).toUpperCase() + category.substr(1),
                specs: {
                    category: category,
                    id: id
                }
            }
        });
    }
    changeProperties(category, id) {
        this.setState({
            modal: {
                model: 'change' + category.charAt(0).toUpperCase() + category.substr(1) + 'Properties',
                specs: {
                    category: category,
                    id: id
                }
            }
        });
    }
    addAttribute(category, id) {
        this.setState({
            modal: {
                model: 'addAttribute',
                specs: {
                    category: category,
                    id: id
                },
                page: 1
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
            shape: 'image',
            properties: {
                expires: 0,
                editable: true,
                volatile: false,
                revisionable: false
            }
        });
        this.setState({
            graph: {
                nodes: nodes,
                edges: edges
            },
            modal: false
        });
    }
    changeNode(type, label) {
        let nodes = Array.from(this.state.graph.nodes);
        let edges = Array.from(this.state.graph.edges);
        let id = this.state.modal.specs.id;
        nodes = nodes.map(element => {
            if(element.id == id) {
                return Object.assign({}, element, {type: type, label: label, image: 'lib/images/icons/' + type + '-node.svg'});
            }
            return element;
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
        //deleteNode
    }
    changeNodeProperties(expires, editable, volatile, revisionable) {
        let nodes = Array.from(this.state.graph.nodes);
        let edges = Array.from(this.state.graph.edges);
        let id = this.state.modal.specs.id;
        nodes = nodes.map(element => {
            if(element.id == id) {
                return Object.assign({}, element, {properties: {expires: expires, editable: editable, volatile: volatile, revisionable: revisionable}});
            }
            return element;
        });
        this.setState({
            graph: {
                nodes: nodes,
                edges: edges
            },
            modal: false
        });
    }
    addEdge(type, label, from, to) {
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
            label: label,
            from: from,
            to: to,
            properties: {
                binding: false,
                multiplicable: true,
                persistent: true,
                consumer: true,
                //notifier: false,
                //subscriber: false,
                formative: false
            }
        });
        this.setState({
            graph: {
                nodes: nodes,
                edges: edges
            },
            modal: false
        });
    }
    changeEdge(type, label, from, to) {
        let nodes = Array.from(this.state.graph.nodes);
        let edges = Array.from(this.state.graph.edges);
        let id = this.state.modal.specs.id;
        edges = edges.map(element => {
            if(element.id == id) {
                return Object.assign({}, element, {type: type, label: label, from: from, to: to});
            }
            return element;
        });
        this.setState({
            graph: {
                nodes: nodes,
                edges: edges
            },
            modal: false
        });
    }
    deleteEdge(item) {
        //deleteEdge
    }
    changeEdgeProperties(binding, multiplicable, persistent, consumer, notifier, subscriber, formative) {
        let nodes = Array.from(this.state.graph.nodes);
        let edges = Array.from(this.state.graph.edges);
        let id = this.state.modal.specs.id;
        edges = edges.map(element => {
            if(element.id == id) {
                return Object.assign({}, element, {properties: {binding: binding, multiplicable: multiplicable, persistent: persistent, consumer: consumer, notifier: notifier, subscriber: subscriber, formative: formative}});
            }
            return element;
        });
        this.setState({
            graph: {
                nodes: nodes,
                edges: edges
            },
            modal: false
        });
    }
    showOptions(category, id) {
        this.setState({
            options: {
                category: category,
                id: id
            }
        });
    }
    hideOptions(type, id) {
        this.setState({
            options: false
        });
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
                    changeModalPage={this.changeModalPage}
                    closeModal={this.closeModal}
                    addNode={this.addNode}
                    changeNode={this.changeNode}
                    changeNodeProperties={this.changeNodeProperties}
                    addEdge={this.addEdge}
                    changeEdge={this.changeEdge}
                    changeEdgeProperties={this.changeEdgeProperties}
                    updateOptions={this.updateOptions}
                />
                <Content option={this.state.options ? true : false}>
                    <Display
                        data={this.state.graph}
                        showOptions={this.showOptions}
                        hideOptions={this.hideOptions}
                    />
                    <Options
                        data={this.state.graph}
                        scope={this.state.options}
                        changeOptions={this.changeOptions}
                    />
                </Content>
            </Container>
        )
    }
}

render(
    <App />,
    document.getElementById('root')
);