const mongoose = require("mongoose");
const Listing = require("./models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    const listings = await Listing.find({});

    for (const listing of listings) {

        // Agar geometry pehle se hai to skip kar do
        if (listing.geometry && listing.geometry.coordinates?.length) {
            console.log(`Skipped: ${listing.title}`);
            continue;
        }

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listing.location)}`,
            {
                headers: {
                    "User-Agent": "Wanderlust/1.0"
                }
            }
        );

        const data = await response.json();

        if (!data.length) {
            console.log(`Location not found: ${listing.location}`);
            continue;
        }

        listing.geometry = {
            type: "Point",
            coordinates: [
                parseFloat(data[0].lon),
                parseFloat(data[0].lat)
            ]
        };

        await listing.save();

        console.log(`Updated: ${listing.title}`);

        // 1 second delay
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log("Migration completed.");

    mongoose.connection.close();
}

main().catch(console.error);