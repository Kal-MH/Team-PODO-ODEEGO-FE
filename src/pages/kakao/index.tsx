import { useRouter } from "next/router";
import React, { useEffect } from "react";
import SignUpSearchInput from "@/components/signup/signup-search";
import styled from "@emotion/styled";
import { COLORS } from "@/constants/css";

import { setLocalStorage } from "@/utils/storage";
import Header from "@/components/layout/header";

import { axiosInstanceWitToken } from "@/axios/instance";
import fetch from "node-fetch";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import queryString from "query-string";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { code: authCode } = context.query;

  const tokenUrl = `https://kauth.kakao.com/oauth/token?${queryString.stringify(
    {
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_REST_API_KEY,
      redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      code: authCode,
    }
  )}`;

  const tokenResponse = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());

  console.log(tokenResponse.access_token);

  return {
    props: {
      tokenResponse,
    },
  };
}

const Kakao = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();
  const { code: authCode } = router.query;

  useEffect(() => {
    const fetchKaokaoUserData = async () => {
      try {
        if (authCode) {
          setLocalStorage("logoutToken", props.tokenResponse.access_token);
          if (window.performance && performance.navigation.type !== 1) {
            const loginBackendUrl = `${process.env.NEXT_PUBLIC_API_END_POINT_ODEEGO}/api/v1/auth/user/me`;
            const { data } = await axiosInstanceWitToken.post(loginBackendUrl);
            setLocalStorage("token", data.accessToken);
          } else {
            console.error("The page is reloaded");
          }
        }
      } catch (err) {
        throw new Error((err as Error).message);
      }
    };
    fetchKaokaoUserData();
  }, [authCode, router]);

  return (
    <SignUpContainer>
      <Header token={props.tokenResponse.access_token} />
      <BorderContainer />
      <SignUpTitle>가까운 지하철역을 입력해주세요. ^^</SignUpTitle>
      <SignUpSearchInput />
    </SignUpContainer>
  );
};
export default Kakao;

const SignUpTitle = styled.h1`
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const BorderContainer = styled.div`
  height: 25px;
  width: 100%;
  background-color: ${COLORS.backgroundPrimary};
  margin-top: -15px;
  border-radius: 20px 20px 0 0;
`;

const SignUpContainer = styled.div`
  width: 43rem;
  margin: 0 auto;
`;
