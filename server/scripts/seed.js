import "dotenv/config";
import { eq, and } from "drizzle-orm";
import { db } from "../src/common/config/db.js";
import { theatres, screens } from "../src/module/movie/movie.model.js";
import { seats } from "../src/module/booking/booking.model.js";

async function seed() {
  console.log("🌱 Starting database seeding...");

  // 1. Seed Theatre (PVR Z Square)
  const theatreData = {
    name: "PVR Z Square",
    city: "Kanpur",
    address: "Mall Road",
  };

  let [existingTheatre] = await db
    .select()
    .from(theatres)
    .where(
      and(
        eq(theatres.name, theatreData.name),
        eq(theatres.city, theatreData.city)
      )
    )
    .limit(1);

  let theatreId;
  if (existingTheatre) {
    theatreId = existingTheatre.id;
    console.log(`ℹ️  Theatre "${theatreData.name}" already exists in ${theatreData.city}. Skipping creation.`);
  } else {
    const [insertedTheatre] = await db
      .insert(theatres)
      .values(theatreData)
      .returning();
    theatreId = insertedTheatre.id;
    console.log(`✅ Created Theatre "${theatreData.name}" (ID: ${theatreId})`);
  }

  // 2. Define Screens configuration
  const screensConfig = [
    {
      name: "Screen 1",
      totalSeats: 100,
      rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      seatsPerRow: 10,
    },
    {
      name: "Screen 2",
      totalSeats: 80,
      rows: ["A", "B", "C", "D", "E", "F", "G", "H"],
      seatsPerRow: 10,
    },
  ];

  // 3. Process Screens & Seats
  for (const config of screensConfig) {
    let [existingScreen] = await db
      .select()
      .from(screens)
      .where(
        and(
          eq(screens.theatreId, theatreId),
          eq(screens.name, config.name)
        )
      )
      .limit(1);

    let screenId;
    if (existingScreen) {
      screenId = existingScreen.id;
      console.log(`ℹ️  Screen "${config.name}" already exists for theatre. Skipping screen creation.`);
    } else {
      const [insertedScreen] = await db
        .insert(screens)
        .values({
          theatreId,
          name: config.name,
          totalSeats: config.totalSeats,
        })
        .returning();
      screenId = insertedScreen.id;
      console.log(`✅ Created Screen "${config.name}" (ID: ${screenId})`);
    }

    // Check if seats already exist for this screen
    const [existingSeat] = await db
      .select()
      .from(seats)
      .where(eq(seats.screenId, screenId))
      .limit(1);

    if (existingSeat) {
      console.log(`ℹ️  Seats for Screen "${config.name}" already exist. Skipping seat generation.`);
      continue;
    }

    // Bulk generate seat values for this screen
    const seatValues = [];
    for (const rowLabel of config.rows) {
      for (let seatNum = 1; seatNum <= config.seatsPerRow; seatNum++) {
        seatValues.push({
          screenId,
          row: rowLabel,
          number: seatNum,
        });
      }
    }

    if (seatValues.length > 0) {
      await db.insert(seats).values(seatValues);
      console.log(
        `✅ Bulk inserted ${seatValues.length} seats for Screen "${config.name}"`
      );
    }
  }

  console.log("🎉 Seeding completed successfully!");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seeding failed with error:", err);
    process.exit(1);
  });
