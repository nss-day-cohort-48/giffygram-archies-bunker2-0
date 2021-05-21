import { setMessageDisplayToTrue, getMessageDisplayMessage, setMessageDisplayToFalse } from "../data/provider.js";


const applicationElement = document.querySelector(".giffygram");



applicationElement.addEventListener("click", clickEvent => {

    let messageDisplay = getMessageDisplayMessage()
    
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
                <div class="notification__count">0</div>
            </div>

            <div class="navigation__item navigation__logout">
                <button id="logout" class="fakeLink">Logout</button>
            </div>
        </nav>
    `;
};