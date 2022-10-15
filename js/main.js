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
    let birthday = document.querySelector("#birthDay");
    birthday.innerHTML = "";
    daysArr.forEach((item) => {
        let options = document.createElement("option");
        options.textContent = item;
        birthday.append(options);
    })
}
function populateMonth() {
    birthMonth.html("");
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

country.on("change", applyDrop);
createUserAcc.on("click", validateForm);
$(document).ready(function () {
    populateDay();
    populateMonth();
    populateCountry();
});