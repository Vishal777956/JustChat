import React, { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const client = axios.create({
  baseURL: "http://localhost:3000/api/v1/users"
});

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [userData, setUserData] = useState(null);
  

  const router = useNavigate();

  const handleRegister = async (name, username, password) => {
    try {
      let request = await client.post("/register", { name, username, password });
      if (request.status === 201) {
        return request.data.message;
      }
    } catch (err) {
      throw err;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      let request = await client.post("/login", {username, password });
      if (request.status === 200) {
       localStorage.setItem("token",request.data.token);
        router("/home");
      }
    } catch (err) {
      throw err;
    }
  };

  const getHistoryOfUser = async() =>{
    try{
      let request =  await client.get("/get_all_activity", {
        params:{
          token: localStorage.getItem("token"),

        }
      });
      return request.data;
    }catch(err){
      throw err;
    }
  }

  const addToUserHistory = async(meetingCode) =>{
    try{
      let request =  await client.post("/add_to_activity", {
        
          token: localStorage.getItem("token"),
          meeting_code: meetingCode

      });
      return request;
    }catch(err){
      throw err;
    }
  }




  

  const data = { userData, setUserData,getHistoryOfUser,addToUserHistory, handleRegister, handleLogin };

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};
