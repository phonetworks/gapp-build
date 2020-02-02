import React from 'react';

export default class Permissions extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <table className="permissions">
                <tr>
                    <th></th>
                    <th>M</th>
                    <th>S</th>
                    <th>W</th>
                    <th>R</th>
                </tr>
                {this.props.list.map((group, groupKey) =>
                <tr className={group.label + '-group'} key={groupKey}>
                    <td>
                        <b>{group.label.charAt(0).toUpperCase() + group.label.substr(1)}</b>
                    </td>
                    {Object.keys(group.value).map((item, itemKey) =>
                    <td className={item + '-item'} key={itemKey}>
                        {group.value[item]
                        ? <span>&#x2714;</span>
                        : <span>&#x2718;</span>
                        }
                    </td>
                    )}
                </tr>
                )}
            </table>
        )
    }
}