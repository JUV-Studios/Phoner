window.onload = function () {
    renderPhones().then(function (result) {
        if (result) {
            document.getElementById('tablinks').children[0].id = "defaultOpen";
            initMasterDetail();
        }
        else {
            window.location.href = "index.html#Error";
        }
    });
};

async function renderPhones() {
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
        let phones = database.collection("PhoneSpecs").orderBy("Bluetooth version", "desc");
        let querySnapshot = await phones.get();
        querySnapshot.forEach((doc) => {
            let btn = createTabButton(doc.id);
            let panel = createTabContent(doc.id);
            const heading = createHeading(doc.id);
            let row = document.createElement('div');
            row.className = "row";
            let buttonGroup = document.createElement('div');
            let column1 = document.createElement('section');
            let column2 = document.createElement('section');
            let img = document.createElement('img');
            img.alt = "Sorry, we could not display this image";
            let ul = document.createElement('ul');
            const fields = doc.data();
            for (const key of Object.keys(fields)) {
                if (key.startsWith('btn')) {
                    switch (key) {
                        case 'btnVideo':
                            buttonGroup.appendChild(createVideoButton(fields['btnVideo']));
                            break;
                        case 'btnBuy':
                            buttonGroup.appendChild(createBuyButton(fields['btnBuy']));
                            break;
                        case 'btnReviews':
                            buttonGroup.appendChild(createReviewsButton(fields['btnReviews']));
                    }
                }
                else if (key.startsWith('img')) {
                    switch (key) {
                        case 'imgWidth':
                            img.setAttribute('width', fields['imgWidth']);
                            break;
                        case 'img':
                            img.setAttribute('src', fields[key]);
                            break;
                        case 'imgHeight':
                            img.setAttribute('height', fields['imgHeight']);
                        case 'imgStyleWidth':
                            img.style.width = fields['imgStyleWidth'];
                            break;
                        case 'imgStyleHeight':
                            img.style.height = fields['imgStyleHeight'];
                            break;
                    }
                }
                else if (key == "Bluetooth version") {
                    if (fields[key] != 0) {
                        ul.appendChild(createListItem(key, parseFloat(fields[key]).toFixed(1)));
                    }
                }
                else if (key == "Colour(s)") {
                    var lang = getBrowserLanguage();
                    if (lang == "en-US") {
                        ul.appendChild(createListItem('Color(s)', fields[key]));
                    }
                    else {
                        ul.appendChild(createListItem(key, fields[key]));
                    }
                }
                else {
                    ul.appendChild(createListItem(key, fields[key]));
                }
            }
            buttonGroup.appendChild(createShareButton());
            column1.appendChild(ul);
            column1.appendChild(buttonGroup);
            column2.appendChild(img);
            row.appendChild(column1);
            row.appendChild(column2);
            panel.appendChild(heading);
            panel.appendChild(row);
            document.getElementById('elements').appendChild(panel);
            document.getElementById('tablinks').appendChild(btn);
        });
    }
    catch (err) {
        return false;
    }
    return true;
}

function createListItem(key, value) {
    let element = document.createElement('li');
    element.innerHTML = `${key}: ${value}`;
    return element;
}
function createTabButton(id) {
    let dataId = removeSpaces(id);
    let button = document.createElement('button');
    button.innerHTML = id;
    button.onclick = function (event) {
        tabbtnClick = true;
        openPage(event, dataId);
    }
    button.setAttribute('aria-label', id);
    button.setAttribute('data-id', dataId);
    button.name = dataId;
    return button;
}

function createTabContent(id) {
    let content = document.createElement('article');
    content.id = removeSpaces(id);
    content.style.display = 'none';
    return content;
}

function createHeading(text) {
    let heading = document.createElement('h1');
    heading.innerHTML = text;
    return heading;
}

function removeSpaces(str) {
    return str.replace(/\s/g, '');
}

function containsKey(object, key) {
    return "key" in obj;
}

function createVideoButton(link) {
    let videoBtn = document.createElement('button');
    videoBtn.className = "btn";
    videoBtn.title = "Watch promo video";
    videoBtn.setAttribute('aria-label', 'Promo video');
    videoBtn.onclick = function () {
        window.open(link);;
    }
    videoBtn.innerHTML = '<i class="ms-Icon ms-Icon--Video" aria-hidden="true"></i> Promo Video';
    return videoBtn;
}

function createBuyButton(link) {
    let buyBtn = document.createElement('button');
    buyBtn.className = "btn";
    buyBtn.title = "Buy";
    buyBtn.setAttribute('aria-label', buyBtn.title);
    buyBtn.onclick = function () {
        window.open(link);;
    }
    buyBtn.innerHTML = '<i class="ms-Icon ms-Icon--Shop" aria-hidden="true"></i> Buy';
    return buyBtn;
}

function createReviewsButton(link) {
    let reviewBtn = document.createElement('button');
    reviewBtn.className = "btn";
    reviewBtn.title = "Reviews";
    reviewBtn.setAttribute('aria-label', reviewBtn.title);
    reviewBtn.onclick = function () {
        window.open(link);;
    }
    reviewBtn.innerHTML = '<i class="ms-Icon ms-Icon--FavoriteList" aria-hidden="true"></i> Reviews';
    return reviewBtn;
}

function createShareButton() {
    let shareBtn = document.createElement('button');
    shareBtn.className = "btn";
    shareBtn.title = "Share";
    shareBtn.setAttribute('aria-label', shareBtn.title);
    shareBtn.onclick = shareCurrentPage;
    shareBtn.innerHTML = '<i class="ms-Icon ms-Icon--Share" aria-hidden="true"></i> Share';
    return shareBtn;
}