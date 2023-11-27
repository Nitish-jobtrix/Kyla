import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

//import sidebar hook
import { useProSidebar } from 'react-pro-sidebar';
import { DarkMode, LightMode } from "@mui/icons-material";
import { toggleActionTheme } from '../../redux/actions/themeAction';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';

const HeaderTop = () => {
    const { collapseSidebar } = useProSidebar();
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const menuButtonRef = React.useRef();

    const isMobile = useMediaQuery('(max-width:750px)');
    React.useEffect(() => {
      if(isMobile){
        collapseSidebar()
      }
    }, [isMobile]);



    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ boxShadow: 0, bgcolor: "#f3f4fa" }}>
                <Toolbar>
                    <IconButton onClick={() => collapseSidebar()}
                      ref={menuButtonRef}
                        size="large"
                        edge="start"
                        color="black"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        
                        component="div"
                        sx={{ flexGrow: 1, color:"black",display: { xs: 'none', sm: 'block' } }}
                    >
                        HR APP
                    </Typography>

                    {/* toggle dark theme */}
                    <IconButton sx={{ mr: 4 }} onClick={() => dispatch(toggleActionTheme())}>
                        {palette.mode === "dark" ? (
                            <DarkMode sx={{ color: "black", fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: "black", fontSize: "25px" }} />
                        )}
                    </IconButton>

                 
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default HeaderTop;