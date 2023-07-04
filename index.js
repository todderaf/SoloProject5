import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://champions-5e3c4-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const championsListInDB = ref(database, "championsList")

const inputFieldEl = document.querySelector('#input-field')
const publishBtn = document.querySelector('#publish-btn')
const endorsementListEl = document.querySelector('#endorsement-list')

publishBtn.addEventListener("click", () => {
    const inputValue = inputFieldEl.value
    push(championsListInDB, inputValue)
    clearInputField()
    console.log(inputFieldEl.value)
})

onValue(championsListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let endorsementsArray = Object.entries(snapshot.val())
        clearEndorsementList()
        endorsementsArray.forEach(item => {
            let currentItem = item
            let currentItemID = item[0]
            let currentItemValue = item[1]
            appendToEndorsementsList(currentItem)
        })
    }
})

function clearInputField() {
    inputFieldEl.value = ""
}

function clearEndorsementList() {
    endorsementListEl.innerHTML = ""
}

function appendToEndorsementsList(itemArr) {
    let itemID = itemArr[0]
    let itemValue = itemArr[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue

   endorsementListEl.append(newEl)
}
