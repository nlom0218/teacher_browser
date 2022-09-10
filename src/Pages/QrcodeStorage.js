import React from "react";
import styled from "styled-components";
import BasicContainer from "../Components/Shared/BasicContainer";
import { useQuery } from "@apollo/client";
import { QRCODES_QUERY } from "../Graphql/Qrcode/query";
import Loading from "../Components/Shared/Loading";
import useMe from "../Hooks/useMe";
import Qroptionbtn from "../Components/Qrcode/Qroptionbtn";
import { customMedia } from "../styles";
import { isPopupVar } from "../apollo";
import { useReactiveVar } from "@apollo/client";
import QrPrintMain from "../Components/Qrcode/QrPrint/QrPrintMain";
import Qrcontext from "../Components/Qrcode/Qrcontext";

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 1fr 1fr 3fr;
`;
const Title = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  padding: 40px;
  padding: 2.5rem;
  font-size: 1.875em;
  font-size: 1.875rem;
`;
const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
  `}
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: 1fr 1fr 1fr;
  `}
  padding: 20px;
  padding: 1.25rem;
  justify-items: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
`;
const QrcodeStorage = () => {
  // const isPopup = useReactiveVar(isPopupVar);
  const me = useMe();
  const { data, loading } = useQuery(QRCODES_QUERY, {
    variables: { userEmail: me?.email },
    skip: !me,
  });
  if (loading) {
    return <Loading page="mainPage" />;
  }

  return (
    <BasicContainer menuItem={true}>
      <Container>
        <Title>내 QR코드 보관함</Title>
        <div>
          <Qroptionbtn data={data} me={me} />
        </div>

        <Table>
          {data?.qrcodes.map((qrcode, index) => (
            <Qrcontext key={index} title={qrcode.title} urlOne={qrcode.url} id={qrcode._id} />
          ))}
        </Table>

        {/* {isPopup === "printQR" && <QrPrintMain />} */}
      </Container>
    </BasicContainer>
  );
};

export default QrcodeStorage;
