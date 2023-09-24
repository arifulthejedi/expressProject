import { useEffect, useState } from "react"
import UpdateBlog from "./update-blog"

export default function Card(props){
    const [modal,openModal] = useState(false);


    let updateOpen = ()=>{
        openModal(true);
    }

    let updateClsoe = ()=>{
        openModal(false);
    }



useEffect(()=>{
    const del = document.querySelector('#card-'+props.el.id);

    del.addEventListener("click",()=>{

        console.log("delete");
     fetch(`http://localhost:3000/delete-blog/${props.el.id}`,{
        method:"DELETE",
     }).then((res)=>{
         return res.json();
     }).then((data)=>{
         if(data['delete']){
            window.location.reload();
         }else{
            console.log("Something wents wrong");
         }
     }).catch((err)=>{
        console.log(err)
     })
    })
},[])



    return<>
    <div className="card">
                    <div class="card-header">{props.el.title}</div>
                    <div class="card-content">
                        <p>{props.el.shortdesc}</p>
                        <span><a href={'/blog/' + props.el.id}><button>More</button></a></span>
                        <span><button id={'card-'+props.el.id}  style={{ backgroundColor: "red" }}>Delete</button></span>
                        <span><button onClick={updateOpen}  id={"blog-update"}>Update</button></span>

                    </div>
        <div class="card-footer"> by {props.el.authorname}</div>
    </div>
     {modal && <UpdateBlog close={updateClsoe} blogId={props.el.id}/>}
    </>
}