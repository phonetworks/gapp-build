import React from 'react';
import {render} from 'react-dom';

import Container from './components/Container.js';
import Navigation from './components/Navigation.js';
import Content from './components/Content.js';
import Starter from './components/Starter.js';
import Display from './components/Display.js';
import Toolbar from './components/Toolbar.js';
import Options from './components/Options.js';
import Modal from './components/Modal.js';

import saveGraph from './functions/save.js';

import './styles/common.less';

const randomRoundness = () => Math.random();
const randomDirection = () => Math.random() >= .5 ? 'CW' : 'CCW';

const changeStyle = {
    actorNode: function(values, id, selected, hovering) {
        values.shadow = true;
        values.shadowSize = 10;
        values.shadowX = 3;
        values.shadowY = 3;
        values.shadowColor = 'rgba(255, 164, 0, .5)';
    },
    objectNode: function(values, id, selected, hovering) {
        values.shadow = true;
        values.shadowSize = 10;
        values.shadowX = 3;
        values.shadowY = 3;
        values.shadowColor = 'rgba(218, 0, 98, .5)';
    },
    graphNode: function(values, id, selected, hovering) {
        values.shadow = true;
        values.shadowSize = 10;
        values.shadowX = 3;
        values.shadowY = 3;
        values.shadowColor = 'rgba(93, 60, 246, .5)';
    },
    edge: function(values, id, selected, hovering) {
        values.width = 3;
        values.shadow = true;
        values.shadowSize = 10;
        values.shadowX = 3;
        values.shadowY = 3;
        values.color = 'rgb(0, 182, 105)';
        values.shadowColor = 'rgba(0, 182, 105, .5)';
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: {
                main: {},
                nodes: [],
                edges: []
            },
            graph: {
                main: {},
                nodes: [
                    {id: 0, type: 'actor', label: 'User', image: 'lib/images/icons/actor-node.svg', shape: 'image', chosen: {node: changeStyle['actorNode']}, properties: {expires: 0, editable: true, volatile: false, revisionable: false}, permissions: {owner: {manage: false, write: false, subscribe: false, read: false}, subscribers: {manage: false, write: false, subscribe: false, read: false}, context: {manage: false, write: false, subscribe: false, read: false}, others: {manage: false, write: false, subscribe: false, read: false}}, attributes: [{id: 0, name: 'id', type: 'id', required: true, mutations: {}, constraints: {}}]},
                       {id: 3, type: 'object', label: 'Thread', image: 'lib/images/icons/object-node.svg', shape: 'image', chosen: {node: changeStyle['objectNode']}, properties: {expires: 0, editable: true, volatile: false, revisionable: false}, permissions: {owner: {manage: false, write: false, subscribe: false, read: false}, subscribers: {manage: false, write: false, subscribe: false, read: false}, context: {manage: false, write: false, subscribe: false, read: false}, others: {manage: false, write: false, subscribe: false, read: false}}, attributes: [{id: 0, name: 'id', type: 'id', required: true, mutations: {}, constraints: {}}]},
                    {id: 5, type: 'graph', label: 'Group', image: 'lib/images/icons/graph-node.svg', shape: 'image', chosen: {node: changeStyle['graphNode']}, properties: {expires: 0, editable: true, volatile: false, revisionable: false}, permissions: {owner: {manage: false, write: false, subscribe: false, read: false}, subscribers: {manage: false, write: false, subscribe: false, read: false}, context: {manage: false, write: false, subscribe: false, read: false}, others: {manage: false, write: false, subscribe: false, read: false}}, attributes: [{id: 0, name: 'id', type: 'id', required: true, mutations: {}, constraints: {}}]}
                ],
                edges: [
                    {id: 0, type: 'write', label: 'Create', from: 0, to: 5, chosen: {edge: changeStyle['edge']}, properties: {binding: false, multiplicable: true, persistent: true, consumer: true, formative: false}, attributes: [{id: 0, name: 'id', type: 'id', required: true, mutations: {}, constraints: {}}]},
                    {id: 1, type: 'write', label: 'Post', from: 0, to: 3, chosen: {edge: changeStyle['edge']}, properties: {binding: false, multiplicable: true, persistent: true, consumer: true, formative: false}, attributes: [{id: 0, name: 'id', type: 'id', required: true, mutations: {}, constraints: {}}]},
                    {id: 4, type: 'subscribe', label: 'Follow', from: 0, to: 0, chosen: {edge: changeStyle['edge']}, properties: {binding: false, multiplicable: true, persistent: true, consumer: true, formative: false}, attributes: [{id: 0, name: 'id', type: 'id', required: true, mutations: {}, constraints: {}}]},
                    {id: 5, type: 'subscribe', label: 'Reply', from: 0, to: 3, chosen: {edge: changeStyle['edge']}, smooth: {enabled: true, type: 'curvedCW', forceDirection: 'none', roundness: 1}, properties: {binding: false, multiplicable: true, persistent: true, consumer: true, formative: false}, attributes: [{id: 0, name: 'id', type: 'id', required: true, mutations: {}, constraints: {}}]},
                    {id: 6, type: 'mention', label: 'Include', from: 3, to: 0, chosen: {edge: changeStyle['edge']}, smooth: {enabled: true, type: 'curvedCCW', forceDirection: 'none', roundness: 1}, properties: {binding: false, multiplicable: true, persistent: true, consumer: true, formative: false}, attributes: [{id: 0, name: 'id', type: 'id', required: true, mutations: {}, constraints: {}}]},
                ]
            },
            modal: false,
            options: false,
            drawing: false
        }
        this.ready = false;
        this.changeModalPage = this.changeModalPage.bind(this);
        this.changeAttributeType = this.changeAttributeType.bind(this);
        this.addGraph = this.addGraph.bind(this);
        this.changeGraph = this.changeGraph.bind(this);
        this.deleteGraph = this.deleteGraph.bind(this);
        this.changeGraphPermissions = this.changeGraphPermissions.bind(this);
        this.createItem = this.createItem.bind(this);
        this.changeItem = this.changeItem.bind(this);
        this.changeProperties = this.changeProperties.bind(this);
        this.changePermissions = this.changePermissions.bind(this);
        this.addNode = this.addNode.bind(this);
        this.changeNode = this.changeNode.bind(this);
        this.changeNodeProperties = this.changeNodeProperties.bind(this);
        this.changeNodePermissions = this.changeNodePermissions.bind(this);
        this.addEdge = this.addEdge.bind(this);
        this.changeEdge = this.changeEdge.bind(this);
        this.changeEdgeProperties = this.changeEdgeProperties.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.createAttribute = this.createAttribute.bind(this);
        this.addAttribute = this.addAttribute.bind(this);
        this.changeAttribute = this.changeAttribute.bind(this);
        this.sortAttributes = this.sortAttributes.bind(this);
        this.showOptions = this.showOptions.bind(this);
        this.hideOptions = this.hideOptions.bind(this);
        this.changeOptions = this.changeOptions.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.toggleDrawingMode = this.toggleDrawingMode.bind(this);
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
        
//        this.addNode("", "");
    }
    changeModalPage() {
        this.setState({
            modal: {
                model: this.state.modal.model,
                specs: {
                    category: this.state.modal.specs.category,
                    id: this.state.modal.specs.id,
                    index: this.state.modal.specs.index
                },
                page: this.state.modal.page + 1,
                attributeType: this.state.modal.attributeType
            }
        });
    }
    changeAttributeType(value) {
        this.setState({
            modal: {
                model: this.state.modal.model,
                specs: {
                    category: this.state.modal.specs.category,
                    id: this.state.modal.specs.id,
                    index: this.state.modal.specs.index
                },
                page: this.state.modal.page,
                attributeType: value
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
            case 'changePermissions':
                this.changePermissions(...args);
                break;
            case 'createAttribute':
                this.createAttribute(...args);
                break;
            case 'updateAttribute':
                this.updateAttribute(...args);
                break;
            case 'drawEdge':
                this.drawEdge(...args);
                break;
            default:
                //No available function
        }
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
    changePermissions(category, id) {
        this.setState({
            modal: {
                model: 'change' + category.charAt(0).toUpperCase() + category.substr(1) + 'Permissions',
                specs: {
                    category: category,
                    id: id
                }
            }
        });
    }
    createAttribute(category, id) {
        this.setState({
            modal: {
                model: 'addAttribute',
                specs: {
                    category: category,
                    id: id
                },
                page: 1,
                attributeType: 'string'
            }
        });
    }
    updateAttribute(category, id, details) {
        let entries = this.state.graph[category + 's'];
        let type;
        this.setState({
            modal: {
                model: 'changeAttribute',
                specs: {
                    category: category,
                    id: id,
                    index: details.index
                },
                page: 1,
                attributeType: details.type || 'string'
            }
        });
    }
    drawEdge(from, to, details) {
        this.setState({
            modal: {
                model: 'drawEdge',
                specs: {
                    from: from,
                    to: to
                }
            }
        });
    }
    addAttribute(name, type, required, mutations, constraints) {
        let main = this.state.graph.main;
        let nodes = Array.from(this.state.graph.nodes);
        let edges = Array.from(this.state.graph.edges);
        let id = this.state.modal.specs.id;
        let element;
        if(this.state.modal.specs.category == 'graph') {
            element = main;
        } else if(this.state.modal.specs.category == 'node') {
            nodes.forEach(function(item) {
                if(item.id == id) {
                    element = item;
                }
            });
        } else if(this.state.modal.specs.category == 'edge') {
            edges.forEach(function(item) {
                if(item.id == id) {
                    element = item;
                }
            });
        } else {
            //Do nothing
        }
        mutations = mutations || {};
        constraints = constraints || {};
        let attributeId;
        if(element.attributes.length > 0) {
            attributeId = Math.max.apply(
                Math, element.attributes.map(function(obj) {
                    return obj.id;
                })
            ) + 1;
        } else {
            attributeId = 0;
        }
        let attribute = {
            id: attributeId,
            name: name,
            type: type,
            required: required,
            mutations: mutations,
            constraints: constraints
        }
        element.attributes.push(attribute);
        this.setState({
            graph: {
                main: main,
                nodes: nodes,
                edges: edges
            },
            modal: false
        });
    }
    changeAttribute(name, type, required, mutations, constraints) {
        let main = this.state.graph.main;
        let nodes = Array.from(this.state.graph.nodes);
        let edges = Array.from(this.state.graph.edges);
        let id = this.state.modal.specs.id;
        let element;
        if(this.state.modal.specs.category == 'graph') {
            element = main;
        } else if(this.state.modal.specs.category == 'node') {
            nodes.forEach(function(item) {
                if(item.id == id) {
                    element = item;
                }
            });
        } else if(this.state.modal.specs.category == 'edge') {
            edges.forEach(function(item) {
                if(item.id == id) {
                    element = item;
                }
            });
        } else {
            //Do nothing
        }
        mutations = mutations || {};
        constraints = constraints || {};
        let oldAttribute;
        let self = this;
        element.attributes.forEach(function(item) {
            if(item.id == self.state.modal.specs.index) {
                oldAttribute = item;
            }
        });
        let oldArrayIndex = element.attributes.indexOf(oldAttribute);
        let attribute = {
            id: this.state.modal.specs.index,
            name: name,
            type: type,
            required: required,
            mutations: mutations,
            constraints: constraints
        }
        element.attributes.splice(oldArrayIndex, 1, attribute);
        this.setState({
            graph: {
                main: main,
                nodes: nodes,
                edges: edges
            },
            modal: false
        });
    }
    sortAttributes(list) {
        let main = this.state.graph.main;
        let nodes = Array.from(this.state.graph.nodes);
        let edges = Array.from(this.state.graph.edges);
        let category = this.state.options.category;
        let id = this.state.options.id;
        if(category == 'graph') {
            main = Object.assign({}, main, {attributes: list});
        } else if(category == 'node') {
            nodes = nodes.map(element => {
                if(element.id == id) {
                    return Object.assign({}, element, {attributes: list});
                }
                return element;
            });
        } else if(category == 'edge') {
            edges = edges.map(element => {
                if(element.id == id) {
                    return Object.assign({}, element, {attributes: list});
                }
                return element;
            });
        }
        this.setState({
            graph: {
                main: main,
                nodes: nodes,
                edges: edges
            },
            modal: false
        });
    }
    addGraph(label) {
        let nodes = Array.from(this.state.graph.nodes);
        let edges = Array.from(this.state.graph.edges);
        let main = {
            label: label,
            type: 'graph',
            permissions: {
                owner: {
                    manage: false,
                    write: false,
                    subscribe: false,
                    read: false
                },
                subscribers: {
                    manage: false,
                    write: false,
                    subscribe: false,
                    read: false
                },
                context: {
                    manage: false,
                    write: false,
                    subscribe: false,
                    read: false
                },
                others: {
                    manage: false,
                    write: false,
                    subscribe: false,
                    read: false
                }
            },
            attributes: [
                {
                    id: 0,
                    name: 'id',
                    type: 'id',
                    required: true,
                    mutations: {},
                    constraints: {}
                }
            ]
        };
        this.setState({
            graph: {
                main: main,
                nodes: nodes,
                edges: edges
            },
            modal: false
        });
        this.ready = true;
        this.showOptions('graph');
    }
    changeGraph(label) {
        let main = this.state.graph.main;
        let nodes = Array.from(this.state.graph.nodes);
        let edges = Array.from(this.state.graph.edges);
        main = Object.assign({}, main, {type: 'graph', label: label});
        this.setState({
            graph: {
                main: main,
                nodes: nodes,
                edges: edges
            },
            modal: false
        });
    }
    changeGraphPermissions(owner, subscribers, context, others) {
        let main = this.state.graph.main;
        let nodes = Array.from(this.state.graph.nodes);
        let edges = Array.from(this.state.graph.edges);
        main = Object.assign({}, main, {: {owner: {manage: owner.manage, write: owner.write, subscribe: owner.subscribe, read: owner.read}, subscribers: {manage: subscribers.manage, write: subscribers.write, subscribe: subscribers.subscribe, read: subscribers.read}, context: {manage: context.manage, write: context.write, subscribe: context.subscribe, read: context.read}, others: {manage: others.manage, write: others.write, subscribe: others.subscribe, read: others.read}}});
        this.setState({
            graph: {
                main: main,
                nodes: nodes,
                edges: edges
            },
            modal: false
        });
    }
    deleteGraph() {
        if (window.confirm('Are you sure to start over?')) {
            this.setState({
                graph: {
                    main: {},
                    nodes: [],
                    edges: []
                },
                options: false
            });
            this.ready = false;
        }
    }
    addNode(type, label) {
        let main = this.state.graph.main;
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
            chosen: {
                node: changeStyle[type + 'Node']
            },
            properties: {
                expires: 0,
                editable: true,
                volatile: false,
                revisionable: false
            },
            permissions: {
                owner: {
                    manage: true,
                    write: true,
                    subscribe: true,
                    read: true
                },
                subscribers: {
                    manage: false,
                    write: true,
                    subscribe: true,
                    read: true
                },
                context: {
                    manage: false,
                    write: false,
                    subscribe: true,
                    read: true
                },
                others: {
                    manage: false,
                    write: false,
                    subscribe: false,
                    read: false
                }
            },
            attributes: [
                {
                    id: 0,
                    name: 'id',
                    type: 'id',
                    required: true,
                    mutations: {},
                    constraints: {}
                }
            ]
        });
        this.setState({
            graph: {
                main: main,
                nodes: nodes,
                edges: edges
            },
            modal: false
        });
    }
    changeNode(type, label) {
        let main = this.state.graph.main;
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
                main: main,
                nodes: nodes,
                edges: edges
            },
            modal: false
        });
    }
    changeNodeProperties(expires, editable, volatile, revisionable) {
        let main = this.state.graph.main;
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
                main: main,
                nodes: nodes,
                edges: edges
            },
            modal: false
        });
    }
    changeNodePermissions(owner, subscribers, context, others) {
        let main = this.state.graph.main;
        let nodes = Array.from(this.state.graph.nodes);
        let edges = Array.from(this.state.graph.edges);
        let id = this.state.modal.specs.id;
        nodes = nodes.map(element => {
            if(element.id == id) {
                return Object.assign({}, element, {permissions: {owner: {manage: owner.manage, write: owner.write, subscribe: owner.subscribe, read: owner.read}, subscribers: {manage: subscribers.manage, write: subscribers.write, subscribe: subscribers.subscribe, read: subscribers.read}, context: {manage: context.manage, write: context.write, subscribe: context.subscribe, read: context.read}, others: {manage: others.manage, write: others.write, subscribe: others.subscribe, read: others.read}}});
            }
            return element;
        });
        this.setState({
            graph: {
                main: main,
                nodes: nodes,
                edges: edges
            },
            modal: false
        });
    }
    addEdge(type, label, from, to, copies) {
        let main = this.state.graph.main;
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
        let roundness = randomRoundness();
        edges.push({
            id: id,
            type: type,
            label: label,
            from: from,
            to: to,
            chosen: {
                edge: changeStyle['edge']
            },
            smooth: {
                enabled: true,
                type: 'curved' + randomDirection(),
                forceDirection: 'none',
                roundness: roundness
            },
            properties: {
                binding: false,
                multiplicable: true,
                persistent: true,
                consumer: true,
                //notifier: false,
                //subscriber: false,
                formative: false
            },
            attributes: [
                {
                    id: 0,
                    name: 'id',
                    type: 'id',
                    required: true,
                    mutations: {},
                    constraints: {}
                }
            ]
        });
        for(let tail of copies.tails) {
            let timestamp = (new Date()).getTime() + Math.floor((Math.random() * 1000) + 1);
            let curvedness = (Math.floor((Math.random() * 20) + 2))*0.1;
            edges.push({
                id: timestamp,
                type: type,
                label: label,
                from: tail,
                to: to,
                master: id,
                chosen: {
                    edge: changeStyle['edge']
                },
                smooth: {
                    enabled: true,
                    type: 'curved' + randomDirection(),
                    forceDirection: 'none',
                    roundness: roundness
                }
            });
        }
        for(let head of copies.heads) {
            let timestamp = (new Date()).getTime() + Math.floor((Math.random() * 1000) + 1);
            let curvedness = (Math.floor((Math.random() * 20) + 2))*0.1;
            edges.push({
                id: timestamp,
                type: type,
                label: label,
                from: from,
                to: head,
                master: id,
                chosen: {
                    edge: changeStyle['edge']
                },
                smooth: {
                    enabled: true,
                    type: 'curved' + randomDirection(),
                    forceDirection: 'none',
                    roundness: roundness
                }
            });
        }
        this.setState({
            graph: {
                main: main,
                nodes: nodes,
                edges: edges
            },
            modal: false
        });
    }
    changeEdge(type, label, from, to, copies) {
        let main = this.state.graph.main;
        let nodes = Array.from(this.state.graph.nodes);
        let edges = Array.from(this.state.graph.edges);
        let id = this.state.modal.specs.id;
        edges = edges.filter(function(element) {
            return !(element.hasOwnProperty('master') && element.master === id);
        });
        edges = edges.map(element => {
            if(element.id == id) {
                return Object.assign({}, element, {type: type, label: label, from: from, to: to});
            }
            return element;
        });
        let roundness = randomRoundness();
        for(let tail of copies.tails) {
            let timestamp = (new Date()).getTime() + Math.floor((Math.random() * 1000) + 1);
            edges.push({
                id: timestamp,
                type: type,
                label: label,
                from: tail,
                to: to,
                master: id,
                chosen: {
                    edge: changeStyle['edge']
                },
                smooth: {
                    enabled: true,
                    type: 'curved' + randomDirection(),
                    forceDirection: 'none',
                    roundness: roundness
                }
            });
        }
        for(let head of copies.heads) {
            let timestamp = (new Date()).getTime() + Math.floor((Math.random() * 1000) + 1);
            edges.push({
                id: timestamp,
                type: type,
                label: label,
                from: from,
                to: head,
                master: id,
                chosen: {
                    edge: changeStyle['edge']
                },
                smooth: {
                    enabled: true,
                    type: 'curved' + randomDirection(),
                    forceDirection: 'none',
                    roundness: roundness
                }
            });
        }
        this.setState({
            graph: {
                main: main,
                nodes: nodes,
                edges: edges
            },
            modal: false
        });
    }
    changeEdgeProperties(binding, multiplicable, persistent, consumer, /*notifier, subscriber,*/ formative) {
        let main = this.state.graph.main;
        let nodes = Array.from(this.state.graph.nodes);
        let edges = Array.from(this.state.graph.edges);
        let id = this.state.modal.specs.id;
        edges = edges.map(element => {
            if(element.id == id) {
                return Object.assign({}, element, {properties: {binding: binding, multiplicable: multiplicable, persistent: persistent, consumer: consumer, /*notifier: notifier, subscriber: subscriber,*/ formative: formative}});
            }
            return element;
        });
        this.setState({
            graph: {
                main: main,
                nodes: nodes,
                edges: edges
            },
            modal: false
        });
    }
    deleteItem() {
        let main = this.state.graph.main;
        let nodes = Array.from(this.state.graph.nodes);
        let edges = Array.from(this.state.graph.edges);
        let category = this.state.options.category;
        let id = this.state.options.id;
        if(category == 'node') {
            nodes = nodes.filter(function(element) {
                return element.id !== id;
            });
        } else {
            edges = edges.filter(function(element) {
                return element.id !== id && !(element.hasOwnProperty('master') && element.master === id);
            });
        }
        this.setState({
            graph: {
                main: main,
                nodes: nodes,
                edges: edges
            },
            options: false
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
        if(this.state.modal.model == 'drawEdge') {
            this.toggleDrawingMode();
        }
        this.setState({
            modal: false
        });
    }
    toggleDrawingMode() {
        this.setState({
            drawing: !this.state.drawing
        });
    }
    render() {
        return(
            <Container>
                <Navigation
                    ready={this.ready}
                    save={() => saveGraph(this.state.graph, function(callback) {
                        callback();
                    })}
                    delete={this.deleteGraph}
                />
                <Toolbar
                    ready={this.ready}
                    drawing={this.state.drawing}
                    drawable={this.state.graph.nodes.length > 0}
                    label={this.state.graph.main.label}
                    createItem={this.createItem}
                    toggleDrawingMode={this.toggleDrawingMode}
                    showGraphOptions={() => this.showOptions('graph')}
                />
                {this.state.modal &&
                <Modal
                    data={this.state.modal}
                    main={this.state.graph.main}
                    nodes={this.state.graph.nodes}
                    edges={this.state.graph.edges}
                    addAttribute={this.addAttribute}
                    changeAttribute={this.changeAttribute}
                    changeModalPage={this.changeModalPage}
                    changeAttributeType={this.changeAttributeType}
                    closeModal={this.closeModal}
                    addGraph={this.addGraph}
                    changeGraph={this.changeGraph}
                    changeGraphPermissions={this.changeGraphPermissions}
                    addNode={this.addNode}
                    changeNode={this.changeNode}
                    changeNodeProperties={this.changeNodeProperties}
                    changeNodePermissions={this.changeNodePermissions}
                    addEdge={this.addEdge}
                    addCopyEdge={this.addCopyEdge}
                    changeEdge={this.changeEdge}
                    changeEdgeProperties={this.changeEdgeProperties}
                    updateOptions={this.updateOptions}
                    toggleDrawingMode={this.toggleDrawingMode}
                />
                }
                <Content>
                    {this.ready == true
                    ? <Display
                        data={this.state.graph}
                        drawing={this.state.drawing}
                        addEdge={this.addEdge}
                        showOptions={this.showOptions}
                        hideOptions={this.hideOptions}
                        changeOptions={this.changeOptions}
                    />
                    : <Starter createItem={this.createItem} />
                    }
                </Content>
                <Options
                    ready={this.ready}
                    data={this.state.graph}
                    scope={this.state.options}
                    deleteItem={this.deleteItem}
                    changeOptions={this.changeOptions}
                    sortAttributes={this.sortAttributes}
                    option={this.state.options ? true : false}
                />
            </Container>
        )
    }
}

render(
    <App />,
    document.getElementById('root')
);
