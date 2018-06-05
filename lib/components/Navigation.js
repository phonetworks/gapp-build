import React from 'react';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
    }
    componentDidMount() {
        document.getElementById('save').classList.add('disabled');
        document.getElementById('delete').classList.add('disabled');
    }
    componentDidUpdate() {
        if(this.props.ready) {
            document.getElementById('save').classList.remove('disabled');
            document.getElementById('delete').classList.remove('disabled');
        } else {
            document.getElementById('save').classList.add('disabled');
            document.getElementById('delete').classList.add('disabled');
        }
    }
    handleToggle() {
        document.body.classList.toggle('push');
        document.getElementById('toolbar').classList.toggle('open');
    }
    render() {
        return(
            <nav id="navigation">
                <a className="add" onClick={this.handleToggle}>
                    <img src="lib/images/icons/add-item.svg" />
                </a>
                <img className="logo" src="lib/images/identity/logo-light.svg" />
                <button id="save" onClick={this.props.save}>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 100 112.5" xmlSpace="preserve">
                        <path d="M78,79.074H22.001c-1.657,0-3-1.344-3-3V38.797c0-1.657,1.343-3,3-3h12.5c1.657,0,3,1.343,3,3s-1.343,3-3,3h-9.5v31.277H75  V41.797h-9.499c-1.657,0-3-1.343-3-3s1.343-3,3-3H78c1.657,0,3,1.343,3,3v37.277C81,77.73,79.657,79.074,78,79.074z"/><path d="M62.244,56.257l-10.12,10.12c-0.14,0.141-0.3,0.27-0.47,0.38c-0.15,0.101-0.311,0.19-0.48,0.261  c-0.109,0.049-0.21,0.079-0.32,0.109c-0.09,0.029-0.189,0.061-0.279,0.07c-0.03,0.01-0.061,0.02-0.1,0.02  c-0.15,0.03-0.31,0.04-0.47,0.04c-0.15,0-0.3-0.01-0.45-0.04c-0.04,0-0.08-0.01-0.12-0.02c-0.09-0.01-0.17-0.03-0.26-0.061  c-0.21-0.061-0.41-0.14-0.6-0.24c-0.16-0.09-0.32-0.199-0.46-0.32c-0.08-0.059-0.16-0.129-0.23-0.199l-10.12-10.12  c-1.17-1.17-1.17-3.069,0-4.239c1.17-1.171,3.07-1.171,4.24,0l5,4.989v-33.08c0-1.65,1.34-3,3-3c1.65,0,3,1.35,3,3v33.08l4.99-4.989  c1.17-1.171,3.08-1.171,4.25,0C63.414,53.188,63.414,55.087,62.244,56.257z" />
                    </svg>
                    <span>Save</span>
                </button>
                <button id="delete" onClick={this.props.delete}>
                    <svg viewBox="7 8 88 87" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <path d="M18.5,31.6h5.1V75.2a12,12,0,0,0,12,12H64.4a12,12,0,0,0,12-12V31.6h5.1a4,4,0,0,0,0-8H63.7V20.8a8,8,0,0,0-8-8H44.3a8,8,0,0,0-8,8v2.8H18.5a4,4,0,0,0,0,8ZM68.4,75.2a4,4,0,0,1-4,4H35.6a4,4,0,0,1-4-4V31.6H68.4Zm-24-54.5H55.7v2.8H44.3Z"/>
                        <path data-name="Path" d="M57.5,74a4,4,0,0,0,4-4V40.1a4,4,0,0,0-8,0V70A4,4,0,0,0,57.5,74Z"/>
                        <path data-name="Path" d="M42.5,74a4,4,0,0,0,4-4V40.1a4,4,0,0,0-8,0V70A4,4,0,0,0,42.5,74Z"/>
                    </svg>
                </button>
            </nav>
        )
    }
}
