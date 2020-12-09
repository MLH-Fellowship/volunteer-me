import firebase from "./firebase";
const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createProject(data, uid) {
  return firestore
    .collection("projects")
    .add(data)
    .then((doc) => {
      var userRef = firestore.collection("users").doc(uid);
      userRef.get().then((d) => {
        userRef.update({
          projectsCreated: d.data().projectsCreated.concat([doc.id]),
        });
      });
    });
}

// Not sure how to reference the project and user
export function addVolunteer(data) {
  return firestore.collection("projects").add(data);
}
