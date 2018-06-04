import React from 'react';
import {Tooltip} from 'react-tippy';
import Sortable, {sortable} from 'react-anything-sortable';

import 'react-tippy/dist/tippy.css';

@sortable
class Attribute extends React.Component {
    render() {
        return(
            <div {...this.props}>
                {this.props.children}
            </div>
        );
    }
}

export default class Attributes extends React.Component {
    constructor(props) {
        super(props);
        this.handleSort = this.handleSort.bind(this);
        this.calculateAttribute = this.calculateAttribute.bind(this);
    }
    handleSort(data) {
        this.props.sortAttributes(data)
    }
    calculateAttribute(attribute) {
        let attributeValue = attribute.type.charAt(0).toUpperCase() + attribute.type.substr(1) + (attribute.required ? '!' : '');
        //Calculate constraints
        let constraints = '';
        if(attribute.constraints) {
            for(let [index, constraint] of Object.keys(attribute.constraints).entries()) {
                if(constraint == 'RegEx' || constraint == 'format' || constraint == 'dateAfter' || constraint == 'dateBefore') {
                    constraints += constraint + ': "' + attribute.constraints[constraint] + '"';
                } else {
                    constraints += constraint + ': ' + attribute.constraints[constraint];
                }
                if(index < Object.keys(attribute.constraints).length - 1) {
                    constraints += ', ';
                }
            }
        }
        //Calculate mutations
        let mutations = '';
        if(attribute.mutations) {
            for(let [index, mutation] of Object.keys(attribute.mutations).entries()) {
                if(mutation == 'default') {
                    let valueType = '';
                    let defaultValue = '';
                    if(attribute.type == 'string' || attribute.type == 'date') {
                        valueType = 'String';
                        defaultValue = '"' + attribute.mutations['default'] + '"';
                    } else {
                        valueType = attribute.type.charAt(0).toUpperCase() + attribute.type.substr(1);
                        defaultValue = attribute.mutations['default'];
                    }
                    mutations += '@default(' + valueType + ': ' + defaultValue + ')';
                } else {
                    mutations += '@' + mutation;
                }
                if(index < Object.keys(attribute.mutations).length - 1) {
                    mutations += ' ';
                }
            }
        }
        let element = (
            <div>
                {attributeValue}
                {constraints.length > 0 ? (<br />) : ''}
                {constraints.length > 0 ? '@constraints(' + constraints + ')' : ''}
                {mutations.length > 0 ? (<br />) : ''}
                {mutations.length > 0 ? mutations : ''}
            </div>
        );
        return element;
    }
    render() {
        return(
            <Sortable onSort={this.handleSort} className="attributes vertical-container" direction="vertical" key={(Math.floor(Math.random() * 100)) + 'x' + (Math.floor(Math.random() * 100))}>
                {this.props.list.map((item, key) =>
                <Attribute className="attribute vertical" sortHandle="handle" sortData={item} key={key}>
                    <span className="handle">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 125" xmlSpace="preserve">
                            <path d="M8.7,23.4L23.6,8.5c1.7-1.7,4.3-1.7,6,0l14.9,14.9c2.2,2.2,1.9,6-0.8,7.8c-2,1.3-4.8,0.9-6.5-0.8l-5.6-5.6v62.8  c0,2.8-2.3,5.1-5.1,5.1c-2.8,0-5.1-2.3-5.1-5.1V24.9L16,30.4c-1.7,1.7-4.4,2.1-6.5,0.8C6.8,29.4,6.5,25.6,8.7,23.4z M70.4,91.5  c1.7,1.7,4.3,1.7,6,0l14.9-14.9c2.2-2.2,1.9-6-0.8-7.8c-2-1.3-4.8-0.9-6.5,0.8l-5.6,5.6V12.3c0-2.8-2.3-5.1-5.1-5.1  c-2.8,0-5.1,2.3-5.1,5.1v62.8l-5.6-5.6c-1.7-1.7-4.4-2.1-6.5-0.8c-2.8,1.8-3,5.6-0.8,7.8L70.4,91.5z"/>
                        </svg>
                    </span>
                    <Tooltip className="information" arrow={true} theme="light" html={(
                        <div style={{
                            padding: '1em',
                            color: 'white',
                            textAlign: 'left',
                            backgroundColor: this.props.color
                        }}>
                            {this.calculateAttribute(item)}
                        </div>
                    )}>
                        {item.name}
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 120 150" xmlSpace="preserve">
                            <path d="M60,10c-27.7,0-50,22.3-50,50s22.3,50,50,50s50-22.3,50-50S87.7,10,60,10z M60,97.5c-20.8,0-37.5-16.7-37.5-37.5   S39.2,22.5,60,22.5S97.5,39.2,97.5,60S80.8,97.5,60,97.5z"/>
                            <path d="M60,47.7c3.5,0,6.2-2.7,6.2-6.2s-2.7-6.2-6.2-6.2s-6.2,2.7-6.2,6.2S56.5,47.7,60,47.7z"/>
                            <path d="M68.3,72.5c-1.2,0-2.1-0.8-2.1-1.9V54c0-1.2-1-2.3-2.1-2.3H51.7c-1.2,0-2.1,1.2-2.1,2.3v4.2c0,1.3,1,1.9,2.1,1.9   c1.2,0,2.1,1.2,2.1,2.3v8.3c0,1.3-1,1.9-2.1,1.9c-1.2,0-2.1,1.2-2.1,2.3V79c0,1.3,1,1.9,2.1,1.9h16.7c1.2,0,2.1-0.8,2.1-1.9v-4.2   C70.4,73.5,69.4,72.5,68.3,72.5z"/>
                        </svg>
                    </Tooltip>
                    <a onClick={() => this.props.callback('updateAttribute', [...this.props.args, {index: item.id, type: item.type}])}>
                        <svg viewBox="0 0 11 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <path fill={this.props.color} transform="translate(-112.000000, -8.000000)" d="M121.409639,13.7576975 L123,13.7576975 L123,18.2048193 C123,18.6465863 122.646586,19 122.204819,19 L112.795181,19 C112.353414,19 112,18.6465863 112,18.2048193 L112,8.79518072 C112,8.35341365 112.353414,8 112.795181,8 L117.227577,8 L117.227577,9.57563588 L113.575636,9.57563588 L113.575636,17.4096386 L121.409639,17.4096386 L121.409639,13.7576975 Z M116.573174,12.7243321 C116.603013,12.6339143 116.647773,12.5434965 116.722372,12.4832179 L120.98945,8.15823122 C121.183408,7.94725626 121.526564,7.94725626 121.735442,8.15823122 L122.884271,9.34873278 C123.108069,9.5446381 122.97379,9.7706827 122.764912,9.98165766 L118.497835,14.2915747 C118.453075,14.3669229 118.363556,14.4272015 118.274037,14.4422711 L116.603013,15.0601263 C116.513494,15.075196 116.409055,15.075196 116.319536,15.0601263 C116.036059,14.9847781 115.871941,14.6833853 115.94654,14.3970622 L116.573174,12.7243321 Z"></path>
                        </svg>
                    </a>
                </Attribute>
                )}
            </Sortable>
        )
    }
}