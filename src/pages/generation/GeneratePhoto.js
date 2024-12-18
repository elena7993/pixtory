import { AiOutlineDownload, AiOutlineUpload } from "react-icons/ai";
import { MdOutlineShare } from "react-icons/md";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  max-width: 430px;
  height: 100vh;
  margin: 0 auto;
  border: 1px solid #d1d1d1;
`;
const ImgBox = styled.div`
  margin: 0 auto;
  width: 339px;
  height: 364px;
  border: 5px solid #000;
  img {
    width: 91px;
    height: 91px;
  }
`;
const Button = styled.button``;

const GeneratePhoto = () => {
  return (
    <Wrapper>
      <ImgBox>
        <Button>
          Upload Image{" "}
          <span>
            <AiOutlineUpload />
          </span>
        </Button>
        <img
          src={`${process.env.PUBLIC_URL}/imgs/pixelart_campervan.jpg`}
          alt="campervan_img"
        />
      </ImgBox>
      <Button>
        Download Image
        <span>
          <AiOutlineDownload />
        </span>
      </Button>
      <Button>
        Share
        <span>
          <MdOutlineShare />
        </span>
      </Button>
      <Button>Generate Your Photo</Button>
    </Wrapper>
  );
};

export default GeneratePhoto;
