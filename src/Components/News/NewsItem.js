import React from "react";
import styled from "styled-components";

const NewsListBlock = styled.div`
    display:flex;

    .thumbnail {
        margin-right:1rem;
        img{
            display:block;
            width : 160px;
            height: 100px;
            object-fit: cover;
        }
    }
    .contents{
        h2{
            margin:0;
            a{
                color:black;
                font-weight: bold ;
                font-size: large;
            
            }
        }
        p {
            margin :0;
            line-height:1.5;
            margin-left: 1rem;
            white-space: normal;
            font-size : small;
            overflow: hidden;
            height: 40px;


            
            
            
        }
    }
    & + & {
        margin-top :3 rem;
    }
`;

const NewsItem = ({article})=>{
    const{title, description, url, urlToImage}=article;
    return(
        <NewsListBlock>
            {urlToImage && (
                <div className="thumbnail">
                    <a href ={url} target="_blank" rel="noopener noreferrer">
                        <img src={urlToImage} alt="thumbnail" />
                    </a>
                </div>
            )}
            <div className="contents">
                <h2>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                </h2>
                <p>{description}</p>
            </div>
        </NewsListBlock>
    );
};

export default NewsItem;
