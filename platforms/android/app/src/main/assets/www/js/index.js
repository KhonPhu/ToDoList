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


//
document.getElementById("saveData").addEventListener("click", setLocalStorage);
document.getElementById("show").addEventListener("click", showLocalStorage);
document.getElementById("removeItem").addEventListener("click", removeProjectFromLocalStorage);

function setLocalStorage() {
  var ar = [...document.getElementsByTagName("li")].map(el => el.textContent);
  localStorage.setItem("newItem", ar);
}

function showLocalStorage() {
  alert(localStorage.getItem("newItem"));
  $('#myUL').empty();

  var getSavedItem = localStorage.getItem("newItem");

  var li = document.createElement("li");
  var t = document.createTextNode(getSavedItem);
  li.appendChild(t);
  document.getElementById("myUL").appendChild(li);


}

function removeProjectFromLocalStorage() {
  localStorage.removeItem("newItem");
  $('#myUL').empty();

}

