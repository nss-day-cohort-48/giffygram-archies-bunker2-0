import { setMessageDisplayToTrue, 
    getMessageDisplayMessage, 
    setMessageDisplayToFalse, 
    getInboxDisplay,
    getDisplayProfile,
    setInboxDisplay,
    setInboxDisplayToFalse, 
    setInboxDisplayToTrue, 
    setDisplayFavoritesToFalse, 
    setProfileDisplayToFalse,
    setProfileDisplayToTrue,
    getUsers,
    setChosenUserProfileId} from "../data/provider.js";
import {MessageCounter} from "./MessageCounter.js"


const applicationElement = document.querySelector(".giffygram");

//click event to log current user out
applicationElement.addEventListener("click", clickEvent => {
       if (clickEvent.target.id === "logout") {
            localStorage.removeItem("gg_user")
            setProfileDisplayToFalse()
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
       }          
    })

    applicationElement.addEventListener("click", clickEvent => {
        if (clickEvent.target.id === "profile") {
             
             setProfileDisplayToTrue()
             setChosenUserProfileId(parseInt(localStorage.getItem("gg_user")))
             applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        }          
     })

//click event to look at or write DMs
applicationElement.addEventListener("click", clickEvent => {

    //look at the application state
    let messageDisplay = getMessageDisplayMessage()
    let inboxDisplay = getInboxDisplay()
    
    //to write a DM
    if(clickEvent.target.id === "directMessageIcon") {
        if(messageDisplay === false) {
            setMessageDisplayToTrue()
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        }
        else if (messageDisplay === true) {
            setMessageDisplayToFalse()
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
    //to look at DMs
    else if(clickEvent.target.id === "inboxIcon") {
        if(inboxDisplay === false) {
            setInboxDisplayToTrue()
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        }
        else if (inboxDisplay === true) {
            setInboxDisplayToFalse()
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
}
})

applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "logo") {
        setInboxDisplay(false)
        setMessageDisplayToFalse()
        setDisplayFavoritesToFalse()
        setProfileDisplayToFalse()
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})


export const NavBar = () => {

    const users = getUsers()
    const currentUserId = parseInt(localStorage.getItem("gg_user"))
    const userName = users.find((user) => user.id === currentUserId).name;
    const displayProfile = getDisplayProfile()


  return `
        <nav class="navigation">
            <div class="navigation__item navigation__icon">
                <img src="../images/pb.png" alt="Giffygram icon" id="logo"/>
            </div>
            <div class="navigation__item navigation__name">
                GIFFYGRAM by CJW, AJW, & theJMDW
            </div>
            
            <div class="navigation__item navigation__message">
                <img id="directMessageIcon" src="../images/fountain-pen.svg" alt="Direct message" />
                <div class="notification__count" id="inboxIcon">${MessageCounter(currentUserId)}</div>
            </div>

            <div>
            <div class="navigation__item navigation__logout">
                <button id="${displayProfile ? "logout" : "profile"}" class="fakeLink"> ${displayProfile ? "Logout" : userName}</button>
            </div>
            </div>
             
        </nav>
    `;
};