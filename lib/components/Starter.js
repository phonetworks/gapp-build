import React from 'react';

export default class Starter extends React.Component {
    constructor(props) {
        super(props);
        this.handleCallback = this.handleCallback.bind(this);
    }
    handleCallback(type, name) {
        this.props.createItem(type);
    }
    render() {
        return(
            <section className="starter">
                <div>
                    <p>
                        gapp.build is a schema builder for
                        <br />
                        <a href="http://phonetworks.com">Pho Networks</a>.
                    </p>
                    <p>Start building your schema here.</p>
                    <button onClick={() => {this.handleCallback('graph')}}>Start Building</button>
                </div>
            </section>
        )
    }
}