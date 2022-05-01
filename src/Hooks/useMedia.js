import { useMediaQuery } from "react-responsive";

const useMedia = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width: 320px)",
  });
  const media = () => {
    if (isDesktop) {
      return "Desktop";
    } else if (isTablet) {
      return "Tablet";
    } else if (isMobile) {
      return "Mobile";
    } else {
      return "Mobile";
    }
  };
  return media();
};

export default useMedia;
