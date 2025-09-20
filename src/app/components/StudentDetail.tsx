// StudentDetail.tsx
"use client";

import { Student } from "@/store/studentStore";

interface StudentDetailProps {
  student: Student;
}

export default function StudentDetail({ student }: StudentDetailProps) {
  return (
    <div className="p-6 bg-gray-800 text-white rounded-xl shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{student.firstName} {student.lastName}</h2>
      <p><strong>โรงเรียน:</strong> {student.school}</p>
      <p><strong>GPA:</strong> {student.gpa.toFixed(2)}</p>
      <p><strong>สาขาที่เลือก:</strong> {student.major}</p>
      <p><strong>มหาวิทยาลัย:</strong> {student.university}</p>
      {student.skills && <p><strong>ความสามารถพิเศษ:</strong> {student.skills}</p>}
      {student.reason && <p><strong>เหตุผลในการสมัคร:</strong> {student.reason}</p>}

      {student.photo && (
        <img src={student.photo} className="mt-4 w-36 h-36 object-cover rounded-lg border-2 border-gray-500" />
      )}

      {(student.activities?.length || 0) > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">กิจกรรม / รางวัล / ผลงาน</h3>
          <div className="flex gap-3 overflow-x-auto">
            {student.activities?.map((img, i) => (
              <img key={i} src={img} className="w-28 h-28 object-cover rounded-lg shadow-lg border-2 border-gray-500" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}