function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}



// DOM Elements & Variables
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.getElementById('close');
const btnClose = document.getElementById('btn-close');

const modalValidate = document.querySelector('.btn-submit');

let firstname = document.getElementById('first');
let lastname = document.getElementById('last');
let birth = document.getElementById('birthdate');
let email = document.getElementById('email');
let quantity = document.getElementById('quantity');
let locationTournament = document.querySelectorAll('input[name="location"]');
let conditions = document.querySelector('#checkbox1');
let locationcheck = false;


// validation input 
let validationError = {
  firstnameError: false,
  lastnameError: false,
  birthError: false,
  emailError: false,
  quantityError: false,
  locationsError: false,
  conditionsError: false
}

/* REGEX */
// birthdate regex test 
let regexDate = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
let regexDateTest = regexDate.test(birth.value);

// EVENT LISTENNER //
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch close modal event
modalClose.addEventListener('click', function(){
  closeModal();
});
btnClose.addEventListener('click', function(){
  closeModal();
})


// Form validation 
modalValidate.addEventListener('click', (event) => {
  event.preventDefault();

  checkInputs();
})


// FUNCTIONS 
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  document.querySelector('body').style.overflow = "hidden";
}
// close modal form
function closeModal(){
  modalbg.style.display = 'none';
  document.querySelector('body').style.overflow = "auto";
}


// check inputs
function checkInputs(){

  //control firstname and lastname
  if(firstname.value < 2 ){
    setErrorFor(firstname, 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.', 'firstnameError');
  } else {
    setSuccessFor(firstname, 'firstnameError');
  }

  if(lastname.value < 2){
    setErrorFor(lastname, 'Veuillez entrer 2 caractères ou plus pour le champ du nom.', 'lastnameError');
  } else {
    setSuccessFor(lastname, 'lastnameError');
  }

  //control mail
  if(!isEmail(email.value)){
    setErrorFor(email, 'Veuillez entrer une adresse email valide.' , 'emailError');
  } else {
    setSuccessFor(email, 'emailError');
  }

  // control birthdate

  if(!regexDate.test(birth.value)){
    setErrorFor(birth, 'Vous devez entrer votre date de naissance.', 'birthError');
  } else {
    setSuccessFor(birth, 'birthError');
  }

  // control quantity tournament 
  if(quantity.value === '' ){
    setErrorFor(quantity, "Veuillez saisir un nombre.", 'quantityError')
  } else{
    setSuccessFor(quantity, 'quantityError');
  }

  if(!isCityChecked()){
    setErrorFor(locationTournament[0], "Veuillez sélecionner une ville.", 'locationsError')
  }else{
    setSuccessFor(locationTournament[0], 'locationsError');
  }

  // control condition checkbox
  if(conditions.checked){
    setSuccessFor(conditions, 'conditionsError');
  } else {
    setErrorFor(conditions, "Vous devez vérifier que vous acceptez les termes et conditions.", 'conditionsError' );
  }

  validationPassed();
}


// setError function
function setErrorFor(input, message, key){
  validationError[key] = true;

  const formDataControl = input.parentElement; // .formData
  const errorMsg = formDataControl.querySelector('.erreur__msg');

  // add error message inside paragraph 
  errorMsg.innerText = message;

  // add error class 
  formDataControl.classList.add("error"); 
}

// setSuccess function
function setSuccessFor(input, key){
  validationError[key] = false;
  const formDataControl = input.parentElement; // .formData
  // add success class
  formDataControl.classList.remove('error');
  formDataControl.classList.add("success");
}

// Email Regex function
function isEmail(email){
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// Location control
function isCityChecked(){
  const arr = Array.from(locationTournament)

  return arr.some(radioBtn => radioBtn.checked == true)
}

function validationPassed(){

  const hasError = validationError.firstnameError || validationError.lastnameError || validationError.birthError || validationError.emailError || validationError.quantityError || validationError.locationsError || validationError.conditionsError ;

  if(hasError == false){
    document.querySelector('.modal-body').style.display = 'none';
    document.querySelector('.modal-body-2').style.display = 'flex';
    
  }
}