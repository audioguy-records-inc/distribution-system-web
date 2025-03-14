import EmptySNS from "@/components/icons/sns/EmptySNS";
import Facebook from "@/components/icons/sns/Facebook";
import Instagram from "@/components/icons/sns/Instagram";
import TikTok from "@/components/icons/sns/TikTok";
import X from "@/components/icons/sns/X";
import Youtube from "@/components/icons/sns/Youtube";
import styled from "styled-components";

const Container = styled.div`
  display: flex;

  gap: 10px;
`;

export default function SnsSection() {
  return (
    <Container>
      <Instagram />
      <Facebook />
      <Youtube />
      <X />
      <TikTok />
      <EmptySNS />
    </Container>
  );
}
