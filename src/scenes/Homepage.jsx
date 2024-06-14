import { Box } from "@mui/material";
import { useDispatch , useSelector } from "react-redux";
import Hexagon from "../components/Hexagon";
import { setDeleteString, setLevel,setResetScore,setResetString,setScore } from "../state";
import Navbar from "./Navbar";
import { useWordChecker } from 'react-word-checker';
import { useEffect, useState } from "react";
function Homepage(){
    const dispatch=useDispatch();
    const score=useSelector((state)=>state.score);
    const level=useSelector((state)=>state.level);
    const string=useSelector((state)=>state.string);
    const { words, isLoading, wordExists } = useWordChecker("en");
    let [arr,setArr]=useState([]);
    const nextlevel=useSelector((state)=>state.points[level]);
    // console.log(level);
    const hexagons=useSelector((state)=>state.hexagons[level]);
    // console.log(hexagons);
    useEffect(()=>{
        if(score>=nextlevel){
            setArr([]);
            dispatch(setLevel());

        }
    },[score]);
   const Reset=()=>{
    dispatch(setResetString());
   }
   const deletee=()=>{
    dispatch(setDeleteString());
   }
   const check=async()=>{
    const isFound = arr.some(item => item === string);
    if(isFound){
        alert('Already Founded');
        return;
    }
    if(string.length>3){
       
        let exists = await wordExists(string);
        if(exists){
            dispatch(setScore({score : string.length-3}));
            setArr([...arr,string]);
        }else{
            alert('word not exists');
        }
    }else{
        alert('word length is less than');
    }
   }
    return(
        <>
        <Navbar/>
        <h3 className="pp">Next Level at Points :{nextlevel}</h3>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" >
        <Box display="flex">
          <Hexagon {...hexagons[0]} />
          <Hexagon {...hexagons[1]} />
        </Box>
        <Box display="flex">
          <Hexagon {...hexagons[5]} />
          <Hexagon {...hexagons[6]} />
          <Hexagon {...hexagons[2]} />
        </Box>
        <Box display="flex">
          <Hexagon {...hexagons[4]} />
          <Hexagon {...hexagons[3]} />
        </Box>
      </Box>
      <p className="pp">Current points : {score}</p>
      <p className="pp"> Level : {level+1}</p>
      <p className="pp">Current Word : {string}</p>
      <div className="bigbox">
      <button className="button" onClick={()=>Reset()}>Reset</button>
      <button className="button" onClick={()=>check()}>Check</button>
      <button className="button" onClick={()=>deletee()}>Delete</button>
      </div>
      </>
    )
}
export default Homepage;