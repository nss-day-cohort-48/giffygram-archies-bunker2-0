

export const Register = () => {
  return `
        <h1>Register Form</h1>
        <div class="registerForm">
            <form>
            <fieldset>
                <label for="name">Name:</label>
                <input type="text" name="userName" autofocus placeholder="Name" />
            </fieldset>
                <fieldset>
                    <label for="email">Email:</label>
                    <input type="text" name="email" autofocus placeholder="Email address" />
                </fieldset>
                <fieldset>
                    <label for="password">Password:</label>
                    <input type="password" name="password" placeholder="Password" />
                </fieldset>
            </form>
            <button id="registerButton">Register New User</button>
    `;
};
