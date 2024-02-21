const API_KEY = "aBi0f4zmKG0oRz7vxuRDIfDc-CI";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));



/* Make a comma separated list
There is an issue, and we can check it when adding the loop 
to the console under postForm function, that it returns many values and 
not an array */
function processOptions(form) {
    let optArray = [];

    for (let e of form.entries()) {
        if (e[0] === "options") {
            optArray.push(e[1]);
        }
    }

    form.delete("options");

    form.append("options", optArray.join());

    return form;
}


/* This gets the texts from forms and sends to API.
If want to check before sending can use:  
for (let e of form.entries()) {console.log(e); }
*/
async function postForm(e) {

    const form = processOptions(new FormData(document.getElementById("checksform")));

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form,
    });

    const data = await response.json();

    if (response.ok) {
        displayErrors(data);
    } else {
        displayException(data);
        throw new Error(data.error);
    }
}


/* To get status we need to GET it and then display it
For Get we use the sentence that is shown in JSHint APIs instructions
*/
async function getStatus(e) {

    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();
    /* If want to display in console.log only expiry date, then add
    console.log(data.expiry) instead of data
    Here in display function later it has been added {data.expiry} */
    if (response.ok) {
        displayStatus(data);
    } else {
        displayException(data);
        throw new Error(data.error);
    }

}



function displayErrors(data) {

    let heading = `JSHint Results for ${data.file}`;
    if (data.total_errors === 0) {
        results = `<div class="no_errors">No errors reported!</div>`;
    } else {
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>`;
        for (let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>, `;
            results += `column <span class="column">${error.col}:</span></div>`;
            results += `<div class="error">${error.error}</div>`;
        }
    }

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}


function displayStatus(data) {

    /* This works nicer:
    
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

/* This displays errors that before we saw only in the console
Dont forget to put data. before error etc.
*/
function displayException(data) {

    let heading = "An Exception Occured";
    let results = `<div>The API returned status code ${data.status_code}</div>`;
    results += `<div>Error number: <strong>${data.error_no}</strong></div>`;
    results += `<div>Error text: <strong>${data.error}</strong></div>`;

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}