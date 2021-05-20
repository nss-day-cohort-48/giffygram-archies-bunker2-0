
import { Footer } from "./nav/Footer.js"
import { NavBar } from "./nav/NavBar.js"
import { MessageForm } from "./message/MessageForm.js"

export const GiffyGram = () => {

    // Show main main UI
    return `
    ${ NavBar() }
    ${ MessageForm() }
    
    ${ Footer() }
    `
}
