var resultSave = document.getElementById('result');
var dataBaseArray = JSON.parse(localStorage.getItem('dataBaseArray')) || [];

function saveData() {
    var data = {
        titel: document.getElementById('titel').value,
        beskrivning: document.getElementById('beskrivning').value,
        åldersgräns: document.getElementById('åldersgräns').value,
    };

    dataBaseArray.push(data);
    localStorage.setItem('dataBaseArray', JSON.stringify(dataBaseArray));
    displayData();

    titel.value = "";
    beskrivning.value = "";
    åldersgräns.value = "";
}

function clearData() {
    localStorage.removeItem('dataBaseArray');
    dataBaseArray = [];
    displayData();

    titel.value = "";
    beskrivning.value = "";
    åldersgräns.value = "";
}

function searchData() {
    var searchArray = document.getElementById('searchInput').value.toLowerCase();
    var searchResults = dataBaseArray.filter(function (data) {
        return data.titel.toLowerCase().includes(searchArray)
            || data.beskrivning.toLowerCase().includes(searchArray)
            || data.åldersgräns.toLowerCase().includes(searchArray);
    });

    displaySearchResults(searchResults);

    searchInput.value = "";
}

function displayData() {
    resultSave.innerHTML = "";
    dataBaseArray.forEach(function (data) {
        let dataToText = document.createElement('p');
        dataToText.textContent = JSON.stringify(data);
        resultSave.appendChild(dataToText);
    });
    resultSave.classList.add('show');
}

function displaySearchResults(results) {
    resultSave.innerHTML = "";
    results.forEach(function (result) {
        let dataToText = document.createElement('p');
        dataToText.textContent = JSON.stringify(result);
        resultSave.appendChild(dataToText);
    });
    resultSave.classList.add('show');
}

document.addEventListener('DOMContentLoaded', function () {
    const speechHelper = document.getElementById('speechHelper');
    let isSpeaking = false;

    speechHelper.addEventListener('click', function () {
        isSpeaking = !isSpeaking;

        if (isSpeaking) {
            speakAllContent();
        } else {
            window.speechSynthesis.cancel();
        }
    });

    function speakAllContent() {
        const speaakTextElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, span, div');
        speaakTextElements.forEach(element => {
            const text = element.textContent;
            if (text.trim() !== "") {
                const textOutput = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(textOutput);
            }
        });
    }
});