document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "https://api.aladhan.com/v1/timingsByCity?city=Maicao&country=Colombia&method=2";
    const maghribAudio = new Audio("iftar.mp3"); // Audio para Iftar

    async function fetchPrayerTimes() {
        try {
            let response = await fetch(API_URL);
            let data = await response.json();
            if (data.code === 200) {
                displayPrayerTimes(data.data.timings);
            }
        } catch (error) {
            console.error("Error obteniendo los horarios de oración:", error);
        }
    }

    function displayPrayerTimes(timings) {
        document.getElementById("fajr-time").textContent = timings.Fajr;
        document.getElementById("dhuhr-time").textContent = timings.Dhuhr;
        document.getElementById("asr-time").textContent = timings.Asr;
        document.getElementById("maghrib-time").textContent = timings.Maghrib;
        document.getElementById("isha-time").textContent = timings.Isha;

        checkMaghribAlarm(timings.Maghrib);
    }

    function checkMaghribAlarm(maghribTime) {
        let now = new Date();
        let maghrib = new Date();
        let [hours, minutes] = maghribTime.split(":");
        maghrib.setHours(hours, minutes, 0);

        let timeToMaghrib = maghrib - now;
        if (timeToMaghrib > 0) {
            setTimeout(() => {
                maghribAudio.play();
                alert("¡Es hora del Iftar!");
            }, timeToMaghrib);
        }
    }

    fetchPrayerTimes();
});


