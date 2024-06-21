import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { setString } from '../state';
import './Hexagon.css';

const HexagonBox = styled(Box)(({ bgcolor }) => ({
  width: '100px',
  height: '100px',
  display: 'flex',
  fontSize: '20px',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: (bgcolor || '#e4eaf3'),
  clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)',
  border: '1px solid #ddd',
  transform: 'rotate(30deg)',
  transition: 'transform 0.15s ease-in-out',
  '&.pop': {
    animation: 'pop 0.5s',
  },
}));

const InnerBox = styled(Box)(({ color }) => ({
  transform: 'rotate(-30deg)',
  color: color || 'black',
}));

const Hexagon = ({ letter, bgcolor, color }) => {
  const [fontSize, setFont] = useState('45px');
  const [animate, setAnimate] = useState(false);

  const dispatch = useDispatch();
  const currentString = useSelector((state) => state.string);

  const add = (letter, event) => {
    setFont('70px');
    setAnimate(true);
    setTimeout(() => {
      setFont('45px');
      setAnimate(false);
    }, 150);
    dispatch(setString({ char: letter }));
    console.log(currentString);
  };

  return (
    <HexagonBox bgcolor={bgcolor} className={animate ? 'pop' : ''}>
      <button className='b' style={{ fontSize: `${fontSize}` }} onClick={(event) => add(letter, event)}>
        <InnerBox color={color}>
          {letter}
        </InnerBox>
      </button>
    </HexagonBox>
  );
};

export default Hexagon;
