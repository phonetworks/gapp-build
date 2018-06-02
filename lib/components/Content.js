import React from 'react';

export default class Content extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <main id="content">
                {this.props.children}
            </main>
        )
    }
}