import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/components/navigation.less';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleToggle() {
        document.body.classList.toggle('push');
        document.getElementById('toolbar').classList.toggle('open');
    }
    render() {
        return(
            <nav className="navigation">
                <a className="add" onClick={this.handleToggle}>
                    <img src="lib/images/icons/add-item.svg" />
                </a>
                <img className="logo" src="lib/images/identity/logo-light.svg" />
            </nav>
        )
    }
}