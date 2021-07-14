import React, { useState } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      backgroundColor: 'rgba(255,255,255, 0.95)',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
      border: '1px solid #ff629a',
      color: '#ff629a',
      borderRadius: '5px',
      height: '35px',
      width: '35px',
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    logoBanner: {
      maxHeight: '50px',
    },
  }),
)

const LogoBanner = styled.img`
  max-height: 50px;
`
const Button = styled.button``

export default function PersistentDrawerLeft() {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [addressMeta, setAddressMeta] = useState()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="default"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <LogoBanner className="logoBanner" src="/images/common/logo-ku.png" alt="logo" />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem>
            <Button className="metamask-button">
              <img
                className="metamask-image"
                src="/images/common/metamask.png"
                style={{ height: '34px' }}
                alt="metamask"
              />
            </Button>
            {addressMeta === null ? (
              <>
                <span className="red meta-address">
                  {/* First 4 chars */}
                  0x04
                </span>
                <span className=""> ... </span>
                <span className="blue meta-address">
                  {/* last 4 chars */}
                  5678
                </span>
              </>
            ) : (
              <span className="orangered meta-address"> Connect Metamask </span>
            )}
          </ListItem>
          <ListItem button key="Presale">
            <a href="https://presale.kupcakeswap.finance">
              <ListItemText primary="Presale" />
            </a>
          </ListItem>
          <ListItem button key="Dapp (soon)">
            <ListItemText primary="Dapp (soon)" />
          </ListItem>
          <ListItem button key="Documentation">
            <a href="https://docs.kupcakeswap.finance">
              <ListItemText primary="Documentation" />
            </a>
          </ListItem>
          <ListItem button key="FAQ">
            <a href="https://docs.kupcakeswap.finance/general-help/general-help-1/faq">
              <ListItemText primary="FAQ" />
            </a>
          </ListItem>
          <ListItem button key="Token">
            <a href="https://qugkgjziv7l.typeform.com/to/PxxOYSX4">
              <ListItemText primary="Token Submission" />
            </a>
          </ListItem>
          <Divider />

          <ListItem button key="Telegram Ann.">
            <a href="https://t.me/KupcakeSwap_ann">
              <ListItemText primary="Telegram Ann." />
            </a>
          </ListItem>
          <ListItem button key="Telegram ENG">
            <a href="https://t.me/KupcakeSwap">
              <ListItemText primary="Telegram ENG" />
            </a>
          </ListItem>
          <ListItem button key="Twitter">
            <a href="https://twitter.com/KupcakeSwap">
              <ListItemText primary="Twitter" />
            </a>
          </ListItem>
        </List>
      </Drawer>
    </div>
  )
}
