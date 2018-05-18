import React from 'react';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            failMessages: [],
            propertyFormat: 'String'
        };
        this.setPropertyType = this.setPropertyType.bind(this);
        this.togglePropertyDefault = this.togglePropertyDefault.bind(this);
        this.handleNewNode = this.handleNewNode.bind(this);
        this.handleExistingNode = this.handleExistingNode.bind(this);
        this.handleNodeProperties = this.handleNodeProperties.bind(this);
        this.handleNewEdge = this.handleNewEdge.bind(this);
        this.handleExistingEdge = this.handleExistingEdge.bind(this);
        this.handleEdgeProperties = this.handleEdgeProperties.bind(this);
        this.handleNewAttribute = this.handleNewAttribute.bind(this);
        this.checkLabelMinimumLength = this.checkLabelMinimumLength.bind(this);
        //this.checkLabelMaximumLength = this.checkLabelMaximumLength.bind(this);
        this.checkDropdownValue = this.checkDropdownValue.bind(this);
        this.checkExpirationTimeAmount = this.checkExpirationTimeAmount.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({
                failMessages: []
            })
        }
    }
    setPropertyType(event) {
        this.setState({
            propertyFormat: event.target.value
        });
    }
    togglePropertyDefault(event) {
        if(event.target.checked) {
            event.target.parentNode.nextSibling.classList.remove('hidden');
        } else {
            event.target.parentNode.nextSibling.classList.add('hidden');
        }
    }
    checkLabelMinimumLength() {
        let labelMinimumLengthLimit = 1;
        let failMessage = 'Label must be ' + labelMinimumLengthLimit + ' characters minimum!';
        if(this.refs.label.value.length >= labelMinimumLengthLimit) {
            this.refs.label.classList.remove('error');
            if(this.state.failMessages.includes(failMessage)) {
                let failMessages = this.state.failMessages;
                failMessages.splice(failMessages.indexOf(failMessage), 1);
                this.setState({
                    failMessages: failMessages
                });
            }
            return true;
        } else {
            this.refs.label.classList.add('error');
            if(!this.state.failMessages.includes(failMessage)) {
                let failMessages = this.state.failMessages;
                failMessages.push(failMessage);
                this.setState({
                    failMessages: failMessages
                });
             }
            return false;
        }
    }
    checkDropdownValue(reference) {
        let labelMinimumLengthLimit = 1;
        let failMessage = '"' + reference.charAt(0).toUpperCase() + reference.substr(1) + '" field must be set!';
        if(this.refs[reference].value) {
            this.refs[reference].parentNode.classList.remove('error');
            if(this.state.failMessages.includes(failMessage)) {
                let failMessages = this.state.failMessages;
                failMessages.splice(failMessages.indexOf(failMessage), 1);
                this.setState({
                    failMessages: failMessages
                });
            }
            return true;
        } else {
            this.refs[reference].parentNode.classList.add('error');
            if(!this.state.failMessages.includes(failMessage)) {
                let failMessages = this.state.failMessages;
                failMessages.push(failMessage);
                this.setState({
                    failMessages: failMessages
                });
             }
            return false;
        }
    }
    checkExpirationTimeAmount() {
        let expirationMinimumTimeLimit = 0;
        let failMessage = 'Expiration limit should be ' + expirationMinimumTimeLimit + ' or higher!';
        if(this.refs.expires.value >= expirationMinimumTimeLimit) {
            this.refs.expires.parentNode.classList.remove('error');
            if(this.state.failMessages.includes(failMessage)) {
                let failMessages = this.state.failMessages;
                failMessages.splice(failMessages.indexOf(failMessage), 1);
                this.setState({
                    failMessages: failMessages
                });
            }
            return true;
        } else {
            this.refs.expires.parentNode.classList.add('error');
            if(!this.state.failMessages.includes(failMessage)) {
                let failMessages = this.state.failMessages;
                failMessages.push(failMessage);
                this.setState({
                    failMessages: failMessages
                });
             }
            return false;
        }
    }
    handleNewNode(event) {
        if(this.checkLabelMinimumLength()) {
            let type = event.target.dataset.type;
            let label = this.refs.label.value;
            this.props.addNode(type, label);
        }
    }
    handleExistingNode() {
        if(this.checkDropdownValue('type') && this.checkLabelMinimumLength()) {
            let type = this.refs.type.value;
            let label = this.refs.label.value;
            this.props.changeNode(type, label);
        }
    }
    handleNodeProperties() {
        if(this.checkExpirationTimeAmount()) {
            let expires = this.refs.expires.value;
            let editable = this.refs.editable.value;
            let volatile = this.refs.volatile.value;
            let revisionable = this.refs.revisionable.value;
            this.props.changeNodeProperties(expires, editable, volatile, revisionable);
        }
    }
    handleNewEdge(event) {
        if(this.checkLabelMinimumLength() && this.checkDropdownValue('from') && this.checkDropdownValue('to')) {
            let type = event.target.dataset.type;
            let label = this.refs.label.value;
            let from = this.refs.from.value;
            let to = this.refs.to.value;
            this.props.addEdge(type, label, from, to);
        }
    }
    handleExistingEdge() {
        if(this.checkDropdownValue('type') && this.checkLabelMinimumLength() && this.checkDropdownValue('from') && this.checkDropdownValue('to')) {
            let type = this.refs.type.value;
            let label = this.refs.label.value;
            let from = this.refs.from.value;
            let to = this.refs.to.value;
            this.props.changeEdge(type, label, from, to);
        }
    }
    handleEdgeProperties() {
        let binding = this.refs.binding.value;
        let multiplicable = this.refs.multiplicable.value;
        let persistent = this.refs.persistent.value;
        let consumer = this.refs.consumer.value;
        //let notifier = this.refs.notifier.value;
        //let subscriber = this.refs.subscriber.value;
        let formative = this.refs.formative.value;
        this.props.changeEdgeProperties(binding, multiplicable, persistent, consumer, /*notifier, subscriber,*/ formative);
    }
    handleNewAttribute(event) {
        if(this.props.data.page == 1) {
            if(true) {
                this.props.changeModalPage();
            }
        } else if(this.props.data.page == 2) {
            if(true) {
                this.props.changeModalPage();
            }
        } else if(this.props.data.page == 3) {
            if(true) {
                let type = event.target.dataset.type;
                let label = this.refs.label.value;
                let from = this.refs.from.value;
                let to = this.refs.to.value;
                this.props.addAttribute(type, label, from, to);
            }
        } else {
            //Do nothing
        }
    }
    render() {
        let model = this.props.data.model;
        let specs = this.props.data.specs;
        let page = this.props.data.page;
        let component;
        if(model == 'addNode') {
            //addNode
            component = <div className="modal">
                <div className="label">
                    <img src={'lib/images/icons/' + specs.type + '-node.svg'} />
                    <span>Add {specs.type.charAt(0).toUpperCase() + specs.type.substr(1)} Node</span>
                </div>
                {this.state.failMessages.length > 0 && <div className="warning">
                    <ul className="fail">
                        {this.state.failMessages.map((failMessage, key) => <li key={key}>{failMessage}</li>)}
                    </ul>
                </div>}
                <div ref="options" className="content">
                    <input ref="label" type="text" placeholder="Label" />
                </div>
                <button onClick={this.props.closeModal} className="half danger">Cancel</button>
                <button data-type={specs.type} onClick={this.handleNewNode} className="half">Add</button>
            </div>
        } else if(model == 'changeNode') {
            //changeNode
            let nodeTypes = ['actor', 'object', 'graph'];
            let element;
            this.props.nodes.forEach(function(item) {
                if(item.id == specs.id) {
                    element = item;
                }
            });
            component = <div className="modal">
                <div className="label">
                    <span>Change Node</span>
                </div>
                {this.state.failMessages.length > 0 && <div className="warning">
                    <ul className="fail">
                        {this.state.failMessages.map((failMessage, key) => <li key={key}>{failMessage}</li>)}
                    </ul>
                </div>}
                <div ref="options" className="content">
                    <div className="dropdown">
                        <select ref="type" defaultValue={element.type}>
                            {nodeTypes.map((type, key) =>
                                <option key={key} value={type}>{type.charAt(0).toUpperCase() + type.substr(1)}</option>
                            )}
                        </select>
                    </div>
                    <input ref="label" type="text" defaultValue={element.label} placeholder="Label" />
                </div>
                <button onClick={this.props.closeModal} className="half danger">Cancel</button>
                <button onClick={this.handleExistingNode} className="half">Change</button>
            </div>
        } else if(model == 'changeNodeProperties') {
            //changeNodeProperties
            let element;
            this.props.nodes.forEach(function(item) {
                if(item.id == specs.id) {
                    element = item;
                }
            });
            component = <div className="modal">
                <div className="label">
                    <span>Change Node Properties</span>
                </div>
                {this.state.failMessages.length > 0 && <div className="warning">
                    <ul className="fail">
                        {this.state.failMessages.map((failMessage, key) => <li key={key}>{failMessage}</li>)}
                    </ul>
                </div>}
                <div ref="options" className="content">
                    <div className="labeled input wrapper">
                        <b>expires</b>
                        <input ref="expires" type="number" defaultValue={element.properties.expires} placeholder="expires" />
                    </div>
                    <div className="labeled dropdown wrapper">
                        <b>editable</b>
                        <select ref="editable" defaultValue={element.properties.editable}>
                            {[true, false].map((option, key) =>
                                <option key={key} value={option}>{option.toString()}</option>
                            )}
                        </select>
                    </div>
                    <div className="labeled dropdown wrapper">
                        <b>volatile</b>
                        <select ref="volatile" defaultValue={element.properties.volatile}>
                            {[true, false].map((option, key) =>
                                <option key={key} value={option}>{option.toString()}</option>
                            )}
                        </select>
                    </div>
                    <div className="labeled dropdown wrapper">
                        <b>revisionable</b>
                        <select ref="revisionable" defaultValue={element.properties.revisionable}>
                            {[true, false].map((option, key) =>
                                <option key={key} value={option}>{option.toString()}</option>
                            )}
                        </select>
                    </div>
                </div>
                <button onClick={this.props.closeModal} className="half danger">Cancel</button>
                <button onClick={this.handleNodeProperties} className="half">Change</button>
            </div>
        } else if(model == 'addEdge') {
            //addEdge
            component = <div className="modal">
                <div className="label">
                    <img src={'lib/images/icons/edge.svg'} />
                    <span>Add {specs.type.charAt(0).toUpperCase() + specs.type.substr(1)} Edge</span>
                </div>
                {this.state.failMessages.length > 0 && <div className="warning">
                    <ul className="fail">
                        {this.state.failMessages.map((failMessage, key) => <li key={key}>{failMessage}</li>)}
                    </ul>
                </div>}
                <div ref="options" className="content">
                    <input ref="label" type="text" placeholder="Label" />
                    <div className="dropdown">
                        <select ref="to">
                            <option value="">Select Head...</option>
                            {this.props.nodes.map((node, key) =>
                                <option key={key} value={node.id}>{node.label}</option>
                            )}
                        </select>
                    </div>
                    <div className="dropdown">
                        <select ref="from">
                            <option value="">Select Tail...</option>
                            {this.props.nodes.map((node, key) =>
                                <option key={key} value={node.id}>{node.label}</option>
                            )}
                        </select>
                    </div>
                </div>
                <button onClick={this.props.closeModal} className="half danger">Cancel</button>
                <button data-type={specs.type} onClick={this.handleNewEdge} className="half">Add</button>
            </div>
        } else if(model == 'changeEdge') {
            //changeEdge
            let edgeTypes = ['read', 'write', 'subscribe', 'notify', 'mention'];
            let element;
            this.props.edges.forEach(function(item) {
                if(item.id == specs.id) {
                    element = item;
                }
            });
            component = <div className="modal">
                <div className="label">
                    <span>Change Edge</span>
                </div>
                {this.state.failMessages.length > 0 && <div className="warning">
                    <ul className="fail">
                        {this.state.failMessages.map((failMessage, key) => <li key={key}>{failMessage}</li>)}
                    </ul>
                </div>}
                <div ref="options" className="content">
                    <div className="dropdown">
                        <select ref="type" defaultValue={element.type}>
                            <option value="">Select Type...</option>
                            {edgeTypes.map((type, key) =>
                                <option key={key} value={type}>{type.charAt(0).toUpperCase() + type.substr(1)}</option>
                            )}
                        </select>
                    </div>
                    <input ref="label" type="text" defaultValue={element.label} placeholder="Label" />
                    <div className="dropdown">
                        <select ref="to" defaultValue={element.to}>
                            {this.props.nodes.map((node, key) =>
                                <option key={key} value={node.id}>{node.label}</option>
                            )}
                        </select>
                    </div>
                    <div className="dropdown">
                        <select ref="from" defaultValue={element.from}>
                            {this.props.nodes.map((node, key) =>
                                <option key={key} value={node.id}>{node.label}</option>
                            )}
                        </select>
                    </div>
                </div>
                <button onClick={this.props.closeModal} className="half danger">Cancel</button>
                <button onClick={this.handleExistingEdge} className="half">Change</button>
            </div>
        } else if(model == 'changeEdgeProperties') {
            //changeEdgeProperties
            let element;
            this.props.edges.forEach(function(item) {
                if(item.id == specs.id) {
                    element = item;
                }
            });
            component = <div className="modal">
                <div className="label">
                    <span>Change Edge Properties</span>
                </div>
                {this.state.failMessages.length > 0 && <div className="warning">
                    <ul className="fail">
                        {this.state.failMessages.map((failMessage, key) => <li key={key}>{failMessage}</li>)}
                    </ul>
                </div>}
                <div ref="options" className="content">
                    <div className="labeled dropdown wrapper">
                        <b>binding</b>
                        <select ref="binding" defaultValue={element.properties.binding}>
                            {[true, false].map((option, key) =>
                                <option key={key} value={option}>{option.toString()}</option>
                            )}
                        </select>
                    </div>
                    <div className="labeled dropdown wrapper">
                        <b>multiplicable</b>
                        <select ref="multiplicable" defaultValue={element.properties.multiplicable}>
                            {[true, false].map((option, key) =>
                                <option key={key} value={option}>{option.toString()}</option>
                            )}
                        </select>
                    </div>
                    <div className="labeled dropdown wrapper">
                        <b>persistent</b>
                        <select ref="persistent" defaultValue={element.properties.persistent}>
                            {[true, false].map((option, key) =>
                                <option key={key} value={option}>{option.toString()}</option>
                            )}
                        </select>
                    </div>
                    <div className="labeled dropdown wrapper">
                        <b>consumer</b>
                        <select ref="consumer" defaultValue={element.properties.consumer}>
                            {[true, false].map((option, key) =>
                                <option key={key} value={option}>{option.toString()}</option>
                            )}
                        </select>
                    </div>
                    {/*
                    <div className="labeled dropdown wrapper">
                        <b>notifier</b>
                        <select ref="notifier" defaultValue={element.properties.notifier}>
                            {[true, false].map((option, key) =>
                                <option key={key} value={option}>{option.toString()}</option>
                            )}
                        </select>
                    </div>
                    <div className="labeled dropdown wrapper">
                        <b>subscriber</b>
                        <select ref="subscriber" defaultValue={element.properties.subscriber}>
                            {[true, false].map((option, key) =>
                                <option key={key} value={option}>{option.toString()}</option>
                            )}
                        </select>
                    </div>
                    */}
                    <div className="labeled dropdown wrapper">
                        <b>formative</b>
                        <select ref="formative" defaultValue={element.properties.formative}>
                            {[true, false].map((option, key) =>
                                <option key={key} value={option}>{option.toString()}</option>
                            )}
                        </select>
                    </div>
                </div>
                <button onClick={this.props.closeModal} className="half danger">Cancel</button>
                <button onClick={this.handleEdgeProperties} className="half">Change</button>
            </div>
        } else if(model == 'addAttribute') {
            //addAttribute
            let pageLimit = 3;
            let attributeTypes = ['String', 'Int', 'Float', 'Date'];
            component = <div className="modal">
                <div className="label">
                    <span>Add Attribute</span>
                </div>
                {this.state.failMessages.length > 0 && <div className="warning">
                    <ul className="fail">
                        {this.state.failMessages.map((failMessage, key) => <li key={key}>{failMessage}</li>)}
                    </ul>
                </div>}
                <div ref="options" className="content">
                    <input className={page == 1 ? '' : 'hidden'} ref="label" type="text" placeholder="Name (camelCase)" />
                    <div className={'double radioblock wrapper' + (page == 1 ? '' : ' hidden')}>
                        <div>
                            <input type="radio" id="optional" value="optional" name="fieldRequirement" />
                            <label for="optional">Optional</label>
                        </div>
                        <div>
                            <input type="radio" id="required" value="required" name="fieldRequirement" />
                            <label for="required">Required</label>
                        </div>
                    </div>
                    <div className={'labeled dropdown wrapper' + (page == 1 ? '' : ' hidden')}>
                        <b>Type</b>
                        <select ref="type" onChange={this.setPropertyType}>
                            {attributeTypes.map((type, key) =>
                                <option key={key} value={type}>{type.charAt(0).toUpperCase() + type.substr(1)}</option>
                            )}
                        </select>
                    </div>
                    <b className={page == 2 ? '' : ' hidden'}>Mutations (Optional)</b>
                    <div className={'checklist' + (page == 2 ? '' : ' hidden')}>
                        <div>
                            <input type="checkbox" id="unique" value="unique" name="mutationDirectives" />
                            <label for="unique">Value must be unique</label>
                        </div>
                        <div>
                            <input type="checkbox" id="sha1" value="sha1" name="mutationDirectives" />
                            <label for="sha1">Encrypt value with sha1</label>
                        </div>
                        <div>
                            <input type="checkbox" id="md5" value="md5" name="mutationDirectives" />
                            <label for="md5">Encrypt value with md5</label>
                        </div>
                        <div>
                            <input type="checkbox" id="now" value="now" name="mutationDirectives" />
                            <label for="now">Set value as the current time</label>
                        </div>
                        <div>
                            <input type="checkbox" id="index" value="index" name="mutationDirectives" />
                            <label for="index">Index value for faster queries</label>
                        </div>
                        <div>
                            <input onChange={this.togglePropertyDefault} type="checkbox" id="default" value="default" name="mutationDirectives" />
                            <label for="default">Add default value to property</label>
                        </div>
                        <input ref="default" className="hidden" type="text" placeholder="Enter default value" />
                    </div>
                    <b className={page == 3 ? '' : ' hidden'}>Constraints (Optional)</b>
                    <input ref="minimum" className={page == 3 && this.state.propertyFormat == 'String' ? '' : ' hidden'} type="number" placeholder="Minimum character length" />
                    <input ref="maximum" className={page == 3 && this.state.propertyFormat == 'String' ? '' : ' hidden'} type="number" placeholder="Maximum character length" />
                    <input ref="phoid" className={page == 3 && this.state.propertyFormat == 'String' ? '' : ' hidden'} type="text" placeholder="Pho ID format" />
                    <input ref="regex" className={page == 3 && this.state.propertyFormat == 'String' ? '' : ' hidden'} type="text" placeholder="RegEx (without delimiters)" />
                    <div className={'labeled dropdown wrapper' + (page == 3 && this.state.propertyFormat == 'String' ? '' : ' hidden')}>
                        <b>Format</b>
                        <select ref="type">
                            {['ip', 'email', 'url', 'creditCard', 'alpha', 'alphaNum'].map((format, key) =>
                                <option key={key} value={format}>{format}</option>
                            )}
                        </select>
                    </div>
                    <input ref="dateAfter" className={page == 3 && this.state.propertyFormat == 'Date' ? '' : ' hidden'} type="text" placeholder="The date must be after... (MM/DD/YYYY)" />
                    <input ref="dateBefore" className={page == 3 && this.state.propertyFormat == 'Date' ? '' : ' hidden'} type="text" placeholder="The date must be before... (MM/DD/YYYY)" />
                    <input ref="lessThan" className={page == 3 && (this.state.propertyFormat == 'Int' || this.state.propertyFormat == 'Float') ? '' : ' hidden'} type="number" placeholder="Value must be less than..." />
                    <input ref="greaterThan" className={page == 3 && (this.state.propertyFormat == 'Int' || this.state.propertyFormat == 'Float') ? '' : ' hidden'} type="number" placeholder="Value must be greater than..." />
                </div>
                <button onClick={this.props.closeModal} className="half danger">Cancel</button>
                <button onClick={this.handleNewAttribute} className={'half' + (page == pageLimit ? '': ' arrow')}>{page == pageLimit ? 'Add': 'Next'}</button>
            </div>
        } else {
            //Nothing to render
        }
        return(
            <div className={'overlay' + (this.props.data ? ' open' : '')}>
                <div>{this.props.data && component}</div>
            </div>
        )
    }
}