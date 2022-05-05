import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import AccessWallet from "../pages/Login/AccessWallet";
import Error from "../pages/Error/Error";

export const AppRouter = () => {
    return (
            <Routes>
                <Route exact  path="/" element={<Home />} />
                <Route exact  path="/register" element={<Home />} />
                <Route exact  path="/login" element={<AccessWallet />} />
                {/* <Route path="/block/:blockId" element={<BlockInfoPage />} /> */}
                <Route exact  path="*" element={<Error />} />
            </Routes>
    );
};