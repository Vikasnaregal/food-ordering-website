let cart = [];
let history = JSON.parse(localStorage.getItem("orderHistory")) || [];

// ADD TO CART
function addToCart(item, price){

let found = cart.find(i => i.name === item);

if(found){
found.qty += 1;
}
else{
cart.push({name:item, price:price, qty:1});
}

updateCartCount();
showCart();
}

// SHOW CART
function showCart(){

document.getElementById("miniCart").style.display="none";

let rows = "";
let subtotal = 0;

for(let i=0; i<cart.length; i++){

let itemTotal = cart[i].price * cart[i].qty;
subtotal += itemTotal;

rows += "<tr>"
+ "<td>"+cart[i].name+"</td>"
+ "<td>₹"+cart[i].price+"</td>"
+ "<td>"+cart[i].qty+"</td>"
+ "<td><button onclick='deleteItem("+i+")'>X</button></td>"
+ "</tr>";
}

document.getElementById("cartItems").innerHTML = rows;

let cgst = subtotal * 0.025;
let sgst = subtotal * 0.025;
let total = subtotal + cgst + sgst;

document.getElementById("cgst").innerHTML = "CGST (2.5%): ₹" + cgst.toFixed(2);
document.getElementById("sgst").innerHTML = "SGST (2.5%): ₹" + sgst.toFixed(2);
document.getElementById("total").innerHTML = "Total: ₹" + total.toFixed(2);

document.getElementById("cartPopup").style.display = "block";
}

// HIDE CART
function hideCart(){
document.getElementById("cartPopup").style.display="none";
document.getElementById("miniCart").style.display="block";
}

// UPDATE CART BAR
function updateCartCount(){
let count = document.getElementById("itemCount");
let total = document.getElementById("barTotal");

let sum = 0;

cart.forEach(function(i){
sum += i.price;
});

if(count){
count.innerText = cart.length;
}

if(total){
total.innerText = sum;
}
}

// PLACE ORDER
function placeOrder(){

if(cart.length === 0){
alert("Cart is empty!");
return;
}

let currentUser = localStorage.getItem("currentUser");

let userHistory = JSON.parse(localStorage.getItem(currentUser + "_orders")) || [];

userHistory.push([...cart]);

localStorage.setItem(currentUser + "_orders", JSON.stringify(userHistory));

alert("Order Placed Successfully!");

cart = [];
updateCartCount();
hideCart();
}

// DELETE ITEM
function deleteItem(index){

if(cart[index].qty > 1){
cart[index].qty -= 1;
}
else{
cart.splice(index,1);
}

updateCartCount();
showCart();
}
function logout(){
alert("Logout Clicked");
window.location.href = "index.html";
}
function login(){

let user = document.getElementById("username").value;
let pass = document.getElementById("password").value;

if(user=="admin" && pass=="1234"){

localStorage.setItem("isLoggedIn", true);

window.location.href="home.html";

}
else{
alert("Invalid Login");
}
}
function showRegister(){
document.getElementById("registerBox").style.display="block";
}

function hideRegister(){
document.getElementById("registerBox").style.display="none";
}

// REGISTER USER
function register(){

let user = document.getElementById("newUser").value;
let pass = document.getElementById("newPass").value;

if(user=="" || pass==""){
alert("Enter details");
return;
}

let users = JSON.parse(localStorage.getItem("users")) || [];

users.push({username:user, password:pass});

localStorage.setItem("users", JSON.stringify(users));

alert("Registered Successfully!");
hideRegister();
}

// LOGIN
function login(){

let user = document.getElementById("username").value;
let pass = document.getElementById("password").value;

let users = JSON.parse(localStorage.getItem("users")) || [];

let valid = users.find(u => u.username === user && u.password === pass);

if(valid){

localStorage.setItem("currentUser", user);   // ⭐ save logged user

window.location.href="home.html";

}
else{
alert("Invalid Login");
}
}
