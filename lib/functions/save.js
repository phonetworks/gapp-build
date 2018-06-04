import JSZip from 'jszip';
import FileSaver from 'file-saver';

function calculateProperties(properties) {
    let calculatedProperties = '';
    for(let [index, key] of Object.keys(properties).entries()) {
        if(index < Object.keys(properties).length - 1) {
            calculatedProperties += key + ': ' + properties[key] + ', '
        } else {
            calculatedProperties += key + ': ' + properties[key]
        }
    }
    return calculatedProperties;
}
function calculatePermissions(permissions) {
    let prefix = '0x1'
    let manage = permissions.manage ? 8 : 0;
    let read = permissions.read ? 4 : 0;
    let write = permissions.write ? 2 : 0;
    let subscribe = permissions.subscribe ? 1 : 0;
    let ownerValue = manage + read + write + subscribe;
    let groupsValue = read + write + subscribe;
    let subscribersValue = read;
    let contextValue = subscribe;
    let mod = prefix + ownerValue.toString(16) + groupsValue.toString(16) + subscribersValue.toString(16) + contextValue.toString(16);
    let mask = prefix + (15 - ownerValue).toString(16) + (15 - groupsValue).toString(16) + (15 - subscribersValue).toString(16) + (15 - contextValue).toString(16);
    return 'mod: "' + mod + '", mask: "' + mask + '"';
}

function calculateAttributes(attributes) {
    //Create dataset of attributes
    let attributesData = {};
    attributes.forEach(function(attribute) {
        let attributeValue = attribute.type.charAt(0).toUpperCase() + attribute.type.substr(1) + (attribute.required ? '!' : '');
        //Calculate constraints
        let constraints = '';
        if(attribute.constraints) {
            for(let [index, constraint] of Object.keys(attribute.constraints).entries()) {
                if(constraint == 'RegEx' || constraint == 'format' || constraint == 'dateAfter' || constraint == 'dateBefore') {
                    constraints += constraint + ': "' + attribute.constraints[constraint] + '"';
                } else {
                    constraints += constraint + ': ' + attribute.constraints[constraint];
                }
                if(index < Object.keys(attribute.constraints).length - 1) {
                    constraints += ', ';
                }
            }
            attributeValue += constraints.length > 0 ? ' ' + '@constraints(' + constraints + ')' : '';
        }
        //Calculate mutations
        let mutations = '';
        if(attribute.mutations) {
            for(let [index, mutation] of Object.keys(attribute.mutations).entries()) {
                if(mutation == 'default') {
                    let valueType = '';
                    let defaultValue = '';
                    if(attribute.type == 'string' || attribute.type == 'date') {
                        valueType = 'String';
                        defaultValue = '"' + attribute.mutations['default'] + '"';
                    } else {
                        valueType = attribute.type.charAt(0).toUpperCase() + attribute.type.substr(1);
                        defaultValue = attribute.mutations['default'];
                    }
                    mutations += '@default(' + valueType + ': ' + defaultValue + ')';
                } else {
                    mutations += '@' + mutation;
                }
                if(index < Object.keys(attribute.mutations).length - 1) {
                    mutations += ' ';
                }
            }
            attributeValue += mutations.length > 0 ? ' ' + mutations : '';
        }
        //Push attribute data to dataset
        attributesData[attribute.name] = attributeValue;
    });
    //Calculate attributes
    attributes = '';
    for(let [index, key] of Object.keys(attributesData).entries()) {
        if(index < Object.keys(attributesData).length - 1) {
            attributes += '    ' + key + ': ' + attributesData[key] + ',\n'
        } else {
            attributes += '    ' + key + ': ' + attributesData[key]
        }
    }
    return attributes;
}

