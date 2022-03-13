// 모둥미 가로 형태이고 같은 성별끼리 같은 모둠
export const keepDistanceGroupHorizontalSame = (students, pickNum) => {
  const allStudentNum = students.length
  const allGroupNum = Math.ceil(students.length / pickNum)
  const firstGroupStudent = students[0]
  console.log(allStudentNum, allGroupNum, firstGroupStudent);
  const maleStudents = students.filter(item => item.gender === "male")
  const femaleStudent = students.filter(item => item.gender === "female")
  const newStudents = []
  for (let i = 0; i < pickNum; i++) {
    if (firstGroupStudent.gender === "male") {
      if (maleStudents.length === 0) {
        newStudents.push(femaleStudent[0])
        femaleStudent.shift()
        return
      }
      newStudents.push(maleStudents[0])
      maleStudents.shift()
    } else {
      if (femaleStudent.length === 0) {
        newStudents.push(femaleStudent[0])
        femaleStudent.shift()
        return
      }
      newStudents.push(femaleStudent[0])
      femaleStudent.shift()
    }
  }
  console.log(maleStudents, femaleStudent, newStudents);
}

// 모둥미 가로 형태이고 성별이 섞인 모둠

// 모둥미 세로 형태이고 같은 성별끼리 같은 모둠

// 모둥미 세로 형태이고 같은 성별이 섞인 모둠