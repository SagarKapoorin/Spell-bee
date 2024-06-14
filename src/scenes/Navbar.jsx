import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  LightMode,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import HouseIcon from '@mui/icons-material/House';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const fullName = `Username`;

  return (
    <FlexBetween padding="1rem 6%">
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="yellow"
         
        
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          Spell-Bee
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
     border='1.5px solid black'
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton >
            
              <LightMode sx={{  fontSize: "25px" }} />
          </IconButton>
          <IconButton>
       
              <HouseIcon sx={{ fontSize: "25px", cursor: "pointer"  }}  />
            
          </IconButton>
          <IconButton>
        
              <AddIcCallIcon sx={{ fontSize: "25px" ,  cursor: "pointer" }} />
      
          
          </IconButton>
          <IconButton>
          
              <Help sx={{ fontSize: "25px", cursor: "pointer"  }}  />
           
          </IconButton>
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
      
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
              
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem >Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          {!isMobileMenuToggled && <Menu />}
        </IconButton>
      )}

 
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
            sx={{backgroundColor:'white'}}
        >
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

  
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
        
              sx={{ fontSize: "25px" }}
            >
            
                <LightMode sx={{fontSize: "25px" }} />
      
            </IconButton>
            <IconButton>
      
              <HouseIcon sx={{ fontSize: "25px", cursor: "pointer"  }}  />
      
          </IconButton>
            <IconButton>
      
              <AddIcCallIcon sx={{ fontSize: "25px" ,  cursor: "pointer" }} />
  
          
          </IconButton>
          <IconButton>
        
              <Help sx={{ fontSize: "25px", cursor: "pointer"  }} />
        
          </IconButton>
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
   
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                 
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem >
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;