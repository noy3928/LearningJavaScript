// 폴더 안에 index 파일을 생성하면 기본적으로 해당 폴더의 default 라우터가 된다.
import React from 'react';
import Link from "next/link"

const Page = () => {
    return(
        <div>
            <h1>Note Index Pages</h1>
            <Link href="/notes/[id]" as={`/notes/1`} >
                <a>
                    Go to 1
                </a>
            </Link>
        </div>      
    )
};
export default Page;
