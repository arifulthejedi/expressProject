import { useEffect } from "react"

export default function CreateBlog(props) {

useEffect(()=>{

document.querySelector(".submit-blog").addEventListener("click",(e)=>{
e.preventDefault();

let form  = document.querySelector("#blog-form");


//getting formdata
let blogData = new FormData(form);
let data = {
    name:blogData.get('name'),
    email:blogData.get('email'),
    title:blogData.get('title'),
    body:blogData.get('body'),
    shortdesc:blogData.get('shortdesc'),

}


    fetch("http://localhost:3000/create-blog",{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data),
    }).then((res)=> res.json()).then((data)=>{
        let status  = document.querySelector("#blog-form .status-msg");
        status.style.color = "red";
            if(data['submit']){
                status.style.color = "green";
                form.reset();
                window.location.reload();
            }
            status.innerHTML = data['message'];

    }).catch((err)=>{
        console.log(err);
    })
})
},[])

    return <>
        <div className="create-blog">
            <center><div className="heading">Create Your Own Blog</div></center>
            <div class="form-container">
                <form id="blog-form" encType="multipart/form-data">
                    <input name="name" class="form-input" type="text" placeholder="Name" />
                    <input name="email" class="form-input" type="email" placeholder="Email" />
                    <input name="title" class="form-input" type="text" placeholder="Title" />
                    <textarea name="shortdesc" class="form-input" rows="4" placeholder="Short Description"></textarea>
                    <textarea name="body" class="form-input" rows="10" placeholder="Peragraph"></textarea>
                    <button class="submit-blog" type="submit">Submit</button>
                    <span style={{fontSize:".85rem",marginLeft:"10px"}} className="status-msg"></span>
                </form>
            </div>
        </div>
    </>
}