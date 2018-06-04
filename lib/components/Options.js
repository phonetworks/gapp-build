import React from 'react';

import Block from './Block.js';
import Settings from './Settings';
import Attributes from './Attributes';

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
                    value: element.type.charAt(0).toUpperCase() + element.type.substr(1)
                },
                {
                    label: 'Label',
                    value: element.label.charAt(0).toUpperCase() + element.label.substr(1)
                },
                ... scope.category == 'edge' ? [
                    {
                        label: 'Head',
                        value: head.label
                    },
                    {
                        label: 'Tail',
                        value: tail.label
                    }
                ] : []
            ];
            let propertyList = scope.category == 'node' ? [
                {
                    label: 'expires',
                    value: element.properties.expires
                },
                {
                    label: 'editable',
                    value: element.properties.editable
                },
                {
                    label: 'volatile',
                    value: element.properties.volatile
                },
                {
                    label: 'revisionable',
                    value: element.properties.revisionable
                }
            ] : [
                {
                    label: 'binding',
                    value: element.properties.binding
                },
                {
                    label: 'multiplicable',
                    value: element.properties.multiplicable
                },
                {
                    label: 'persistent',
                    value: element.properties.persistent
                },
                {
                    label: 'consumer',
                    value: element.properties.consumer
                },
                /*
                {
                    label: 'notifier',
                    value: element.properties.notifier
                },
                {
                    label: 'subscriber',
                    value: element.properties.subscriber
                },
                */
                {
                    label: 'formative',
                    value: element.properties.formative
                }
            ];
            let permissionList = scope.category == 'node' ? [
                {
                    label: 'manage',
                    value: element.permissions.manage
                },
                {
                    label: 'read',
                    value: element.permissions.read
                },
                {
                    label: 'write',
                    value: element.permissions.write
                },
                {
                    label: 'subscribe',
                    value: element.permissions.subscribe
                }
            ] : [];
            let attributeList = element.attributes;
            return(
                <aside id="options" className={this.props.option ? 'open' : ''}>
                    {essentialList.length > 0 &&
                    <Block label={'Active ' + scope.category.charAt(0).toUpperCase() + scope.category.substr(1)}  action="edit" color={color} callback={() => this.props.changeOptions('changeItem', [scope.category, scope.id])}>
                        <Settings list={essentialList} />
                    </Block>}
                    {propertyList.length > 0 &&
                    <Block label="Properties" action="edit" color={color} callback={() => this.props.changeOptions('changeProperties', [scope.category, scope.id])}>
                        <Settings list={propertyList} />
                    </Block>}
                    {permissionList.length > 0 &&
                    <Block label="Permissions" action="edit" color={color} callback={() => this.props.changeOptions('changePermissions', [scope.category, scope.id])}>
                        <Settings list={permissionList} />
                    </Block>}
                    <Block label="Attributes" action="add" color={color} callback={() => this.props.changeOptions('createAttribute', [scope.category, scope.id])}>
                        <Attributes sortAttributes={this.props.sortAttributes} color={color} callback={this.props.changeOptions} args={[scope.category, scope.id]} list={attributeList} />
                    </Block>
                </aside>
            )
        } else {
            return(
                <aside id="options">
                    <Block label="No Active Item">
                        <p>Select a node/edge to display its properties.</p>
                    </Block>
                </aside>
            )
        }
    }
}