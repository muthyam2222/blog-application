import { StrictMode } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,Navigate,RouterProvider} from 'react-router-dom'
import RootLayout from './components/RootLayout.jsx'
import Home from './components/common/Home.jsx'
import SignIn from './components/common/SignIn.jsx'
import SignUp from './components/common/SignUp.jsx'
import AuthorProfile from './components/author/AuthorProfile.jsx'
import PostArticle from './components/author/PostArticle.jsx'
import UserProfile from './components/user/UserProfile.jsx'
import Articles from './components/common/Articles.jsx'
import ArticleById from './components/common/ArticleById.jsx'
import UserAuthorContext from './contexts/UserAuthorContext.jsx'

const browserRouterObj=createBrowserRouter([
  {
    path:"/",
    element:<RootLayout />,
    children:[
      {
        path:"",
        element:<Home />
      },
      {
        path:"signin",
        element:<SignIn />
      },
      {
        path:"signup",
        element:<SignUp />
      },
      {
        path:"user-profile/:email",
        element:<UserProfile />,
        children:[
          {
            path:"articles",
            element:<Articles />
          },
          {
            path:"articleId",
            element:<ArticleById />
          },
          {
            path:"",
            element:<Navigate to="articles" />
          }
        ]
      },
      {
        path:"author-profile/:email",
        element:<AuthorProfile />,
        children:[
          {
            path:"articles",
            element:<Articles />
          },
          {
            path:":articleId",
            element:<ArticleById />
          },
          {
            path:"article",
            element:<PostArticle />
          },
          {
            path:"",
            element:<Navigate to="articles" />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthorContext>
    <RouterProvider router={browserRouterObj} />
    {/* <App /> */}
    </UserAuthorContext>
  </StrictMode>,
)
