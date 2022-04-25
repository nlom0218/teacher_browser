import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "../../../routes";

const SPageBtn = styled.div`
  justify-self: flex-end;
  display: grid;
  grid-template-columns: ${(props) => (props.FLPage ? "1fr" : "1fr 1fr")};
  column-gap: 20px;
  column-gap: 1.25rem;
  padding: 0px 20px;
  padding: 0rem 1.25rem;
`;

const Btn = styled.div`
  background-color: #f38181;
  padding: 5px;
  padding: 0.3125rem;
  border-radius: 50%;
  cursor: pointer;
  svg {
    font-size: 1.25em;
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 1);
    display: flex;
  }
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const PageBtn = ({ page, pageType }) => {
  const processFLPage = () => {
    if (parseInt(page) === 1) {
      return true;
    }
    return false;
  };
  return (
    <SPageBtn FLPage={processFLPage()}>
      {parseInt(page) !== 1 && (
        <Link
          to={{
            pathname: `${routes.familyMonth}/${pageType}`,
            search: `?page=${parseInt(page) - 1}`,
          }}
        >
          <Btn>
            <IoIosArrowBack />
          </Btn>
        </Link>
      )}
      <Link
        to={{
          pathname: `${routes.familyMonth}/${pageType}`,
          search: `?page=${parseInt(page) + 1}`,
        }}
      >
        <Btn>
          <IoIosArrowForward />
        </Btn>
      </Link>
    </SPageBtn>
  );
};

export default PageBtn;
