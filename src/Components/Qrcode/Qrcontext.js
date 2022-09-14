import React, { useState, useEffect } from "react";
import styled from "styled-components";
import QRCode from "qrcode";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import routes from "../../routes";
import { useNavigate } from "react-router-dom";

const Storages = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 5fr;
  background: ${(props) => props.theme.cardBg};
  width: 100%;
  height: 150px;
  border-radius: 5px;
  border-radius: 0.3125rem;
  padding: 10px;
  padding: 0.625rem;
  justify-items: center;
  align-items: center;
`;

const Body = styled.div`
  display: grid;
  width: 130px;
  height: 130px;
  row-gap: 40px;
  row-gap: 2.5rem;
  /* background-color: ${(props) => props.theme.cardBg}; */
  border-radius: 5px;
  border-radius: 0.3125rem;
  justify-self: center;
  align-self: center;
  justify-items: center;
  align-items: center;
  cursor: pointer;
  img {
    width: 130px;
    height: 130px;
  }
`;

const Subject = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr auto;
  width: 90%;
  height: 100px;
  row-gap: 6x;
  row-gap: 0.375rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  justify-self: center;
  align-self: center;
  padding: 10px;
  padding: 0.625rem;
`;

const Title = styled.div`
  font-size: 1.25em;
  font-size: 1.25rem;
  font-weight: 600;
  align-self: center;
`;
const Url = styled.div`
  width: 100%;
  font-size: 1em;
  font-size: 1rem;
  text-align: left;
  overflow: hidden;
  cursor: pointer;
`;
const Qrcontext = ({ addPickQr, setAddPickQr, title, urlOne, id }) => {
  const navigate = useNavigate();

  const [pick, setPick] = useState(false);
  const [imageUrlOne, setImageUrlOne] = useState(undefined);

  const deleteId = (id) => {
    const newAddId = addPickQr.filter((item) => item !== id);
    setAddPickQr(newAddId);
  };
  const checkId = (id) => {
    const newAddId = [...addPickQr, id];
    setAddPickQr(newAddId);
  };
  const onClickPick = () => {
    setPick(!pick);
    const exist = addPickQr.includes(id);
    if (exist) {
      deleteId(id);
    } else {
      checkId(id);
    }
  };
  const onClickResult = () => {
    localStorage.setItem("qrmode", "result");
    localStorage.setItem("resultUrl", urlOne);
    navigate(routes.qrcode);
  };
  const onClickUrl = () => {
    window.open(urlOne, "width=500, height=600");
  };

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(urlOne);
      setImageUrlOne(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (urlOne) {
      generateQrCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlOne]);
  useEffect(() => {
    if (addPickQr.length === 0) {
      setPick(false);
    }
  }, [addPickQr]);

  return (
    <Storages onClick={() => onClickPick(id)}>
      {pick === true ? <GrCheckboxSelected /> : <GrCheckbox />}
      <Body onClick={onClickResult}>
        <img src={imageUrlOne} alt="img" />
      </Body>
      <Subject>
        <Title>{title}</Title>
        <Url onClick={onClickUrl}>{urlOne}</Url>
      </Subject>
    </Storages>
  );
};
export default Qrcontext;
