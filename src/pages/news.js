import * as React from "react"
import Header from "../components/header";
import NewsItems from "../components/news-items";

// markup
const NewsPage = () => {
    return (
        <>
            <Header/>
                <NewsItems/>
        </>
    )
}

export default NewsPage