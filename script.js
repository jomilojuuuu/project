const formsubmit = document.querySelector("form");
const errormessage = document.querySelector(".error");
const city = document.querySelector("#city");

// Get references to the button and the hidden content
const showButton = document.getElementById("showButton");
const hiddenContent = document.getElementById("hiddenContent");

// Add a click event listener to the button
showButton.addEventListener("click", () => {
  // Check if the hidden content is currently hidden
  if (hiddenContent.classList.contains("hidden")) {
    // If it's hidden, remove the 'hidden' class to display it
    hiddenContent.classList.remove("hidden");
  } else {
    // If it's visible, add the 'hidden' class to hide it
    hiddenContent.classList.add("hidden");
  }
});

formsubmit.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevents the form from submitting and refreshing the page

  const inputValue = document.querySelector("input").value.trim();
  if (inputValue === "") {
    errormessage.textContent = "Please enter a location";
    return;
  }

  errormessage.textContent = ""; // Clears any previous error message

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "916d2df44emsh40dd21cb4cfc667p132195jsn434e8686479d",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  errormessage.textContent = "Loading......."; // Shows loading message

  try {
    const response = await fetch(
      `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${inputValue}`,
      options
    );

    if (response.ok) {
      var data = await response.json();
    } else if (response.status === 400) {
      errormessage.textContent = "Enter Correct Location";
      throw new Error("Invalid input value");
    } else {
      errormessage.textContent = "Failed to fetch weather information";
      throw new Error("Failed to fetch weather information");
    }

    console.log(data);

    errormessage.innerHTML = `Weather For <Span id="city">${inputValue}</Span>`;
    document.querySelector("#temp").innerHTML = data.temp + "°C";
    document.querySelector("#min_temp").innerHTML = data.min_temp + "&#176;";
    document.querySelector("#max_temp").innerHTML = data.max_temp + "&#176;";
    document.querySelector("#feels_like").innerHTML = data.feels_like + "°C";
    document.querySelector("#humidity").innerHTML = data.humidity;
    document.querySelector("#sunrise").innerHTML =
      "Sunrise: " + new Date(data.sunrise * 1000).toLocaleTimeString();
    document.querySelector("#sunset").innerHTML =
      "Sunset: " + new Date(data.sunset * 1000).toLocaleTimeString();
    document.querySelector("#windspeed").innerHTML = data.wind_speed + "m/s";
    document.querySelector("#wind_degrees").innerHTML =
      data.wind_degrees + "&#176;";
  } catch (err) {
    console.error(err);

    errormessage.innerHTML = `Failed to fetch weather information, <br> Enter Correct Location`; // Shows an error message if the fetch fails
  }
});
