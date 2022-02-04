/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import Style from './styles.module.scss'

export const WebMenu = () => {
  
    return(
      <>
        <div className={ Style.webMenu }>
            <div className={ Style.webMenuContent }>
                <div className={ Style.headerMenu }>
                  <a href="/"><h2>Home</h2></a>
                  <a href="/news"><h2>News</h2></a>
                  <a href="/hotspots"><h2>Hot Spots</h2></a>
                </div>
                <div className={ Style.subMenu }>
                  <a href="/estilos"><i className="fas fa-list" aria-hidden></i><p>Estilos</p></a>
                </div>
                <h2 className={ Style.title }>Top</h2>
                <div className={ Style.subMenu }>
                  <a href="/top-musics"><i className="fas fa-headphones-alt" aria-hidden></i><p>Ranking Musicas</p></a>
                  <a href="/top-artists"><i className="fas fa-music" aria-hidden></i><p>Ranking Artistas</p></a>
                  <a href="/top-albuns"><i className="fas fa-compact-disc" aria-hidden></i><p>Ranking Álbuns</p></a>
                </div>
            </div>
        </div>
      </>
    )
}

type Anchor = 'left';

export const MobileMenu = () => {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ maxWidth: "100%", width: "15.625rem", height: "100%", background: "#161616"}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ marginLeft: 2 }}>
        <a className="mobileBtn" href="/"><img src="/img/InfoSongsLogo.png" alt="logo"/></a>
        <a className="mobileBtn" href="/"><i className="fas fa-home" aria-hidden></i><h3>Home</h3></a>
        <a className="mobileBtn" href="/news"><i className="fas fa-newspaper" aria-hidden></i><h3>News</h3></a>
        <a className="mobileBtn" href="/hotspots"><i className="fas fa-fire" aria-hidden></i><h3>Hot Spots</h3></a>
      </List>
      <Divider />
      <List sx={{ marginLeft: 2 }}>
        <a className="mobileBtn" href="/estilos"><i className="fas fa-list" aria-hidden></i><h3>Estilos</h3></a>
        <a className="mobileBtn" href="/top-musics"><i className="fas fa-headphones-alt" aria-hidden></i><h3>Ranking Musicas</h3></a>
        <a className="mobileBtn" href="/top-artists"><i className="fas fa-music" aria-hidden></i><h3>Ranking Artistas</h3></a>
        <a className="mobileBtn" href="/top-albuns"><i className="fas fa-compact-disc" aria-hidden></i><h3>Ranking Álbuns</h3></a>      
      </List>
    </Box>
  );

  return (
    <>
      <div className={ Style.mobileMenu }>
        <div className={ Style.mobileMenuContent }>
          {(['left'] as const).map((anchor) => (
            <React.Fragment key={anchor}>
              <div className={ Style.menuButton }>
                <Button onClick={toggleDrawer(anchor, true)}>
                  <i className="fas fa-bars" aria-hidden></i>
                </Button>
              </div>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
