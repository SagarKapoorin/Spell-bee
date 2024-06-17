import { createSlice } from "@reduxjs/toolkit";

const initialState = {
level:0,
score:0,
string:'',
hexagons : [[
    { letter: 'G' },
    { letter: 'O' },
    { letter: 'D' },
    { letter: 'N' },
    { letter: 'P' },
    { letter: 'U' },
    { letter: 'I', bgcolor: 'yellow', color: 'black' },
  ],[
    { letter: 'T' },
    { letter: 'A' },
    { letter: 'R' },
    { letter: 'E' },
    { letter: 'M' },
    { letter: 'L' },
    { letter: 'S', bgcolor: 'yellow', color: 'black' },
  ]],
    points:[10 , 50],
};

export const authSlice = createSlice({
  name: "gameslice",
  initialState,
  reducers: {
    setScore: (state,action) => {
        
      state.score+=action.payload.score;
      // console.log(state.score);
    },
    setLevel: (state) => {
      console.log(state.level);
      state.level+=1;
    },
    setResetScore: (state) => {
      state.score=0;
    },
    setString:(state,action)=>{
        // console.log(action.payload.char);
        state.string+=action.payload.char;
        // console.log(state.string);
    },
    setResetString:(state)=>{
        state.string='';
    },
    setDeleteString:(state)=>{
        if(state.string !== ''){
            state.string=state.string.substring(0,state.string.length-1);
        }
    }
  },
});

export const { setScore,setLevel,setResetScore , setString , setResetString , setDeleteString} =
  authSlice.actions;
export default authSlice.reducer;