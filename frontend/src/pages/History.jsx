import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FaHome } from "react-icons/fa"; 
import { IconButton } from "@mui/material"; 




export default function History() {


  const { getHistoryOfUser} = useContext(AuthContext);

  const [meetings,setMeetings] = useState([]);

  const routeTo = useNavigate();

  useEffect(()=>{
    const fetchHistory = async () =>{
      try{
        const history = await getHistoryOfUser();
        setMeetings(history.reverse());
      }catch(err){
        res.send(`errr, something went wrong! ${err}`);
      }
    };
    fetchHistory();
  },[]);

 return (

  <div style={{color:"#4A4A4A",backgroundColor:"#f8f9fa"}}>

    <IconButton  style={{marginTop:"1rem", marginLeft:".2rem", color:"#FF8C00"}}  onClick={() => routeTo("/home")}>
      <FaHome  /> <p style={{marginLeft:".6rem",borderRadius:".5rem", backgroundColor:"orange", color:"white",padding:"0.5rem", fontSize:"1.2rem", marginBottom:"1rem",marginTop:"0.7rem"}}>Home</p>
    </IconButton>


    {meetings && meetings.length > 0 ? (
      meetings.map((meeting, index) => (
        <Card style={{marginTop:"0.5rem", backgroundColor:"#FDFBF7"}} key={index} sx={{ minWidth: 275, mb: 2 }}>
          <CardContent>
            <Typography sx={{ color: '#555555', fontSize: 14 }} gutterBottom>
              Meeting Code: {meeting.meetingCode}
            </Typography>
            
            <Typography variant="h5" component="div">
              Date: {new Date(meeting.date).toLocaleDateString()}
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
              Time: {new Date(meeting.date).toLocaleTimeString()}
            </Typography>
          </CardContent>
        </Card>
      ))
    ) : (
      <Typography sx={{ textAlign: 'center', mt: 4 }}>
        No meeting history found.
      </Typography>
    )}
  </div>
);

}