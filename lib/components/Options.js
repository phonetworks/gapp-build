import React from 'react';

import Block from './Block.js';
import Settings from './Settings';

export default class Options extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let scope = this.props.scope;
        if(scope) {
            let element;
            this.props.data[scope.type + 's'].forEach(function(item) {
                if(item.id == scope.id) {
                    element = item;
                }
            });
            let color;
            if(scope.type == 'edge') {
                color = 'rgb(0, 182, 105)';
            } else {
                if(element.type == 'actor') {
                    color = 'rgb(255, 164, 0)';
                } else if(element.type == 'object') {
                    color = 'rgb(218, 0, 98)';
                } else if(element.type == 'graph') {
                    color = 'rgb(93, 60, 246)';
                } else {
                    color = 'rgb(0, 127, 255)';
                }
            }
            console.log(element)
            return(
                <aside id="options">
                    <Block label={'Active ' + scope.type.charAt(0).toUpperCase() + scope.type.substr(1)}>
                        <Settings list={[
                            {label: 'Type', value: element.type.charAt(0).toUpperCase() + element.type.substr(1), color: color},
                            {label: 'Label', value: element.label.charAt(0).toUpperCase() + element.label.substr(1), color: color}
                        ]} />
                    </Block>
                    <Block label="Properties">

                    </Block>
                    <Block label="Attributes">

                    </Block>
                </aside>
            )
        } else {
            return(
                <aside id="options">
                    <Block label="No Active Item" />
                </aside>
            )
        }
    }
}