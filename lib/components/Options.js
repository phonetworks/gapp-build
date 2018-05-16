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
            //Set element
            let element;
            this.props.data[scope.category + 's'].forEach(function(item) {
                if(item.id == scope.id) {
                    element = item;
                }
            });
            //Set edge & tail
            let head;
            let tail;
            if(scope.category == 'edge') {
                this.props.data.nodes.forEach(function(item) {
                    if(item.id == element.to) {
                        head = item;
                    }
                    if(item.id == element.from) {
                        tail = item;
                    }
                });
            }
            //Set color
            let color;
            if(scope.category == 'edge') {
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
            //Set lists
            let essentialList = [
                {
                    label: 'Type',
                    value: element.type.charAt(0).toUpperCase() + element.type.substr(1),
                    func: 'changeItem',
                    args: [scope.category, scope.id, element.type],
                    color: color
                },
                {
                    label: 'Label',
                    value: element.label.charAt(0).toUpperCase() + element.label.substr(1),
                    func: 'changeItem',
                    args: [scope.category, scope.id, element.label],
                    color: color
                },
                ... scope.category == 'edge' ? [
                    {
                        label: 'Head',
                        value: head.label,
                        func: 'changeItem',
                        args: [scope.category, scope.id, head.label],
                        color: color
                    },
                    {
                        label: 'Tail',
                        value: tail.label,
                        func: 'changeItem',
                        args: [scope.category, scope.id, tail.label],
                        color: color
                    }
                ] : []
            ];
            let propertyList = scope.category == 'node' ? [
                {
                    label: 'expires',
                    value: element.properties.expires,
                    func: 'changeProperties',
                    args: [scope.category, scope.id, element.properties.expires],
                    color: color
                },
                {
                    label: 'editable',
                    value: element.properties.editable,
                    func: 'changeProperties',
                    args: [scope.category, scope.id, element.properties.editable],
                    color: color
                },
                {
                    label: 'volatile',
                    value: element.properties.volatile,
                    func: 'changeProperties',
                    args: [scope.category, scope.id, element.properties.volatile],
                    color: color
                },
                {
                    label: 'revisionable',
                    value: element.properties.revisionable,
                    func: 'changeProperties',
                    args: [scope.category, scope.id, element.properties.revisionable],
                    color: color
                }
            ] : [
                {
                    label: 'binding',
                    value: element.properties.binding,
                    func: 'changeProperties',
                    args: [scope.category, scope.id, element.properties.binding],
                    color: color
                },
                {
                    label: 'multiplicable',
                    value: element.properties.multiplicable,
                    func: 'changeProperties',
                    args: [scope.category, scope.id, element.properties.multiplicable],
                    color: color
                },
                {
                    label: 'persistent',
                    value: element.properties.persistent,
                    func: 'changeProperties',
                    args: [scope.category, scope.id, element.properties.persistent],
                    color: color
                },
                {
                    label: 'consumer',
                    value: element.properties.consumer,
                    func: 'changeProperties',
                    args: [scope.category, scope.id, element.properties.consumer],
                    color: color
                },
                {
                    label: 'notifier',
                    value: element.properties.notifier,
                    func: 'changeProperties',
                    args: [scope.category, scope.id, element.properties.notifier],
                    color: color
                },
                {
                    label: 'subscriber',
                    value: element.properties.subscriber,
                    func: 'changeProperties',
                    args: [scope.category, scope.id, element.properties.subscriber],
                    color: color
                },
                {
                    label: 'formative',
                    value: element.properties.formative,
                    func: 'changeProperties',
                    args: [scope.category, scope.id, element.properties.formative],
                    color: color
                }
            ];
            let attributeList = [];
            return(
                <aside id="options">
                    {essentialList.length > 0 && <Block label={'Active ' + scope.category.charAt(0).toUpperCase() + scope.category.substr(1)}>
                        <Settings callback={this.props.changeOptions} list={essentialList} />
                    </Block>}
                    {propertyList.length > 0 && <Block label="Properties">
                        <Settings callback={this.props.changeOptions} list={propertyList} />
                    </Block>}
                    {attributeList.length > 0 && <Block label="Attributes">
                        <Settings callback={this.props.changeOptions} list={attributeList} />
                    </Block>}
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