import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from "axios";

const NewsListBlock = styled.div`
    display: grid;
    grid-row: 50px;
    row-gap: 20px;
    row-gap: 1.25rem;
    box-sizing : border-box;
    padding-bottom: 3rem;
    width : 768px;
    margin : 0 auto;
    margin-top : 2rem;

    @media screen and (max-width:768px){
        width:100%auto;
        padding-left:1rem;
        padding-right:1rem;
    }
`;
const NewsList =() => {
    const[articles, setArticles] = useState(null);
    const[loading,setLoading]=useState(false);

    useEffect(()=> {
        const fetchData = async ()=> {
            setLoading(true);
            try{
                const response = await axios.get(
                    'http://newsapi.org/v2/top-headlines?country=kr&apiKey=fbfa30259d0242ebb6acd3f9ff0d8648',

                );
                setArticles(response.data.articles);
            } catch(e){
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    if (loading){
        return <NewsListBlock> 대기중...</NewsListBlock>;
    }
    if (!articles){
        return null;
    }
    return(
        <NewsListBlock>
            {articles.map(article=>(
                <NewsItem key={article.url}article={article}/>

            ))}
        </NewsListBlock>
    );
};

export default NewsList; 