// /notes/:id 가 이 파일의 주소가 된다.

import React from 'react';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const {id} = router.query

  return <h1> Note {id} </h1>
};

export default Page;

