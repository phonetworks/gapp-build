import React from 'react';

export default class Tools extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <ul className="tools">
                {this.props.list.map((item, key) =>
                <li key={key} className={item + ' ' + this.props.type} onClick={() => {this.props.callback(this.props.type, item)}}>
                    <img src={'lib/images/icons/' + (this.props.type == 'node' ? item + '-' : '') + this.props.type + '.svg'} />
                    {item.charAt(0).toUpperCase() + item.substr(1)}
                </li>
                )}
            </ul>
        )
    }
}