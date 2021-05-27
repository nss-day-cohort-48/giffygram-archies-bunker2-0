import { getUsers } from "../data/provider.js";

const applicationElement = document.querySelector(".giffygram")

//click event on the Register button
document.addEventListener('click', (clickEvent) => {
  if (clickEvent.target.id === "startRegister") {
    let newUser = true
    //let the app know we have a new user and store it locally
    localStorage.setItem("gg_newUser", newUser)
    //render the app now that app state has changed
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    //remove the new user from the local storage
    localStorage.removeItem("gg_newUser", newUser)
  }
})


//click event on the Login button
document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "loginButton") {
    //declare a found user variable
    let foundUser = null;
    // get the users list from the app state
    const users = getUsers();
    // get the email and password values from the form
    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='password']").value;
    //iterate the users list to find a user
    for (const user of users) {
      //if the user's inputs from the form match a user's email and password
      if (user.email === email && user.password === password) {
        //we found the user to login
        foundUser = user;
      }
    }
    // if we found a user
    if (foundUser !== null) {
      //store that user locally
      localStorage.setItem("gg_user", foundUser.id);
      // app state has changed so tell it to rerender
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    }
  }
});


//Login Form HTML
export const LoginForm = () => {
    return /*html*/ `
        <div class="loginForm">
          <h1>Login Form</h1>
            <form>
                <fieldset>
                    <label for="email">Email:</label>
                    <input type="text" name="email" autofocus placeholder="Email address" />
                </fieldset>
                <fieldset>
                    <label for="password">Password:</label>
                    <input type="password" name="password" placeholder="Password" />
                </fieldset>
            </form>
            <button id="loginButton">Login</button>
            <button id="startRegister">Register</button>
        </div>
    `;
};
