import Main from "@/components/places/main";
import { COLORS } from "@/constants/css";
import { tmpState } from "@/recoil/tmp-state";
import styled from "@emotion/styled";
import axios from "axios";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const Places = () => {
  const dummy = [
    {
      stationName: "강남역",
      address: "서울 강남구 강남대로 396",
    },
    {
      stationName: "잠실역",
      address: "서울특별시 송파구 올림픽로 265",
    },
  ];

  const setTestState = useSetRecoilState(tmpState);

  const test = async (stationName: string, address: string) => {
    try {
      const { data } = await axios({
        method: "get",
        url: `http://52.78.224.123:8080/api/v1/places?station-name=${stationName}&address=${address}`,
      });

      console.log(data);
      setTestState(data.places);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    test(dummy[0].stationName, dummy[0].address);
  }, []);

  const handleButtonClick = (index: number) => {
    test(dummy[index].stationName, dummy[index].address);
  };

  return (
    <Container>
      <TempHeader>Temp Header</TempHeader>
      <button onClick={() => handleButtonClick(0)}>1</button>
      <button onClick={() => handleButtonClick(1)}>2</button>
      <Main />
    </Container>
  );
};

export default Places;

const Container = styled.div`
  width: 100%;
  background-color: #fdfdfd;
`;

const TempHeader = styled.header`
  width: 100%;
  height: 14rem;
  background-color: ${COLORS.mainGreen};
`;
