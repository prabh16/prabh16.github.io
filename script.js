var ask = document.getElementById("ask");
var queryElement = document.getElementById("query");
var responseElement = document.getElementById("response");
var promptElement = document.getElementById("prompt");
var responsePElement = document.getElementById("response-p");
var errorElement = document.getElementById("error");

ask.addEventListener("click", search);

function search() {
    let prompt = queryElement.value;
    if (prompt) {
        ask.disabled = true;
        promptElement.innerHTML = "";
        responseElement.innerHTML = "";
        errorElement.innerHTML = "";
        responsePElement.classList.add('loading');
        fetch(' https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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',
            },
            body: JSON.stringify({ "model": "text-davinci-003", "prompt": prompt, "temperature": 0, "max_tokens": 7 })
        })
            .then(response => response.json())
            .then(data => {
                ask.disabled = false;
                responsePElement.classList.remove('loading');
                promptElement.innerHTML = prompt;
                responseElement.innerHTML = data.choices[0].text
            })
            .catch(
                error => {
                    console.error(error);
                    promptElement.innerHTML = "";
                    errorElement.innerHTML = "Ugh!!! " + "Something went wrong. Please try again later.";
                }
            );
    }

}

