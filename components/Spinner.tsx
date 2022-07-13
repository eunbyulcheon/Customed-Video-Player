import styled from 'styled-components';

const Spinner = () => {
  return <Loader />;
};

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  &:before {
    content: '';
    box-sizing: border-box;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: #07d;
    border-bottom-color: #07d;
    animation: spinner 0.8s ease infinite;
  }
`;

export default Spinner;
