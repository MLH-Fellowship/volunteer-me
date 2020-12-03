import db from "@/lib/firebase-admin";

export default (req, res) => {
  db.collection("project")
    .doc()
    .add({title: "test"})
    .then((doc) => {
      res.json(doc.data());
    })
    .catch((error) => {
      res.json({ error });
    });
};
