import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  padding: 1.25rem;
  cursor: pointer;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  line-height: 160%;
  :not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.fontColor};
    transition: border-bottom 1s ease;
  }
  :hover {
    background-color: ${(props) => props.theme.bgColor};
  }
  .bold_text_news {
    font-weight: 600;
  }
`;

const Title = styled.div`
  font-size: 1.125em;
  font-size: 1.125rem;
`;

const Description = styled.div``;

const Date = styled.div`
  justify-self: flex-end;
`;

const NewsItem = ({ item }) => {
  const date = new window.Date(item.pubDate);
  const processSetDay = () => {
    const day = date.getDay();
    if (day === 1) {
      return "월요일";
    } else if (day === 2) {
      return "화요일";
    } else if (day === 3) {
      return "수요일";
    } else if (day === 4) {
      return "목요일";
    } else if (day === 5) {
      return "금요일";
    } else if (day === 6) {
      return "토요일";
    } else if (day === 0) {
      return "일요일";
    }
  };
  const processSetDate = () => {
    return `${date.getFullYear()}년 ${(date.getMonth() + 1).toString().padStart(2, 0)}월 ${date
      .getDate()
      .toString()
      .padStart(2, 0)}일`;
  };
  const processSetTime = () => {
    return `${date.getHours().toString().padStart(2, 0)}:${date.getMinutes().toString().padStart(2, 0)}`;
  };

  const title = item.title.replace(/&quot;/gi, "'").split("b>");
  const description = item.description.replace(/&quot;/gi, "'").split("b>");

  const onClickNews = () => {
    window.open(item.link, "__blank");
  };
  return (
    <Container onClick={onClickNews}>
      <Title>
        {title.map((item, index) => {
          if (item[item.length - 1] === "<") {
            return <span key={index}>{item.slice(0, item.length - 1)}</span>;
          } else if (item[item.length - 1] === "/") {
            return (
              <span key={index} className="bold_text_news">
                {item.slice(0, item.length - 2)}
              </span>
            );
          } else {
            return <span key={index}>{item}</span>;
          }
        })}
      </Title>
      <Description>
        {description.map((item, index) => {
          if (item[item.length - 1] === "<") {
            return <span key={index}>{item.slice(0, item.length - 1)}</span>;
          } else if (item[item.length - 1] === "/") {
            return (
              <span key={index} className="bold_text_news">
                {item.slice(0, item.length - 2)}
              </span>
            );
          } else {
            return <span key={index}>{item}</span>;
          }
        })}
      </Description>
      <Date>
        {processSetDate()} {processSetDay()} {processSetTime()}
      </Date>
    </Container>
  );
};

export default NewsItem;
