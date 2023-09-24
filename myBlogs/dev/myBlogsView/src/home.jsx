import { useEffect } from "react";
import CreateBlog from "./create-blog";
import Card from "./card";

export default function Home(props) {


    return <>
        <div id="home" className="home">
            <div className="container">
                {props.data && props.data.map((el, i) =>
                (<Card key={i} el={el}/>)
                )}
            </div>
            <div className="btn-group">
                    <button onClick={props.prev}>&#8592;</button>
                    <button onClick={props.next}>&#8594;</button>
                </div>
        </div>
        <CreateBlog/>
    </>
}