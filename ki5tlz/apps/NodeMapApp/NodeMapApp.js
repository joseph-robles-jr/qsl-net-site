import {allstarNodeMap} from "/ki5tlz/jsModules/allstarNodeMap/allstarNodeMap.js"

const DEFAULT_NODE_NUMBER = 603450;

const nodeNumberParamValue = new URLSearchParams(window.location.search).get('nodeNumber');


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
    try{
        await allstarNodeMap(nodeNumber, 'MapContainer');
    }
    catch (error){
        document.getElementById('MapContainer').innerHTML =
        '<p>Unable to find node. Please try again.</p>';
    }
}

function drawDefaultMap(){
    buildMap(DEFAULT_NODE_NUMBER);
    document.getElementById('nodeNumber').value = "";
}

function main(){

    if (nodeNumberParamValue != null){
        buildMap(nodeNumberParamValue);
    }
    else{
        drawDefaultMap();
    }
}


main()