import React from 'react';

import Block from './Block.js';
import Tools from './Tools.js';

export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleCallback = this.handleCallback.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }
    componentDidMount() {
        document.getElementById('toolbar').classList.add('disabled')
    }
    componentDidUpdate() {
        this.props.ready
        ? document.getElementById('toolbar').classList.remove('disabled')
        : document.getElementById('toolbar').classList.add('disabled')
    }
    handleCallback(type, name) {
        if(type == 'graph') {
            this.props.showGraphOptions();
        } else {
            this.props.createItem(type, name);
        }
        document.body.classList.remove('push');
        document.getElementById('toolbar').classList.remove('open');
    }
    handleToggle() {
        document.body.classList.toggle('push');
        document.getElementById('toolbar').classList.toggle('open');
    }
    render() {
        return(
            <aside id="toolbar">
                {this.props.label &&
                <Block label="Change Graph">
                    <Tools callback={this.handleCallback} type="graph" list={[this.props.label]} />
                </Block>
                }
                <Block label="Add Nodes">
                    <Tools callback={this.handleCallback} type="node" list={['actor', 'object', 'graph']} />
                </Block>
                {this.props.drawable &&
                <Block label="Add Edges" action={this.props.drawable ? [
                    {type: 'draw', drawing: this.props.drawing, callback: () => this.props.toggleDrawingMode()}
                ] : []}>
                    {/*
                    <Tools callback={this.handleCallback} type="edge" list={['read', 'write', 'subscribe', 'notify', 'mention']} />
                    */}
                </Block>
                }
                <a className="add" onClick={this.handleToggle}>
                    <img src="lib/images/icons/add-item.svg" />
                </a>
            </aside>
        )
    }
}