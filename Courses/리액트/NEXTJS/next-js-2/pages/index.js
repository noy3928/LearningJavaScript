import Axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Divider, Header, Loader } from 'semantic-ui-react'
import styles from '../styles/Home.module.css'
import ItemList from "/src/component/ItemList"

export default function Home({list}) {
  return (
    <div>
    <Head>
      <title>HOME | 코딩앙마</title>
      <meta name="description" content="코딩 앙마 홈입니다."></meta>
    </Head>
    <Header as="h3" style={{paddingTop : 40}} >베스트 상품</Header>
    <Divider/>
      <ItemList list={list} />    
    </div>
  )
}


export async function getStaticProps(context){
  const apiUrl = process.env.apiUrl
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL; // 퍼블릭 환경이 아니기 때문에 NEXT_PUBLIC을 붙일 필요가 없다.
  const res = await Axios.get(apiUrl);
  const data = res.data;

  return {
      props: {
          list : data,
          name : process.env.name
      }
  }
}

//이렇게 내용들이 들어가게 되면, seo나 공유들이 잘 활용될 수 있다.  

//빈 화면을 만들고, api 요청을 해오는 것이 아니라, 이미 api 요청이 다 되어있는 페이지를 불러오는 것이 static 페이지다. 

