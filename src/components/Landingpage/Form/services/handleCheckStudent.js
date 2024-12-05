import toast, { Toaster } from 'react-hot-toast';

const handleCheckStudent = async ({
  studentId,
  setStudentName,
  setRole,
  setIsStudentExists,
  setLoading,
}) => {
  if (!studentId.trim()) {
    toast.error("กรุณากรอกรหัสนักศึกษา");
    return;
  }

  setLoading(true);
  try {
    const response = await fetch(`/api/check_id?patient_id=${studentId}`);
    const data = await response.json();
    console.log(data);

    if (data.exists) {
      setStudentName(data.patient_name);
      setRole(data.role);
      setIsStudentExists(true);
      toast.success("ข้อมูลนักศึกษาถูกต้อง");
    } else {
      setIsStudentExists(false);
      setStudentName("");
      setRole("");
      toast.error("ไม่พบข้อมูลนักศึกษา");
    }
  } catch (error) {
    console.error("Error checking student:", error);
    toast.error("ไม่สามารถตรวจสอบข้อมูลได้");
  } finally {
    setLoading(false);
  }
};

export default handleCheckStudent;