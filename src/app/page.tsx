"use client";

import { useState } from "react";
import PortfolioForm from "./components/PortfolioForm";
import StudentTable from "./components/StudentTable";
import StudentDetail from "./components/StudentDetail";
import { useStudentStore } from "@/store/studentStore";

export default function Page() {
  const students = useStudentStore((s) => s.students);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedStudent = students.find((s) => s.id === selectedId);

  return (
    <div className="space-y-8">
      {/* ฟอร์มเพิ่ม Portfolio */}
      <PortfolioForm />

      {/* ตารางนักศึกษา */}
      <StudentTable onSelect={(id) => setSelectedId(id)} />

      {/* รายละเอียดนักศึกษา */}
      {selectedStudent && (
        <StudentDetail student={selectedStudent} />
      )}
    </div>
  );
}
