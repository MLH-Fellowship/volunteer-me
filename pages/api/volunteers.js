import db from "@/lib/firebase-admin";

export default async (_, res) => {
  const snapshot = await db.collection("volunteer").get();
  const volunteer = [];

  snapshot.forEach((doc) => {
    volunteer.push({ id: doc.id, ...doc.data() });
  });
  res.status(200).json({ volunteer });
};
