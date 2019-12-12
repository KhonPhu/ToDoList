# Cordova Plugin use

**For dialogs pop-up**

> cordova plugin add cordova-plugin-dialogs

**For camera use**

> cordova plugin add cordova-plugin-camera


# index.html

```html

<!DOCTYPE html>

<html>

<head>

    <meta name="viewport" content="initial-scale=1, width=device-width, viewport-fit=cover">
    <link rel="stylesheet" type="text/css" href="css/index.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <title>Hello World</title>
</head>

<body>
    <div id="myDIV" class="header">

        <h2 style="margin:5px">My List</h2>

        <!-- Profile Image -->
        <div>
            <button id="profileImage"><img id="myImage" src="img/dummy-image.png"></button>
        </div>

        <br>

        <!-- Input field and add button -->
        <div>
            <input type="text" id="myInput" placeholder="Title...">
            <span onclick="newElement()" class="addBtn">Add</span>
        </div>
    </div>

    <!-- Example List -->
    <ul id="myUL">

    </ul>

    <br>

    <div>
        <span id="saveData" class="saveBtn">Save</span>
    </div>

    <div>
        <span id="show" class="loadBtn">Load</span>
    </div>

    <div>
        <span id="removeItem" class="resetBtn">Reset List</span>
    </div>

    <script type="text/javascript" src="cordova.js"></script>
    <script type="text/javascript" src="js/index.js"></script>


</body>

</html>

```

# index.js

```javascript

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {

  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

// When Back button is pressed, popup the confirmation box
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  document.addEventListener("backbutton", function (e) {
    navigator.notification.confirm("Are you sure?", fnLogout, "EXIT", "OK,CANCEL");
  }, false);
}

function fnLogout(button) {
  if (button == 1) {
    navigator.app.exitApp(); //exit if press "ok"
  } else {
    return; //No action if press "cancel"
  }
}

// Request to capture a photo when click on image
document.getElementById("profileImage").addEventListener("click", takePhoto);

// Function that force app to capture new photo
function takePhoto() {
  navigator.camera.getPicture(onSuccess, onFail, {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
  });
  // If capture success, show image to box
  function onSuccess(imageData) {
    var image = document.getElementById("myImage");
    image.src = "data:image/jpeg;base64," + imageData;
  }

  // If fail popup message
  function onFail(message) {
    alert("Failed: " + message);
  }
}


//Save, Load, and Delete item using local storage
//Call the Button  by Event Listener
document.getElementById("saveData").addEventListener("click", setLocalStorage);
document.getElementById("show").addEventListener("click", showLocalStorage);
document.getElementById("removeItem").addEventListener("click", removeProjectFromLocalStorage);

//Save item to storage
function setLocalStorage() {
  var ar = [...document.getElementsByTagName("li")].map(el => el.textContent);
  localStorage.setItem("newItem", ar);
}

//Display the storage
function showLocalStorage() {
  alert(localStorage.getItem("newItem"));
  $('#myUL').empty();

  var getSavedItem = localStorage.getItem("newItem");

  var li = document.createElement("li");
  var t = document.createTextNode(getSavedItem);
  li.appendChild(t);
  document.getElementById("myUL").appendChild(li);


}

//Remove item and clear the list
function removeProjectFromLocalStorage() {
  localStorage.removeItem("newItem");
  $('#myUL').empty();

}
```


# index.css

```css

* {
    -webkit-tap-highlight-color: rgba(0,0,0,0); /* make transparent link selection, adjust last value opacity 0 to 1.0 */
}

/* Portrait layout (default) */
.app {
    background:url(../img/logo.png) no-repeat center top; /* 170px x 200px */
    position:absolute;             /* position in the center of the screen */
    left:50%;
    top:50%;
    height:50px;                   /* text area height */
    width:225px;                   /* text area width */
    text-align:center;
    padding:180px 0px 0px 0px;     /* image height is 200px (bottom 20px are overlapped with text) */
    margin:-115px 0px 0px -112px;  /* offset vertical: half of image height and text area height */
                                   /* offset horizontal: half of text area width */
}

/* Landscape layout (with min-width) */
@media screen and (min-aspect-ratio: 1/1) and (min-width:400px) {
    .app {
        background-position:left center;
        padding:75px 0px 75px 170px;  /* padding-top + padding-bottom + text area = image height */
        margin:-90px 0px 0px -198px;  /* offset vertical: half of image height */
                                      /* offset horizontal: half of image width and text area width */
    }
}

 
.blink {
    animation:fade 3000ms infinite;
    -webkit-animation:fade 3000ms infinite;
}


/* General Styles */
body {
    margin: 0;
    min-width: 250px;
  }
  
  /* Include the padding and border in an element's total width and height */
  * {
    box-sizing: border-box;
  }
  
  /* Remove margins and padding from the list */
  ul {
    margin: 0;
    padding: 0;
  }
  
  /* Style the list items */
  ul li {
    cursor: pointer;
    position: relative;
    padding: 12px 8px 12px 40px;
    list-style-type: none;
    background: #eee;
    font-size: 18px;
    transition: 0.2s;
    
    /* make the list items unselectable */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  /* Set all odd list items to a different color (zebra-stripes) */
  ul li:nth-child(odd) {
    background: #f9f9f9;
  }
  
  /* Darker background-color on hover */
  ul li:hover {
    background: #ddd;
  }
  
  /* When clicked on, add a background color and strike out text */
  ul li.checked {
    background: #888;
    color: #fff;
    text-decoration: line-through;
  }
  
  /* Add a "checked" mark when clicked on */
  ul li.checked::before {
    content: '';
    position: absolute;
    border-color: #fff;
    border-style: solid;
    border-width: 0 2px 2px 0;
    top: 10px;
    left: 16px;
    transform: rotate(45deg);
    height: 15px;
    width: 7px;
  }
  
  /* Style the close button */
  .close {
    position: absolute;
    right: 0;
    top: 0;
    padding: 12px 16px 12px 16px;
  }
  
  .close:hover {
    background-color: #c4926a;
    color: white;
  }
  
  /* Style the header */
  .header {
    background-color: #c4926a;
    padding: 30px 40px;
    color: white;
    text-align: center;
  }
  
  /* Clear floats after the header */
  .header:after {
    content: "";
    display: table;
    clear: both;
  }
  
  /* Style the input */
  input {
    margin: 0;
    border: none;
    border-radius: 0;
    width: 75%;
    padding: 10px;
    float: left;
    font-size: 16px;
  }
  
  /* Style the "Add" button */
  .addBtn {
    padding: 10px;
    width: 25%;
    background: #d9d9d9;
    color: #555;
    float: left;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
    border-radius: 0;
  }
  
  .addBtn:hover {
    background-color: #bbb;
  }

  /* Style the "Save" button */
  .saveBtn {
    padding: 10px;
    width: 25%;
    background: #8e6747;
    color: black;
    float: left;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
    border-radius: 0;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  
  .saveBtn:hover {
    background-color: #bbb;
  }
  /* Style the "Load" button */
  .loadBtn {
    padding: 10px;
    width: 25%;
    background: #8e6747;
    color: black;
    float: left;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
    border-radius: 0;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  
  .loadBtn:hover {
    background-color: #bbb;
  }
  /* Style the "reset" button */
  .resetBtn {
    padding: 10px;
    width: 25%;
    background: #8e6747;
    color: black;
    float: left;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
    border-radius: 0;
    position: absolute;
    
  }
  
  .resetBtn:hover {
    background-color: #bbb;
  }


  #myImage{
    display: block;
    margin: 0px;
    width: 100px;
    height: 100px;
  }
  
  ```
