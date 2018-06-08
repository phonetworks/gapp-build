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
    let mod = '0x1';
    let mask = '0x1';
    for(let group in permissions) {
        let manage = permissions[group].manage ? 8 : 0;
        let write = permissions[group].write ? 2 : 0;
        let subscribe = permissions[group].subscribe ? 1 : 0;
        let read = permissions[group].read ? 4 : 0;
        mod += (manage + write + subscribe + read).toString(16);
        mask += (15 - (manage + write + subscribe + read)).toString(16);
    }
    return 'mod: "' + mod + '", mask: "' + mask + '"';
}
function calculateHeads(edge, edges, nodesData) {
    let heads = '';
    let headIds = [edge.to];
    edges = edges.filter(function(element) {
        return (element.hasOwnProperty('master') && element.master == edge.id);
    });
    edges.forEach(function(element) {
        headIds.push(element.to)
    })
    for(let [index, head] of headIds.entries()) {
        heads = heads + nodesData[head];
        if(index != headIds.length - 1) {
            heads = heads + ', ';
        }
    }
    return heads;
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

function saveGraph(graph, folder) {
    //Print version
    let content = '# pho-graphql-v1';
    //Print double line break
    content += '\n\n';
    //Print label and type
    content += 'type ' + graph.label + ' implements GraphNode';
    //Calculate permissions
    let permissions = calculatePermissions(graph.permissions);
    //Print permissions
    content += permissions.length > 0 ? '\n@permissions(' + permissions + ')' : '';
    //Calculate attributes
    let attributes = calculateAttributes(graph.attributes);
    //Print attributes
    content += attributes.length > 0 ? '\n{\n' + attributes + '\n}' : '';
    folder.file(graph.label + '.pgql', content);
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
        if(!edge.hasOwnProperty('master')) {
            //Print version
            let content = '# pho-graphql-v1';
            //Print double line break
            content += '\n\n';
            //Print label and type
            content += 'type ' + edge.label + ' implements ' + edge.type.charAt(0).toUpperCase() + edge.type.substr(1) + 'Edge';
            //Calculate nodes
            let heads = calculateHeads(edge, edges, nodesData);
            //Print nodes
            content += '\n@nodes(head: "' + heads + '", tail: "' + nodesData[edge.from] + '")';
            //Calculate properties
            let properties = calculateProperties(edge.properties);
            //Print properties
            content += properties.length > 0 ? '\n@properties(' + properties + ')' : '';
            //Calculate attributes
            let attributes = calculateAttributes(edge.attributes);
            //Print attributes
            content += attributes.length > 0 ? '\n{\n' + attributes + '\n}' : '';
            folder.file(edge.label + '.pgql', content);
        }
    });
}

export default function(graph, callback) {
    if((!graph.nodes && !graph.edges) || (graph.nodes.length == 0 && graph.edges.length == 0)) {
        callback(function() {
            alert('Please add nodes/edges first.');
        });
    } else {
        let zip = new JSZip();
        let nodesFolder = zip.folder('Nodes');
        let edgesFolder = zip.folder('Edges');
        saveGraph(graph.main, zip);
        saveNodes(graph.nodes, graph.edges, nodesFolder);
        saveEdges(graph.edges, graph.nodes, edgesFolder);

        zip.generateAsync({type:"blob"})
        .then(function(content) {
            FileSaver.saveAs(content, graph.main.label.charAt(0).toUpperCase() + graph.main.label.substr(1) + '.zip');
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