import { Box, InputBase, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect, useState } from "react";
import { useWordChecker } from 'react-word-checker';
import Hexagon from "../components/Hexagon";
import Navbar from "./Navbar";
import { setDeleteString, setLevel, setResetScore, setResetString, setScore } from "../state";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import StartRoundedIcon from '@mui/icons-material/StartRounded';

function Homepage() {
    const [backgroundColor, setBackgroundColor] = useState('white');
    const [textColor, setTextColor] = useState('black');
    const [feedback, setFeedback] = useState("");
    const [timer, setTimer] = useState(60);
    const increment = useRef(null);

    useEffect(() => {
        increment.current = setInterval(() => {
            setTimer((timer) => {
                if (timer > 0) return timer - 1;
                clearInterval(increment.current);
                if (timer === 0) {
                    alert("Game Over Your Score is : " + score);
                }
                return timer;
            });
        }, 1000);
        return () => clearInterval(increment.current);
    }, []);

    const dispatch = useDispatch();
    const score = useSelector((state) => state.score);
    const level = useSelector((state) => state.level);
    const string = useSelector((state) => state.string);
    const { wordExists } = useWordChecker("en");
    const [foundWords, setFoundWords] = useState([]);
    const nextLevel = useSelector((state) => state.points[level]);
    const hexagons = useSelector((state) => state.hexagons[level]);

    useEffect(() => {
        if (score >= nextLevel) {
            setFoundWords([]);
            dispatch(setLevel());
        }
    }, [score, nextLevel, dispatch]);

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
    const next=()=>{
        dispatch(setLevel());
        dispatch(setScore({score: -2}));
    }
    return (
        <>
            <Navbar />
            <p className="score">Score: {score}</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30px', marginTop: '5px' }}>
                <p style={{ color: backgroundColor, fontWeight: 700, fontSize: '25px' }}>{feedback}</p>
            </div>
            <div className="upper_part">
                <p className="timer">{timer}</p>
                <p className="current_word" style={{ backgroundColor, color: textColor }}>{string}</p>
                <IconButton className="next" onClick={() =>next() }>Next</IconButton>
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
                <Box display="flex"  marginTop='-25px'>
                    <Hexagon {...hexagons[4]} />
                    <Hexagon {...hexagons[3]} />
                </Box>
            </Box>
            <div className="bigbox">
                <button className="button" onClick={resetString}>Reset</button>
                <button className="button" onClick={deleteString}>Delete</button>
            </div>
            <button className="check_button" onClick={checkWord}>Check</button>
        </>
    );
}

export default Homepage;
