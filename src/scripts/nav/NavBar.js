import { setMessageDisplayToTrue, getMessageDisplayMessage, setMessageDisplayToFalse, getInboxDisplay, setInboxDisplayToFalse, setInboxDisplayToTrue } from "../data/provider.js";


const applicationElement = document.querySelector(".giffygram");
// const logoutElement = document.getElementById("logout");

applicationElement.addEventListener("click", clickEvent => {
       if (clickEvent.target.id === "logout") {
            localStorage.removeItem("gg_user")
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
       }   
        
    })



applicationElement.addEventListener("click", clickEvent => {

    let messageDisplay = getMessageDisplayMessage()
    let inboxDisplay = getInboxDisplay()
    
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

export const NavBar = () => {
  return /*html*/ `
        <nav class="navigation">
            <div class="navigation__item navigation__icon">
                <img src="../images/pb.png" alt="Giffygram icon" id="logo"/>
            </div>
            <div class="navigation__item navigation__name">
                Giffygram
            </div>
            
            <div class="navigation__item navigation__message">
                <img id="directMessageIcon" src="../images/fountain-pen.svg" alt="Direct message" />
                <div class="notification__count" id="inboxIcon">0</div>
            </div>

            <div class="navigation__item navigation__logout">
                <button id="logout" class="fakeLink">Logout</button>
            </div>
        </nav>
    `;
};