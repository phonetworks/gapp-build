import React from 'react';

export default class Block extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="block">
                <div className="label">
                    {this.props.label}
                </div>
                {this.props.children}
            </div>
        )
    }
}