import db from "@/lib/firebase-admin";

export default (req, res) => {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .doc(req.query.uid)
      .get()
      .then((doc) => {
        res.end(JSON.stringify(doc.data()));
        resolve();
      })
      .catch((error) => {
        res.json(error);
        res.status(405).end();
        resolve();
      });
  });
};
