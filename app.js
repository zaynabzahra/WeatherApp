window.addEventListener('load', () => {

    let long;
    let lat;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');


    const key = 'd1fd7595f90b6a0761322f87a3c943e4';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition
            (position => {
                long = position.coords.longitude;
                lat = position.coords.latitude;

                //allows for cross-origin request
                const proxy = 'https://cors-anywhere.herokuapp.com/';

                const api = `${proxy}https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${key}`;

                fetch(api)
                    .then(response => {
                        return response.json();
                    })

                    .then(data => {

                        console.log(data);

                        const { temp } = data.current;
                        const { description } = data.current.weather[0];

                        //Set DOM elements from API
                        locationTimezone.textContent = data.timezone;
                        temperatureDegree.textContent = temp;
                        temperatureDescription.textContent = description;

                        //FORMULA FOR FARENHEIT
                        let Farenheit = (temp * 1.8) + 32;

                        setIcons(data.current.weather[0].icon);

                        //Change temperature to Celcius/Farenheit
                        temperatureSection.addEventListener('click', () => {

                            if (temperatureSpan.textContent === "F") {

                                temperatureSpan.textContent = "C";
                                temperatureDegree.textContent = temp;
     
                            }
                            else {

                                temperatureSpan.textContent = "F";
                                temperatureDegree.textContent = Math.floor(Farenheit);
                            }
                        })

                    })

            });

    }

    function setIcons(iconCode) {

        var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";

        let image = document.getElementsByClassName("image1")[0];

        image.src = iconurl;

    }

});


