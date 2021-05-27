import { postNewUser } from "../data/provider.js";

const applicationElement = document.querySelector(".giffygram");

// click event on the Register Form
applicationElement.addEventListener("click", (clickEvent) => {
  //if Register New User button is clicked
  if (clickEvent.target.id === "registerButton") {
    //get the values from the form
    const userName = document.querySelector("input[name='userName']").value;
    const userEmail = document.querySelector("input[name='email']").value;
    const userProfileImg = document.querySelector("input[name='avatar']").value;
    const userPassword = document.querySelector("input[name='password']").value;

    //format those values into a new user object
    const newUserToSendToApi = {
      name: userName,
      email: userEmail,
      imageURL: userProfileImg,
      password: userPassword,
    };
    // make sure the form is filled out
    if (
      userName.length === 0 ||
      userEmail.length === 0 ||
      userPassword.length === 0
    ) {
      //if not yell at the user to fill out the form
      //----  window.alert("Please fill out the form");
      showRegisterErrorMessage();

      //otherwise
    } else {
      //send the new user object to the API
      postNewUser(newUserToSendToApi);
      window.alert("Registration Complete!");

      //tell the app the state has changed
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    }
  }
  //other the Cancel button was clicked
  else if (clickEvent.target.id === "cancelButton") {
    //remove the new user from the the local storage
    localStorage.removeItem("gg_newUser");
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});

const showRegisterErrorMessage = () => {
  const divError = document.getElementById("registerError");
  divError.classList.toggle("registerError");
};

//Register Form HTML
export const Register = () => {
  return /*html*/ `

  <div class="registerForm">
  <h1>Register Form</h1>
            <form>
            <fieldset>
                <label for="name">Name:</label>
                <input type="text" name="userName" autofocus placeholder="Don Joe" required />
            </fieldset>
                <fieldset>
                    <label for="email">Email:</label>
                    <input type="email" name="email" autofocus placeholder="don@joe.com" required/>
                </fieldset>
                <fieldset>
                    <label for="profilePic">Profile Image URL:</label>
                    <input type="text" name="avatar" autofocus placeholder="getavataaars.com" required/>
                </fieldset>
                <fieldset>
                    <label for="password">Password:</label>
                    <input type="password" name="password" placeholder="Password123" required/>
                </fieldset>
                </form>
                <div id="registerError" class="registerError"><h4 class="registerErrorMessage">PLEASE FILL OUT ALL ENTRIES!</h4></div>
                <button id="registerButton">Register New User</button>
                <button id="cancelButton">Cancel</button>
                `;
};
