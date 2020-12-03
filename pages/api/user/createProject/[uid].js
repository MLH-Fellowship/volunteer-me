import db from "@/lib/firebase-admin";

export default (req, res) => {
  db.collection("projects")
    .add({
      project: "hi",
      url: "",
      createdAt: new Date(),
      authorId: req.query.uid,
    })
    .then((doc) => {
      res.json(doc.data());
      // add to user's list too
    })
    .catch((error) => {
      res.json({ error });
    });
};
