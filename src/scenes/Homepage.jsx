import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect, useState } from "react";
import { useWordChecker } from 'react-word-checker';
import Hexagon from "../components/Hexagon";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import Navbar from "./Navbar";
import ReactDOM from 'react-dom';
import Confetti from 'react-confetti';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { setDeleteString, setLevel, setResetLevel, setResetScore, setResetString, setScore, setShuffleHexagon } from "../state";
import FlexBetween from "../components/FlexBetween";

function Homepage() {
    const [animateReset, setAnimateReset] = useState(false);
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
    const [centralLetter, setCentralLetter] = useState("");

    useEffect(() => {
        hexagons.forEach((letter) => {
            if (letter.bgcolor === "yellow") {
                setCentralLetter(letter.letter);
            }
        });
    }, [hexagons]);
    useEffect(() => {
        if (timer === 60) {
            dispatch(setResetScore());
            dispatch(setResetLevel());
            dispatch(setResetString());
        }
        increment.current = setInterval(() => {
            setTimer((timer) => {
                if (timer > 0) return timer - 1;
                clearInterval(increment.current);

                if (timer === 0 && (string !== "" || score !== 0)) {
                    alert("Game Over Your Score is : " + score);
                    dispatch(setResetScore());
                    dispatch(setResetString());
                    dispatch(setResetLevel());
                }
                return timer;
            });
        }, 1000);
        return () => clearInterval(increment.current);
    }, [score, dispatch, string, timer]);

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
            setTimeout(() => {
                dispatch(setResetString());
            }, 2000)
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
        setTimeout(() => {
            dispatch(setResetString());
        }, 2000)
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
        dispatch(setScore({ score: -2}));
    };

    useEffect(() => {
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
    }, [feedback]);

    const resetLetters = () => {
        dispatch(setShuffleHexagon());
    };

    const renderString = (str, centralLetter) => {
        return str.split('').map((char, index) => (
            <span key={index} style={{ color: char === centralLetter ? '#FFA500' : textColor , fontWeight:600 }}>
                {char}
            </span>
        ));
    };

    return (
        <>
            
            <FlexBetween width={257}>
            <p className="timer">{timer}</p>
            <p className="score">Score: {score}</p>
            </FlexBetween>
            <div className="confetti" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '0px', marginTop: '5px' }}>
                <p style={{ color: backgroundColor, fontWeight: 700, fontSize: '25px' }}>{feedback}</p>
            </div>

            <div className="upper_part">
              
                <p className="current_word" style={{ backgroundColor, color: textColor }}>
                    {renderString(string, centralLetter)}
                </p>
                <Button variant="outlined" className="button" onClick={next}> Skip </Button>
            </div>

            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <Box display="flex" >
                    <Hexagon {...hexagons[0]} />
                    <Hexagon {...hexagons[1]} />
                </Box>
                <Box display="flex" marginTop='-10px'>
                    <Hexagon {...hexagons[5]} />
                    <Hexagon {...hexagons[6]} />
                    <Hexagon {...hexagons[2]} />
                </Box>
                <Box display="flex" marginTop='-10px'>
                    <Hexagon {...hexagons[4]} />
                    <Hexagon {...hexagons[3]} />
                </Box>
            </Box>
            <div className="bigbox">
            
                <Button variant="outlined" className="button" onClick={timer !== 0 ? resetString : console.log("")}>Reset</Button>
                <Button variant="outlined" className="button" onClick={resetLetters}><RestartAltIcon /></Button>
                <Button variant="outlined" className="button" onClick={timer !== 0 ? deleteString : console.log("")}>Delete</Button>
            </div>
            <Button variant="outlined" className="check_button" onClick={timer !== 0 ? checkWord : console.log("")}>Submit</Button>
        </>
    );
}

export default Homepage;
