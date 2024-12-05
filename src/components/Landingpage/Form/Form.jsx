"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from '@mantine/core';
import toast, { Toaster } from 'react-hot-toast';
import handlepatientFormSubmit from "@/components/Landingpage/Form/services/handleSubmit";
import handleCheckStudent from "@/components/Landingpage/Form/services/handleCheckStudent";
import options from "@/components/Landingpage/Form/services/symptomOption";
import { MultiSelect } from '@mantine/core';

export default function Form() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [role, setRole] = useState("");
  const [isStudentExists, setIsStudentExists] = useState(null);
  const [otherSymptom, setOtherSymptom] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = React.useState([]); // Initial empty array


  const handleSymptomChange = (newSymptoms) => {
    // Filter out invalid entries (e.g., undefined or non-string values)
    const validSymptoms = newSymptoms.filter(
      (symptom) => typeof symptom === 'string' && symptom.trim() !== ''
    );
    try{
        setSelectedSymptoms(validSymptoms); // Update state
    }catch (error) {
        console.error('Error in handleSymptomChange:', error);
    }
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const onSubmit = handlepatientFormSubmit({
    studentName,
    studentId,
    role,
    selectedSymptoms,
    otherSymptom,
    options,
  });

  const handleCheckStudentClick = () => {
    handleCheckStudent({
      studentId,
      setStudentName,
      setRole,
      setIsStudentExists,
      setLoading,
    });
  };

  return (
    <section>
      <div className="flex flex-col items-center h-screen bg-sky-500 text-white gap-y-20">
        <h1 className="gap-y-20 text-6xl">UTCC Infirmary</h1>
        <div>
          <div className="bg-zinc-100 shadow-md p-8 max-w-lg w-full mb-20 rounded-lg">
            <h1 className="text-center text-2xl font-bold mb-6 text-gray-700">
              แบบฟอร์มนักศึกษาที่มาใช้ห้องพยาบาล
            </h1>
            <form onSubmit={onSubmit} className="mx-8 mt-8 mb-2">
              <div className="mb-4">
                <label className="block text-gray-700 text-center font-bold text-lg">
                  รหัสประจำตัว
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="mt-1 block w-full p-2 border border-black rounded-md pl-4"
                    placeholder="รหัสประจำตัว"
                    style={{ borderColor: "black" }}
                  />
                  <Button type="button" onClick={handleCheckStudentClick}>
                    ตรวจสอบ
                  </Button>
                </div>
              </div>
              <MultiSelect
                label="เลือกอาการ"
                placeholder="เลือกอาการ"
                data={options}
                value={selectedSymptoms}
                onChange={handleSymptomChange}
              />
              {selectedSymptoms.includes('12') && (
                <div className="mt-4">
                  <label className="block text-gray-700 text-center font-bold text-lg">
                    หมายเหตุ
                  </label>
                  <input
                    type="text"
                    value={otherSymptom}
                    onChange={(e) => setOtherSymptom(e.target.value)}
                    className="mt-1 block w-full p-2 border border-black rounded-md pl-4"
                    placeholder="กรอกหมายเหตุ"
                  />
                </div>
              )}
              <Button type="submit" className="mt-4 w-full">
                ส่งข้อมูล
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}