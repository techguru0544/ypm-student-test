import StudentsPicker from '../components/StudentsPicker';
import StudentsTable from '../components/StudentsTable';
import { fetchStudentData, fetchSchoolData, fetchLegalguardianData } from '../utils';
import { useState } from 'react';


const studentsDataComponent = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);
  const [legalguardiansData, setLegalguardiansData] = useState([]);


  const onStudentsPick = async (studentIds) => {
    const studentData = studentIds.map(fetchStudentData);
    const studentDataRes = await Promise.all(studentData);
    const updatedStudentsDataRes = studentDataRes.reduce((data, value) => data.concat(value), []);
    setStudentsData(previousState => [...previousState, ...updatedStudentsDataRes]);

    const schoolIds = updatedStudentsDataRes.filter(item => item.schoolId).map(student => student.schoolId);
    const schoolData = schoolIds.map(fetchSchoolData);
    const schoolsDataRes = await Promise.all(schoolData);
    setSchoolsData(previousState => [...previousState, ...schoolsDataRes]);

    const legalguardianIds = updatedStudentsDataRes.filter(item => item.legalguardianId).map(student => student.legalguardianId);
    const legalguardianData = legalguardianIds.map(fetchLegalguardianData);
    const legalguardiansDataRes = await Promise.all(legalguardianData);
    setLegalguardiansData(previousState => [...previousState, ...legalguardiansDataRes]);
  };


  return (
    <>
      <StudentsPicker onPickHandler={onStudentsPick} />
      <StudentsTable
        studentsData={studentsData}
        schoolsData={schoolsData}
        LegalguardiansData={legalguardiansData}
      />
    </>
  );
};


export default studentsDataComponent;