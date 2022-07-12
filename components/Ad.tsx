import { Dispatch, SetStateAction } from 'react';
import { adSrc } from '../lib/sources';
import Image from 'next/image';
import styled from 'styled-components';

interface AdProp {
  setAd: Dispatch<SetStateAction<boolean>>;
  endAd: () => void;
}

const Ad = ({ setAd, endAd }: AdProp) => {
  return (
    <Container>
      <AdContent controls={false} autoPlay onEnded={endAd}>
        <source src={adSrc} type="video/mp4" />
      </AdContent>
      <SkipMessage onClick={() => setAd(false)}>
        <Text>광고 건너뛰기</Text>
        <Image src="/images/skip.png" width={42} height={42} alt="skip icon" />
      </SkipMessage>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const AdContent = styled.video`
  width: 100%;
`;

const SkipMessage = styled.div`
  position: absolute;
  bottom: 150px;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 280px;
  height: 60px;
  padding: 0 50px;
  text-align: center;
  background: rgba(225, 225, 225, 0.5);

  &:hover {
    box-shadow: 0 3px 3px rgba(225, 225, 225, 0.3);
  }
`;

const Text = styled.h2`
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 25px;
`;

export default Ad;
