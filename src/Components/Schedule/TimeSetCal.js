const timeSetCal = (thour, tminutes, tclasstime, tresttime, tlunchhour, tlunchminutes) => {
  const timeResult = [];
  function timePush() {
    timeResult.push(tDate.toTimeString().slice(0, 5));
  }
  const tDate = new Date();
  tDate.setHours(thour);
  tDate.setMinutes(tminutes);
  timePush(); //1교시 시작

  tDate.setMinutes(tDate.getMinutes() + tclasstime); //1교시 끝
  timePush();
  for (var i = 0; i < tlunchhour - 1; i++) {
    tDate.setMinutes(tDate.getMinutes() + tresttime); //2-4교시 시작
    timePush();
    tDate.setMinutes(tDate.getMinutes() + tclasstime); //2-4교시 끝
    timePush();
  }
  tDate.setMinutes(tDate.getMinutes() + tlunchminutes); //점심 후 5교시 시작
  timePush();
  tDate.setMinutes(tDate.getMinutes() + tclasstime); //5교시 끝
  timePush();
  for (var i = 0; i < 6 - tlunchhour - 1; i++) {
    tDate.setMinutes(tDate.getMinutes() + tresttime); //6교시 시작
    timePush();
    tDate.setMinutes(tDate.getMinutes() + tclasstime); //6교시 끝
    timePush();
  }
  return timeResult;
};

export default timeSetCal;
