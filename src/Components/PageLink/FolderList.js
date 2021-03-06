import styled from "styled-components";
import { useReactiveVar } from "@apollo/client";
import {
  movePageLinkFolder,
  pageLinkFolderVar,
  removePageLinkFolder,
} from "../../apollo";
import { linkPickFolderVar } from "../../apollo";
import { removeLinkPickFolder } from "../../apollo";
import { moveLinkPickFolder } from "../../apollo";
import { customMedia } from "../../styles";

const Container = styled.div`
  ${customMedia.greaterThan("desktop")`
  position: absolute;
  padding: 20px;
  padding: 1.25rem;
  width: 24%;
  left: ${(props) => !props.right && "4%"};
  top: 4%;
  right: ${(props) => props.right && "4%"};
  min-height: 92%;
  max-height: 92%;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  grid-template-rows: 1fr auto;
  transition: background-color 1s ease;
  `}
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${(props) => props.theme.bgColor};
  .LinkPush {
    color: ${(props) => props.theme.bgColor};
    padding: 10px;
    padding: 0.625rem;
    text-align: center;
    background-color: ${(props) => props.theme.btnBgColor};
    transition: background-color 1s ease, color 1s ease;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
  }
`;

const SFolderList = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${customMedia.greaterThan("desktop")`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: repeat(${(props) => props.listnum + 1}, auto) 1fr;
  row-gap: 10px;
  row-gap: 0.625rem;
  min-height: 100%;
  max-height: 100%;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  `}
`;

const Folder = styled.div`
  margin: 5px;
  margin: 0.3125rem;
  padding: 10px;
  cursor: pointer;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  :hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
  background-color: ${(props) => props.selected && props.theme.hoverColor};
  transition: background-color 1s ease;
  ${customMedia.greaterThan("desktop")`
    margin: 0;
  `}
`;

const FolderList = ({ right }) => {
  const pageLinkFolder = useReactiveVar(pageLinkFolderVar);
  const linkPickFolder = useReactiveVar(linkPickFolderVar);

  const onClickPickFolder = (item) => {
    //right => pageLink
    if (right) {
      if (item === "????????????") {
        removePageLinkFolder();
      } else {
        movePageLinkFolder(item);
      }
    } else {
      if (item === "????????????") {
        removeLinkPickFolder();
      } else {
        moveLinkPickFolder(item);
      }
    }
  };
  const pageSubmitUrl = "https://forms.gle/cbvs7BuY1RKmcFHo7";
  const onClickLinkPush = () => {
    window.open(pageSubmitUrl, "_blank");
  };
  const pageLinkFolderName = [
    "????????????",
    "????????????",
    "??????",
    "??????",
    "??????",
    "??????",
    "??????",
    "??????",
    "??????",
    "??????",
    "??????",
    "??????",
    "??????",
    "????????????",
    "?????????",
    "?????????",
    "????????????",
    "??????????????????",
    "?????????",
    "?????????",
    "??????/??????",
    "????????????",
  ];
  const listnum = pageLinkFolderName.length;
  const processSelected = (item) => {
    if (right) {
      //pageLink
      if (item === "????????????") {
        if (pageLinkFolder) {
          return false;
        } else {
          return true;
        }
      } else {
        if (pageLinkFolder === item) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      //Pick
      if (item === "????????????") {
        if (linkPickFolder) {
          return false;
        } else {
          return true;
        }
      } else {
        if (linkPickFolder === item) {
          return true;
        } else {
          return false;
        }
      }
    }
  };

  return (
    <Container right={right}>
      <SFolderList listnum={listnum}>
        {pageLinkFolderName.map((item, index) => {
          return (
            <Folder
              selected={processSelected(item)}
              key={index}
              onClick={() => onClickPickFolder(item)}
            >
              {item}
            </Folder>
          );
        })}
      </SFolderList>
      <div className="LinkPush" onClick={onClickLinkPush}>
        ????????? ??????
      </div>
    </Container>
  );
};

export default FolderList;
