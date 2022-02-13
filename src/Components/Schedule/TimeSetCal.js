import React from "react";
import { timeSetData } from "./ScheduleData";
const basicTime = timeSetData[0];
const hour = parseInt(basicTime.hour);
const minutes = parseInt(basicTime.minutes);
const classtime = parseInt(basicTime.classtime);
const resttime = parseInt(basicTime.resttime);
const lunchhour = parseInt(basicTime.lunchhour);
const lunchminutes = parseInt(basicTime.lunchminutes);
const breaktime = parseInt(basicTime.breaktime);
const breakminutes = parseInt(basicTime.breakminutes);
const timeResult = [];
function timePush() {
  timeResult.push(tDate.toTimeString().slice(0, 5));
}
const tDate = new Date();
tDate.setHours(hour);
tDate.setMinutes(minutes);
timePush(); //1교시 시작
//수정중...

tDate.setMinutes(tDate.getMinutes() + classtime); //1교시 끝
timePush();
for (var i = 0; i < lunchhour - 1; i++) {
  tDate.setMinutes(tDate.getMinutes() + resttime); //2-4교시 시작
  timePush();
  tDate.setMinutes(tDate.getMinutes() + classtime); //2-4교시 끝
  timePush();
}
tDate.setMinutes(tDate.getMinutes() + lunchminutes); //점심 후 5교시 시작
timePush();
tDate.setMinutes(tDate.getMinutes() + classtime); //5교시 끝
timePush();
for (var i = 0; i < 6 - lunchhour - 1; i++) {
  tDate.setMinutes(tDate.getMinutes() + resttime); //6교시 시작
  timePush();
  tDate.setMinutes(tDate.getMinutes() + classtime); //6교시 끝
  timePush();
}

export const timeSetCal = timeResult;

// export default TimeSetCal;
