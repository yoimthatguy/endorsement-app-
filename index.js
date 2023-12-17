import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {

databaseURL: "https://endorsments-db-default-rtdb.firebaseio.com/"

}


const app = initializeApp(appSettings)

const database = getDatabase(app)

const endorsementsInDB = ref(database, "endorsementsList")


const inputFieldEl = document.getElementById("input-field")

const fromEl = document.getElementById("from-field")

const toEl = document.getElementById("to-field")


const addButtonEl = document.getElementById("publish-button")

const endorsementsEl = document.getElementById("endorsements")


addButtonEl.addEventListener("click", function() { 

let inputValue = inputFieldEl.value 

let fromValue = fromEl.value 

let toValue = toEl.value

let content = {

message: inputValue,

fromValue: fromValue,

to: toValue,

};


if (inputValue == "") {

alert("Please enter endorsement")

} else if (fromValue == "") {

alert("Please fill out from section")

} else if (toValue == "") {

alert("Please fill out to section") 

} else {

push(endorsementsInDB, content)

clearInputFieldEl() 

}

})


onValue(endorsementsInDB, function(snapshot) {

if (snapshot.exists()) {

let itemsArray = Object.entries(snapshot.val())

clearendorsementsEl()

for (let i = 0; i < itemsArray.length; i++) {

let currentItem = itemsArray[i]

let currentItemID = currentItem[0]

let currentItemValue = currentItem[1]

appendItemToEndorsementsEl(currentItem)

} 

} else {

endorsementsEl.innerHTML = "No items here... yet"

}

})


function clearendorsementsEl() {

endorsementsEl.innerHTML = ""

fromEl.innerHTML = ""

toEl.innerHTML = ""

}


function clearInputFieldEl() {

inputFieldEl.value = ""

}


function appendItemToEndorsementsEl(item) {

let itemID = item[0]

let itemValue = item[1]

let newEl = document.createElement("li")

newEl.innerHTML = `

<p><strong>To ${itemValue.to}</strong></p>

<p>${itemValue.message}</p>

<p><strong>From ${itemValue.fromValue}</strong></p>`

//newEl.addEventListener("click", function() {

// let exactLocationOfItemInDB = ref(database, `endorsementsList/${itemID}`)

// remove(exactLocationOfItemInDB)

//})

endorsementsEl.append(newEl)

}

