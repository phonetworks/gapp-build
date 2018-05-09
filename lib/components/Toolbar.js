import React from 'react';
import ReactDOM from 'react-dom';

import Block from './Block.js';
import Tools from './Tools.js';

import '../styles/components/toolbar.less';

export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <aside id="toolbar">
                <Block label="Add Nodes">
                    <Tools type="node" list={['actor', 'object', 'graph']} />
                </Block>
                <Block label="Add Edges">
                    <Tools type="edge" list={['read', 'write', 'subscribe', 'notify', 'mention']} />
                </Block>
            </aside>
        )
    }
}