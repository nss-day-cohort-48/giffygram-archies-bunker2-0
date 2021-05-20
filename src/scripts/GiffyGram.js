import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./nav/Footer.js"

export const GiffyGram = () => {

    // Show main main UI
    return `
    <h1>Giffygram</h1>
    ${ NavBar() }
    ${ Footer() }
    `
}