function saveNodes(nodes, edges, folder) {
    let inEdgesData = {};
    let outEdgesData = {};
    edges.forEach(function(item) {
        inEdgesData[item.to] = inEdgesData.hasOwnProperty(item.to) ? inEdgesData[item.to] : [];
        inEdgesData[item.to].push(nodes[item.from].label + ':' + item.type.charAt(0).toUpperCase() + item.type.substr(1));
        outEdgesData[item.from] = outEdgesData.hasOwnProperty(item.from) ? outEdgesData[item.from] : [];
        outEdgesData[item.from].push(nodes[item.to].label + ':' + item.type.charAt(0).toUpperCase() + item.type.substr(1));
    });
    nodes.forEach(function(node) {
        //Print version
        let content = '# pho-graphql-v1';
        //Print double line break
        content += '\n\n';
        //Print label and type
        content += 'type ' + node.label + ' implements ' + node.type.charAt(0).toUpperCase() + node.type.substr(1) + 'Node';
        //Calculate edges
        let edges;
        let inEdges;
        let outEdges;
// #### Handle edges below.
        if(inEdgesData.hasOwnProperty(node.id)) {
            inEdges = '';
            for(let [index, item] of inEdgesData[node.id].entries()) {
                inEdges += item;
                if(index != inEdgesData[node.id].length - 1) {
                    inEdges += ', ';
                }
            }
            inEdges = 'in: "' + inEdges + '"';
        }
        if(outEdgesData.hasOwnProperty(node.id)) {
            outEdges = '';
            for(let [index, item] of outEdgesData[node.id].entries()) {
                outEdges += item;
                if(index != outEdgesData[node.id].length - 1) {
                    outEdges += ', ';
                }
            }
            outEdges = 'out: "' + outEdges + '"';
        }
        edges = (inEdges || '') + (inEdges && outEdges ? ', ' : '') + (outEdges || '');
        //Print edges
        content += edges.length > 0 ? '\n@edges(' + edges + ')' : '';
        //Calculate permissions
        let permissions = calculatePermissions(node.permissions);
        //Print permissions
        content += permissions.length > 0 ? '\n@permissions(' + permissions + ')' : '';
        //Calculate properties
        let properties = calculateProperties(node.properties);
        //Print properties
        content += properties.length > 0 ? '\n@properties(' + properties + ')' : '';
        //Calculate attributes
        let attributes = calculateAttributes(node.attributes);
        //Print attributes
        content += attributes.length > 0 ? '\n{\n' + attributes + '\n}' : '';
        folder.file(node.label + '.pgql', content);
    });
}

function saveEdges(edges, nodes, folder) {
    let nodesData = {};
    nodes.forEach(function(item) {
        nodesData[item.id] = item.label;
    });
    edges.forEach(function(edge) {
        //Print version
        let content = '# pho-graphql-v1';
        //Print double line break
        content += '\n\n';
        //Print label and type
        content += 'type ' + edge.label + ' implements ' + edge.type.charAt(0).toUpperCase() + edge.type.substr(1) + 'Edge';
        //Print nodes
        content += '\n@nodes(head: "' + nodesData[edge.from] + '", tail: "' + nodesData[edge.to] + '")';
        //Calculate properties
        let properties = calculateProperties(edge.properties);
        //Print properties
        content += properties.length > 0 ? '\n@properties(' + properties + ')' : '';
        //Calculate attributes
        let attributes = calculateAttributes(edge.attributes);
        //Print attributes
        content += attributes.length > 0 ? '\n{\n' + attributes + '\n}' : '';
        folder.file(edge.label + '.pgql', content);
    });
}

export default function(graph, callback) {
    if((!graph.nodes && !graph.edges) || (graph.nodes.length == 0 && graph.edges.length == 0)) {
        callback('error', 'Please add nodes/edges first.');
    } else {
        let zip = new JSZip();
        let nodesFolder = zip.folder('Nodes');
        let edgesFolder = zip.folder('Edges');
        saveNodes(graph.nodes, graph.edges, nodesFolder);
        saveEdges(graph.edges, graph.nodes, edgesFolder);

        zip.generateAsync({type:"blob"})
        .then(function(content) {
            FileSaver.saveAs(content, "Pho.zip");
        });

        callback(function() {
            setTimeout(function() {
                document.getElementById('save').classList.add('done');
            }, 500);
            setTimeout(function() {
                document.getElementById('save').classList.remove('done');
            }, 2500);
        });
    }
}