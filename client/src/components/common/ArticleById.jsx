import React, { useContext, useState } from 'react'
import {useLocation} from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { MdDelete,MdRestore  } from "react-icons/md";
import {userAuthorContextObj} from '../../contexts/UserAuthorContext'
import { useForm } from 'react-hook-form' 
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function ArticleById() {
  
  const {state}=useLocation()
  const {currentUser}=useContext(userAuthorContextObj)
  const [editArticleStatus,setEditArticleStatus]=useState(false)
  const { register, handleSubmit } = useForm()
  const navigate=useNavigate()

  //function to edit an article
  function enableEdit(){
    setEditArticleStatus(true)
  }

  //to save modified article
   async function onSave(modifiedArticle){
    const articleAfterChanges={...state,...modifiedArticle}
    //add date of modification
    const currentDate=new Date();
    articleAfterChanges.dateOfModification=currentDate.getDate()+"-"+currentDate.getMonth()+"-"+currentDate.getFullYear()+" "+currentDate.toLocaleTimeString("en-US",{hour12:true})
    //make http post req
    let res=await axios.put(`http://localhost:3000/author-api/article/${articleAfterChanges.articleId}`)
    //change edit article status to false
    setEditArticleStatus(false)
  }

  return (
    <div className='container'>
      {
        editArticleStatus===false?<>
          <div className="d-flex justify-content-between">
            <div className="mb-5 author-block w-100 px-4 py-2 rounded-2 d-flex justify-content-between align-items-center">
              <div>
                <p className="display-3 me-4">{state.title}</p>
                <span className="py-3">
                  <small className="text-secondary me-4">Created on : {state.dateOfCreation}</small>
                  <small className="text-secondary me-4">Modified on : {state.dateOfModification}</small>
                </span>
              </div>
              <div className="author-details text-center">
                <img src={state.authorData.profileImageUrl} width="60px" alt="" className="rounded-circle" />
                <p>{state.authorData.nameOfAuthor}</p>
              </div>
              </div>
              {
                currentUser.role==='author' && (
                  <div className="d-flex me-3">
                    <button className="btn btn-light me-3" onClick={enableEdit}><FaEdit className='text-warning' /></button>
                    {
                      state.isArticleActive===true?(
                        <button className="btn btn-light me-2"><MdDelete className='text-danger fs-4' /></button>
                      ):(
                        <button className="btn btn-light me-2" ><MdRestore  className='text-info fs-4' /></button>
                      )
                    }
                  </div>
                )
              }
          </div>
          <p className="lead mt-3 article-content" style={{whiteSpace:"pre-line"}}>
            {state.content}
          </p>
          <div>
            <div className="comments my-4">
              {
                state.comments.length===0?<p className='display-3'>No comments yet...</p>:
                state.comments.map((commentObj)=>{
                  <div key={commentObj._id}>
                    <p className="user-name">
                      {commentObj?.nameOfUser}
                    </p>
                    <p className="comment">
                      {commentObj?.comment}
                    </p>
                  </div>
                })
              }
            </div>
          </div>
        </>:
        <form onSubmit={handleSubmit(onSave)}>
          <div className="mb-4">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              defaultValue={state.title}
              {...register("title")}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="form-label">
              Select a category
            </label>
            <select
              {...register("category")}
              id="category"
              className="form-select"
              defaultValue={state.category}
            >
              <option value="programming">Programming</option>
              <option value="AI&ML">AI&ML</option>
              <option value="database">Database</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
              {...register("content")}
              className="form-control"
              id="content"
              rows="10"
              defaultValue={state.content}
            ></textarea>
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      }
    </div>
  )
}

export default ArticleById