import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/components/modal.less';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            failMessages: []
        };
        this.handleNewNode = this.handleNewNode.bind(this);
        this.checkLabelMinimumLength = this.checkLabelMinimumLength.bind(this);
        //this.checkLabelMaximumLength = this.checkLabelMaximumLength.bind(this);
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
    handleNewNode(event) {
        if(this.checkLabelMinimumLength()) {
            let type = event.target.dataset.type;
            let label = this.refs.label.value;
            this.props.addNode(type, label);
        }
    }
    render() {
        let model = this.props.data.model;
        let specs = this.props.data.specs;
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
                <button data-type={specs.type} onClick={this.handleNewNode} className="half">Add</button>
                <button onClick={this.props.closeModal} className="half danger">Cancel</button>
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
                    Not ready yet.
                </div>
                {/* <button data-type={specs.type} onClick={this.handleNewNode} className="half">Add</button> */}
                <button onClick={this.props.closeModal} className="danger">Cancel</button>
            </div>
        }
        return(
            <div className={'overlay' + (this.props.data ? ' open' : '')}>
                <div>{this.props.data && component}</div>
            </div>
        )
    }
}