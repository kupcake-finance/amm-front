import React from 'react'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import TelegramIcon from '@material-ui/icons/Telegram'
import TwitterIcon from '@material-ui/icons/Twitter'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  }, 
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))

const IconImage = styled.img`
  width: 24px;
`
const StyledButton = styled(Button)`
  font-family: 'Roboto', sans-serif !important;
  font-weight: 500 !important;
  font-size: 18px !important;
  text-transform: none !important;
  background-color: transparent !important;
  box-shadow: none !important;
  height: 25px !important;
  /* width: 30px !important; */
  padding: 0px !important;
  margin-left: 10px !important;
`

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: '#48cae4',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
        fontWeight: 500,
      },
    },
  },
}))(MenuItem)

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <StyledButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Follow Us
      </StyledButton>
      <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <a href="https://twitter.com/KupcakeSwap" target="_blank" rel="noreferrer">
          <StyledMenuItem>
            <ListItemIcon>
              <TwitterIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Twitter" />
          </StyledMenuItem>
        </a>

        <a href="https://t.me/KupcakeSwap" target="_blank" rel="noreferrer">
          <StyledMenuItem>
            <ListItemIcon>
              <TelegramIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="TG English" />
          </StyledMenuItem>
        </a>

        <a href="https://t.me/KupcakeSwap_ann" target="_blank" rel="noreferrer">
          <StyledMenuItem>
            <ListItemIcon>
              <TelegramIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="TG Announcements" />
          </StyledMenuItem>
        </a>
      </StyledMenu>
    </div>
  )
}
