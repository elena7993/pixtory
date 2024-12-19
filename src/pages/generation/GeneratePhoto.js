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

      const scale = 0.05; // 픽셀화 정도 조정
      const originalWidth = img.width;
      const originalHeight = img.height;

      // 1. 축소 캔버스 설정
      canvas.width = originalWidth * scale;
      canvas.height = originalHeight * scale;
      ctx.imageSmoothingEnabled = false; // 픽셀화 효과 유지
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 2. 확대 캔버스 설정
      const enlargedCanvas = document.createElement("canvas");
      const enlargedCtx = enlargedCanvas.getContext("2d");
      enlargedCanvas.width = originalWidth;
      enlargedCanvas.height = originalHeight;

      enlargedCtx.imageSmoothingEnabled = false;
      enlargedCtx.drawImage(
        canvas,
        0,
        0,
        canvas.width,
        canvas.height,
        0,
        0,
        enlargedCanvas.width,
        enlargedCanvas.height
      );

      // 3. NES 스타일 색상 팔레트 적용
      const nesPalette = [
        [0, 0, 0], // Black
        [255, 255, 255], // White
        [192, 192, 192], // Light Gray
        [128, 128, 128], // Dark Gray
        [255, 0, 0], // Red
        [0, 255, 0], // Green
        [0, 0, 255], // Blue
        [255, 255, 0], // Yellow
        [255, 128, 0], // Orange
        [128, 0, 255], // Purple
        [0, 255, 255], // Cyan
        [255, 0, 255], // Magenta
      ];

      // 확대된 캔버스에 NES 팔레트 적용
      applyCustomPalette(enlargedCanvas, nesPalette);

      // 4. Data URL 생성
      const pixelArtUrl = enlargedCanvas.toDataURL("image/png");
      console.log("Generated Pixel Art URL:", pixelArtUrl);

      setImage(pixelArtUrl); // 상태 업데이트
      setImageName("pixel_art.png"); // 다운로드를 위한 파일 이름 설정
    };

    img.onerror = () => {
      console.error("Failed to load image");
    };
  };

  const applyCustomPalette = (canvas, palette) => {
    const ctx = canvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    const findClosestColor = (r, g, b) => {
      let closestColor = palette[0];
      let closestDistance = Infinity;

      palette.forEach(([pr, pg, pb]) => {
        const distance = Math.sqrt(
          (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2
        );
        if (distance < closestDistance) {
          closestDistance = distance;
          closestColor = [pr, pg, pb];
        }
      });

      return closestColor;
    };

    for (let i = 0; i < data.length; i += 4) {
      const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
      const [pr, pg, pb] = findClosestColor(r, g, b);

      data[i] = pr;
      data[i + 1] = pg;
      data[i + 2] = pb;
    }

    ctx.putImageData(imgData, 0, 0);
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
