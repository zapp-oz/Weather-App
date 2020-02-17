const form = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

message1.textContent = "";
message2.textContent = "";

form.addEventListener("submit", (event) => {
    event.preventDefault();

    message1.textContent = "Loading...";
    const location = search.value;
    const url = "http://localhost:3000/weather?address=" + location;

    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error){
            return message1.textContent = "Error: " + data.error;
        }

        message1.textContent = "Place: " + data.place;
        message2.textContent = "Forecast: " + data.forecast;
    })
})
})