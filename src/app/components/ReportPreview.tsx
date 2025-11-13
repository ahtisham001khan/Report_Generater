import React from 'react';
import { ReportData } from './ReportBuilder';
import Image from 'next/image';
import logo from 'public/logo.png';

interface Props {
  data: ReportData;
  studentPhotoUrl?: string;
  activeFields: { [key: string]: boolean };
}

export default function ReportPreview({ data, studentPhotoUrl, activeFields }: Props) {
  const totalDays = Number(data.totalDays) || 0;
  const presentDays = Number(data.presentDays) || 0;
  const absentDays = totalDays - presentDays >= 0 ? totalDays - presentDays : 0;

  const academicRows = Object.entries(activeFields)
    .filter(([_, isActive]) => isActive)
    .map(([key]) => (
      <tr key={key}>
        <td className="border p-2 capitalize">{key}</td>
        <td className="border p-2">{data[key as keyof ReportData] || '—'}</td>
      </tr>
    ));

  return (
    <div className="bg-white rounded-lg font-sans text-gray-800 max-w-4xl mx-auto p-3">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center border-b-4 border-[#3498db]/70 pb-4 mb-6">
        <Image src={logo} alt="Logo" className="h-14 w-[100px]" />
        <div className="w-[70%] text-center">
          <h1 className="text-[20px] font-extrabold text-[#3498db] tracking-wide">
            Institute of Pixxelhouse
          </h1>
          <p className="text-[12px] font-bold text-gray">
            Near Akbar CNG station, Autobhan Road Hyderabad
          </p>
          <p className="text-[12px] text-gray">Phone: 0335-3253513</p>
        </div>
      </div>

      {/* Report Info */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-[#2980b9] font-bold text-lg">Monthly Progress Report</p>
        <p className="text-sm">
          Report Month:{' '}
          <span className="font-semibold text-[#3498db]">
            {data.month
              ? new Date(data.month).toLocaleString('default', { month: 'long', year: 'numeric' })
              : '—'}
          </span>
        </p>
        {studentPhotoUrl && (
          <div className="h-[80px] w-[80px] rounded-lg overflow-hidden border border-[#3498db]/30">
            <img src={studentPhotoUrl} alt="Student" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Student Information (table style) */}
      <h2 className="text-lg font-semibold text-[#3498db] my-2">Student Information</h2>
      <table className="w-full border text-sm mb-5">
        <thead className="bg-[#3498db]/10">
          <tr>
            <th className="border p-2 text-left w-1/3">Field</th>
            <th className="border p-2 text-left">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">Student Name</td>
            <td className="border p-2">{data.studentName || '—'}</td>
          </tr>
          <tr>
            <td className="border p-2">Father's Name</td>
            <td className="border p-2">{data.fatherName || '—'}</td>
          </tr>
          <tr>
            <td className="border p-2">Batch Code</td>
            <td className="border p-2">{data.batchCode || '—'}</td>
          </tr>
          <tr>
            <td className="border p-2">Class</td>
            <td className="border p-2">{data.courseName || '—'}</td>
          </tr>
          <tr>
            <td className="border p-2">Timming</td>
            <td className="border p-2">{data.timing || '—'}</td>
          </tr>
          
        </tbody>
      </table>

      {/* Academic Performance */}
      <h2 className="text-lg font-semibold text-[#3498db] my-2">Academic Performance</h2>
      <table className="w-full border text-sm">
        <thead className="bg-[#3498db]/10">
          <tr>
            <th className="border p-2 text-left">Category</th>
            <th className="border p-2 text-left">Marks (Out of 100)</th>
          </tr>
        </thead>
        <tbody>
          {academicRows}
          <tr className="font-semibold bg-[#3498db]/5">
            <td className="border p-2">Total</td>
            <td className="border p-2">{data.total || '—'}</td>
          </tr>
        </tbody>
      </table>

      {/* Attendance */}
      <h2 className="text-lg font-semibold text-[#3498db] my-2">Attendance Summary</h2>
      <table className="w-full border text-sm">
        <thead className="bg-[#3498db]/10">
          <tr>
            <th className="border p-2">Total Days</th>
            <th className="border p-2">Present</th>
            <th className="border p-2">Absent</th>
            <th className="border p-2">%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2 text-center">{totalDays}</td>
            <td className="border p-2 text-center">{presentDays}</td>
            <td className="border p-2 text-center">{absentDays}</td>
            <td className="border p-2 text-center">{data.attendancePercentage || '—'}%</td>
          </tr>
        </tbody>
      </table>

      {/* Overall */}
      <h2 className="text-lg font-semibold text-[#3498db] my-2">Overall Summary</h2>
      <table className="w-full border text-sm mb-6">
        <tbody>
          <tr>
            <td className="border p-2 bg-[#3498db]/10 font-medium">Overall %</td>
            <td className="border p-2 text-center">{data.percentage || '—'}%</td>
          </tr>
          <tr>
            <td className="border p-2 bg-[#3498db]/10 font-medium">Grade</td>
            <td className="border p-2 text-center">{data.grade || '—'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
