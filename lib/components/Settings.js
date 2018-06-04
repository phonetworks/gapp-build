import React from 'react';

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <ul className="settings">
                {this.props.list.map((item, key) =>
                <li key={key}>
                    <b className="identifier">{item.label}</b>
                    {item.value.toString()}
                </li>
                )}
            </ul>
        )
    }
}