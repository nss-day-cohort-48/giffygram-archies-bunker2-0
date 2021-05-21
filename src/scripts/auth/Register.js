import { postNewUser } from "../data/provider.js";


const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "registerButton") {
        const userName = document.querySelector("input[name='userName']").value
        const userEmail = document.querySelector("input[name='email']").value
        const userPassword = document.querySelector("input[name='password']").value

        const newUserToSendToApi = {
            name: userName,
            email: userEmail,
            password: userPassword
        }

        if (userName.length === 0 || userEmail.length === 0 || userPassword.length === 0 ) {
            window.alert("Please fill out the form")
            
        } else { 
            postNewUser(newUserToSendToApi) 
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        }



    }
    else if (clickEvent.target.id === "cancelButton") {
        localStorage.removeItem("gg_newUser")
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})



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
