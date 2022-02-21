import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}

// getStaticPaths which returns an array of possible values for id 
export async function getStaticPaths() {
    // Return a list of possible value for id

    const paths = getAllPostIds()
    return {
      paths,
      fallback: false
    }
}

// getStaticProps which fetches necessary data for the post with id 
export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id

    const postData = getPostData(params.id)
    return {
      props: {
        postData
      }
    }
}