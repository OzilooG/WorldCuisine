import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { cert, getApps, initializeApp } from "firebase-admin/app";

function getAdminDb() {
  if (!getApps().length) {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
    );
    initializeApp({ credential: cert(serviceAccount) });
  }
  return getFirestore();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // simple validation
    if (!body.local_name) {
      return NextResponse.json({ error: "local_name is required" }, { status: 400 });
    }

    const db = getAdminDb();
    await db.collection("pending_dishes").add(body);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error writing dish:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
