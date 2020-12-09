import firebase from './firebase';
const firestore = firebase.firestore();

export function createUser(uid, data) {
    return firestore
        .collection('users')
        .doc(uid)
        .set({ uid, ...data }, { merge: true });
}

export function createProject(data) {
    return firestore.collection('projects').add(data);
}

// Not sure how to reference the project and user
export function addVolunteer(data) {
    // add VolunteerId to project
    // add 
    return firestore.collection('volunteer')
        .add(data)
        .then((volunteerDoc) => {
            let projectRef = firestore.collection('projects').doc(data.projectId);
            projectRef.get().then(p => {
                projectRef.update({
                    volunteers: p.data().volunteers.concat([volunteerDoc.id])
                });
            });
        }).then(() => {
            let userRef = firestore.collection('users').doc(data.userId);
            userRef.get().then(u => {
                projectsJoined: u.data().projectsJoined.concat([data.projectId])
            });
        });


}