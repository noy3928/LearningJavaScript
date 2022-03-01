// /notes/:id 가 이 파일의 주소가 된다.

import React from 'react';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const {params} = router.query

  console.log(params)

  return <h1> Note </h1>
};

export default Page;

