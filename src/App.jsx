// @ts-nocheck
import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { logo } from "./assets/";
import { Home, CreatePost } from "./page";

const App = () => (
  <BrowserRouter>
    <header className="w-full flex justify-between bgs items-center sm:px-8 px-4 py-4">
      <Link to="/">
        <div className="flex justify-center items-center">
          <img
            width={40}
            src={logo}
            alt="logo"
            className="object-contain logo-spiner"
          />
          <h2 className="text-gradient">Detta - AI</h2>
        </div>
      </Link>

      <Link
        to="/create-post"
        className="font-inter font-medium text-white px-4 py-2 rounded-md bg-nav">
        Tạo Bài Đăng
      </Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#0c0c0c] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
