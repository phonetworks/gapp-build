import React from 'react';

import Block from './Block.js';
import Tools from './Tools.js';

export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleCallback = this.handleCallback.bind(this);
    }
    handleCallback(type, name) {
        this.props.createItem(type, name);
    }
    render() {
        return(
            <aside id="toolbar">
                <Block label="Add Nodes">
                    <Tools callback={this.handleCallback} type="node" list={['actor', 'object', 'graph']} />
                </Block>
                <Block label="Add Edges">
                    <Tools callback={this.handleCallback} type="edge" list={['read', 'write', 'subscribe', 'notify', 'mention']} />
                </Block>
            </aside>
        )
    }
}