import react from "react";


const range = (len) => {
    const arr = [];
    for (let i = 0; i < len; i++) {
      arr.push(i);
    }
    return arr;
  };
  
  const newPerson = () => {
    const statusChance = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    const subject = ["국어", "수학", "통합", "창체"];
    const timetable = ["1교시", "2교시", "3교시", "4교시", "5교시", "6교시"];
    return {
      time: timetable[0],
      monday: subject[statusChance],
      tuesday: subject[statusChance],
      wednesday: subject[statusChance],
      thursday: subject[statusChance],
      friday: statusChance > 2 ? "국어" : statusChance > 1 ? "수학" : "통합"
    };
  };
  
  export default function makeSchedule(...lens) {
    const makeDataLevel = (depth = 0) => {
      const len = lens[depth];
      return range(len).map((d) => {
        return {
          ...newPerson()
          //     subRows: lens[depth + 3] ? makeDataLevel(depth + 3) : undefined
        };
      });
    };
  
    return makeDataLevel();
  }