import Axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Item from "/src/component/item"
import Head from "next/head"

const Post = ({item, name}) => {
  console.log(process.env.name)
  return (
  <>
  {item && (
  <>
  <Head>
      <title>{item.name}</title>
      <meta name="description" content={item.description} ></meta>
  </Head>
  {name} 환경입니다. 
  <Item item={item}/>
  </>
  )
  }
  </>
  )
}

export default Post

export async function getServerSideProps(context){
    //context는 여러가지 정보를 보여준다. 
    const id = context.params.id;
    const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json` 
    const res = await Axios.get(apiUrl);
    const data = res.data;

    return {
        props: {
            item : data,
            name : process.env.name
        }
    }
}

//이렇게 내용들이 들어가게 되면, seo나 공유들이 잘 활용될 수 있다.  


















