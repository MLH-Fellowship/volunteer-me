import db from "@/lib/firebase-admin";

export default (req, res) => {
  return new Promise((resolve, reject) => {
    db.collection("projects")
      .doc(req.query.pid)
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
