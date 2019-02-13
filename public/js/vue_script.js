
//Fetches the menu items from menu.js
var burgers = menu;

//Prints the menu options on the website
printMenu(burgers);


//Prints the kcal & ingredient info for a menu item
function printNotes(burger, id){
    var section = document.getElementById(id); 

    var listItem0 = document.createElement("LI");  
    var listValue0 = document.createTextNode(burger.kCal + " kcal");
    listItem0.appendChild(listValue0);
    section.appendChild(listItem0); 
    
    if(burger.gluten){
        var listItem1 = document.createElement("LI");  
        var listValue1 = document.createTextNode("Contains gluten");
        listItem1.appendChild(listValue1);
        section.appendChild(listItem1);
    }
    if(burger.lactose){
        var listItem2 = document.createElement("LI");
        var listValue2 = document.createTextNode("Contains lactose");
        listItem2.appendChild(listValue2);
        section.appendChild(listItem2);
    }
    if(burger.veg){
        var listItem3 = document.createElement("LI");
        var listValue3 = document.createTextNode("Vegeterian");
        listItem3.appendChild(listValue3);
        section.appendChild(listItem3);
    }
}


//Prints title, image & info for a menu item
function printItem(burger, menuNr){
    var nr = menuNr.toString();
    
    var nameClass = "burger" + menuNr;
    var imgClass = "img" + menuNr;
    var infoClass = "info" + menuNr;
    
    document.getElementById(nameClass).innerHTML = burger.name;
    
    var img = document.createElement("img");
    img.src = burger.img;
    img.width = "300";
    var src = document.getElementById(imgClass);
    src.appendChild(img);

    printNotes(burger, infoClass);
}


//Prints out all menu items
function printMenu(burgers){
    for(n = 0; n < burgers.length; n++){
        var burger = burgers[n];
        printItem(burger, n+1);
    }
}


//Prints the chosen option from a question in the "customer info" section
function displayInfo(id, n, info, infoValues){
    var toDisplay = info+infoValues[n];
    document.getElementById(id).innerHTML = toDisplay;
}

/*
new Vue({
    el: '#button',
    methods: {
        markDone: function() {
            console.log("Button clicked!");
            var customerInfo = getCustomerInfo();

            displayInfo("displayName", 0, "Name: ", customerInfo);
            displayInfo("displayEmail", 1, "Email: ", customerInfo);
            displayInfo("displayPayment", 2, "Payment method: ", customerInfo);
            displayInfo("displayGender", 3, "Gender: ", customerInfo);
            displayInfo("displayMenuChoice", 4, "Menu choice: ", customerInfo);

            document.getElementById("order").style.visibility = "visible";

        }   
    }
});
*/

function menuChoice(){
    if(document.querySelector('#checkbox1:checked') != null){
        return burgers[0].name;
    }
    else if(document.querySelector('#checkbox2:checked') != null){
        return burgers[1].name;
    }
    else if(document.querySelector('#checkbox3:checked') != null){
        return burgers[2].name;
    }
}


//Fetches the chosen options from the "customer info" section
function getCustomerInfo(){
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var payment = document.getElementById("payment method").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var burger = menuChoice();
    if(burger == undefined){
        burger = "No item chosen";
    }

    return [name, email, payment, gender, burger];
}


'use strict';
var socket = io();

var vm = new Vue({
  el: '#orders',
    data: {
        display: false,
        burger: "not chosen",
        name: "empty",
        email: "empty",
        payment: "not chosen",
        gender: "not chosen",
        coordinates: {"x": "", "y": ""},
        orderId: 0
        //orderList: []
    },
    methods: {
        getNext: function () {
            var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
                return Math.max(last, next);
            }, 0);
            return lastOrder + 1;
        },
        addOrder: function() {
            this.burger = menuChoice();
            this.name = document.getElementById("name").value;
            this.email = document.getElementById("email").value;
            this.payment = document.getElementById("payment method").value;
            this.gender = document.querySelector('input[name="gender"]:checked').value;
            console.log("Button clicked!");
            var customerInfo = getCustomerInfo();

            displayInfo("displayName", 0, "Name: ", customerInfo);
            displayInfo("displayEmail", 1, "Email: ", customerInfo);
            displayInfo("displayPayment", 2, "Payment method: ", customerInfo);
            displayInfo("displayGender", 3, "Gender: ", customerInfo);
            displayInfo("displayMenuChoice", 4, "Menu choice: ", customerInfo);

            document.getElementById("order").style.visibility = "visible";
            
            this.orderId++;
            socket.emit("addOrder", { orderId: this.orderId, 
                                      details: { x: this.coordinates.x, 
                                                 y: this.coordinates.y},
                                      orderItems: [this.burger],
                                      name: this.name,
                                      email: this.email,
                                      payment: this.payment,
                                      gender: this.gender
                                    });
        },
        displayOrder: function() {
            var offset = {x: event.currentTarget.getBoundingClientRect().left,
                          y: event.currentTarget.getBoundingClientRect().top};
            this.coordinates.x = event.clientX - 10 - offset.x;
            this.coordinates.y = event.clientY - 10 - offset.y;
            this.display = true;
        }
    }
});
