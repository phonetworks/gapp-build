import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/components/content.less';

export default class Content extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <main className="content">
                {this.props.children}
            </main>
        )
    }
}