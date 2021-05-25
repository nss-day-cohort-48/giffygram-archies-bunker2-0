import { favoritePost, getDisplayFavorites, getPosts, getUsers, setChosenUser, setDisplayFavoritesToFalse, setDisplayFavoritesToTrue, getChosenUser } from "../data/provider.js";

const applicationElement = document.querySelector(".giffygram");

// number of posts since a given year
const postsSince = (year) => {
  const posts = getPosts();
  const epoch = Date.parse(`01/01/${year}`);
  const postsSinceYear = [];

  for (const post of posts) {
    if (post.timestamp >= epoch) {
      postsSinceYear.push(post);
    }
  }
  return postsSinceYear.length;
};

// set initial component state
let yearChosen = 2021;
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

const options = document.querySelectorAll("#userSelection option")

applicationElement.addEventListener("change", (changeEvent) => {
  if (changeEvent.target.id === "userSelection") {
    const [, userId] = changeEvent.target.value.split("--");
    // localStorage.setItem("selectedUserId", userId)

    // if (userId === "0") {
    //   applicationElement.dispatchEvent(new CustomEvent("stateChanged"))

    // } else  {
    // }
    setChosenUser(parseInt(userId));
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    // document.querySelector(".giffygram__feed").innerHTML = userPostFeedHTML(userId)
  }
});

applicationElement.addEventListener("change", changeEvent => {

  let favoritesDisplay = getDisplayFavorites()

  if(changeEvent.target.id === "showOnlyFavorites") {
    if(favoritesDisplay === false) {
      // localStorage.setItem("favoritesChecked", true)
      setDisplayFavoritesToTrue()
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
    else if(favoritesDisplay === true) {
      // localStorage.setItem("favoritesChecked", false)
      setDisplayFavoritesToFalse()
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
  }
})

export const Footer = () => {
  //Footer HTML stuff

  let favoritesDisplay = getDisplayFavorites()

  // const favoriteCheckBox = JSON.parse(localStorage.getItem("favoritesChecked"))
  
    return `
    <footer class ="footer">
      <div class="footer__item">
        Posts Since <select id="yearSelection">
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
          ${footUserDropdownHTML()}
        </select>
      </div>
        <div class="footer__item">
          Show only favorites
          <input id="showOnlyFavorites" type="checkbox" ${favoritesDisplay ? "checked" : ""}>
        </div>
      </footer>
    `;
};

const footUserDropdownHTML = () => {
  let dropdownHTML = ``;
  const selectedUserId = getChosenUser()
  const users = getUsers();

  dropdownHTML += users.map(
    (user) => `<option value="user--${user.id}" ${user.id === selectedUserId ? "selected" : ""}>${user.name}</option>`
  );

  return dropdownHTML;
};
