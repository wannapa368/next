"use client";
import { useStudentStore } from "@/store/studentStore";
import { useState } from "react";

type StudentTableProps = {
  onSelect?: (id: string) => void; // 👈 เพิ่ม optional callback
};

export default function StudentTable({ onSelect }: StudentTableProps) {
  const students = useStudentStore((s) => s.students);
  const [sortAsc, setSortAsc] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = students.filter(
    (s) =>
      s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.major.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) =>
    sortAsc ? a.gpa - b.gpa : b.gpa - a.gpa
  );

  return (
    <div className="p-8 bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">รายชื่อนักศึกษา</h2>

      {/* 🔍 Search + Sort */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="ค้นหา ชื่อ / นามสกุล / สาขา"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 rounded-lg bg-gray-700 placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none flex-1"
        />
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="px-5 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl font-bold shadow-lg hover:from-green-600 hover:to-blue-600 transition-all"
        >
          เรียง GPA {sortAsc ? "⬆️" : "⬇️"}
        </button>
      </div>

      {/* 📋 Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-green-400 to-blue-400 text-white">
            <tr>
              <th className="p-4 text-left">ชื่อ</th>
              <th className="p-4 text-left">นามสกุล</th>
              <th className="p-4 text-left">GPA</th>
              <th className="p-4 text-left">รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s, idx) => (
              <tr
                key={s.id}
                className={`transition-colors duration-150 ${
                  idx % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
                } hover:bg-gray-500`}
              >
                <td className="p-4">{s.firstName}</td>
                <td className="p-4">{s.lastName}</td>
                <td className="p-4 font-semibold">{s.gpa.toFixed(2)}</td>
                <td className="p-4">
                  {onSelect ? (
                    <button
                      onClick={() => onSelect(s.id)}
                      className="text-blue-400 hover:text-blue-200 font-semibold underline"
                    >
                      ดูรายละเอียด
                    </button>
                  ) : (
                    // fallback: ถ้าไม่ส่ง onSelect → ยังใช้ Link ได้
                    <a
                      href={`/teacher/${s.id}`}
                      className="text-blue-400 hover:text-blue-200 font-semibold underline"
                    >
                      ดูรายละเอียด
                    </a>
                  )}
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-300">
                  ไม่พบข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}