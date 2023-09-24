
import { useEffect } from "react";

export default function MakeComment(props){

    useEffect(()=>{

        document.querySelector(".submit-comment").addEventListener("click",(e)=>{
        e.preventDefault();
        
        let form  = document.querySelector("#comment-form");
        const Id = window.location.pathname.split('/')[2];

        
        
        //getting formdata
        let blogData = new FormData(form);
        let data = {
            postId:Id,
            name:blogData.get('name'),
            email:blogData.get('email'),
            body:blogData.get('body'),        
        }
        
            fetch("http://localhost:3000/create-comment",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(data),
            }).then((res)=> res.json()).then((data)=>{
                let status  = document.querySelector("#comment-form .status-msg");
                status.style.color = "red";
                    if(data['submit']){
                        status.style.color = "green";
                        form.reset();
                    }
                    status.innerHTML = data['message'];
        
            }).catch((err)=>{
                console.log(err);
            })
        })

        },[])

    return <>
    <div className="make-comment">
        <form id="comment-form">
        <input name="name" class="form-input" type="text" placeholder="Name" />
        <input name="email" class="form-input" type="email" placeholder="Email" />
        <textarea name="body" class="form-input" rows="4" placeholder="Say Something"></textarea>
        <button class="submit-comment" type="submit">Comment</button>
        <span style={{fontSize:".9rem",marginLeft:"20px"}} className="status-msg"></span>
        </form>
    </div>
    </>
}