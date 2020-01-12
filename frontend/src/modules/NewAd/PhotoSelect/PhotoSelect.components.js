import styled from "styled-components";
import colors from "../../shared/styles/colors";

const SIZE = 74;

export const Wrapper = styled.div`
  display: flex;
  width: ${SIZE}px;
  height: ${SIZE}px;
  border: thin solid #ccc;
  border-radius: 5px;

  cursor: pointer;
  position: relative;
  overflow: hidden;
`;

export const PreviewImage = styled.img`
  width: ${SIZE}px;
  height: ${SIZE}px;
  object-fit: cover;
`;

const THICKNESS = 4;
const RADIUS = 5;
const LENGTH = 30;

export const AddImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;

  --color: ${p => (p.hasImage ? "#ccc" : "transparent")};

  :hover {
    --color: ${p => (!p.hasImage ? "#ccc" : colors.brandColor60)};
  }

  ::before {
    content: "";
    background-color: var(--color);
    height: ${THICKNESS}px;
    position: absolute;
    margin: auto;
    width: ${LENGTH}px;
    margin-top: -${THICKNESS / 2}px;
    top: 50%;
    left: 0;
    right: 0;
    transition: all 0.2s;
    border-radius: ${RADIUS}px;
  }
  ::after {
    content: "";
    background-color: var(--color);
    width: ${THICKNESS}px;
    position: absolute;
    margin: auto;
    height: ${LENGTH}px;
    margin-left: -${THICKNESS / 2}px;
    left: 50%;
    top: 0;
    bottom: 0;
    transition: all 0.2s;
    border-radius: ${RADIUS}px;
  }
`;
