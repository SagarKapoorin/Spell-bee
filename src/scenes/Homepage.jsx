import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect, useState } from "react";
import { useWordChecker } from 'react-word-checker';
import Hexagon from "../components/Hexagon";
import Navbar from "./Navbar";
import ReactDOM from 'react-dom';
import Confetti from 'react-confetti';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { setDeleteString, setLevel, setResetLevel, setResetScore, setResetString, setScore, setShuffleHexagon  } from "../state";
                           
function Homepage() {
    const [backgroundColor, setBackgroundColor] = useState('white');
    const [textColor, setTextColor] = useState('black');
    const [feedback, setFeedback] = useState("");
    const [timer, setTimer] = useState(60);
    const increment = useRef(null);
    const dispatch = useDispatch();
    const score = useSelector((state) => state.score);
    const level = useSelector((state) => state.level);
    const string = useSelector((state) => state.string);
    const { wordExists } = useWordChecker("en");
    const [foundWords, setFoundWords] = useState([]);
    const nextLevel = useSelector((state) => state.points[level]);
    const hexagons = useSelector((state) => state.hexagons[level]);

    useEffect(() => {
        if(timer===60){
            dispatch(setResetScore());
            dispatch(setResetLevel());
        }
        increment.current = setInterval(() => {
           
            setTimer((timer) => {
                if (timer > 0) return timer - 1;
                clearInterval(increment.current);
                
             
                
                if (timer === 0  && (string !=="" || score!=0)) {
                    alert("Game Over Your Score is : " + score);
                    dispatch(setResetScore());
                    dispatch(setResetString());
                    dispatch(setResetLevel());
                }
                return timer;
            });
        }, 1000);
        return () => clearInterval(increment.current);
    }, [score, dispatch]);


    const resetString = () => {
        dispatch(setResetString());
    };

    const deleteString = () => {
        dispatch(setDeleteString());
    };

    const checkWord = async () => {
        const specialHexagon = hexagons.find(hex => hex.bgcolor === 'yellow');
        const specialLetter = specialHexagon ? specialHexagon.letter : null;

        if (specialLetter && !string.includes(specialLetter)) {
            setFeedbackMessage(`Missing Special Letter: ${specialLetter}`, 'red', 'white');
            return;
        }
        if (foundWords.includes(string)) {
            setFeedbackMessage("Already Found", 'yellow', 'white');
            return;
        }

        if (string.length >= 3) {
            const exists = await wordExists(string);
            if (exists) {
                setFeedbackMessage("Great Job!", 'green', 'white');
                dispatch(setScore({ score: string.length }));
                setFoundWords([...foundWords, string]);
            } else {
                setFeedbackMessage("Word Not Exists", 'red', 'white');
            }
        } else {
            setFeedbackMessage("Word Length is Less Than 3", 'red', 'white');
        }
        setTimeout(()=>{
            dispatch(setResetString());
        },2000)
        
    };

    const setFeedbackMessage = (message, bgColor, txtColor) => {
        setFeedback(message);
        setBackgroundColor(bgColor);
        setTextColor(txtColor);
        setTimeout(() => {
            setFeedback("");
            setBackgroundColor('white');
            setTextColor('black');
        }, 2000);
    };

    const next = () => {
        dispatch(setResetString());
        dispatch(setLevel());
        dispatch(setScore({ score: score >= 2 ? -2 : 0 }));
    };
    useEffect(()=>{
        if (feedback === "Great Job!") {
            const confettiContainer = document.createElement('div');
            confettiContainer.id = "confetti-container";
            document.body.appendChild(confettiContainer);
            ReactDOM.render(<Confetti id="theid" />, confettiContainer);
      
            setTimeout(() => {
              ReactDOM.unmountComponentAtNode(confettiContainer);
              document.body.removeChild(confettiContainer);
            }, 3000);
      
           
          }
    },[feedback]);
    const resetLetters=()=>{
       dispatch(setShuffleHexagon());
}
    return (
        <>
            <Navbar />
            <p className="score">Score: {score}</p>
            <div  className="confetti" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30px', marginTop: '5px' }}>
                <p style={{ color: backgroundColor, fontWeight: 700, fontSize: '25px' }}>{feedback}</p>
               
                
            </div>

            <div className="upper_part">
                <p className="timer">{timer}</p>
                <p className="current_word" style={{ backgroundColor, color: textColor }}>{string}</p>
                <Button variant="contained" className="button" onClick={next}>Next</Button>
            </div>

            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <Box display="flex">
                    <Hexagon {...hexagons[0]} />
                    <Hexagon {...hexagons[1]} />
                </Box>
                <Box display="flex" marginTop='-25px'>
                    <Hexagon {...hexagons[5]} />
                    <Hexagon {...hexagons[6]} />
                    <Hexagon {...hexagons[2]} />
                </Box>
                <Box display="flex" marginTop='-25px'>
                    <Hexagon {...hexagons[4]} />
                    <Hexagon {...hexagons[3]} />
                </Box>
            </Box>
            <div className="bigbox">
                <Button variant="contained"  className="button" onClick={timer!=0?resetString:console.log("")}>Reset</Button>
                <Button variant="contained"  className="button" onClick={resetLetters}><RestartAltIcon/></Button>
                <Button variant="contained"  className="button" onClick={timer!=0?deleteString:console.log("")}>Delete</Button>
            </div>
            <Button variant="contained" className="check_button" onClick={timer!=0?checkWord:console.log("")}>Check</Button>
        </>
    );
}

export default Homepage;
