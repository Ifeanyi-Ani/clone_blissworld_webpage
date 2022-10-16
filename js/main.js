let email = $("#email");
let emailError = $("#emailError");
let password = $("#password");
let passwordError = $("#passwordError");
let passwordConfirm = $("#passwordConfirm");
let passwordConfirmError = $("#passwordConfirmError");
let birthMonth = $("#birthMonth");
let birthMonthError = $("#birthMonthError");
let birthDay = $("#birthDay");
let birthDayError = $("#birthDayError");
let firstName = $("#firstName");
let firstNameError = $("#firstNameError");
let lastName = $("#lastName");
let lastNameError = $("#lastNameError");
let address = $("#address");
let addressError = $("#addressError");
let zipCode = $("#zipCode");
let zipCodeError = $("#zipCodeError");
let city = $("#city");
let cityError = $("#cityError");
let country = $("#country");
let countryError = $("#countryError");
let state = $("#state");
let stateError = $("#stateError");
let phoneNum = $("#phoneNum");
let phoneNumError = $("#phoneNumError");
let acceptTerms = $("#acceptTerms");
let acceptTermsError = $("#acceptTermsError");
let createUserAcc = $("#createUserAcc");
// login variable
let loginE=$("#loginE");
let loginEerror=$("#loginEerror");
let loginP=$("#loginP");
let loginPerror=$("#loginPerror");
let btn2=$("#btn2");

// website views variables
let blissOriginals=$(".blissOriginals");
let fallFav=$(".fallFav");
let bestSellers=$(".bestSellers");
let cleaners=$(".cleaners");
let productSampleGrid=$(".product-sample-grid");
let fullCartView=$(".fullCartView");
let productDetails=[];
let cartItems=[];
let cleanerM=[];
let bstsellers=[];
let original=[];
let fallfavorite=[];



let daysArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
let monthArr = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let countryArr = 
[["Nigeria", "Enugu"],
["Nigeria","Lagos"],
["Nigeria","Abia"],
["Niger","Niamey"],
["Norway","Oslo"],
["Egypt","Cairo"]];
let userData = [];

// populating drop-down 
function populateDay() {
    // birthday.innerHTML = "";
    daysArr.forEach((item) => {
        birthDay.append("<option>" + item + "</option")
    })
}
function populateMonth() {
    // birthMonth.html("");
    monthArr.forEach((item) => {
        birthMonth.append("<option>" + item + "</option")
    })
}
function populateCountry() {
    let uniqueOption = new Set();
    countryArr.forEach(r => uniqueOption.add(r[0]));
    let uniqueList = [...uniqueOption];

    // country.html("");
    uniqueList.forEach(item => {
        country.append("<option>" + item + "</option")
    })
}
function applyDrop(){
    let choose=country.val();
    populateState(countryArr, choose);
}
function populateState(data,index){
    let filterArr = data.filter(r => r[0] === index);
    let uniqueOption = new Set();
    filterArr.forEach(r => uniqueOption.add(r[1]));
    let uniqueList = [...uniqueOption];

    state.html("");
    uniqueList.forEach(item => {
        state.append("<option>" + item + "</option")
    }) 
}

// validating new user
function validateForm() {
    if (email.val() == "") {
        emailError.html("<i>field is required</i>");
    } else {
        emailError.html("");
    }
    if (password.val() == "") {
        passwordError.html("<i>field is required</i>");
    } else {
        passwordError.html("");
    }
    if (passwordConfirm.val() == "") {
        passwordConfirmError.html("<i>field is required</i>");
    } else if (passwordConfirm.val() != password.val()) {
        passwordConfirmError.html("<i>password does not match</i>");
    } else {
        passwordConfirmError.html("");
    }
    if (firstName.val() == "") {
        firstNameError.html("<i>field is required</i>");
    } else {
        firstNameError.html("");
    }
    if (lastName.val() == "") {
        lastNameError.html("<i>field is required</i>");
    } else {
        lastNameError.html("");
    }
    if (address.val() == "") {
        addressError.html("<i>field is required</i>");
    } else {
        addressError.html("");
    }
    if (zipCode.val() == "") {
        zipCodeError.html("<i>field is required</i>");
    } else {
        zipCodeError.html("");
    }
    if (city.val() == "") {
        cityError.html("<i>field is required</i>");
    } else {
        cityError.html("");
    }
    if (country.val() == "") {
        countryError.html("<i>field is required</i>");
    } else {
        countryError.html("");
    }
    if (state.val() == "") {
        stateError.html("<i>field is required</i>");
    } else {
        stateError.html("");
    }
    if (phoneNum.val() == "") {
        phoneNumError.html("<i>field is required</i>");
    } else {
        phoneNumError.html("");
    }


    if (email.val() != "" &&
        (passwordConfirm.val() == password.val()) &&
        firstName.val() != "" &&
        lastName.val() != "" &&
        address.val() != "" &&
        zipCode.val() != "" &&
        city.val() != "" &&
        country.val() != "" &&
        state.val() != "" &&
        phoneNum.val() != ""
    ) {
        createUser()
    }
}

