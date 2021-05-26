import { postNewUser } from "../data/provider.js";

const applicationElement = document.querySelector(".giffygram");

// click event on the Register Form
applicationElement.addEventListener("click", clickEvent => {
    //if Register New User button is clicked
    if (clickEvent.target.id === "registerButton") {
        //get the values from the form
        const userName = document.querySelector("input[name='userName']").value
        const userEmail = document.querySelector("input[name='email']").value
        const userPassword = document.querySelector("input[name='password']").value

        //format those values into a new user object
        const newUserToSendToApi = {
            name: userName,
            email: userEmail,
            password: userPassword
        }
        // make sure the form is filled out
        if (userName.length === 0 || userEmail.length === 0 || userPassword.length === 0 ) {
            //if not yell at the user to fill out the form
            window.alert("Please fill out the form")
        //otherwise 
        } else {
            //send the new user object to the API
            postNewUser(newUserToSendToApi)
            //tell the app the state has changed
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
    //other the Cancel button was clicked
    else if (clickEvent.target.id === "cancelButton") {
        //remove the new user from the the local storage
        localStorage.removeItem("gg_newUser")
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})
//Register Form HTML
export const Register = () => {
  return `
        <h1>Register Form</h1>
        <div class="registerForm">
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
                    <label for="password">Password:</label>
                    <input type="password" name="password" placeholder="Password123" required/>
                </fieldset>
            </form>
            <button id="registerButton">Register New User</button>
            <button id="cancelButton">Cancel</button>
    `;
};
