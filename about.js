window.onload = function () {
    try {
        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyDpgnVb5MmOsLxX3BiEwtuk8sn-ClWwtYY",
            authDomain: "phoner-db69a.firebaseapp.com",
            databaseURL: "https://phoner-db69a.firebaseio.com",
            projectId: "phoner-db69a",
            storageBucket: "phoner-db69a.appspot.com",
            messagingSenderId: "744614912602",
            appId: "1:744614912602:web:50f5d6168f0e2654d6ee63",
            measurementId: "G-B6LYDPH7X0"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const database = firebase.firestore();
        const collection = database.collection("ServiceInfo");
        let versionInfo = collection.doc("BQ6UuFt4J22dvxD0jZFH");
        versionInfo.get().then(function (doc) {
            document.getElementById('serviceVersion').innerHTML = `Version ${doc.data()['Version'].toString()}`;
            let referencesInfo = collection.doc("References");
            referencesInfo.get().then(function (doc) {
                let list = document.createElement('ul');
                const fields = doc.data();
                for (const key of Object.keys(doc.data())) {
                    let referenceItem = document.createElement('li');
                    referenceItem.innerHTML = `<a target="_blank" rel="noopener noreferrer" href="${fields[key]}">${key}</a>`;
                    list.appendChild(referenceItem);
                }
                document.getElementById('referencesCard').appendChild(list);
                document.getElementById('loader').style.display = "none";
                document.getElementById('elements').style.display = "block";
            });
        });
    }
    catch {
        window.location.href = "index.html#Error";
    }
}