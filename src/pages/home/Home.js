import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageTitle from "../../PageTitle";

const Wrapper = styled.div`
  width: 100%;
  max-width: 430px;
  height: 100vh;
  margin: 0 auto;
  background: url(${`${process.env.PUBLIC_URL}/imgs/pixelart_Bg.jpg`}) no-repeat
    center/ cover;
`;
const InnerWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-family: "GalmuriMono9";
  .textBox {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title {
    font-size: 48px;
    font-weight: 900;
  }
  .desc {
    font-size: 16px;
    margin-top: 14px;
    text-align: center;
  }
`;
const Button = styled.button`
  all: unset;
  width: 170px;
  height: 53px;
  background-color: #000;
  color: #fff;
  text-align: center;
  font-size: 24px;
  cursor: pointer;
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageTitle title={"HOME"} />
      <Wrapper>
        <InnerWrap>
          <div className="textBox">
            <div className="title">Pixtory</div>
            <div className="desc">
              소중한 인연, 아름다운 추억을 <br />
              나만의 레트로 아트로 만들어 보세요!
            </div>
          </div>
          <Button onClick={() => navigate("main")}>시작하기</Button>
        </InnerWrap>
      </Wrapper>
    </>
  );
};

export default Home;
