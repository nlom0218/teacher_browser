import styled from "styled-components";

interface IPoops {
  image: string;
}
const Image = styled.div<IPoops>`
  background: url(${(props) => props.image});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const BackgroundImage = ({ image }: IPoops) => {
  return <Image image={image}></Image>;
};

export default BackgroundImage;
