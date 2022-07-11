import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    background-color: #000;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
  }

  body {
    width: 80%;
    height: 80%;
    margin: 100px auto;
  }


  button{
    border: none;
  }

  a{
    text-decoration: none;
  }

  input {
    outline: none;
  }
`;

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
};

export default Layout;
