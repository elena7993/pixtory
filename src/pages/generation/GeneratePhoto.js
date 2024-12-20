import { toaster } from "evergreen-ui";
import { useEffect, useRef, useState } from "react";
import { AiOutlineDownload, AiOutlineUpload } from "react-icons/ai";
import { FaRegCopy } from "react-icons/fa";
import styled from "styled-components";

const Button = styled.button`
  all: unset;
  border: 1px solid #000;
  height: 40px;
  width: ${(props) => props.width || "100px"};
  border: ${(props) => (props.noBorder ? "none" : "1px solid #fff")};
  background-color: ${(props) => (props.noBg ? "none" : "#7fd1d8")};
  color: ${(props) => (props.noColor ? "#000" : "#fff")};
  text-align: center;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 430px;
  height: 100vh;
  min-height: 100vh;
  margin: 0 auto;
  font-family: "GalmuriMono9";
  padding: 20px;
  background-color: #e2f4f6;
`;

const ImgBox = styled.div`
  width: 339px;
  height: 364px;
  border: 5px solid #004349;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
  img {
    width: 91px;
    height: 78px;
  }
`;

const ButtonsWrap = styled.div`
  width: 338px;
  margin: 0 auto;
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
    background-color: #29b1bd;
    border: 1px solid #fff;
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
      toaster.warning("다운로드할 이미지가 없습니다!");
      return;
    } else {
      toaster.success("이미지가 다운로드 되었습니다.");
    }

    const link = document.createElement("a");
    link.href = image;
    link.download = imageName; // 다운받을 파일이름(원본) 받아옴!
    link.click();
  };

  const generatePixelArt = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.crossOrigin = "Anonymous"; // CORS 문제 방지
    img.src = image;

    toaster.success("이미지가 픽셀아트로 변환되었습니다!", {
      duration: 10,
      // autoClose: 5000,
    });

    img.onload = () => {
      // console.log("Image loaded for pixel art");

      const scale = 0.25; // 픽셀화 정도 조정(0.1 no)
      const originalWidth = img.width;
      const originalHeight = img.height;

      // 1. 축소 캔버스 설정
      canvas.width = originalWidth * scale;
      canvas.height = originalHeight * scale;

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 2. 색상 단순화
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      const simplifyColor = (value) => Math.round(value / 64) * 64; // 색상을 4단계로 단순화 (0, 64, 128, 192, 255)
      for (let i = 0; i < data.length; i += 4) {
        data[i] = simplifyColor(data[i]); // R
        data[i + 1] = simplifyColor(data[i + 1]); // G
        data[i + 2] = simplifyColor(data[i + 2]); // B
      }
      ctx.putImageData(imgData, 0, 0);

      // 3. 확대 캔버스 설정
      const enlargedCanvas = document.createElement("canvas");
      const enlargedCtx = enlargedCanvas.getContext("2d");
      enlargedCanvas.width = originalWidth * 0.9;
      enlargedCanvas.height = originalHeight * 0.9;

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

      // 4. 경계선 추가
      const addOutline = (canvas, outlineColor = [0, 0, 0]) => {
        const ctx = canvas.getContext("2d");
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        const newImgData = ctx.createImageData(imgData);
        const newData = newImgData.data;

        const getPixel = (x, y) => {
          if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
            return null;
          }
          const index = (y * canvas.width + x) * 4;
          return [
            data[index],
            data[index + 1],
            data[index + 2],
            data[index + 3],
          ];
        };

        const isTransparent = (pixel) => pixel && pixel[3] === 0;

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4;
            const pixel = getPixel(x, y);

            if (!pixel || isTransparent(pixel)) continue;

            const neighbors = [
              getPixel(x - 1, y), // 왼쪽
              getPixel(x + 1, y), // 오른쪽
              getPixel(x, y - 1), // 위
              getPixel(x, y + 1), // 아래
            ];

            if (neighbors.some(isTransparent)) {
              newData[index] = outlineColor[0];
              newData[index + 1] = outlineColor[1];
              newData[index + 2] = outlineColor[2];
              newData[index + 3] = 255;
            } else {
              newData[index] = data[index];
              newData[index + 1] = data[index + 1];
              newData[index + 2] = data[index + 2];
              newData[index + 3] = data[index + 3];
            }
          }
        }

        ctx.putImageData(newImgData, 0, 0);
      };

      addOutline(enlargedCanvas);

      // 5. Data URL 생성
      const pixelArtUrl = enlargedCanvas.toDataURL("image/png");
      console.log("Generated Pixel Art URL:", pixelArtUrl);

      setImage(pixelArtUrl);
      setImageName("pixel_art_with_improvements.png");
    };

    img.onerror = () => {
      console.error("Failed to load image");
    };
  };

  // const copyToClipboard = (url) => {
  //   navigator.clipboard
  //     .writeText(url)
  //     .then(() => {
  //       alert("이미지 URL이 클립보드에 복사되었습니다!");
  //     })
  //     .catch((err) => {
  //       console.error("복사 실패:", err);
  //       alert("복사에 실패했습니다.");
  //     });
  // };

  // -----------------------------------------------------------

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          toaster.success("이미지 주소가 복사되었습니다!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    } else {
      // Fallback for unsupported browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        alert("Copied to clipboard!");
      } catch (err) {
        console.error("Fallback: Unable to copy", err);
      }
      document.body.removeChild(textarea);
    }
  }

  const [deviceType, setDeviceType] = useState("web");

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent;
      if (/android/i.test(userAgent)) {
        return "android";
      } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
        return "ios";
      } else {
        return "web";
      }
    };

    const detectType = detectDevice();
    setDeviceType(detectType);
    console.log(detectType);
  }, []);

  return (
    <Wrapper>
      <ImgBox>
        <label htmlFor="fileInput">
          <Button
            width="162px"
            noBorder
            noBg
            noColor
            onClick={triggerFileInput}
          >
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
            src={`${process.env.PUBLIC_URL}/imgs/pixelart_campervan.png`}
            alt="default_img"
          />
        )}
      </ImgBox>
      <ButtonsWrap>
        <Button width="162px" onClick={handleDownload}>
          Download Image <AiOutlineDownload sty />
        </Button>
        {deviceType !== "android" && (
          <Button
            className="copyButton"
            width="102px"
            onClick={() => copyToClipboard(image)}
          >
            Copy <FaRegCopy />
          </Button>
        )}
      </ButtonsWrap>
      <GenerateWrap>
        <button onClick={generatePixelArt}>Generate Your Photo</button>
      </GenerateWrap>
    </Wrapper>
  );
};

export default GeneratePhoto;
