import React from "react";
import Layout from "../components/layout";
import './pages.css'

const NotFound = (props) => {

  return (
    <Layout>
      <h1 className="notfound">The page you are looking for doesnot exist</h1>
    </Layout>
  );
};
export default NotFound;