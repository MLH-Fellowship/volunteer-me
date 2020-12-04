import db from "@/lib/firebase-admin";

export default (req, res) => {
  db.collection("users")
    .doc(req.query.uid)
    .get()
    .then((doc) => {
      res.json(doc.data());
    })
    .catch((error) => {
      res.json({ error });
    });
};
