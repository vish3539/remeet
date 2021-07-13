import firebase from '../config/firebase'
import cuid from 'cuid';

//gives access to the firestore db
const db = firebase.firestore();

export function dataFromSnapShot(snapshot) {
    if (!snapshot.exists) return undefined;
    const data = snapshot.data();
    // date
    for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
            if (data[prop] instanceof firebase.firestore.Timestamp) {
                data[prop] = data[prop].toDate();
            }
        }
    }
    return {
        ...data,
        id: snapshot.id
    }
}

export function listenToEventsFromFirestore() {
    // listening to db
    return db.collection('events').orderBy('date')
}

export function listenToEventFromFirestore(eventId) {
    // listening to db
    return db.collection('events').doc(eventId);
}

export function addEventToFirestore(event) {
    return db.collection('events').add({
        ...event,
        hostedBy: 'Dan',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id: cuid(),
            displayName: 'Dan',
            photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
        })
    })
}

export function updateEventInFireStore(event) {
    return db.collection('events').doc(event.id).update(event)
}

export function deleteEventInFirestor(eventId) {
    return db.collection('events').doc(eventId).delete();
}

export function cancelEventToggle(event) {
    return db.collection('events').doc(event.id).update({
        isCancelled: !event.isCancelled
    })
}