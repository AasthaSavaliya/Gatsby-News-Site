import React from "react"
import {graphql, Link, StaticQuery} from "gatsby"


const NewsItems = () =>
	(<>
			<StaticQuery query={graphql`
	{
	allContentfulNews
	{
		edges
		{
			node
			{
				slug
				title
				content
				{
					content
				}
				thumbnail
				{
					file
					{
						url
					}
					title
				}
			}
		}
	}
}		
    `}
						 render={data =>

							 <>
								 <div className="blog-container">
									 {data?.allContentfulNews?.edges?.map (({node}, i) => (
										 <div className="blog-card">
											 {node?.thumbnail?.map (e => {
												 return <img key={e.file.url} src={e.file.url} alt={"sdfv"}/>
											 })
											 }
											 <h4>{node?.title}</h4>
											 <p>{node?.slug}<Link to="#">Read more</Link></p>
											 <p>{node?.content?.content}</p>
										 </div>
									 ))}
								 </div>
							 </>
						 }
			>
			</StaticQuery>
		</>
	)

export default NewsItems