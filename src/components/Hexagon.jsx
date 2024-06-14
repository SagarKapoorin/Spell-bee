import React, { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import './Hexagon.css'
import { useDispatch, useSelector } from 'react-redux';
import { setString } from '../state';
const HexagonBox = styled(Box)(({ bgcolor }) => ({
    width: '70px',
    height: '70px',
    display: 'flex',
  
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bgcolor || '#e4eaf3',
    clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)',
    border: '1px solid #ddd',
    transform: 'rotate(30deg)',  
  }));
const InnerBox = styled(Box)(({ color }) => ({
    transform: 'rotate(-30deg)', 
    color: color || 'black',
  }));
  const Hexagon = ({ letter, bgcolor, color }) => {
    const dispatch = useDispatch();
    const currentString = useSelector((state) => state.string);  
 
    const add=(letter)=>{
      dispatch(setString({char:letter}));
      console.log(currentString);
    }
    return (
      <HexagonBox bgcolor={bgcolor}>
                  <button  className='b' onClick={()=>{
            add(letter);
          }}>
        <InnerBox color={color}>
                {letter}
        </InnerBox>
        </button>
      </HexagonBox>
    );
  };
  

export default Hexagon;
