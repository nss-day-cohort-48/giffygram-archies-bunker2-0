import { 
  getDisplayFavorites, 
  getPosts, 
  getUsers, 
  setChosenUser, 
  setDisplayFavoritesToFalse, 
  setDisplayFavoritesToTrue, 
  getChosenUser, 
  setProfileDisplayToFalse } from "../data/provider.js";

//find the element we're looking to target based on the class
const applicationElement = document.querySelector(".giffygram");

// number of posts since a given year
const postsSince = (year) => {
  //get the list of posts
  const posts = getPosts();
  //convert the chosen year to beginning of that year
  // an epoch is an instant in time chosen as the origin of a particular calendar era
  const epoch = Date.parse(`01/01/${year}`);
  //declare a variable to hold the posts
  const postsSinceYear = [];

  //iterate through the posts to find posts with a timestamp greater than the epoch timestamp
  for (const post of posts) {
    //if the timestamp is greater
    if (post.timestamp >= epoch) {
      //push it to the array
      postsSinceYear.push(post);
    }
  }
  //return the length of the array to get the number of posts since a given year
  return postsSinceYear.length;
};

// set initial component state
let yearChosen = "Year";
// invoke the postsSince function with paramater equal to the chosen year
let postCount = postsSince(yearChosen);

// update post count when the user changes the year
applicationElement.addEventListener("change", (changeEvent) => {
  if (changeEvent.target.id === "yearSelection") {
    const yearAsNumber = parseInt(changeEvent.target.value);

    //update component state
    yearChosen = yearAsNumber;
    postCount = postsSince(yearAsNumber);

    //tell main module that state has changed so that the app is re-rendered...
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});

// update the posts shown when the user changes the user to show
applicationElement.addEventListener("change", (changeEvent) => {
  if (changeEvent.target.id === "userSelection") {
    const [, userId] = changeEvent.target.value.split("--");

    //update the application state
    //set chosen user to the integer version of the UserID
    setChosenUser(parseInt(userId));
    //set display profile to false to prevent the dropdown from changing to the chosenUser
    setProfileDisplayToFalse()
    //tell main module that the state has changed so the app is re-rendered...
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});

applicationElement.addEventListener("change", changeEvent => {

  let favoritesDisplay = getDisplayFavorites()

  if(changeEvent.target.id === "showOnlyFavorites") {
    if(favoritesDisplay === false) {
      setProfileDisplayToFalse()
      setDisplayFavoritesToTrue()
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
    else if(favoritesDisplay === true) {
      setDisplayFavoritesToFalse()
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
  }
})

//Footer HTML stuff
export const Footer = () => {

  let favoritesDisplay = getDisplayFavorites()
  
    return `
    <footer class="footer">
      <div class="footer__item">
        Posts Since <select id="yearSelection">
          <option ${yearChosen === "Year" ? "selected" : ""}>Year</option>
          <option ${yearChosen === 2021 ? "selected" : ""}>2021</option>
          <option ${yearChosen === 2020 ? "selected" : ""}>2020</option>
          <option ${yearChosen === 2019 ? "selected" : ""}>2019</option>
          <option ${yearChosen === 2018 ? "selected" : ""}>2018</option>
          </select>
          <span id="postCount">${postCount}</span>
      </div>
      <div class="footer__item">
        Posts by user <select id="userSelection">
          <option value="user--0">Choose User</option> 
          ${footerUserDropdownHTML()}
        </select>
      </div>
        <div class="footer__item">
          Show only favorites
          <input id="showOnlyFavorites" type="checkbox" ${favoritesDisplay ? "checked" : ""}>
        </div>
      </footer>
    `;
};

const footerUserDropdownHTML = () => {
  let dropdownHTML = ``;
  const selectedUserId = getChosenUser()
  const users = getUsers();

  dropdownHTML += users.map(
    (user) => `<option value="user--${user.id}" ${user.id === selectedUserId ? "selected" : ""}>${user.name}</option>`
  );

  return dropdownHTML;
};
