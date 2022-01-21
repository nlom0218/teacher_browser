import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  padding: 1.25rem;
  cursor: pointer;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  line-height: 120%;
  :not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.fontColor};
    transition: border-bottom 1s ease;
  }
  :hover {
    background-color: ${props => props.theme.contentBgColor};
  }
  .bold_text_news {
    font-weight: 600;
  }
`

const Title = styled.div`
  font-size:  1.125em;
  font-size:  1.125rem;
`

const Description = styled.div``

const NewsItem = ({ item }) => {
  const title = item.title.replace(/&quot;/gi, "'").split("b>")
  const description = item.description.split("b>")
  return (<Container>
    <Title>
      {title.map((item, index) => {
        if (item[item.length - 1] === "<") {
          return <span key={index}>{item.slice(0, item.length - 1)}</span>
        } else if (item[item.length - 1] === "/") {
          return <span key={index} className="bold_text_news">{item.slice(0, item.length - 2)}</span>
        } else {
          return <span key={index}>{item}</span>
        }
      })}
    </Title>
    <Description>
      {description.map((item, index) => {
        if (item[item.length - 1] === "<") {
          return <span key={index}>{item.slice(0, item.length - 1)}</span>
        } else if (item[item.length - 1] === "/") {
          return <span key={index} className="bold_text_news">{item.slice(0, item.length - 2)}</span>
        } else {
          return <span key={index}>{item}</span>
        }
      })}
    </Description>
  </Container>);
}

export default NewsItem;