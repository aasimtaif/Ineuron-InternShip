import styled from "styled-components";
import { useEffect, useState } from "react";

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
  `;
const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
`;
const ImageButtons = styled.div`
    display: flex;
    gap: 10px;
    flex-grow: 0;
    margin-top: 10px;
  `;
const ImageButton = styled.div`
    border: 2px solid #ccc;
    ${props => props.active ? `
      border-color: #ccc;
    ` : `
      border-color: transparent;
    `}
    height: 40px;
    padding: 2px;
    cursor: pointer;
    border-radius: 5px;
  `;
const BigImageWrapper = styled.div`
  text-align: center;
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState();
  useEffect(() => {
    setActiveImage(images?.[0]);
  }, [images]);

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} />
      </BigImageWrapper>
      <ImageButtons>
        {images?.map((image, index) => (
          <ImageButton
            key={index}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}>
            <Image src={image} alt="" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}