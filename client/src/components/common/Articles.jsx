import {useState,useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '@clerk/clerk-react'

function Articles() {

  const [articles,setArticles]=useState([])
  const [error,setError]=useState('')
  const navigate=useNavigate()
  const {getToken}=useAuth();
  
  //get articles
  async function getArticles(){
    //get jwt token
    const token=await getToken()
    //make authenticated req
    let res=await axios.get('http://localhost:3000/author-api/articles',{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    if(res.data.message==='articles'){
      setArticles(res.data.payload)
    }else{
      setError(res.data.message)
    }
  }

  //navigate to article by id
  function goToArticleById(articleObj){
    navigate(`../${articleObj.articleId}`,{state:articleObj})
  }


  useEffect(()=>{
    getArticles()
  },[])

  

  return (
    <div className='container'>
      <div>
        {error.length!==0 && <p className='display-4 text-center mt-5 text-danger'>{error}</p>}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2">
          {
            articles.map((articleObj)=><div className='col' key={articleObj.articleId}>
              <div className="card h-100">
                <div className="card-body">
                  <div className="author-details text-end">
                    <img src={articleObj.authorData.profileImageUrl} width="40px" alt="" className="rounded-circle" />
                    <p><small className="text-secondary">{articleObj.authorData.nameOfAuthor}</small></p>
                  </div>
                  <h5 className="card-title">{articleObj.title}</h5>
                  <p className="card-text">{articleObj.content.substring(0,80)+"...."}</p>
                  <button className="custom-btn btn-4" onClick={()=>goToArticleById(articleObj)}>Read more</button>
                </div>
                <div className="card-footer"> 
                  <small className="text-body-secondary">Last updated on {articleObj.dateOfModification}</small>
                </div>
              </div>
            </div>)
          }
        </div>
      </div>
    </div>
  )
}

export default Articles