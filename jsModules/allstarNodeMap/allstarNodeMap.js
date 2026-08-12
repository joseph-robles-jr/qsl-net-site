//Author: Joseph Robles - KI5TLZ
//License: GPL v3 https://www.gnu.org/licenses/gpl-3.0.html



let HEADNODE; 
let APIURL;

/*This section links the nodes stylesheet to the module ---*/ 
const cssId = 'allstar-node-map-css';
const cssUrl = new URL('./allstarNodeMap.css', import.meta.url);

if (!document.getElementById(cssId)) {

    const link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.href = cssUrl.href;
    document.head.appendChild(link);

}
/* ------------------------------------------------------*/



async function getAllstarStatus(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
}


function parseHeadNode(response) {

    return {
        callsign: response.node?.callsign ?? "Unknown",
        nodeNumber: response.node?.name ?? "Unknown",
        siteName: response.node?.server?.SiteName ?? "Unknown",
        location: response.node?.server?.Location ?? "Unknown"
    };
}

function parseChildNodes(response) {
    //return an arrray of node objects
    const parsedNodes = [];

    if (!response.stats?.data?.linkedNodes) {
        return parsedNodes;
    }
    for (const entry of response.stats.data.linkedNodes) {

        parsedNodes.push({
            siteName: entry.server?.SiteName ?? "Unknown",
            callsign: entry.callsign ?? "Unknown",
            frequency: entry.node_frequency ?? "Unknown",
            nodeNumber: entry.name ?? "Unknown",
            location: entry.server?.Location ?? "Unknown"
        });
    }
    return parsedNodes;
}

function printNode(node) {
    console.warn(`
        Callsign: ${node.callsign}
        Node: ${node.nodeNumber}
        Frequency: ${node.frequency ?? "N/A"}
        Site Name: ${node.siteName ?? "N/A"}
        `);
}

function buildNodesPayload(headNode, connectedNodes) {
    const builtConnectedNodes = buildConnectedNodes(connectedNodes);

    const builtHeadNode = buildHeadNodePayload(headNode);

    // Assemble HTML fragments into final payload, 
    const htmlToWrite = `<div class="asn-node-map">
    <h3>Node ${HEADNODE} </h3>` + builtHeadNode + `<h3>Directly Connected Nodes (May Be Large Systems)</h3> ${builtConnectedNodes} </div>`;
    return htmlToWrite;

}

function writeNodesPayload(payload, elementIdToContainNodeMap) {
    let nodeMapElement;
    if (elementIdToContainNodeMap != null) {

        nodeMapElement = document.getElementById(elementIdToContainNodeMap);
    }
    else {
        // Fall Back to Default
        nodeMapElement = document.getElementById("nodeConnectionMap");
    }
    if (!nodeMapElement) {
        console.error(`${elementIdToContainNodeMap} element not found. Unable to insert Allstar-Link Node Map.`);
        return;
    }
    nodeMapElement.innerHTML = payload;

}

function buildHeadNodePayload(headNode) {
    //Build the HTML for Head Node
    return `<a id='headNode' class="asn-node asn-head-node asn-node-link" href=https://stats.allstarlink.org/stats/${HEADNODE}>
                        <h4>${headNode.callsign}</h4>
                        <ul>
                            <li>Node Number: ${headNode.nodeNumber}</li>
                            <li>Site Name: ${headNode.siteName || "Unknown"}</li>
                            <li>Location: ${headNode.location}</li>
                        </ul>
                        </a>\n`

}


function buildConnectedNodes(connectedNodes) {
    let builtNodes = `<div class="asn-connected-nodes">`;
    connectedNodes.forEach(element => {
        builtNodes +=
            `<a class="asn-node asn-connected-node asn-node-link" href=https://stats.allstarlink.org/stats/${element.nodeNumber}>            
            <h4>${element.callsign}</h4>
                        <ul>
                            <li>Node Number: ${element.nodeNumber}</li>
                            <li>Site Name: ${element.siteName || "Unknown"}</li>
                            <li>Location: ${element.location}</li>
                        </ul>
                        </a> \n`
    });
    if (connectedNodes.length === 0) {

        builtNodes +=
            `<div class='node connectedNode '>            
                <h4>No Nodes Connected</h4>
            </div> \n`
    }

    builtNodes += `</div>`
    return builtNodes;
}

export async function allstarNodeMap(nodeNumber, idOfElementThatWillContanNodeMap) {
    HEADNODE = nodeNumber;
    APIURL = `https://stats.allstarlink.org/api/stats/${HEADNODE}?${Date.now()}`
    try {
        
        const output = await getAllstarStatus(APIURL);

        const headNode = parseHeadNode(output);
        const connectedNodes = parseChildNodes(output);

        //await printNode(headNode);
        //connectedNodes.forEach(printNode);
        
        let htmlPayload = buildNodesPayload(headNode, connectedNodes);

        writeNodesPayload(htmlPayload, idOfElementThatWillContanNodeMap);
    }

    catch (error) {
        console.error(error);
        const nodeMapElement = document.getElementById("nodeConnectionMap");

        if (nodeMapElement) {
            nodeMapElement.textContent = "Unable to retrieve node information.";
        }
    }
}
