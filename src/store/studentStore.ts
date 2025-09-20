// /store/studentStore.ts
import { create } from "zustand";


export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  school: string;
  gpa: number;
  skills?: string;
  reason?: string;
  major: string;
  university: string;
  photo?: string; // รูปหลัก
  activities?: string[]; // รูปกิจกรรม
  awards?: string[];     // รูปรางวัล
  projects?: string[];   // รูปผลงาน
}

interface StudentStore {
  students: Student[];
  addStudent: (student: Student) => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
  students: [],
  addStudent: (student) => set((state) => ({ students: [...state.students, student] })),
}));