// creating user and sending it to api
function createUser() {
    let userObj = { "name": firstName.val() + " " + lastName.val(), "email":email.val(),"phone":phoneNum.val(), "password":password.val() };

    $.ajax({
        type:"post",
        url:"http://159.65.21.42:9000/register",
        data:userObj,
        success:function(response){
          console.log(response);
    
          if(response["error"]){
            alert(response["error"])
          }else{
            alert(`${response["name"]} registration successful`)
            //window.location.href=""
          }
    
        },
        error:function(error){
          alert(error.statusText)
        }
      })
}
// Login section
function validateLogin(){
    if(loginE.val()==""){
        loginEerror.html("<i>please enter your email</i>");
    }else{
        loginEerror.html("");
    }
    if(loginP.val()==""){
        loginPerror.html("<i>please enter your Password</i>");
    }else{
        loginPerror.html("");
    }
    if(loginE.val()!=""&& loginP.val()!=""){
        checkLoginUser();
    }
}
function checkLoginUser(){
    $.ajax({
      type:"get",
      url:"http://159.65.21.42:9000/users",
      data:({
        email:loginE.val(),
        password:loginP.val()
      }),
      success:function(response){
        if(response==loginE.val){
            console.log("hello")
        }
        console.log(response)
      },
      error:function(error){
        alert(error.statusText)
      }
    })
}
// Loading shop view data by categories
function displayProduct(){
    productsView.html(" <h2>Loading data ..........</h2>")
    $.ajax({
      type:"get",
      url:"http://159.65.21.42:9000/products",
      success:function(response){
        console.log(response)
        productDetails=response
        productDetails=productDetails.reverse()
        let productView="";
        for(let i=0;i<productDetails.length;i++){
          if(productDetails[i]["category"]=="Bestsellers" ||productDetails[i]["category"]=="Fall Favorite"||productDetails[i]["category"]=="Originals"||productDetails[i]["category"]=="cleansers & Moistures" ){
          productView+=` <tr>
      <td>${i+1}</td>
      <td>${productDetails[i]["name"]}</td>
      <td class="mobi-disabled">${productDetails[i]["description"]}</td>
      <td class="mobi2-disabled">
          <div class="img-con"><img src="${productDetails[i]["image"]}" alt="" id="imgDis"></div>
      </td>  
      <td>$${productDetails[i]["price"]}</td>
      <td>${productDetails[i]["category"]}</td>
      <td class="mobi-disabled">${productDetails[i]["quantity"]}</td>
      <td><a href="#" class="edit-btn" index="${i}"><ion-icon name="pencil-outline"></ion-icon></a></td>
      <td><a href="#" class="delete-btn" index="${i}"><ion-icon name="trash-outline"></ion-icon></a></td>
      </tr>`
      $(".productItems").text(`${i+1}`)
          }
        }
        productsView.html(productView);
      },
      error:function(error){
        alert(error.statusText)
      }
    })
  }
function originals(){
    blissOriginals.html(" <h2>Loading data ..........</h2>")
    $.ajax({
      type:"get",
      url:"http://159.65.21.42:9000/products",
      success:function(response){
       original=response
        original=original.reverse()
        let quickView="";
        for (let i=0; i<original.length; i++){
          if(original[i]["category"]=="Originals"){
          quickView+=`<div class="item">
          <div class="item-img-container">
              <a href="#"><img src="${original[i]["image"]}" alt=""></a>
              <div class="view">
                  <a href="#">QUICK VIEW</a>
              </div>
          </div>
          <div class="rate-us">
              <i class="fa fa-heart" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
          </div>
          <div class="content">
              <h3><a href="#" class="originalIndC" originalInd=${i}>${original[i]["name"]}</a></h3>
              <p>${original[i]["description"]}</p>
          </div>
          <button type="button" class="addtoCart" indx="${i}">ADD TO BAG $${original[i]["price"]}</button>
      </div>`
          }
        };
      
      blissOriginals.html(quickView);
      },
      error:function(error){
        alert(error.statusText)
      }
    })
}

