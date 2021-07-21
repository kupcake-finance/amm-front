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
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import GitHubIcon from '@material-ui/icons/GitHub';

const StyledMenu = withStyles({
  paper: {
    marginTop: '20px',
    border: '1px solid #d3d4d5',
    boxShadow: '0 0 15px #d3d4d5 !important'
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

  &:hover {
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
        Docs
      </StyledButton>
      <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <a href="https://docs.kupcakeswap.finance/" target="_blank" rel="noreferrer">
          <StyledMenuItem>
            <ListItemIcon>
              <DescriptionIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Project Documentation" />
          </StyledMenuItem>
        </a>

        <a href="https://docs.kupcakeswap.finance/roadmap" target="_blank" rel="noreferrer">
          <StyledMenuItem>
            <ListItemIcon>
              <TimelineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Roadmap" />
          </StyledMenuItem>
        </a>

        <a href="https://docs.kupcakeswap.finance/technical-info/howto-buy" target="_blank" rel="noreferrer">
          <StyledMenuItem>
            <ListItemIcon>
              <HelpOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="How to buy ?" />
          </StyledMenuItem>
        </a>

        <a href="https://github.com/kupcake-finance" target="_blank" rel="noreferrer">
          <StyledMenuItem>
            <ListItemIcon>
              <GitHubIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Github" />
          </StyledMenuItem>
        </a>
      </StyledMenu>
    </div>
  )
}
