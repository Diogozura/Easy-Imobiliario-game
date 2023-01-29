import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Image from 'next/image';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { LogoResponse, Navigation, NavigationMenu } from '../../Links';
import { Nav } from './Nav';
import Sair from '../../../screens/jogo/Sair';
import Router, { useRouter } from 'next/router';


interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

const drawerWidth = 240;

const navItems = [{
  id: 1,
  label: 'Home',
  path: '/',
  // icon: HomeIcon
},
{
  id: 2,
  label: 'Regras',
  path: '/guia',
  // icon: HomeIcon
},
{
  id: 4,
  label: 'Sobre',
  path: '/sobre',
  // icon: HomeIcon
}
];
function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Topo({ children, nav }, props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const drawer = (
    <Box onClick={handleDrawerToggle} style={{ background: "linear-gradient(to right , #951B81, #E6332A)" }} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link href={'/'} prefetch>
          <Image
            src='/image/logo.svg'
            alt="Logo easy imobiliário"
            // layout="responsive"
            width={250}
            height={80} />
        </Link>

      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Navigation key={item.id} href={item.path} prefetch={true}>
                {item.label}
              </Navigation>

            </ListItemButton>
          </ListItem>

        ))}
       
      </List>
    </Box>
  );



  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <HideOnScroll {...props}>
          <AppBar component="nav" style={{ background: "linear-gradient(to right , #951B81, #E6332A)" }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <LogoResponse>
                <Link href={'/'} prefetch>
                  <Image
                    src='/image/logo.svg'
                    alt="Logo easy imobiliário"
                    // layout="responsive"
                    width={160}
                    height={50} />
                </Link>

              </LogoResponse>


              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                <Link href={'/'} prefetch>
                  <Image
                    src='/image/logo.svg'
                    alt="Logo easy imobiliário"
                    // layout="responsive"
                    width={250}
                    height={80} />
                </Link>

              </Typography>

              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

                {children}
              </Box>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Box component="nav">

          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
            {children}
          </Drawer>
        </Box>
      </Box>
      <Nav nav={nav}>
        {navItems.map((item) => (
          <Link  key={item.id} href={item.path} passHref  prefetch={true} legacyBehavior>
             <Navigation
            style={{ "color": "#000000", "fontSize": "x-large" , 'fontFamily': 'Museo700'  }}
     >
            {item.label}

          </Navigation>
          </Link>
         

        ))}
  
      </Nav>
    </>


  );
}

