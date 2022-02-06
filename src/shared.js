import { IcStudent1, IcStudent10, IcStudent11, IcStudent12, IcStudent13, IcStudent14, IcStudent15, IcStudent16, IcStudent17, IcStudent18, IcStudent19, IcStudent2, IcStudent20, IcStudent21, IcStudent22, IcStudent23, IcStudent24, IcStudent26, IcStudent27, IcStudent28, IcStudent29, IcStudent3, IcStudent30, IcStudent31, IcStudent32, IcStudent33, IcStudent34, IcStudent35, IcStudent38, IcStudent39, IcStudent4, IcStudent40, IcStudent41, IcStudent42, IcStudent43, IcStudent44, IcStudent46, IcStudent47, IcStudent48, IcStudent49, IcStudent5, IcStudent50, IcStudent6, IcStudent7, IcStudent8, IcStudent9 } from './icons/Students/IcStudents';

export const processStudentIcon = (number) => {
  if (number === 1) {
    return <IcStudent1 />
  } else if (number === 2) {
    return <IcStudent2 />
  } else if (number === 3) {
    return <IcStudent3 />
  } else if (number === 4) {
    return <IcStudent4 />
  } else if (number === 5) {
    return <IcStudent5 />
  } else if (number === 6) {
    return <IcStudent6 />
  } else if (number === 7) {
    return <IcStudent7 />
  } else if (number === 8) {
    return <IcStudent8 />
  } else if (number === 9) {
    return <IcStudent9 />
  } else if (number === 10) {
    return <IcStudent10 />
  } else if (number === 11) {
    return <IcStudent11 />
  } else if (number === 12) {
    return <IcStudent12 />
  } else if (number === 13) {
    return <IcStudent13 />
  } else if (number === 14) {
    return <IcStudent14 />
  } else if (number === 15) {
    return <IcStudent15 />
  } else if (number === 16) {
    return <IcStudent16 />
  } else if (number === 17) {
    return <IcStudent17 />
  } else if (number === 18) {
    return <IcStudent18 />
  } else if (number === 19) {
    return <IcStudent19 />
  } else if (number === 20) {
    return <IcStudent20 />
  } else if (number === 21) {
    return <IcStudent21 />
  } else if (number === 22) {
    return <IcStudent22 />
  } else if (number === 23) {
    return <IcStudent23 />
  } else if (number === 24) {
    return <IcStudent24 />
  } else if (number === 26) {
    return <IcStudent26 />
  } else if (number === 27) {
    return <IcStudent27 />
  } else if (number === 28) {
    return <IcStudent28 />
  } else if (number === 29) {
    return <IcStudent29 />
  } else if (number === 30) {
    return <IcStudent30 />
  } else if (number === 31) {
    return <IcStudent31 />
  } else if (number === 32) {
    return <IcStudent32 />
  } else if (number === 33) {
    return <IcStudent33 />
  } else if (number === 34) {
    return <IcStudent34 />
  } else if (number === 35) {
    return <IcStudent35 />
  } else if (number === 38) {
    return <IcStudent38 />
  } else if (number === 39) {
    return <IcStudent39 />
  } else if (number === 40) {
    return <IcStudent40 />
  } else if (number === 41) {
    return <IcStudent41 />
  } else if (number === 42) {
    return <IcStudent42 />
  } else if (number === 43) {
    return <IcStudent43 />
  } else if (number === 44) {
    return <IcStudent44 />
  } else if (number === 46) {
    return <IcStudent46 />
  } else if (number === 47) {
    return <IcStudent47 />
  } else if (number === 48) {
    return <IcStudent48 />
  } else if (number === 49) {
    return <IcStudent49 />
  } else if (number === 50) {
    return <IcStudent50 />
  }
}

export const processSetDay = (date) => {
  const day = date.getDay()
  if (day === 1) {
    return "월"
  } else if (day === 2) {
    return "화"
  } else if (day === 3) {
    return "수"
  } else if (day === 4) {
    return "목"
  } else if (day === 5) {
    return "금"
  } else if (day === 6) {
    return "토"
  } else if (day === 0) {
    return "일"
  }
}
export const processSetDate = (date) => {
  return `${date.getFullYear().toString().substr(2, 2)}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`
}