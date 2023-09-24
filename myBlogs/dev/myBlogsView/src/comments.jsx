import { useEffect, useState } from "react";
import MakeComment from "./make-comment";

export default function Comments(props) {

const [comments,getComments] = useState(null);

useEffect(()=>{
    const Id = window.location.pathname.split('/')[2];
    fetch(`http://localhost:3000/get-comments/${Id}`).then((res)=> res.json()).then((data)=>{
     getComments(data);
     console.log(comments,data);
    })
},[])


return <>
        <div className="comments-section">
            <div className="container">
                <MakeComment/>
                <div className="comments">
                    {comments   &&  comments.map(((item,index)=>
                        (<div key={index} className="comment-container">
                        <div class="comment-card">
                            <div class="comment-name">{item.name}</div>
                            <div class="comment-text">
                                <span>"</span>{item.body}<span>"</span>
                            </div>
                            <div className="comment-email"><a style={{textDecoration:"none"}} href={`mailto:${item.email}`}>{item.email}</a></div>
                            <div class="comment-date"> Posted On{item.date}</div>
                        </div>
                    </div>)
                   ))}
                </div>
            </div>
        </div>
    </>
}