import React from "react";

export const TimeSet = () => {
  const basicTime = [];
  const basic = {
    breakminutes: "0",
    breaktime: "0",
    classtime: "40",
    hour: "9",
    lunchhour: "4",
    lunchminutes: "50",
    minutes: "10",
    resttime: "10",
  };
  const timeResult = [];
  function timePush() {
    timeResult.push(tDate.toTimeString().slice(0, 5));
  }
  const tDate = new Date();
  const hour = parseInt(basic.hour);
  tDate.setHours(hour);
  tDate.setMinutes(basicTime[1]);
  timePush(); //1교시 시작
  tDate.setMinutes(tDate.getMinutes() + basicTime[2]); //1교시 끝
  timePush();
  for (var i = 0; i < basicTime[4] - 1; i++) {
    tDate.setMinutes(tDate.getMinutes() + basicTime[3]); //2-4교시 시작
    timePush();
    tDate.setMinutes(tDate.getMinutes() + basicTime[2]); //2-4교시 끝
    timePush();
  }
  tDate.setMinutes(tDate.getMinutes() + basicTime[5]); //점심 후 5교시 시작
  timePush();
  tDate.setMinutes(tDate.getMinutes() + basicTime[2]); //5교시 끝
  timePush();
  for (var i = 0; i < 6 - basicTime[4] - 1; i++) {
    tDate.setMinutes(tDate.getMinutes() + basicTime[3]); //6교시 시작
    timePush();
    tDate.setMinutes(tDate.getMinutes() + basicTime[2]); //6교시 끝
    timePush();
  }
};
