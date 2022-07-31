import { useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { bgThemeAniVar, bgThemeVar } from "../../apollo";
import useMe from "../../Hooks/useMe";
import ChangBackgroundItem from "./ChangBackgroundItem";

const ChangBackground = () => {
  const bgColorArr = [
    "#F44336",
    "#E91E62",
    "#9C27B0",
    "#673AB6",
    "#3F50B5",
    "#2096F3",
    "#00A8F4",
    "#00BCD4",
    "#009688",
    "#4CAF4F",
    "#8BC24A",
    "#CDDC39",
    "#FFEB3A",
    "#FFC007",
    "#FF9800",
    "#FF5721",
    "#795548",
    "#607D8A",
  ];
  const bgThemeAni = useReactiveVar(bgThemeAniVar);
  const bgTheme = useReactiveVar(bgThemeVar);

  const me = useMe();
  const [userBgTheme, setUserBgTheme] = useState(undefined);

  useEffect(() => {
    if (bgTheme) {
      if (bgTheme.substr(0, 1) === "#") {
        setUserBgTheme(bgTheme);
      }
    }
  }, [bgTheme]);

  useEffect(() => {
    const removeBgTheme = setTimeout(() => {
      setUserBgTheme(undefined);
    }, [2000]);
    return () => {
      clearTimeout(removeBgTheme);
    };
  }, [userBgTheme]);

  return (
    <React.Fragment>
      {bgColorArr.map((item, index) => {
        return <ChangBackgroundItem color={item} key={index} userBgTheme={userBgTheme} bgThemeAni={bgThemeAni} />;
      })}
    </React.Fragment>
  );
};

export default ChangBackground;
