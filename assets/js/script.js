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

    if (response.ok) {
        console.log(data.expiry);
    }

}




