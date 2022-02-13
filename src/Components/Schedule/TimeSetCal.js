import React from "react";
import { timeSetData } from "./ScheduleData";
const basicTime = timeSetData[0].minutes;
const timeResult = [];
function timePush() {
  timeResult.push(tDate.toTimeString().slice(0, 5));
}
const tDate = new Date();
const hour = parseInt(basicTime.hour);
tDate.setHours(hour);
tDate.setMinutes(basicTime.minutes);
timePush(); //1교시 시작
//수정중...
tDate.setMinutes(tDate.getMinutes() + basicTime.classtime); //1교시 끝
timePush();
for (var i = 0; i < basicTime.lunchhour - 1; i++) {
  tDate.setMinutes(tDate.getMinutes() + basicTime.classtime); //2-4교시 시작
  timePush();
  tDate.setMinutes(tDate.getMinutes() + basicTime.resttime); //2-4교시 끝
  timePush();
}
tDate.setMinutes(tDate.getMinutes() + basicTime); //점심 후 5교시 시작
timePush();
tDate.setMinutes(tDate.getMinutes() + basicTime.classtime); //5교시 끝
timePush();
for (var i = 0; i < 6 - basicTime.lunchhour - 1; i++) {
  tDate.setMinutes(tDate.getMinutes() + basicTime.resttime); //6교시 시작
  timePush();
  tDate.setMinutes(tDate.getMinutes() + basicTime.classtime); //6교시 끝
  timePush();
}

export const TimeSetCal = basicTime;

// export default TimeSetCal;
