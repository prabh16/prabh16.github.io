var ask = document.getElementById("ask");
var queryElement = document.getElementById("query");
var responseElement = document.getElementById("response");
var promptElement = document.getElementById("prompt");
var responsePElement = document.getElementById("response-p");

ask.addEventListener("click", search);

function search() {
    let prompt = queryElement.value;
    if (prompt) {
        ask.disabled = true;
        responsePElement.classList.add('loading');
        fetch(' https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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',
            },
            body: JSON.stringify({"model": "text-davinci-003", "prompt": prompt, "temperature": 0, "max_tokens": 7})
        })
            .then(response => response.json())
            .then(data => {
                ask.disabled = false;
                responsePElement.classList.remove('loading');
                promptElement.innerHTML = prompt;
                responseElement.innerHTML = data.choices[0].text
            })
            .catch(error => console.error(error));
    }

}

