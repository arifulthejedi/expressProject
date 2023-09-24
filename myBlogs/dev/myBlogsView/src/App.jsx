import { useEffect, useState } from 'react'
import UpdateBlog from './update-blog'
import Home from './home'
import CreateBlog from './create-blog'
import Comments from './comments'
import Blog from './blog'
import AppRouter from './router';


function App() {
  const [blogs,fetchBlogs] = useState([]);
  const [offset,setOffset] = useState(0);
  const [count,setCount] = useState(0);
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);
  const [create,setCreate]  = useState(false);

  const next = ()=>{
    if(count > 10){
        setOffset((pre) => (pre+10))
    }
  }

  const prev = ()=>{
    if(offset > 10){
        setOffset((pre) => (pre-10))
    }
  }

  useEffect(()=>{
    fetch(`http://localhost:3000/${offset}`).then((res)=> res.json()).then((data)=>{
       fetchBlogs(data.blogs);
       setCount(data.count);
    }).catch((err)=>{
      console.log(err);
    })

//setting item on local storage



//routing
const handleRouteChange = () => {
  setCurrentRoute(window.location.pathname);
};

window.addEventListener('popstate', handleRouteChange);

return () => {
  window.removeEventListener('popstate', handleRouteChange);
}
  },[offset])




  const renderRoute = () => {
    const regex = /^\/blog\/\d+$/;

    if(currentRoute == "/")
         return <Home data={blogs} next={next} prev={prev}/>;
    else if(regex.test(currentRoute))
          return <Blog />;
    else
       return <div>Page not found</div>;

  };

  return <div>{renderRoute()}</div>;

}

export default App
