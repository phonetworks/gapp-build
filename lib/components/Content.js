import React from 'react';

export default class Content extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <main id="content" className={this.props.option ? 'optioned' : ''}>
                {this.props.children}
            </main>
        )
    }
}