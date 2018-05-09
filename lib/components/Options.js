import React from 'react';
import ReactDOM from 'react-dom';

import Block from './Block.js';

import '../styles/components/options.less';

export default class Options extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <aside id="options">
                <Block label="Active Edge">

                </Block>
                <Block label="Properties">

                </Block>
                <Block label="Attributes">

                </Block>
            </aside>
        )
    }
}