import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Proxima', sans-serif;
    src: url('/fonts/ProximaSoft-Medium.eot');
    src: url('/fonts/ProximaSoft-Medium.eot?#iefix') format('embedded-opentype'),
      url('/fonts/ProximaSoft-Medium.woff') format('woff'),
      url('/fonts/ProximaSoft-Medium.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  * {
  font-family: 'Roboto', sans-serif;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
