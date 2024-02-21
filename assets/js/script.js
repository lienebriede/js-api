const API_KEY = "aBi0f4zmKG0oRz7vxuRDIfDc-CI";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));


/* To get status we need to GET it and then display it
For Get we use the sentence that is shown in JSHint APIs instructions
*/
async function getStatus(e) {

    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();
    /* If want to display in console.log only expiry date, then add
    console.log(data.expiry) instead of data
    Here in dusplay function later it has been added {data.expiry} */
    if (response.ok) {
        displayStatus(data);
    } else {
        throw new Error(data.error);
    }

}

function displayStatus(data) {

    /*
    In this way it makes also the sentence in two pieces:
    
    let heading = "API Key Status";
    let results = `<div>Your key is valid until</div>`;
    results += `<div class="key-status">${data.expiry}</div>`;

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
    
    */

    document.getElementById("resultsModalTitle").innerText = "API Key Status";
    document.getElementById("results-content").innerHTML = `Your key is valid until${data.expiry}`;
    resultsModal.show();
}


