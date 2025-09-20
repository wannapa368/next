"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useStudentStore } from "@/store/studentStore";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const schema = z.object({
  firstName: z.string().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
  address: z.string().min(1),
  phone: z.string().min(10, "เบอร์โทรไม่ถูกต้อง"),
  school: z.string().min(1),
  gpa: z.number().min(0).max(4, "GPA ต้องอยู่ระหว่าง 0-4"),
  skills: z.string().optional(),
  reason: z.string().optional(),
  major: z.string().min(1),
  university: z.string().min(1),
});

export default function StudentForm() {
  const addStudent = useStudentStore((s) => s.addStudent);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const [photoPreview, setPhotoPreview] = useState<string>();
  const [activityPreviews, setActivityPreviews] = useState<string[]>([]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, type: "photo" | "activity") => {
    const files = e.target.files;
    if (!files) return;

   if (type === "photo") {
  const file = files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    const result = reader.result;
    if (typeof result === "string") {
      // แสดง preview
      setPhotoPreview(result);

      // เก็บลง form state
      setValue("photo", result);
    } else {
      console.error("ไฟล์รูปไม่ถูกต้อง:", result);
    }
  };
      reader.readAsDataURL(file);
    } else if (type === "activity") {
      const arr: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          arr.push(reader.result as string);
          if (arr.length === files.length) setActivityPreviews(arr);
          setValue("activities", arr);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const onSubmit = (data: any) => {
    addStudent({ ...data, id: uuidv4() });
    alert("บันทึกข้อมูลเรียบร้อย");
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-2xl mt-12 text-white">
      <h2 className="text-4xl font-bold mb-6 text-center">Portfolio</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input {...register("firstName")} placeholder="ชื่อ" className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            <p className="text-red-400 mt-1 text-sm">{errors.firstName?.message}</p>
          </div>
          <div>
            <input {...register("lastName")} placeholder="นามสกุล" className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            <p className="text-red-400 mt-1 text-sm">{errors.lastName?.message}</p>
          </div>
        </div>

        <input {...register("address")} placeholder="ที่อยู่" className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        <input {...register("phone")} placeholder="เบอร์โทร" className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        <input {...register("school")} placeholder="โรงเรียน" className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        <input {...register("gpa", { valueAsNumber: true })} placeholder="GPA" type="number" step="0.01" className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        <input {...register("skills")} placeholder="ความสามารถพิเศษ" className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        <input {...register("reason")} placeholder="เหตุผลในการสมัคร" className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        <input {...register("major")} placeholder="สาขาที่เลือก" className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        <input {...register("university")} placeholder="มหาวิทยาลัย" className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />

        <div>
          <label className="block mb-2 font-semibold">รูปนักศึกษา</label>
          <input type="file" accept="image/*" onChange={(e) => handleFile(e, "photo")} className="block w-full text-gray-200" />
          {photoPreview && <img src={photoPreview} className="mt-3 w-36 h-36 object-cover rounded-lg shadow-lg border-2 border-gray-500" />}
        </div>

        <div>
          <label className="block mb-2 font-semibold">กิจกรรม / รางวัล / ผลงาน (หลายรูป)</label>
          <input type="file" accept="image/*" multiple onChange={(e) => handleFile(e, "activity")} className="block w-full text-gray-200" />
          <div className="flex gap-3 mt-3 overflow-x-auto">
            {activityPreviews.map((img, i) => (
              <img key={i} src={img} className="w-28 h-28 object-cover rounded-lg shadow-lg border-2 border-gray-500" />
            ))}
          </div>
        </div>

        <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-bold text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg transition-all">
          บันทึกข้อมูล
        </button>
      </form>
    </div>
  );
}
