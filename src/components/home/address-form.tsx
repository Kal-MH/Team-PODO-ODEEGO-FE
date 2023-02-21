"use client";

import styled from "@emotion/styled";
import { Box, IconButton } from "@mui/material";
import { MouseEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import FormInput from "./form-input";
import { useRouter } from "next/navigation";
import { COLORS } from "@/constants/css";
import useMultipleInputs from "@/hooks/use-multiple-inputs";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { countState } from "@/recoil/count-state";
import { userAddressState } from "@/recoil/address-state";
// import axios from "axios";

const BUTTON_SUBMIT_TEXT = "중간지점 찾기";

const AddressForm = () => {
  const router = useRouter();
  const { inputs, addInput, removeInput } = useMultipleInputs();
  const count = useRecoilValue(countState);
  const addressList = useRecoilValue(userAddressState);

  const handleInputClickRoute = (index: number) => {
    //TODO
    // - 지우기
    // const count = customLocalStorage.get("count", 0);

    //해당 주소폼이 수정되도록 id를 쿼리로 넘겨줌
    router.push(`/search?index=${index}&count=${count}`);
  };
  const handleButtonClickSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // const addressList = customLocalStorage.get(USER_ADDRESS, []);

    if (addressList.length < 2) {
      //TODO
      // - TOAST 경고창
      toast.error("주소를 2개 이상 입력해주세요.");
    }

    //TODO
    // - 백엔드 api 보내기
    // - recoil에 저장하기
    // - 지도 페이지로 넘어가기

    // const test = async () => {
    //   const { data } = await axios({
    //     method: "get",
    //     url: "http://52.78.224.123:8080/api/hello/simple",
    //   });

    //   console.log(data);
    // };

    // test();
  };

  return (
    <Form>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        {inputs.map((input, index) => (
          <FormInput
            key={index}
            index={index}
            roadAddress={input.roadAddress}
            onClick={() => handleInputClickRoute(index)}
            onRemove={removeInput}
          />
        ))}
        {inputs.length < 4 && (
          <IconButton
            aria-label='add'
            sx={{ color: "#b4c9bc" }}
            onClick={(e) => addInput(e)}>
            <AddIcon />
          </IconButton>
        )}
      </Box>
      <SubmitButton type='submit' onClick={handleButtonClickSubmit}>
        {BUTTON_SUBMIT_TEXT}
      </SubmitButton>
      <Toaster />
    </Form>
  );
};

export default AddressForm;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const SubmitButton = styled.button`
  width: 80%;
  height: 4.8rem;
  background-color: ${COLORS.mainOrange};
  color: white;
  text-align: center;
  border-radius: 8px;
  border: none;
  position: absolute;
  bottom: 3.5rem;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
`;
