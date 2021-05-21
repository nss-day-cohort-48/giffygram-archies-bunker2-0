import { getPosts, getUsers } from "../data/provider.js"



const applicationElement = document.querySelector(".giffygram")

// number of posts since a given year
const postsSince = (year) => {
  const posts = getPosts()
  const epoch = Date.parse(`01/01/${year}`)
  const postsSinceYear = []

  for (const post of posts) {
    if (post.timestamp >= epoch) {
      postsSinceYear.push(post)
    }
  }
  return postsSinceYear.length
}

// set initial component state
let yearChosen = 2021
let postCount = postsSince(yearChosen)

// update post count when the user changes the year
applicationElement.addEventListener("change", changeEvent => {
  if (changeEvent.target.id === "yearSelection") {
    const yearAsNumber = parseInt(changeEvent.target.value)

    //update component state
    yearChosen = yearAsNumber
    postCount = postsSince(yearAsNumber)

    //tell main module that state has changed so that the app is re-rendered...
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
  }
})

applicationElement.addEventListener("change", changeEvent => {
  if (changeEvent.target.id === "userSelection") {
    const [, userId] = changeEvent.target.value.split("--")
    document.querySelector(".giffygram__feed").innerHTML = userPostFeedHTML(userId)
    // applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
  }
})

export const Footer = () => {
  
  //Footer HTML stuff
  return `
    <footer class ="footer">
      <div class="footer__item">
        Posts Since <select id="yearSelection">
          <option ${yearChosen === 2021 ? "selected": ""}>2021</option>
          <option ${yearChosen === 2021 ? "selected": ""}>2021</option>
          <option ${yearChosen === 2019 ? "selected": ""}>2019</option>
          <option ${yearChosen === 2018 ? "selected": ""}>2018</option>
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
        <input id="showOnlyFavorites" type="checkbox">
      </div>
    </footer>
  `
}

const footUserDropdownHTML = () => {
  let dropdownHTML = ``

  const users = getUsers()

  dropdownHTML += users.map((user) => `<option value=user--${user.id}>${user.name}</option>`)

  return dropdownHTML
}

const userPostFeedHTML = (userId) => {
  
  const posts = getPosts()
  const users = getUsers()

  const filteredPosts = posts.filter((post) => post.userId === parseInt(userId))
  filteredPosts.sort((post1, post2) => (post1.timestamp < post2.timestamp ? 1 : -1));
  let html = `
  ${filteredPosts
    .map((post) => {
      return `
      
      <section class="post">
        <header>
            <h2 class="post__title">${post.title}</h2>
        </header>

        <img class="post__image" src="${post.imageURL}">

        <div class="post__description">
        ${post.description}
        </div>

        <div class="post__tagline">
            Posted by
            <a href="#" class="profileLink" id="profile--2">
            ${users.find((user) => user.id === post.userId).name}
           </a>
        
            on ${new Date(post.timestamp).toLocaleDateString("en-US")}
        </div>

        <div class="post__actions">
            <div>
                <img id="favoritePost--4" class="actionIcon" src="/images/favorite-star-blank.svg">
            </div>
        </div>
        </section>
        
        
      `;
    })
    .join("")}`

    return html
}