function fallFavorite(){
    fallFav.html(" <h2>Loading data ..........</h2>")
    $.ajax({
      type:"get",
      url:"http://159.65.21.42:9000/products",
      success:function(response){
       fallfavorite=response
        fallfavorite=fallfavorite.reverse()
        let quickView="";
        for (let i=0; i<fallfavorite.length; i++){
          if(fallfavorite[i]["category"]=="Fall Favorite"){
          quickView+=`<div class="item">
          <div class="item-img-container">
              <a href="#"><img src="${fallfavorite[i]["image"]}" alt=""></a>
              <div class="view">
                  <a href="#">QUICK VIEW</a>
              </div>
          </div>
          <div class="rate-us">
              <i class="fa fa-heart" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
          </div>
          <div class="content">
              <h3><a href="#">${fallfavorite[i]["name"]}</a></h3>
              <p>${fallfavorite[i]["description"]}</p>
          </div>
          <button type="button" class="addtoCart" indx="${i}">ADD TO BAG $${fallfavorite[i]["price"]}</button>
      </div>`
          }
        };
      
      fallFav.html(quickView);
      },
      error:function(error){
        alert(error.statusText)
      }
    })
}
function bestsellers(){
    bestSellers.html(" <h2>Loading data ..........</h2>")
    $.ajax({
      type:"get",
      url:"http://159.65.21.42:9000/products",
      success:function(response){
       bstsellers=response
        bstsellers=bstsellers.reverse()
        let quickView="";
        for (let i=0; i<bstsellers.length; i++){
          if(bstsellers[i]["category"]=="Bestsellers"){
          quickView+=`<div class="item">
          <div class="item-img-container">
              <a href="#"><img src="${bstsellers[i]["image"]}" alt=""></a>
              <div class="view">
                  <a href="#">QUICK VIEW</a>
              </div>
          </div>
          <div class="rate-us">
              <i class="fa fa-heart" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
          </div>
          <div class="content">
              <h3><a href="#">${bstsellers[i]["name"]}</a></h3>
              <p>${bstsellers[i]["description"]}</p>
          </div>
          <button type="button" class="addtoCart" indx="${i}">ADD TO BAG $${bstsellers[i]["price"]}</button>
      </div>`
          }
        };
      
        bestSellers.html(quickView);
      },
      error:function(error){
        alert(error.statusText)
      }
    })
}
function cleanersM(){
    cleaners.html(" <h2>Loading data ..........</h2>")
    $.ajax({
      type:"get",
      url:"http://159.65.21.42:9000/products",
      success:function(response){
       cleanerM=response
        cleanerM=cleanerM.reverse()
        let quickView="";
        for (let i=0; i<cleanerM.length; i++){
          if(cleanerM[i]["category"]=="cleansers & Moistures"){
          quickView+=`<div class="item">
          <div class="item-img-container">
              <a href="#"><img src="${cleanerM[i]["image"]}" alt=""></a>
              <div class="view">
                  <a href="#">QUICK VIEW</a>
              </div>
          </div>
          <div class="rate-us">
              <i class="fa fa-heart" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
          </div>
          <div class="content">
              <h3><a href="#">${cleanerM[i]["name"]}</a></h3>
              <p>${cleanerM[i]["description"]}</p>
          </div>
          <button type="button" class="addtoCart" indx="${i}">ADD TO BAG $${cleanerM[i]["price"]}</button>
      </div>`
          }
        };
      
      cleaners.html(quickView);
      },
      error:function(error){
        alert(error.statusText)
      }
    })
}
function addtoCart(){
    let i=$(this).attr("indx");
    if(original){
        cartItems.push(original[i])
       localStorage.setItem("bag", JSON.stringify(cartItems));
    }
    else if (fallfavorite){
        cartItems.push(fallfavorite[i])
       localStorage.setItem("bag", JSON.stringify(cartItems));
    }
    else if(bstsellers){
        cartItems.push(bstsellers[i])
       localStorage.setItem("bag", JSON.stringify(cartItems));
    }
    
    else if(cleanerM){
    cartItems.push(cleanerM[i])
    localStorage.setItem("bag", JSON.stringify(cartItems));
    }
    displayCart();
}
function displayCart() {
    let bagStorage= localStorage.getItem("bag")
    if(bagStorage!=null){
      cartItems=JSON.parse(bagStorage)
    }
    $(".cartCounter").html(`<span class="logo-con"><i class="fa fa-suitcase"
    aria-hidden="true"><span>${cartItems.length}</span></i></span>
<span class="text">bag</span>`)
    let row = "" 
    for (let i = 0; i < cartItems.length; i++) {
      row+=`<tr>
      <td class="img-col"><div><img
                  src="${cartItems[i]["image"]}"
                  alt=""></div></td>
      <td class="details"><h3>${cartItems[i]["name"]}</h3>
          <p>${cartItems[i]["description"]}</p></td>
      <td class="quantity">
          <div class="box">
              <button><i class="fa fa-minus"
                      aria-hidden="true"></i>
              </button>
              <input type="number">
              <button><i class="fa fa-plus"
                      aria-hidden="true"></i></button>
          </div>
      </td>
      <td class="amount">$${cartItems[i]["price"]}</td>
      <td class="delete"><a href="#" idx="${i}" class="delCart">Remove</a></td>
  </tr>`
    }
  
    fullCartView.html(row)
  }

  function delCartItem(){
    let i=$(this).attr("idx");
    console.log(cartItems[i])
    cartItems.splice(i,1);
    localStorage.setItem("bag", JSON.stringify(cartItems));
    displayCart();
  }

// event Listeners for registering User
country.on("change", applyDrop);
createUserAcc.on("click", validateForm);
$(document).ready(function () {
    populateDay();
    populateMonth();
    populateCountry();
    originals();
    fallFavorite();
    bestsellers();
    cleanersM();
    displayCart();
});
// login event Listeners
btn2.on("click", validateLogin);
productSampleGrid.on("click",".addtoCart", addtoCart);
fullCartView.on("click",".delCart", delCartItem);
blissOriginals.on("click",".originalIndC", previewOriginal)

