import styled, { keyframes } from "styled-components";
import colors from "../shared/styles/colors";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingC = styled.div`
  display: flex;
  margin: 100px auto;
  border: 16px solid #fff;
  border-radius: 50%;
  border-top: 16px solid ${colors.brandColor};
  border-bottom: 16px solid ${colors.brandColor};
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`;

export default LoadingC;
