"use client";

import styled from "styled-components";
import theme from "@/styles/theme";
import { useUserStore } from "@/stores/use-user-store";

const Container = styled.div``;

export default function Home() {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return <Container>Home</Container>;
}
