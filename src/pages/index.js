import * as React from "react"
import Header from '../components/header'
import NewsItems from '../components/news-items'
import '../style/index.scss'

// markup
const IndexPage = () => {
    return (
      <>
          <Header/>
            <NewsItems />
      </>
  )
}

export default IndexPage