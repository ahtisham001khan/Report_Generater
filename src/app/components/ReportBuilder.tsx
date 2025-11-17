'use client';
import { useState } from 'react';
import ReportForm from './ReportForm';
import ReportPreview from './ReportPreview';
import { Button } from '@/components/ui/button';

export interface ReportData {
  month: string;
  studentName: string;
  fatherName: string;
  courseName: string;
  batchCode: string;
  timing: string;
  test: string;
  assignment: string;
  behaviour: string;
  presentation: string;
  participation: string;
  total: string;
  performance?: string;
  percentage: string;
  grade: string;
  totalDays: string;
  presentDays: string;
  attendancePercentage: string;
}

export default function ReportBuilder() {
  const [reportData, setReportData] = useState<ReportData>({
    month: '',
    studentName: '',
    fatherName: '',
    courseName: '',
    batchCode: '',
    timing: '',
    test:'',
    assignment: '',
    behaviour: '',
    presentation: '',
    participation: '',
    total: '',
    performance: '',
    percentage: '',
    grade: '',
    totalDays: '',
    presentDays: '',
    attendancePercentage: '',
  });

  // ✅ Field toggle states
  const [activeFields, setActiveFields] = useState({
    test: true,
    assignment: true,
    behaviour: true,
    presentation: true,
    participation: true,
  });

  const [studentPhoto, setStudentPhoto] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleFormChange = (newData: Partial<ReportData>) => {
    setReportData((prevData) => {
      const updatedData = { ...prevData, ...newData };

      // ✅ Only sum active fields
      const scores = Object.entries(activeFields)
        .filter(([, isActive]) => isActive)
        .map(([key]) => Number(updatedData[key as keyof ReportData]) || 0);

      const total = scores.reduce((sum, val) => sum + val, 0);
      const activeCount = scores.length;
      const percentage =
        activeCount > 0 ? ((total / (activeCount * 100)) * 100).toFixed(2) : '0';

      // Attendance
      const totalDays = Number(updatedData.totalDays) || 0;
      const presentDays = Number(updatedData.presentDays) || 0;
      const attendancePercentage =
        totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : '0';

      // Grade logic
      let grade = '—';
      const p = Number(percentage);
      if (!isNaN(p)) {
        if (p >= 85) grade = 'A+';
        else if (p >= 75) grade = 'A';
        else if (p >= 65) grade = 'B';
        else if (p >= 50) grade = 'C';
        else grade = 'F';
      }

      return {
        ...updatedData,
        total: total.toString(),
        performance: total.toString(),
        percentage,
        grade,
        attendancePercentage,
        totalDays: totalDays ? totalDays.toString() : '',
        presentDays: presentDays ? presentDays.toString() : '',
      };
    });
  };

  const handleFieldToggle = (field: string) => {
    setActiveFields((prev) => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  const handleStudentPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setStudentPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadPDF = async () => {
    const requiredFields: (keyof ReportData)[] = [
      'month',
      'studentName',
      'fatherName',
      'courseName',
      'batchCode',
      'timing',
      'totalDays',
      'presentDays',
    ];

    const missing = requiredFields.filter(
      (field) => !reportData[field] || reportData[field].trim() === ''
    );

    if (missing.length > 0) {
      alert('⚠️ Please fill all required fields before downloading the report.');
      return;
    }

    try {
      setIsGeneratingPdf(true);
      const element = document.getElementById('report-preview');
      if (!element) throw new Error('Preview element not found');

      const html2pdf = (await import('html2pdf.js')).default;
      const opt = {
        margin: 10,
        filename: `${reportData.studentName || 'student'}_report.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      await html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-[#3498db] mb-4">Enter Student Details</h2>

        {/* Photo Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Student Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleStudentPhotoUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-[#3498db] file:text-white
              hover:file:bg-blue-600"
          />
        </div>

        {/* Report Form */}
        <ReportForm
          data={reportData}
          onChange={handleFormChange}
          activeFields={activeFields}
          onToggleField={handleFieldToggle}
        />

        {/* Download Button */}
        <Button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPdf}
          className="w-full mt-6 bg-[#3498db] hover:bg-blue-600 disabled:opacity-50"
        >
          {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}
        </Button>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2">
        <div id="report-preview" className="rounded-xl shadow-md bg-white">
          <ReportPreview
            data={reportData}
            studentPhotoUrl={studentPhoto || undefined}
            activeFields={activeFields}
          />
        </div>
      </div>
    </div>
  );
}

