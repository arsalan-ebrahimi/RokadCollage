import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Layout & Core Pages
import Layout from "../Layout";
import Auth from "../Pages/Auth";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";

// Course Module
import Course from "../Pages/Course";
import CoursePage from "../Pages/Course/CoursePage";
import CreateCourse from "../Pages/Course/CreateCourse";
import UpdateCourse from "../Pages/Course/UpdateCourse";

// Comment Module
import Comment from "../Pages/Comment";
import CommentPage from "../Pages/Comment/CommentPage";
import CreateComment from "../Pages/Comment/CreateComment";
import UpdateComment from "../Pages/Comment/UpdateComment";

// Blog Module
import Blog from "../Pages/Blog";
import BlogPage from "../Pages/Blog/BlogPage";
import CreateBlog from "../Pages/Blog/CreateBlog";
import UpdateBlog from "../Pages/Blog/UpdateBlog";

// Seo Module
import SeoSettings from "../Pages/SeoSettings";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "course",
        element: <Course />,
        children: [
          { index: true, element: <CoursePage /> },
          { path: "create", element: <CreateCourse /> },
          { path: "update/:id", element: <UpdateCourse /> },
        ],
      },
      {
        path: "comment",
        element: <Comment />,
        children: [
          { index: true, element: <CommentPage /> },
          { path: "create", element: <CreateComment /> },
          { path: "update/:id", element: <UpdateComment /> },
        ],
      },
      {
        path: "blog",
        element: <Blog />,
        children: [
          { index: true, element: <BlogPage /> },
          { path: "create", element: <CreateBlog /> },
          { path: "update/:id", element: <UpdateBlog /> },
        ],
      },
      {
        path: "seo",
        element: <SeoSettings />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
