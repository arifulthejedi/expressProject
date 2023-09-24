import { useEffect, useState } from "react";

import cross from "./assets/cross.svg";

export default function UpdateBlog(props){

  let [blog,getBlog] = useState({});

  useEffect(()=>{

    fetch(`http://localhost:3000/get-blog/${props.blogId}`).then((res)=> res.json()).then((data)=>{
       getBlog(data);
    }).catch((err)=>{
      console.log(err)
    })


//form data
let form  = document.querySelector("#blog-form");





document.querySelector("#update-blog").addEventListener("click",(e)=>{
  e.preventDefault();

  //getting formdata
let blogData = new FormData(form);
let blog = {
    id:props.blogId,
    authorname:blogData.get('name'),
    email:blogData.get('email'),
    title:blogData.get('title'),
    body:blogData.get('body'),
    shortdesc:blogData.get('shortdesc'),

}

  fetch("http://localhost:3000/update-blog",{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(blog),
    }).then((res)=> res.json()).then((data)=>{
        let status  = document.querySelector("#blog-form .status-msg");
        status.style.color = "red";
            if(data['update']){
                status.style.color = "green";
                window.location.reload();
            }
            status.innerHTML = data['message'];

    }).catch((err)=>{
        console.log(err);
    })
 })

  },[])



return <>
   <div className="update">
        <div className="modal">
        <div onClick={props.close}  className="cross">
          <img src={cross} alt="cross" height={"30px"} width={"30px"} />
        </div>
        <div class="form-container">
                <form id="blog-form" encType="multipart/form-data">
                    <input defaultValue={blog.authorname} name="name" class="form-input" type="text" placeholder="Name" />
                    <input defaultValue={blog.email} name="email" class="form-input" type="email" placeholder="Email" />
                    <input defaultValue={blog.title} name="title" class="form-input" type="text" placeholder="Title" />
                    <textarea defaultValue={blog.shortdesc} name="shortdesc" class="form-input" rows="4" placeholder="Short Description"></textarea>
                    <textarea defaultValue={blog.body} name="body" class="form-input" rows="10" placeholder="Peragraph"></textarea>
                    <button id="update-blog" type="submit">Update</button>
                    <span style={{fontSize:".85rem",marginLeft:"10px"}} className="status-msg"></span>
                </form>
            </div>
        </div>
    </div>
    </>
}