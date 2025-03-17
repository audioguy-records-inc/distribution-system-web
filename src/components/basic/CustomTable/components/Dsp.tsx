import { getFullUrl } from "@/constants/api";
import styled from "styled-components";
import theme from "@/styles/theme";

interface DspProps {
  name: string;
  imagePath: string;
}

const DspContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DspImage = styled.img`
  width: 28px;
  height: 28px;
  object-fit: cover;
  border-radius: 50%;
`;

const DspInfo = styled.div`
  display: flex;
  flex-direction: column;
  ${theme.fonts.body2.medium};
`;

const Dsp = ({ name, imagePath }: DspProps) => {
  console.log("moonsae imagePath", getFullUrl(imagePath));
  console.log("moonsae name", name);
  return (
    <DspContent>
      <DspImage src={getFullUrl(imagePath)} alt={name} />
      <DspInfo>
        <div>{name}</div>
      </DspInfo>
    </DspContent>
  );
};

export default Dsp;
