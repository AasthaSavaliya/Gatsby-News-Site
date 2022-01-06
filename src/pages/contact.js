import * as React from "react"
import Header from "../components/header";
import {Contact} from "../components/Contact";
import {Provider} from "react-redux";
import {STORE} from "../_/store";

// markup
const ContactPage = () => {
    return (
        <Provider store={STORE}>
        <Header/>
            <Contact/>
        </Provider>
)
}

export default ContactPage