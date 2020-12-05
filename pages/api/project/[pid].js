import db from "@/lib/firebase-admin";

export default (req, res) => {
  db.collection("projects")
    .doc(req.query.pid)
    .get()
    .then((doc) => {
      res.json(doc.data());
    })
    .catch((error) => {
      res.json({ error });
    });
};
