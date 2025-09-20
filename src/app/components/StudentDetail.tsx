"use client";
import { useParams } from "next/navigation";
import { useStudentStore } from "@/store/studentStore";

export default function StudentDetail() {
  const { id } = useParams();
  const student = useStudentStore((s) => s.students.find((st) => st.id === id));

  if (!student) return <p className="p-6">ไม่พบข้อมูลนักศึกษา</p>;

  const renderGallery = (title: string, images?: string[]) => (
    images && images.length > 0 && (
      <div className="mt-4">
        <h3 className="font-semibold mb-2">{title}</h3>
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, idx) => (
            <img key={idx} src={img} className="w-full h-24 object-cover rounded shadow" />
          ))}
        </div>
      </div>
    )
  );

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-4">{student.firstName} {student.lastName}</h2>
      <p><strong>ที่อยู่:</strong> {student.address}</p>
      <p><strong>เบอร์โทร:</strong> {student.phone}</p>
      <p><strong>โรงเรียน:</strong> {student.school}</p>
      <p><strong>GPA:</strong> {student.gpa}</p>
      <p><strong>ความสามารถพิเศษ:</strong> {student.skills}</p>
      <p><strong>เหตุผลในการสมัคร:</strong> {student.reason}</p>
      <p><strong>สาขาที่เลือก:</strong> {student.major}</p>
      <p><strong>มหาวิทยาลัย:</strong> {student.university}</p>
      {student.photo && <img src={student.photo} className="mt-4 w-32 h-32 object-cover rounded shadow" />}
      {renderGallery("กิจกรรม", student.activities)}
      {renderGallery("รางวัล", student.awards)}
      {renderGallery("ผลงาน", student.projects)}
    </div>
  );
}