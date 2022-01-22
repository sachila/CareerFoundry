import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
`;

export const RequestAppoinmentContainer = styled.div`
  padding: 20px;
`;

export const FormContainer = styled(Flex)`
  flex-direction: column;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const ChipContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
`;

export const CircularProgressContainer = styled(Flex)`
  justify-content: center;
`;

export const ConfirmContainer = styled(Flex)`
  flex-direction: column;
  padding: 30px 0px;
`;

export const ConfirmDetailLabel = styled(Flex)`
  flex: 1;
  font-weight: 500;
`;
export const ConfirmDetailValue = styled(Flex)`
  flex: 3;
`;

export const ButtononContainer = styled(Flex)`
  justify-content: end;
  gap: 15px;
`;
