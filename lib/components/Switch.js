import React from 'react';

export default class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            open: false,
            items: [{
                id: "",
                target: "Nothing to Select"
            }],
            active: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.simulateClick = this.simulateClick.bind(this);
        this.orderItems = this.orderItems.bind(this);
    }
    componentDidMount() {
        this.setState({
            open: false,
            items: this.props.items,
            active: this.props.items[0]['id']
        });
    }
    handleClick(event) {
        if(this.state.open) {
            this.setState({
                active: event.currentTarget.dataset.id,
                items: this.orderItems(this.state.items, event.currentTarget.dataset.id),
                open: !this.state.open
            });
            window.location.href = event.currentTarget.dataset.target;
        } else {
            this.setState({
                open: !this.state.open
            });
        }
    }
    simulateClick(event) {
        //Do nothing
    }
    orderItems(items, key) {
        let first = items.shift();
        items.push(first);
        //let items = array.push(array.shift());
        for (let i = 0; i < items.length; i++) {
            if (items[i]['id'] === key) {
                let item = items.splice(i, 1);
                items.unshift(item[0]);
                return items;
                break;
            }
        }
    }
    render() {
        return (
            <div id="identity" className={(this.state.open ? 'open ' : '') + (this.state.items.length > 1 ? ' switch' : '')}>
                <ul className="button">
                    {this.state.items.map((item, key) =>
                    <li key={key} data-id={item.id} data-target={item.target} onClick={this.state.items.length > 1 ? this.handleClick : this.simulateClick}>
                        <img src={'lib/images/identity/' + item.id + '-logo-light.svg'} />
                    </li>
                    )}
                </ul>
            </div>
        );
    }
}