import { useEffect, useState } from "react";
import Comments from "./comments";

export default function Blog(props){

    //const [blogId,setBlogId] = useState(1);
    const [blog,setBlog] = useState([]);

    useEffect(()=>{
        const Id = window.location.pathname.split('/')[2];
        //setBlogId(Id);
        fetch(`http://localhost:3000/get-blog/${Id}`).then((res)=> res.json()).then((data)=>{
            setBlog(data);
            console.log(blog)
        }).catch((err)=>{
            console.log(err)
        })

    },[])

    return <>
    <div className="container">
    {blog && <div className="blog">
        <center><h1>{blog.title}</h1></center>
        <div className="blog-writter">{blog.authorname}</div>
        <div className="blog-body">
           {blog.body}
        </div>
    </div>}
      <Comments/>
    </div>
    </>
}