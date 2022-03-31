import React, { useEffect, useState } from 'react';

const AttendCalendar = ({ attendData, item }) => {
  const [attendInfo, setAttendInfo] = useState([])
  console.log(attendInfo);
  useEffect(() => {
    if (attendData) {
      const newAttendInfo = attendData?.seeAttendance?.filter(attend => attend.date === new window.Date(item.date).setHours(0, 0, 0, 0))
      setAttendInfo(newAttendInfo)
    }
  }, [attendData])
  return (<div></div>);
}

export default AttendCalendar;