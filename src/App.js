import React from "react";
import ReactDraft from "./reactDraft";
import Tinymce from "./tinymce/index";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Demo from "./components/Demo";
export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="nav">
          {/* <div>
            <Link to="/reactdraft">React Draft</Link>
          </div> */}
          <div>
            <Link to="/tinymce">Tinymce</Link>
          </div>
          {/* <div>
            <Link to="/ckeditor">CkEditor</Link>
          </div> */}
        </div>
        <div className="main">
          <Routes>
            <Route path="/ckeditor" element={<Demo />}></Route>
            <Route path="/tinymce" element={<Tinymce />}></Route>
            <Route path="/reactdraft" element={<ReactDraft />}></Route>
            <Route path="/" element={<ReactDraft />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
