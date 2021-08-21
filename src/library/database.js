//importeer eigen firebase database
import Firebase from 'firebase/app'
import 'firebase/firestore'

//api instellingen

const config = {

    apiKey: "AIzaSyAJAH0GsV2wDtFilX8UbwfL522kW8RFOE4",

    authDomain: "tvtracker-1956a.firebaseapp.com",

    projectId: "tvtracker-1956a",

    storageBucket: "tvtracker-1956a.appspot.com",

    messagingSenderId: "635274576324",

    appId: "1:635274576324:web:98b30be83db84adbfea491",

    measurementId: "G-F5CY540WF0"

};

let App = Firebase.initializeApp(config)
let Firestore = App.firestore()
Firestore.settings({ timestampsInSnapshots: true })

//get promise
//https://console.firebase.google.com/u/0/project/tvtracker-1956a/firestore/data/~2Fsubscriptions~2Fshows
//firebase database aangemaakt

export default {
    set_data(subscriptions) {
        Firestore.collection('subscriptions').doc('shows').set({ subscriptions })
    },
    get_data() {
        return Firestore.collection('subscriptions').doc('shows').get()
    }
}