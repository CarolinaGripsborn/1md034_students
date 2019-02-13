
//Prints the kcal & ingredient info for a menu item
function printNotes(burger, id){
    var section = document.getElementsByClassName(id)[0]; 

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
    
    document.getElementsByClassName(nameClass)[0].innerHTML = burger.name;

    var img = document.createElement("img");
    img.src = burger.img;
    img.width = "300";
    var src = document.getElementsByClassName(imgClass)[0];
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


//Displays all chosen options from the "customer info" section
document.getElementById("button").onclick = function(){
    console.log("Button clicked!");
    var customerInfo = getCustomerInfo();

    displayInfo("displayName", 0, "Name:  ", customerInfo);
    displayInfo("displayEmail", 1, "Email:  ", customerInfo);
    displayInfo("displayStreet", 2, "Street:  ", customerInfo);
    displayInfo("displayHouse", 3, "House nr:  ", customerInfo);
    displayInfo("displayPayment", 4, "Payment method:  ", customerInfo);
    displayInfo("displayGender", 5, "Gender:  ", customerInfo);
    displayInfo("displayMenuChoice", 6, "Menu choice:  ", customerInfo);

    document.getElementById("order").style.visibility = "visible";
}


//Checks which menu item was chosen
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
    var street = document.getElementById("street").value;
    var house = document.getElementById("house").value;
    var payment = document.getElementById("payment method").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var burger = menuChoice();
    if(burger == undefined){
        burger = "No item chosen";
    }

    return [name, email, street, house, payment, gender, burger];
}


