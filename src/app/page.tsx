"use client";

import { useState } from "react";
import PortfolioForm from "./components/PortfolioForm";
import StudentTable from "./components/StudentTable";
import StudentDetail from "./components/StudentDetail";
import { useStudentStore, Student } from "@/store/studentStore";

export default function Page() {
  const students: Student[] = useStudentStore((s) => s.students);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedStudent = students.find((s) => s.id === selectedId);

  return (
    <div className="space-y-8 p-6">
      <PortfolioForm />
      <StudentTable onSelect={(id) => setSelectedId(id)} />
      {selectedStudent && <StudentDetail student={selectedStudent} />}
    </div>
  );
}
