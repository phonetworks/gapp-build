import React from 'react';

import Switch from './Switch.js';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleBrand = this.handleBrand.bind(this);
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
    handleToggle(event) {
        event.target.id == 'toggle'
        ? this.setState({
            open: !this.state.open
        })
        : this.setState({
            open: false
        });
    }
    handleBrand() {
        return !window.location.href.includes('nobrand');
    }
    render() {
        let brand = this.handleBrand();
        return(
            <nav id="navigation" className={(brand ? 'branded' : 'no-brand') + (this.state.open ? ' open' : '')}>
                <div className="container">
                    {/*
                    <Switch items={[
                        {
                            id: 'gapp.build',
                            target: 'http://gapp.build'
                        },
                        {
                            id: 'graphjs',
                            target: 'http://graphjs.com'
                        }
                    ]} />
                    */}
                    <Switch items={[
                        {
                            id: 'gapp.build',
                            target: 'http://gapp.build'
                        }
                    ]} />
                    <div id="menu">
                        <button id="delete" onClick={this.props.delete}>
                            <svg viewBox="7 8 88 87" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <path d="M18.5,31.6h5.1V75.2a12,12,0,0,0,12,12H64.4a12,12,0,0,0,12-12V31.6h5.1a4,4,0,0,0,0-8H63.7V20.8a8,8,0,0,0-8-8H44.3a8,8,0,0,0-8,8v2.8H18.5a4,4,0,0,0,0,8ZM68.4,75.2a4,4,0,0,1-4,4H35.6a4,4,0,0,1-4-4V31.6H68.4Zm-24-54.5H55.7v2.8H44.3Z"/>
                                <path data-name="Path" d="M57.5,74a4,4,0,0,0,4-4V40.1a4,4,0,0,0-8,0V70A4,4,0,0,0,57.5,74Z"/>
                                <path data-name="Path" d="M42.5,74a4,4,0,0,0,4-4V40.1a4,4,0,0,0-8,0V70A4,4,0,0,0,42.5,74Z"/>
                            </svg>
                        </button>
                        <button id="save" onClick={this.props.save}>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 100 112.5" xmlSpace="preserve">
                                <path d="M78,79.074H22.001c-1.657,0-3-1.344-3-3V38.797c0-1.657,1.343-3,3-3h12.5c1.657,0,3,1.343,3,3s-1.343,3-3,3h-9.5v31.277H75  V41.797h-9.499c-1.657,0-3-1.343-3-3s1.343-3,3-3H78c1.657,0,3,1.343,3,3v37.277C81,77.73,79.657,79.074,78,79.074z"/><path d="M62.244,56.257l-10.12,10.12c-0.14,0.141-0.3,0.27-0.47,0.38c-0.15,0.101-0.311,0.19-0.48,0.261  c-0.109,0.049-0.21,0.079-0.32,0.109c-0.09,0.029-0.189,0.061-0.279,0.07c-0.03,0.01-0.061,0.02-0.1,0.02  c-0.15,0.03-0.31,0.04-0.47,0.04c-0.15,0-0.3-0.01-0.45-0.04c-0.04,0-0.08-0.01-0.12-0.02c-0.09-0.01-0.17-0.03-0.26-0.061  c-0.21-0.061-0.41-0.14-0.6-0.24c-0.16-0.09-0.32-0.199-0.46-0.32c-0.08-0.059-0.16-0.129-0.23-0.199l-10.12-10.12  c-1.17-1.17-1.17-3.069,0-4.239c1.17-1.171,3.07-1.171,4.24,0l5,4.989v-33.08c0-1.65,1.34-3,3-3c1.65,0,3,1.35,3,3v33.08l4.99-4.989  c1.17-1.171,3.08-1.171,4.25,0C63.414,53.188,63.414,55.087,62.244,56.257z" />
                            </svg>
                            <span>Save</span>
                        </button>
                    </div>
                    <button id="toggle" onClick={this.handleClick}>
                        <svg className="open" fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="106.925 6.163 41.27 32.386" xmlSpace="preserve">
                            <path d="M145.248,6.163h-35.375c-1.628,0-2.948,1.319-2.948,2.948c0,1.628,1.32,2.947,2.948,2.947h35.375 c1.628,0,2.947-1.319,2.947-2.947C148.195,7.483,146.875,6.163,145.248,6.163z"/>
                            <path d="M145.248,19.408h-35.375c-1.628,0-2.948,1.319-2.948,2.948c0,1.628,1.32,2.947,2.948,2.947h35.375 c1.628,0,2.947-1.319,2.947-2.947C148.195,20.728,146.875,19.408,145.248,19.408z"/>
                            <path d="M148.195,35.601c0-1.628-1.319-2.947-2.947-2.947h-35.375c-1.628,0-2.948,1.319-2.948,2.947 c0,1.629,1.32,2.948,2.948,2.948h35.375C146.875,38.549,148.195,37.23,148.195,35.601z"/>
                        </svg>
                        <svg className="close" fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 595.28 467.72" xmlSpace="preserve">
                            <path d="M498.265,374.175L357.953,233.863L498.275,93.541L518.316,73.5c16.605-16.604,16.604-43.51,0-60.115 s-43.531-16.604-60.125-0.011L438.15,33.415L297.828,173.738L157.504,33.415l-20.041-20.041c-16.604-16.605-43.51-16.604-60.115,0 s-16.604,43.531-0.011,60.125L97.379,93.54l140.323,140.323L97.39,374.175l-20.04,20.041c-16.605,16.605-16.616,43.521-0.001,60.137 c16.604,16.604,43.521,16.594,60.126-0.012l20.041-20.039l140.312-140.312L438.14,434.3l20.041,20.041 c16.604,16.605,43.521,16.615,60.136,0c16.604-16.604,16.595-43.52-0.011-60.125L498.265,374.175z"/>
                        </svg>
                    </button>
                </div>
            </nav>
        )
    }
}
