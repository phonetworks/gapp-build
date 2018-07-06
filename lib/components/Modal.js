import React from 'react';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tails: [],
            heads: [],
            failMessages: []
        };
        this.labelsInUse = [];
        this.setAttributeType = this.setAttributeType.bind(this);
        this.togglePropertyDefault = this.togglePropertyDefault.bind(this);
        this.handleKey = this.handleKey.bind(this);
        this.handleNewGraph = this.handleNewGraph.bind(this);
        this.handleExistingGraph = this.handleExistingGraph.bind(this);
        this.handleGraphPermissions = this.handleGraphPermissions.bind(this);
        this.handleNewNode = this.handleNewNode.bind(this);
        this.handleExistingNode = this.handleExistingNode.bind(this);
        this.handleNodeProperties = this.handleNodeProperties.bind(this);
        this.handleNodePermissions = this.handleNodePermissions.bind(this);
        this.handleNewEdge = this.handleNewEdge.bind(this);
        this.handleDrawnEdge = this.handleDrawnEdge.bind(this);
        this.handleExistingEdge = this.handleExistingEdge.bind(this);
        this.handleEdgeProperties = this.handleEdgeProperties.bind(this);
        this.handleAddingMoreHead = this.handleAddingMoreHead.bind(this);
        this.handleChangingHead = this.handleChangingHead.bind(this);
        this.handleNewAttribute = this.handleNewAttribute.bind(this);
        this.handleExistingAttribute = this.handleExistingAttribute.bind(this);
        this.checkMinimumLength = this.checkMinimumLength.bind(this);
        this.checkMaximumLength = this.checkMaximumLength.bind(this);
        this.checkLabelMinimumLength = this.checkLabelMinimumLength.bind(this);
        //this.checkLabelMaximumLength = this.checkLabelMaximumLength.bind(this);
        this.checkLabelUniqueness = this.checkLabelUniqueness.bind(this);
        this.checkDropdownValue = this.checkDropdownValue.bind(this);
        this.checkExpirationTimeAmount = this.checkExpirationTimeAmount.bind(this);
        this.checkAttributeNameUniqueness = this.checkAttributeNameUniqueness.bind(this);
        this.checkAttributeNamePattern = this.checkAttributeNamePattern.bind(this);
        this.checkDatePattern = this.checkDatePattern.bind(this);
        this.checkDatePrecedence = this.checkDatePrecedence.bind(this);
        this.checkInteger = this.checkInteger.bind(this);
        this.checkFloat = this.checkFloat.bind(this);
        this.checkNumberGreatness = this.checkNumberGreatness.bind(this);
        this.checkRegExPattern = this.checkRegExPattern.bind(this);
    }
    componentWillMount() {
        let main;
        let heads = [];
        let specs = this.props.data.specs;
        if(this.props.data.model == 'changeEdge') {
            this.props.edges.forEach(function(item) {
                if(item.id == specs.id) {
                    main = item.to;
                }
                if(item.hasOwnProperty('master') && item.master == specs.id) {
                    heads.push(item.to);
                }
            });
            heads.unshift(main);
            this.setState({
                heads: heads
            });
        }
        let labelsInUse = [];
        Object.keys(this.props.main).length > 0 && labelsInUse.push(this.props.main.label.toLowerCase())
        this.props.nodes.forEach(function(item) {
            labelsInUse.push(item.label.toLowerCase());
        });
        this.props.edges.forEach(function(item) {
            labelsInUse.push(item.label.toLowerCase());
        });
        this.labelsInUse = labelsInUse;
        if(this.props.data.model == 'addAttribute' || this.props.data.model == 'changeAttribute') {
            let attributes;
            let attributeNamesInUse = [];
            if(specs.category == 'graph') {
                attributes = this.props.main.attributes;
            } else {
                this.props[specs.category + 's'].forEach(function(element) {
                    if(element.id == specs.id) {
                        attributes = element.attributes;
                    }
                });
            }
            attributes && attributes.forEach(function(item) {
                if(!(specs.hasOwnProperty('index') && attributes[specs.index].name == item.name)) {
                    attributeNamesInUse.push(item.name.toLowerCase());
                }
            });
            this.attributeNamesInUse = attributeNamesInUse;
        }
    }
    componentDidMount() {
        window.addEventListener('keydown', this.handleKey, false);
        let firstItem = document.querySelectorAll('.modal .content')[0].firstElementChild;
        if(firstItem && firstItem.type == 'text') {
            firstItem.focus();
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({
                failMessages: []
            })
        }
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKey, false);
    }
    handleKey(event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
            this.props.closeModal();
        }
        if (event.keyCode === 13) {
            document.getElementById('submit').click();
        }
    }
    setAttributeType(event) {
        this.props.changeAttributeType(event.target.value);
    }
    togglePropertyDefault(event) {
        if(event.target.checked) {
            event.target.parentNode.nextSibling.value = '';
            event.target.parentNode.nextSibling.classList.remove('hidden');
        } else {
            event.target.parentNode.nextSibling.classList.add('hidden');
        }
    }
    checkLabelUniqueness() {
        let failMessage = 'Label name is already in use.';
        if(!this.labelsInUse.includes(this.refs.label.value.toLowerCase())) {
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
    checkMinimumLength(reference, word, length) {
        let minimumLengthLimit = length;
        let failMessage = word + ' must be ' + minimumLengthLimit + ' character' + (minimumLengthLimit > 1 ? 's' : '') + ' minimum!';
        if(this.refs[reference].value.length >= minimumLengthLimit) {
            this.refs[reference].classList.remove('error');
            if(this.state.failMessages.includes(failMessage)) {
                let failMessages = this.state.failMessages;
                failMessages.splice(failMessages.indexOf(failMessage), 1);
                this.setState({
                    failMessages: failMessages
                });
            }
            return true;
        } else {
            this.refs[reference].classList.add('error');
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
    checkMaximumLength(reference, word, length) {
        let maximumLengthLimit = length;
        let failMessage = word + ' must be ' + maximumLengthLimit + ' character' + (maximumLengthLimit > 1 ? 's' : '') + ' maximum!';
        if(this.refs[reference].value.length <= maximumLengthLimit) {
            this.refs[reference].classList.remove('error');
            if(this.state.failMessages.includes(failMessage)) {
                let failMessages = this.state.failMessages;
                failMessages.splice(failMessages.indexOf(failMessage), 1);
                this.setState({
                    failMessages: failMessages
                });
            }
            return true;
        } else {
            this.refs[reference].classList.add('error');
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
    checkAttributeNameUniqueness() {
        let failMessage = 'Attribute name is already in use.';
        if(!this.attributeNamesInUse.includes(this.refs.name.value.toLowerCase())) {
            this.refs.name.classList.remove('error');
            if(this.state.failMessages.includes(failMessage)) {
                let failMessages = this.state.failMessages;
                failMessages.splice(failMessages.indexOf(failMessage), 1);
                this.setState({
                    failMessages: failMessages
                });
            }
            return true;
        } else {
            this.refs.name.classList.add('error');
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
    checkAttributeNamePattern(reference) {
        let attributeNamePattern = /^[a-zA-Z][a-zA-Z0-9-_]+/;
        let failMessage = 'Name is invalid!';
        if(attributeNamePattern.test(this.refs[reference].value)) {
            this.refs[reference].classList.remove('error');
            if(this.state.failMessages.includes(failMessage)) {
                let failMessages = this.state.failMessages;
                failMessages.splice(failMessages.indexOf(failMessage), 1);
                this.setState({
                    failMessages: failMessages
                });
            }
            return true;
        } else {
            this.refs[reference].classList.add('error');
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
    checkRegExPattern(reference) {
        let referenceValue = this.refs[reference].value.length > 0;
        let validRegExPattern = true;
        try {
            new RegExp(this.refs[reference].value);
        } catch(error) {
            validRegExPattern = false;
        }
        let failMessage = 'Regular Expressions pattern is invalid!';
        if(!referenceValue || validRegExPattern) {
            this.refs[reference].classList.remove('error');
            if(this.state.failMessages.includes(failMessage)) {
                let failMessages = this.state.failMessages;
                failMessages.splice(failMessages.indexOf(failMessage), 1);
                this.setState({
                    failMessages: failMessages
                });
            }
            return true;
        } else {
            this.refs[reference].classList.add('error');
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
    checkDatePattern(reference) {
        let referenceValue = this.refs[reference].value.length > 0;
        let datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
        let failMessage = 'Date is invalid!';
        if(!referenceValue || datePattern.test(this.refs[reference].value)) {
            this.refs[reference].classList.remove('error');
            if(this.state.failMessages.includes(failMessage)) {
                let failMessages = this.state.failMessages;
                failMessages.splice(failMessages.indexOf(failMessage), 1);
                this.setState({
                    failMessages: failMessages
                });
            }
            return true;
        } else {
            this.refs[reference].classList.add('error');
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
    checkDatePrecedence(early, late) {
        let earlyValue = this.refs[early].value.length > 0;
        let lateValue = this.refs[late].value.length > 0;
        let earlyDate = new Date(this.refs[early].value).getTime();
        let lateDate = new Date(this.refs[late].value).getTime();
        let failMessage = 'Dates given are wrong!';
        if((!(earlyValue && lateValue) || earlyDate <= lateDate)) {
            this.refs[early].classList.remove('error');
            this.refs[late].classList.remove('error');
            if(this.state.failMessages.includes(failMessage)) {
                let failMessages = this.state.failMessages;
                failMessages.splice(failMessages.indexOf(failMessage), 1);
                this.setState({
                    failMessages: failMessages
                });
            }
            return true;
        } else {
            this.refs[early].classList.add('error');
            this.refs[late].classList.add('error');
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
    checkInteger(reference) {
        let referenceValue = this.refs[reference].value.length > 0;
        let failMessage = 'The number is not an Integer!';
        if(!referenceValue || Number(this.refs[reference].value % 1) === 0) {
            this.refs[reference].classList.remove('error');
            if(this.state.failMessages.includes(failMessage)) {
                let failMessages = this.state.failMessages;
                failMessages.splice(failMessages.indexOf(failMessage), 1);
                this.setState({
                    failMessages: failMessages
                });
            }
            return true;
        } else {
            this.refs[reference].classList.add('error');
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
    checkFloat(reference) {
        let referenceValue = this.refs[reference].value.length > 0;
        let failMessage = 'The number is not a Float!';
        if(!referenceValue || Number(this.refs[reference].value) % 1 !== 0) {
            this.refs[reference].classList.remove('error');
            if(this.state.failMessages.includes(failMessage)) {
                let failMessages = this.state.failMessages;
                failMessages.splice(failMessages.indexOf(failMessage), 1);
                this.setState({
                    failMessages: failMessages
                });
            }
            return true;
        } else {
            this.refs[reference].classList.add('error');
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
    checkNumberGreatness(less, greater) {
        let lessValue = this.refs[less].value.length > 0;
        let greaterValue = this.refs[greater].value.length > 0;
        let lessNumber = this.refs[less].value;
        let greaterNumber = this.refs[greater].value;
        let failMessage = 'Numbers given are wrong!';
        if((!(lessValue && greaterValue) || Number(lessNumber) <= Number(greaterNumber))) {
            this.refs[less].classList.remove('error');
            this.refs[greater].classList.remove('error');
            if(this.state.failMessages.includes(failMessage)) {
                let failMessages = this.state.failMessages;
                failMessages.splice(failMessages.indexOf(failMessage), 1);
                this.setState({
                    failMessages: failMessages
                });
            }
            return true;
        } else {
            this.refs[less].classList.add('error');
            this.refs[greater].classList.add('error');
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
    handleNewGraph(event) {
        if(this.checkLabelMinimumLength()) {
            let label = this.refs.label.value;
            this.props.addGraph(label);
        }
    }
    handleExistingGraph() {
        if(this.checkLabelMinimumLength()) {
            let label = this.refs.label.value;
            this.props.changeGraph(label);
        }
    }
    handleGraphPermissions() {
        let owner = {
            manage: this.refs['owner-manage'].checked,
            read: this.refs['owner-read'].checked,
            write: this.refs['owner-write'].checked,
            subscribe: this.refs['owner-subscribe'].checked
        }
        let subscribers = {
            manage: this.refs['subscribers-manage'].checked,
            read: this.refs['subscribers-read'].checked,
            write: this.refs['subscribers-write'].checked,
            subscribe: this.refs['subscribers-subscribe'].checked
        }
        let context = {
            manage: this.refs['context-manage'].checked,
            read: this.refs['context-read'].checked,
            write: this.refs['context-write'].checked,
            subscribe: this.refs['context-subscribe'].checked
        }
        let others = {
            manage: this.refs['others-manage'].checked,
            read: this.refs['others-read'].checked,
            write: this.refs['others-write'].checked,
            subscribe: this.refs['others-subscribe'].checked
        }
        this.props.changeGraphPermissions(owner, subscribers, context, others);
    }
    handleNewNode(event) {
        if(this.checkLabelUniqueness() && this.checkLabelMinimumLength()) {
            let type = event.target.dataset.type;
            let label = this.refs.label.value;
            this.props.addNode(type, label);
        }
    }
    handleExistingNode() {
        if(this.checkLabelUniqueness() && this.checkDropdownValue('type') && this.checkLabelMinimumLength()) {
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
    handleNodePermissions() {
        let owner = {
            manage: this.refs['owner-manage'].checked,
            read: this.refs['owner-read'].checked,
            write: this.refs['owner-write'].checked,
            subscribe: this.refs['owner-subscribe'].checked
        }
        let subscribers = {
            manage: this.refs['subscribers-manage'].checked,
            read: this.refs['subscribers-read'].checked,
            write: this.refs['subscribers-write'].checked,
            subscribe: this.refs['subscribers-subscribe'].checked
        }
        let context = {
            manage: this.refs['context-manage'].checked,
            read: this.refs['context-read'].checked,
            write: this.refs['context-write'].checked,
            subscribe: this.refs['context-subscribe'].checked
        }
        let others = {
            manage: this.refs['others-manage'].checked,
            read: this.refs['others-read'].checked,
            write: this.refs['others-write'].checked,
            subscribe: this.refs['others-subscribe'].checked
        }
        this.props.changeNodePermissions(owner, subscribers, context, others);
    }
    handleNewEdge(event) {
        if(this.checkLabelUniqueness() && this.checkLabelMinimumLength() && this.checkDropdownValue('from') && this.checkDropdownValue('to')) {
            let type = event.target.dataset.type;
            let label = this.refs.label.value;
            let from = parseInt(this.refs.from.value);
            let to = parseInt(this.refs.to.value);
            let tails = this.state.tails;
            let heads = this.state.heads;
            tails.shift();
            heads.shift();
            let copies = {
                tails: [],
                heads: []
            };
            if(tails.length > 0 || heads.length > 0) {
                copies = {
                    tails: tails,
                    heads: heads
                };
            }
            this.props.addEdge(type, label, from, to, copies);
        }
    }
    handleDrawnEdge(event) {
        if(this.checkDropdownValue('type') && this.checkLabelUniqueness() && this.checkLabelMinimumLength() && this.checkDropdownValue('from') && this.checkDropdownValue('to')) {
            let type = this.refs.type.value;
            let label = this.refs.label.value;
            let from = parseInt(this.refs.from.value);
            let to = parseInt(this.refs.to.value);
            let tails = this.state.tails;
            let heads = this.state.heads;
            tails.shift();
            heads.shift();
            let copies = {
                tails: [],
                heads: []
            };
            if(tails.length > 0 || heads.length > 0) {
                copies = {
                    tails: tails,
                    heads: heads
                };
            }
            this.props.addEdge(type, label, from, to, copies);
        }
        this.props.toggleDrawingMode();
    }
    handleExistingEdge() {
        if(this.checkLabelUniqueness() && this.checkLabelMinimumLength() && this.checkDropdownValue('from') && this.checkDropdownValue('to')) {
            let type = this.refs.type.value;
            let label = this.refs.label.value;
            let from = parseInt(this.refs.from.value);
            let to = parseInt(this.refs.to.value);
            let tails = this.state.tails;
            let heads = this.state.heads;
            tails.shift();
            heads.shift();
            let copies = {
                tails: [],
                heads: []
            };
            if(tails.length > 0 || heads.length > 0) {
                copies = {
                    tails: tails,
                    heads: heads
                };
            }
            this.props.changeEdge(type, label, from, to, copies);
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
    handleAddingMoreHead(event) {
        if(event.target.value) {
            let heads = this.state.heads;
            heads.push(parseInt(event.target.value));
            event.target.value = '';
            this.setState({
                heads: heads
            });
        }
    }
    handleChangingHead(position, event) {
        if(event.target.value) {
            let heads = this.state.heads;
            heads.splice(position, 1, parseInt(event.target.value));
            event.target.value = '';
            this.setState({
                heads: heads
            });
        }
    }
    handleNewAttribute(event) {
        let name = this.refs.name.value;
        let type = this.refs.type.value;
        let required = this.refs.required.checked ? true : false;
        let mutations = {};
        let constraints = {};
        if(this.props.data.page == 1) {
            if(this.checkAttributeNameUniqueness() && this.checkAttributeNamePattern('name') && this.checkMinimumLength('name', 'Attribute name', 1) && this.checkMaximumLength('name', 'Attribute name', 24)) {
                if(['string', 'int', 'float', 'date'].includes(this.props.data.attributeType)) {
                    this.props.changeModalPage();
                } else {
                    this.props.addAttribute(name, type, required);
                }
            }
        } else if(this.props.data.page == 2) {
            let checked = this.refs.default.checked;
            if(!checked || (checked, this.checkMinimumLength('defaultValue', 'Default value', 1))) {
                this.props.changeModalPage();
            }
        } else if(this.props.data.page == 3) {
            let format = this.props.data.attributeType;
            let self = this;
            document.querySelectorAll('input[name="mutationDirectives"]').forEach(function(item) {
                if(item.checked) {
                    mutations[item.id] = item.id == 'default'
                    ? self.refs.defaultValue.value
                    : true;
                }
            });
            if(format == 'string') {
                if(this.checkNumberGreatness('minLength', 'maxLength') && this.checkRegExPattern('RegEx')) {
                    if(this.refs.minLength.value.length > 0) {
                        constraints['minLength'] = Number(this.refs.minLength.value);
                    }
                    if(this.refs.maxLength.value.length > 0) {
                        constraints['maxLength'] = Number(this.refs.maxLength.value);
                    }
                    if(this.refs.RegEx.value.length > 0) {
                        constraints['RegEx'] = this.refs.RegEx.value;
                    }
                    if(this.refs.phoId.value.length > 0) {
                        constraints['phoId'] = this.refs.phoId.value;
                    }
                    if(this.refs.format.value.length > 0) {
                        constraints['format'] = this.refs.format.value;
                    }
                    this.props.addAttribute(name, type, required, mutations, constraints);
                }
            } else if(format == 'date') {
                if(this.checkDatePattern('dateAfter') && this.checkDatePattern('dateBefore') && this.checkDatePrecedence('dateAfter', 'dateBefore')) {
                    if(this.refs.dateAfter.value.length > 0) {
                        constraints['dateAfter'] = this.refs.dateAfter.value;
                    }
                    if(this.refs.dateBefore.value.length > 0) {
                        constraints['dateBefore'] = this.refs.dateBefore.value;
                    }
                    this.props.addAttribute(name, type, required, mutations, constraints);
                }
            } else if(format == 'int') {
                if(this.checkInteger('greaterThan') && this.checkInteger('lessThan') && this.checkNumberGreatness('greaterThan', 'lessThan')) {
                    if(this.refs.greaterThan.value.length > 0) {
                        constraints['greaterThan'] = Number(this.refs.greaterThan.value);
                    }
                    if(this.refs.lessThan.value.length > 0) {
                        constraints['lessThan'] = Number(this.refs.lessThan.value);
                    }
                    this.props.addAttribute(name, type, required, mutations, constraints);
                }
            } else if(format == 'float') {
                if(this.checkFloat('greaterThan') && this.checkFloat('lessThan') && this.checkNumberGreatness('greaterThan', 'lessThan')) {
                    if(this.refs.greaterThan.value.length > 0) {
                        constraints['greaterThan'] = Number(this.refs.greaterThan.value);
                    }
                    if(this.refs.lessThan.value.length > 0) {
                        constraints['lessThan'] = Number(this.refs.lessThan.value);
                    }
                    this.props.addAttribute(name, type, required, mutations, constraints);
                }
            } else {
                //Do nothing
            }
        } else {
            //Do nothing
        }
    }
    handleExistingAttribute(event) {
        let name = this.refs.name.value;
        let type = this.refs.type.value;
        let required = this.refs.required.checked ? true : false;
        let mutations = {};
        let constraints = {};
        if(this.props.data.page == 1) {
            if(this.checkAttributeNameUniqueness() && this.checkAttributeNamePattern('name') && this.checkMinimumLength('name', 'Attribute name', 1) && this.checkMaximumLength('name', 'Attribute name', 24)) {
                if(['string', 'int', 'float', 'date'].includes(this.props.data.attributeType)) {
                    this.props.changeModalPage();
                } else {
                    this.props.changeAttribute(name, type, required);
                }
            }
        } else if(this.props.data.page == 2) {
            let checked = this.refs.default.checked;
            if(!checked || (checked, this.checkMinimumLength('defaultValue', 'Default value', 1))) {
                this.props.changeModalPage();
            }
        } else if(this.props.data.page == 3) {
            let format = this.props.data.attributeType;
            let self = this;
            document.querySelectorAll('input[name="mutationDirectives"]').forEach(function(item) {
                if(item.checked) {
                    mutations[item.id] = item.id == 'default'
                    ? self.refs.defaultValue.value
                    : true;
                }
            });
            if(format == 'string') {
                if(this.checkNumberGreatness('minLength', 'maxLength') && this.checkRegExPattern('RegEx')) {
                    if(this.refs.minLength.value.length > 0) {
                        constraints['minLength'] = Number(this.refs.minLength.value);
                    }
                    if(this.refs.maxLength.value.length > 0) {
                        constraints['maxLength'] = Number(this.refs.maxLength.value);
                    }
                    if(this.refs.RegEx.value.length > 0) {
                        constraints['RegEx'] = this.refs.RegEx.value;
                    }
                    if(this.refs.phoId.value.length > 0) {
                        constraints['phoId'] = this.refs.phoId.value;
                    }
                    if(this.refs.format.value.length > 0) {
                        constraints['format'] = this.refs.format.value;
                    }
                    this.props.changeAttribute(name, type, required, mutations, constraints);
                }
            } else if(format == 'date') {
                if(this.checkDatePattern('dateAfter') && this.checkDatePattern('dateBefore') && this.checkDatePrecedence('dateAfter', 'dateBefore')) {
                    if(this.refs.dateAfter.value.length > 0) {
                        constraints['dateAfter'] = this.refs.dateAfter.value;
                    }
                    if(this.refs.dateBefore.value.length > 0) {
                        constraints['dateBefore'] = this.refs.dateBefore.value;
                    }
                    this.props.changeAttribute(name, type, required, mutations, constraints);
                }
            } else if(format == 'int') {
                if(this.checkInteger('greaterThan') && this.checkInteger('lessThan') && this.checkNumberGreatness('greaterThan', 'lessThan')) {
                    if(this.refs.greaterThan.value.length > 0) {
                        constraints['greaterThan'] = Number(this.refs.greaterThan.value);
                    }
                    if(this.refs.lessThan.value.length > 0) {
                        constraints['lessThan'] = Number(this.refs.lessThan.value);
                    }
                    this.props.changeAttribute(name, type, required, mutations, constraints);
                }
            } else if(format == 'float') {
                if(this.checkFloat('greaterThan') && this.checkFloat('lessThan') && this.checkNumberGreatness('greaterThan', 'lessThan')) {
                    if(this.refs.greaterThan.value.length > 0) {
                        constraints['greaterThan'] = Number(this.refs.greaterThan.value);
                    }
                    if(this.refs.lessThan.value.length > 0) {
                        constraints['lessThan'] = Number(this.refs.lessThan.value);
                    }
                    this.props.changeAttribute(name, type, required, mutations, constraints);
                }
            } else {
                //Do nothing
            }
        } else {
            //Do nothing
        }
    }
    render() {
        let model = this.props.data.model;
        let specs = this.props.data.specs;
        let page = this.props.data.page;
        let attributeType = this.props.data.attributeType;
        let component;
        if(model == 'addGraph') {
            //addGraph
            component = <div className="modal">
                <div className="label">
                    <img src={'lib/images/icons/graph.svg'} />
                    <span>Create Graph</span>
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
                <button id="submit" onClick={this.handleNewGraph} className="half">Add</button>
            </div>
        } else if(model == 'changeGraph') {
            //changeGraph
            let element = this.props.main;
            component = <div className="modal">
                <div className="label">
                    <img src={'lib/images/icons/graph.svg'} />
                    <span>Change Graph</span>
                </div>
                {this.state.failMessages.length > 0 && <div className="warning">
                    <ul className="fail">
                        {this.state.failMessages.map((failMessage, key) => <li key={key}>{failMessage}</li>)}
                    </ul>
                </div>}
                <div ref="options" className="content">
                    <input ref="label" type="text" defaultValue={element.label} placeholder="Label" />
                </div>
                <button onClick={this.props.closeModal} className="half danger">Cancel</button>
                <button id="submit" onClick={this.handleExistingGraph} className="half">Change</button>
            </div>
        } else if(model == 'changeGraphPermissions') {
            //changeGraphPermissions
            let element = this.props.main;
            component = <div className="modal">
                <div className="label">
                    <span>Change Graph Permissions</span>
                </div>
                {this.state.failMessages.length > 0 && <div className="warning">
                    <ul className="fail">
                        {this.state.failMessages.map((failMessage, key) => <li key={key}>{failMessage}</li>)}
                    </ul>
                </div>}
                <div className="information">
                    <b>M:</b> Manage
                    &nbsp;&nbsp;
                    <b>W:</b> Write
                    <br />
                    <b>S:</b> Subscribe
                    &nbsp;&nbsp;
                    <b>R:</b> Read
                </div>
                <div ref="options" className="content">
                    <table>
                        <tr>
                            <th></th>
                            <th>M</th>
                            <th>W</th>
                            <th>S</th>
                            <th>R</th>
                        </tr>
                        {Object.keys(element.permissions).map((group, groupKey) =>
                        <tr className={group + '-group'} key={groupKey}>
                            <td>
                                <b>{group.charAt(0).toUpperCase() + group.substr(1)}</b>
                            </td>
                            {Object.keys(element.permissions[group]).map((item, itemKey) =>
                            <td className={item + '-item'} key={itemKey}>
                                <input ref={group + '-' + item} type="checkbox" id={group + '-' + item} value={group + '-' + item} name={group + 'Permissions'} defaultChecked={element.permissions[group][item]} />
                            </td>
                            )}
                        </tr>
                        )}
                    </table>
                </div>
                <button onClick={this.props.closeModal} className="half danger">Cancel</button>
                <button id="submit" onClick={this.handleGraphPermissions} className="half">Change</button>
            </div>
        } else if(model == 'addNode') {
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
                <button id="submit" data-type={specs.type} onClick={this.handleNewNode} className="half">Add</button>
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
                <button id="submit" onClick={this.handleExistingNode} className="half">Change</button>
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
                <button id="submit" onClick={this.handleNodeProperties} className="half">Change</button>
            </div>
        } else if(model == 'changeNodePermissions') {
            //changeNodePermissions
            let element;
            this.props.nodes.forEach(function(item) {
                if(item.id == specs.id) {
                    element = item;
                }
            });
            component = <div className="modal">
                <div className="label">
                    <span>Change Node Permissions</span>
                </div>
                {this.state.failMessages.length > 0 && <div className="warning">
                    <ul className="fail">
                        {this.state.failMessages.map((failMessage, key) => <li key={key}>{failMessage}</li>)}
                    </ul>
                </div>}
                <div className="information">
                    <b>M:</b> Manage
                    &nbsp;&nbsp;
                    <b>W:</b> Write
                    <br />
                    <b>S:</b> Subscribe
                    &nbsp;&nbsp;
                    <b>R:</b> Read
                </div>
                <div ref="options" className="content">
                    <table>
                        <tr>
                            <th></th>
                            <th>M</th>
                            <th>W</th>
                            <th>S</th>
                            <th>R</th>
                        </tr>
                        {Object.keys(element.permissions).map((group, groupKey) =>
                        <tr className={group + '-group'} key={groupKey}>
                            <td>
                                <b>{group.charAt(0).toUpperCase() + group.substr(1)}</b>
                            </td>
                            {Object.keys(element.permissions[group]).map((item, itemKey) =>
                            <td className={item + '-item'} key={itemKey}>
                                <input ref={group + '-' + item} type="checkbox" id={group + '-' + item} value={group + '-' + item} name={group + 'Permissions'} defaultChecked={element.permissions[group][item]} />
                            </td>
                            )}
                        </tr>
                        )}
                    </table>
                </div>
                <button onClick={this.props.closeModal} className="half danger">Cancel</button>
                <button id="submit" onClick={this.handleNodePermissions} className="half">Change</button>
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
                        <select ref="from">
                            <option value="">Select Tail...</option>
                            {this.props.nodes.map((node, key) =>
                                <option key={key} value={node.id}>{node.label}</option>
                            )}
                        </select>
                    </div>
                    <div ref="heads" className="heads">
                        {this.state.heads.map((item, headKey) =>
                        <div className="dropdown" key={headKey}>
                            <select ref={headKey == 0 ? 'to' : ''} value={item} onChange={() => this.handleChangingHead(headKey, event)}>
                                {this.props.nodes.map((node, key) =>
                                    <option key={key} value={node.id}>{node.label}</option>
                                )}
                            </select>
                        </div>
                        )}
                        {this.props.nodes.filter(
                            (item) => !(this.state.heads.includes(item.id))
                        ).length > 0 &&
                        <div className="dropdown">
                            <select ref={this.state.heads.length == 0 ? 'to' : ''} defaultValue="" onChange={this.handleAddingMoreHead}>
                                <option value="">{this.state.heads.length == 0 ? 'Select Head...' : 'Select Another Head...'}</option>
                                {this.props.nodes.filter(
                                    (item) => !(this.state.heads.includes(item.id))
                                ).map((node, key) =>
                                    <option key={key} value={node.id}>{node.label}</option>
                                )}
                            </select>
                        </div>
                        }
                    </div>
                </div>
                <button onClick={this.props.closeModal} className="half danger">Cancel</button>
                <button id="submit" data-type={specs.type} onClick={this.handleNewEdge} className="half">Add</button>
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
                            {edgeTypes.map((type, key) =>
                                <option key={key} value={type}>{type.charAt(0).toUpperCase() + type.substr(1)}</option>
                            )}
                        </select>
                    </div>
                    <input ref="label" type="text" defaultValue={element.label} placeholder="Label" />
                    <div className="dropdown">
                        <select ref="from" defaultValue={element.from}>
                            {this.props.nodes.map((node, key) =>
                                <option key={key} value={node.id}>{node.label}</option>
                            )}
                        </select>
                    </div>
                    <div ref="heads" className="heads">
                        {this.state.heads.map((item, headKey) =>
                        <div className="dropdown" key={headKey}>
                            <select ref={headKey == 0 ? 'to' : ''} value={item} onChange={() => this.handleChangingHead(headKey, event)}>
                                {this.props.nodes.map((node, key) =>
                                    <option key={key} value={node.id}>{node.label}</option>
                                )}
                            </select>
                        </div>
                        )}
                        {this.props.nodes.filter(
                            (item) => !(this.state.heads.includes(item.id))
                        ).length > 0 &&
                        <div className="dropdown">
                            <select ref={this.state.heads.length == 0 ? 'to' : ''} defaultValue="" onChange={this.handleAddingMoreHead}>
                                <option value="">{this.state.heads.length == 0 ? 'Select Head...' : 'Select Another Head...'}</option>
                                {this.props.nodes.filter(
                                    (item) => !(this.state.heads.includes(item.id))
                                ).map((node, key) =>
                                    <option key={key} value={node.id}>{node.label}</option>
                                )}
                            </select>
                        </div>
                        }
                    </div>
                    {/*
                    <div className="dropdown">
                        <select ref="from" defaultValue={element.from}>
                            {this.props.nodes.map((node, key) =>
                                <option key={key} value={node.id}>{node.label}</option>
                            )}
                        </select>
                    </div>
                    <div className="dropdown">
                        <select ref="to" defaultValue={element.to}>
                            {this.props.nodes.map((node, key) =>
                                <option key={key} value={node.id}>{node.label}</option>
                            )}
                        </select>
                    </div>
                    */}
                </div>
                <button onClick={this.props.closeModal} className="half danger">Cancel</button>
                <button id="submit" onClick={this.handleExistingEdge} className="half">Change</button>
            </div>
        } else if(model == 'drawEdge') {
            //drawEdge
            let edgeTypes = ['read', 'write', 'subscribe', 'notify', 'mention'];
            if(this.state.heads.length == 0) {
                this.setState({
                    heads: [specs.to]
                });
            }
            component = <div className="modal">
                <div className="label">
                    <img src={'lib/images/icons/edge.svg'} />
                    <span>Add Edge</span>
                </div>
                {this.state.failMessages.length > 0 && <div className="warning">
                    <ul className="fail">
                        {this.state.failMessages.map((failMessage, key) => <li key={key}>{failMessage}</li>)}
                    </ul>
                </div>}
                <div ref="options" className="content">
                    <div className="dropdown">
                        <select ref="type" defaultValue="">
                            <option value="">Select Edge Type...</option>
                            {edgeTypes.map((type, key) =>
                                <option key={key} value={type}>{type.charAt(0).toUpperCase() + type.substr(1)}</option>
                            )}
                        </select>
                    </div>
                    <input ref="label" type="text" placeholder="Label" />
                    <div className="dropdown">
                        <select ref="from" defaultValue={specs.from}>
                            {this.props.nodes.map((node, key) =>
                                <option key={key} value={node.id}>{node.label}</option>
                            )}
                        </select>
                    </div>
                    <div ref="heads" className="heads">
                        {this.state.heads.map((item, headKey) =>
                        <div className="dropdown" key={headKey}>
                            <select ref={headKey == 0 ? 'to' : ''} value={item} onChange={() => this.handleChangingHead(headKey, event)}>
                                {this.props.nodes.map((node, key) =>
                                    <option key={key} value={node.id}>{node.label}</option>
                                )}
                            </select>
                        </div>
                        )}
                        {this.props.nodes.filter(
                            (item) => !(this.state.heads.includes(item.id))
                        ).length > 0 &&
                        <div className="dropdown">
                            <select ref={this.state.heads.length == 0 ? 'to' : ''} defaultValue="" onChange={this.handleAddingMoreHead}>
                                <option value="">{this.state.heads.length == 0 ? 'Select Head...' : 'Select Another Head...'}</option>
                                {this.props.nodes.filter(
                                    (item) => !(this.state.heads.includes(item.id))
                                ).map((node, key) =>
                                    <option key={key} value={node.id}>{node.label}</option>
                                )}
                            </select>
                        </div>
                        }
                    </div>
                </div>
                <button onClick={this.props.closeModal} className="half danger">Cancel</button>
                <button id="submit" onClick={this.handleDrawnEdge} className="half">Add</button>
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
                    <div className={'labeled dropdown wrapper' + (element.type == 'write' ? '' : ' hidden')}>
                        <b>formative</b>
                        <select ref="formative" defaultValue={element.properties.formative}>
                            {[true, false].map((option, key) =>
                                <option key={key} value={option}>{option.toString()}</option>
                            )}
                        </select>
                    </div>
                </div>
                <button onClick={this.props.closeModal} className="half danger">Cancel</button>
                <button id="submit" onClick={this.handleEdgeProperties} className="half">Change</button>
            </div>
        } else if(model == 'addAttribute') {
            //addAttribute
            let pageLimit = 3;
            let attributeTypes = ['string', 'int', 'float', 'date'];
            let attributeTypeOptions = [];
            attributeTypes.forEach(function(item) {
                attributeTypeOptions.push({
                    value: item,
                    label: item.charAt(0).toUpperCase() + item.substr(1)
                });
            });
            this.props.nodes.forEach(function(item) {
                attributeTypeOptions.push({
                    value: item.id,
                    label: item.label
                });
            });
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
                    <input ref="name" className={page == 1 ? '' : 'hidden'} type="text" placeholder="Name of the attribute" />
                    <div className={'labeled dropdown wrapper' + (page == 1 ? '' : ' hidden')}>
                        <b>Type</b>
                        <select ref="type" defaultValue="string" onChange={this.setAttributeType}>
                            {attributeTypeOptions.map((type, key) =>
                                <option key={key} value={type.value}>{type.label}</option>
                            )}
                        </select>
                    </div>
                    <div className={page == 1 ? '' : 'hidden'}>
                        <input ref="required" type="checkbox" id="required" value="required" name="attributeRequirement" />
                        <label for="required">This attribute is required</label>
                    </div>
                    <b className={page == 2 ? '' : ' hidden'}>Mutations (Optional)</b>
                    <div className={'checklist' + (page == 2 ? '' : ' hidden')}>
                        <div>
                            <input ref="unique" type="checkbox" id="unique" value="unique" name="mutationDirectives" />
                            <label for="unique">Value must be unique</label>
                        </div>
                        <div>
                            <input ref="sha1" type="checkbox" id="sha1" value="sha1" name="mutationDirectives" />
                            <label for="sha1">Encrypt value with sha1</label>
                        </div>
                        <div>
                            <input ref="md5" type="checkbox" id="md5" value="md5" name="mutationDirectives" />
                            <label for="md5">Encrypt value with md5</label>
                        </div>
                        <div>
                            <input ref="now" type="checkbox" id="now" value="now" name="mutationDirectives" />
                            <label for="now">Set value as the current time</label>
                        </div>
                        <div>
                            <input ref="index" type="checkbox" id="index" value="index" name="mutationDirectives" />
                            <label for="index">Index value for faster queries</label>
                        </div>
                        <div>
                            <input ref="default" onChange={this.togglePropertyDefault} type="checkbox" id="default" value="default" name="mutationDirectives" />
                            <label for="default">Add default value to property</label>
                        </div>
                        <input ref="defaultValue" className="hidden" type="text" placeholder="Enter default value" />
                    </div>
                    <b className={page == 3 ? '' : ' hidden'}>Constraints (Optional)</b>
                    <input ref="minLength" className={page == 3 && attributeType == 'string' ? '' : ' hidden'} type="number" placeholder="Minimum character length" />
                    <input ref="maxLength" className={page == 3 && attributeType == 'string' ? '' : ' hidden'} type="number" placeholder="Maximum character length" />
                    <input ref="RegEx" className={page == 3 && attributeType == 'string' ? '' : ' hidden'} type="text" placeholder="RegEx (without delimiters)" />
                    <div className={'labeled dropdown wrapper' + (page == 3 && attributeType == 'string' ? '' : ' hidden')}>
                        <b>Pho ID</b>
                        <select ref="phoId">
                            <option value="">Select...</option>
                            {['true', 'false'].map((option, key) =>
                                <option key={key} value={option}>{option}</option>
                            )}
                        </select>
                    </div>
                    <div className={'labeled dropdown wrapper' + (page == 3 && attributeType == 'string' ? '' : ' hidden')}>
                        <b>Format</b>
                        <select ref="format">
                            <option value="">Select...</option>
                            {['ip', 'email', 'url', 'creditCard', 'alpha', 'alphaNum'].map((format, key) =>
                                <option key={key} value={format}>{format}</option>
                            )}
                        </select>
                    </div>
                    <input ref="dateAfter" className={page == 3 && attributeType == 'date' ? '' : ' hidden'} type="text" placeholder="The date must be after..." />
                    <input ref="dateBefore" className={page == 3 && attributeType == 'date' ? '' : ' hidden'} type="text" placeholder="The date must be before..." />
                    <small className={page == 3 && attributeType == 'date' ? '' : ' hidden'}>Date format: MM/DD/YYYY</small>
                    <input ref="greaterThan" className={page == 3 && (attributeType == 'int' || attributeType == 'float') ? '' : ' hidden'} type="number" placeholder="Value must be greater than..." />
                    <input ref="lessThan" className={page == 3 && (attributeType == 'int' || attributeType == 'float') ? '' : ' hidden'} type="number" placeholder="Value must be less than..." />
                </div>
                <button onClick={this.props.closeModal} className={'half danger' + (page == 1 ? '' : ' hidden')}>Cancel</button>
                <button id={'submit' + (page == 1 ? '' : '-hidden')} onClick={this.handleNewAttribute} className={'half' + (page == 1 ? '' : ' hidden') + (attributeTypes.includes(attributeType) ? ' arrow' : '')}>{attributeTypes.includes(attributeType) ? 'Next' : 'Add'}</button>
                <button id={'submit' + (page == 1 ? '-hidden' : '')} onClick={this.handleNewAttribute} className={(page == pageLimit ? '': 'arrow') + (page == 1 ? ' hidden' : '')}>{page == pageLimit ? 'Add': 'Next'}</button>
            </div>
        } else if(model == 'changeAttribute') {
            //changeAttribute
            let specs = this.props.data.specs;
            let element;
            if(specs.category == 'graph') {
                element = this.props.main;
            } else {
                this.props[specs.category + 's'].forEach(function(item) {
                    if(item.id == specs.id) {
                        element = item;
                    }
                });
            }
            let attribute;
            element.attributes.forEach(function(item) {
                if(item.id == specs.index) {
                    attribute = item;
                }
            });
            let pageLimit = 3;
            let attributeTypes = ['string', 'int', 'float', 'date'];
            let attributeTypeOptions = [];
            attributeTypes.forEach(function(item) {
                attributeTypeOptions.push({
                    value: item,
                    label: item.charAt(0).toUpperCase() + item.substr(1)
                });
            });
            this.props.nodes.forEach(function(item) {
                attributeTypeOptions.push({
                    value: item.id,
                    label: item.label
                });
            });
            component = <div className="modal">
                <div className="label">
                    <span>Change Attribute</span>
                </div>
                {this.state.failMessages.length > 0 && <div className="warning">
                    <ul className="fail">
                        {this.state.failMessages.map((failMessage, key) => <li key={key}>{failMessage}</li>)}
                    </ul>
                </div>}
                <div ref="options" className="content">
                    <input ref="name" className={page == 1 ? '' : 'hidden'} defaultValue={attribute.name} type="text" placeholder="Name of the attribute" />
                    <div className={'labeled dropdown wrapper' + (page == 1 ? '' : ' hidden')}>
                        <b>Type</b>
                        <select ref="type" defaultValue={attribute.type} onChange={this.setAttributeType}>
                            {attributeTypeOptions.map((type, key) =>
                                <option key={key} value={type.value}>{type.label}</option>
                            )}
                        </select>
                    </div>
                    <div className={page == 1 ? '' : 'hidden'}>
                        <input ref="required" type="checkbox" id="required" value="required" name="attributeRequirement" defaultChecked={attribute.required} />
                        <label for="required">This attribute is required</label>
                    </div>
                    <b className={page == 2 ? '' : ' hidden'}>Mutations (Optional)</b>
                    <div className={'checklist' + (page == 2 ? '' : ' hidden')}>
                        <div>
                            <input ref="unique" type="checkbox" id="unique" value="unique" name="mutationDirectives" defaultChecked={attribute.mutations.unique} />
                            <label for="unique">Value must be unique</label>
                        </div>
                        <div>
                            <input ref="sha1" type="checkbox" id="sha1" value="sha1" name="mutationDirectives" defaultChecked={attribute.mutations.sha1} />
                            <label for="sha1">Encrypt value with sha1</label>
                        </div>
                        <div>
                            <input ref="md5" type="checkbox" id="md5" value="md5" name="mutationDirectives" defaultChecked={attribute.mutations.md5} />
                            <label for="md5">Encrypt value with md5</label>
                        </div>
                        <div>
                            <input ref="now" type="checkbox" id="now" value="now" name="mutationDirectives" defaultChecked={attribute.mutations.now} />
                            <label for="now">Set value as the current time</label>
                        </div>
                        <div>
                            <input ref="index" type="checkbox" id="index" value="index" name="mutationDirectives" defaultChecked={attribute.mutations.index} />
                            <label for="index">Index value for faster queries</label>
                        </div>
                        <div>
                            <input ref="default" onChange={this.togglePropertyDefault} type="checkbox" id="default" value="default" name="mutationDirectives" defaultChecked={attribute.mutations.default != false && attribute.mutations.default != undefined} />
                            <label for="default">Add default value to property</label>
                        </div>
                        <input ref="defaultValue" defaultValue={attribute.mutations.default} className={attribute.mutations.default != false && attribute.mutations.default != undefined ? '' : 'hidden'} type="text" placeholder="Enter default value" />
                    </div>
                    <b className={page == 3 ? '' : ' hidden'}>Constraints (Optional)</b>
                    <input ref="minLength" defaultValue={attribute.constraints.minLength} className={page == 3 && attributeType == 'string' ? '' : ' hidden'} type="number" placeholder="Minimum character length" />
                    <input ref="maxLength" defaultValue={attribute.constraints.maxLength} className={page == 3 && attributeType == 'string' ? '' : ' hidden'} type="number" placeholder="Maximum character length" />
                    <input ref="RegEx" defaultValue={attribute.constraints.RegEx} className={page == 3 && attributeType == 'string' ? '' : ' hidden'} type="text" placeholder="RegEx (without delimiters)" />
                    <div className={'labeled dropdown wrapper' + (page == 3 && attributeType == 'string' ? '' : ' hidden')}>
                        <b>Pho ID</b>
                        <select defaultValue={attribute.constraints.phoId} ref="phoId">
                            <option value="">Select...</option>
                            {['true', 'false'].map((option, key) =>
                                <option key={key} value={option}>{option}</option>
                            )}
                        </select>
                    </div>
                    <div className={'labeled dropdown wrapper' + (page == 3 && attributeType == 'string' ? '' : ' hidden')}>
                        <b>Format</b>
                        <select defaultValue={attribute.constraints.format} ref="format">
                            <option value="">Select...</option>
                            {['ip', 'email', 'url', 'creditCard', 'alpha', 'alphaNum'].map((format, key) =>
                                <option key={key} value={format}>{format}</option>
                            )}
                        </select>
                    </div>
                    <input ref="dateAfter" defaultValue={attribute.constraints.dateAfter} className={page == 3 && attributeType == 'date' ? '' : ' hidden'} type="text" placeholder="The date must be after..." />
                    <input ref="dateBefore" defaultValue={attribute.constraints.dateBefore} className={page == 3 && attributeType == 'date' ? '' : ' hidden'} type="text" placeholder="The date must be before..." />
                    <small className={page == 3 && attributeType == 'date' ? '' : ' hidden'}>Date format: MM/DD/YYYY</small>
                    <input ref="greaterThan" defaultValue={attribute.constraints.greaterThan} className={page == 3 && (attributeType == 'int' || attributeType == 'float') ? '' : ' hidden'} type="number" placeholder="Value must be greater than..." />
                    <input ref="lessThan" defaultValue={attribute.constraints.lessThan} className={page == 3 && (attributeType == 'int' || attributeType == 'float') ? '' : ' hidden'} type="number" placeholder="Value must be less than..." />
                </div>
                <button onClick={this.props.closeModal} className={'half danger' + (page == 1 ? '' : ' hidden')}>Cancel</button>
                <button id={'submit' + (page == 1 ? '' : '-hidden')} onClick={this.handleExistingAttribute} className={'half' + (page == 1 ? '' : ' hidden') + (attributeTypes.includes(attributeType) ? ' arrow' : '')}>{attributeTypes.includes(attributeType) ? 'Next' : 'Change'}</button>
                <button id={'submit' + (page == 1 ? '-hidden' : '')} onClick={this.handleExistingAttribute} className={(page == pageLimit ? '': 'arrow') + (page == 1 ? ' hidden' : '')}>{page == pageLimit ? 'Change': 'Next'}</button>
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