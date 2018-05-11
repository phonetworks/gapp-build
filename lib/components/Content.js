import React from 'react';

export default class Content extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <main className={'content' + (this.props.option ? ' optioned' : '')}>
                {this.props.children}
            </main>
        )
    }
}