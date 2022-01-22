import React from 'react';
import styled from 'styled-components';
import { color } from '../../styles';

const Container = styled.div``

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Items = styled.div`
  cursor: pointer;
  font-size: 0.875em;
  font-size: 0.875rem;
  margin-right: 10px;
  margin-right: 0.625rem;
  margin-bottom: 10px;
  margin-bottom: 0.625rem;
  padding: 5px 10px;
  padding: 0.3125rem 0.625rem;
  background-color: yellow;
  border-radius: 5px;
  border-radius: 0.3125rem;
  color: ${color.black};
`

const FavoriteNewsList = ({ favoriteNews, setSeacrh }) => {
  const onClickFavoiteItem = (item) => {
    setSeacrh(item)
  }
  return (<Container>
    {favoriteNews.length === 0 ? <div>즐겨찾기 검색어가 없습니다.😭</div>
      : <List>
        {favoriteNews.map((item, index) => {
          return <Items key={index} onClick={() => onClickFavoiteItem(item)}>
            {item}
          </Items>
        })}
      </List>
    }
  </Container>);
}

export default FavoriteNewsList;