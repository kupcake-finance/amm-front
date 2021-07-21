import React from 'react'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DescriptionIcon from '@material-ui/icons/Description'
import TimelineIcon from '@material-ui/icons/Timeline'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

const StyledMenu = withStyles({
  paper: {
    marginTop: '20px',
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

  &:hover{
    color: #ff629a !important;
  }
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

  const baseUrl = (route) => {
    return window.location.origin + route;
  }

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
        DEX
      </StyledButton>
      <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <a href="https://dex.kupcakeswap.finance/#/swap">
          <StyledMenuItem>
            <ListItemIcon>
              <AutorenewIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="Swap" />
          </StyledMenuItem>
        </a>

        <a href="https://dex.kupcakeswap.finance/#/pool">
          <StyledMenuItem>
            <ListItemIcon>
              <CompareArrowsIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="Liquidity" />
          </StyledMenuItem>
        </a>

        <a href="https://qugkgjziv7l.typeform.com/to/PxxOYSX4">
          <StyledMenuItem>
            <ListItemIcon>
              <PlaylistAddIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="Submit &amp; list your token" />
          </StyledMenuItem>
        </a>
      </StyledMenu>
    </div>
  )
}
