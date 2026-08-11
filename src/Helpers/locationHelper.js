export const getCurrentLocation = () => {

    return new Promise((resolve, reject) => {

        if (!navigator.geolocation) {
            reject("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                try {

                    const response = await fetch(

                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`

                    );

                    const data = await response.json();

                    resolve({

                        latitude,

                        longitude,

                        address:
                            data.display_name || "Unknown",

                        city:
                            data.address.city ||
                            data.address.town ||
                            data.address.village ||
                            "Unknown",

                        state:
                            data.address.state ||
                            "Unknown",

                        country:
                            data.address.country ||
                            "Unknown",
                    });

                } catch {

                    resolve({

                        latitude,

                        longitude,

                        address: "Unknown",
                        city: "Unknown",
                        state: "Unknown",
                        country: "Unknown",

                    });

                }

            },

            reject

        );

    });

};