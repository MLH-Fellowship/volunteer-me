import db from "@/lib/firebase-admin";

export default async (_, res) => {
  const snapshot = await db.collection("users").get();
  const users = [];

  snapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  res.status(200).json({ users });
};
