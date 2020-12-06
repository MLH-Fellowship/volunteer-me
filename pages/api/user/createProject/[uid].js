import db from "@/lib/firebase-admin";

export default (req, res) => {
  return new Promise((resolve, reject) => {
    db.collection("projects")
      .add({
        name: "new newww", // to change
        url: "",
        createdAt: new Date(),
        authorId: req.query.uid,
      })
      .then((doc) => {
        var userRef = db.collection("users").doc(req.query.uid);
        userRef.get().then((d) => {
          userRef.update({
            projectsCreated: d
              .data()
              .projectsCreated.concat([doc._path.segments[1]]),
          });
        });

        res.status(200).json(doc._path.segments[1]);
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  });
};