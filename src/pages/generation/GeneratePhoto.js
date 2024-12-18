import { useRef, useState } from "react";
import { AiOutlineDownload, AiOutlineUpload } from "react-icons/ai";
import { MdOutlineShare } from "react-icons/md";
import styled from "styled-components";

const Button = styled.button`
  all: unset;
  border: 1px solid #000;
  border: ${(props) => (props.noBorder ? "none" : "1px solid #000")};
  width: ${(props) => props.width || "100px"};
  height: 40px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  font-family: "GalmuriMono9";
  padding: 20px;
`;

const ImgBox = styled.div`
  width: 339px;
  height: 364px;
  border: 5px solid #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
  img {
    width: 91px;
    height: 91px;
  }
`;

const ButtonsWrap = styled.div`
  width: 388px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const GenerateWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 36px;

  button {
    all: unset;
    width: 282px;
    height: 56px;
    background-color: #000;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
`;

const GeneratePhoto = () => {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("downloaded_image.png");
  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImage(imgUrl);
      setImageName(file.name);
    }
  };

  const handleDownload = () => {
    if (!image) {
      alert("다운로드할 이미지가 없습니다!");
      return;
    }

    const link = document.createElement("a");
    link.href = image; // 이미지 URL
    link.download = imageName; // 다운받을 파일이름(원본) 받아옴!
    link.click(); // 클릭 이벤트 실행
  };

  const generatePixelArt = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.crossOrigin = "Anonymous"; // CORS 문제 방지
    img.src = image;

    img.onload = () => {
      console.log("Image loaded for pixel art");

      const scale = 0.1;
      const width = img.width;
      const height = img.height;

      canvas.width = width * scale;
      canvas.height = height * scale;

      // 축소 후 확대
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        canvas,
        0,
        0,
        canvas.width,
        canvas.height,
        0,
        0,
        width,
        height
      );

      const pixelArtUrl = canvas.toDataURL("image/png");
      console.log("Generated Pixel Art URL:", pixelArtUrl);

      setImage(pixelArtUrl); // 픽셀화된 이미지 상태 업데이트
      setImageName("pixel_art.png"); // 파일 이름 변경
    };

    img.onerror = () => {
      console.error("Failed to load image");
    };
  };

  return (
    <Wrapper>
      <ImgBox>
        <label htmlFor="fileInput">
          <Button width="162px" noBorder onClick={triggerFileInput}>
            Upload Image <AiOutlineUpload />
          </Button>
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
        {image ? (
          <img src={image} alt="uploaded_img" />
        ) : (
          <img
            src={`${process.env.PUBLIC_URL}/imgs/pixelart_campervan.jpg`}
            alt="default_img"
          />
        )}
      </ImgBox>
      <ButtonsWrap>
        <Button width="162px" onClick={handleDownload}>
          Download Image <AiOutlineDownload />
        </Button>
        <Button width="102px">
          Share <MdOutlineShare />
        </Button>
      </ButtonsWrap>
      <GenerateWrap>
        <button onClick={generatePixelArt}>Generate Your Photo</button>
      </GenerateWrap>
    </Wrapper>
  );
};

export default GeneratePhoto;
