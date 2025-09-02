import { initializeApp, getApps, cert, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { Dish, Country } from "@/types/dish";

function initialiseFirebaseAdmin() {
  if (!getApps().length) {
    try {
      const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

      if (!serviceAccountJson)
        throw new Error(
          "FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set."
        );

      const serviceAccount = JSON.parse(serviceAccountJson);

      initializeApp({ credential: cert(serviceAccount) });

      console.log("Firebase Admin SDK initialized successfully.");
    } catch (error) {
      console.error("Error initializing Firebase Admin SDK:", error);
      return null;
    }
  }

  return getFirestore();
}

export async function fetchAllDishes(): Promise<Dish[]> {
  const db = initialiseFirebaseAdmin();
  if (!db) {
    console.error("Could not connect to Firebase");
    return [];
  }

  const dishes: Dish[] = [];
  try {
    const dishesRef = db.collection("dishes");
    const snapshot = await dishesRef.get();

    snapshot.forEach((doc) => {
      const data = doc.data();
      dishes.push({ ...data, id: doc.id } as Dish);
    });

    console.log("Successfully fetched dishes from Firestore.");
    return dishes;
  } catch (error) {
    console.error("Error fetching dishes from Firestore:", error);
    return [];
  }
}

export async function fetchAllCountries(): Promise<Country[]> {
  const db = initialiseFirebaseAdmin();
  if (!db) {
    console.error("Could not connect to Firebase");
    return [];
  }

  const countries: Country[] = [];
  try {
    const dishesRef = db.collection("countries_to_code");
    const snapshot = await dishesRef.get();

    snapshot.forEach((doc) => {
      const data = doc.data();
      countries.push({ name: data.name, code: doc.id } as Country);
    });

    console.log("Successfully fetched dishes.");
    return countries;
  } catch (error) {
    console.error("Error fetching dishes from Firestore:", error);
    return [];
  }
}

export async function fetchCountryDishes(countryCode: string): Promise<Dish[]> {
  const db = initialiseFirebaseAdmin();
  if (!db) {
    console.error("Could not connect to Firebase");
    return [];
  }

  const countryDoc = await db
    .collection("dishes_country_map")
    .doc(countryCode)
    .get();

  if (!countryDoc.exists) {
    console.log("No dishes for this country");
    return [];
  }

  try {
    const { dish_ids } = countryDoc.data() as { dish_ids: string[] };
    const docRefs = dish_ids.map((id) => db.collection("dishes").doc(id));
    const snapshots = await db.getAll(...docRefs);
    const dishes = snapshots
      .filter((doc) => doc.exists)
      .map((doc) => ({ id: doc.id, ...doc.data() } as Dish));

    console.log("Succesfully fetched dishes for", countryCode);
    return dishes;
  } catch (error) {
    console.error("Error fetching dishes from Firestore:", error);
    return [];
  }
}
