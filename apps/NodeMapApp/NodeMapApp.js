import {allstarNodeMap} from "/jsModules/allstarNodeMap/allstarNodeMap.js"

const DEFAULT_NODE_NUMBER = 603450;

// nodeForm/submit
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const nodeNumber = e.target.nodeNumber.value;
  buildMap(nodeNumber);
});

// Refresh Button Logic
const refreshButton = document.getElementById('resetMapButton')
refreshButton.addEventListener('click', drawDefaultMap);

async function buildMap(nodeNumber){
    allstarNodeMap(nodeNumber, 'MapContainer');
}

function drawDefaultMap(){
    buildMap(DEFAULT_NODE_NUMBER);
    document.getElementById('nodeNumber').value = "";
}

function main(){
    drawDefaultMap();
}


main()