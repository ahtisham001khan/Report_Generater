import React from 'react';
import { ReportData } from './ReportBuilder';

interface Props {
  data: ReportData;
  onChange: (data: Partial<ReportData>) => void;
  activeFields: { [key: string]: boolean };
  onToggleField: (field: string) => void;
}

export default function ReportForm({ data, onChange, activeFields, onToggleField }: Props) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const academicFields = ['test', 'assignment', 'behaviour', 'presentation', 'participation'];

  return (
    <div className="space-y-8">
      {/* Month */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Select Month</label>
        <input
          type="month"
          name="month"
          value={data.month || ''}
          onChange={handleInput}
          required
          className="border border-gray-300 rounded-lg w-full p-2.5"
        />
      </div>

      {/* Student Info */}
      <div>
        <h3 className="text-lg font-semibold text-[#3498db] border-b pb-1 mb-3">
          Student Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="studentName"
            placeholder="Student Name"
            value={data.studentName || ''}
            onChange={handleInput}
            required
            className="border border-gray-300 rounded-lg w-full p-2.5"
          />
          <input
            type="text"
            name="fatherName"
            placeholder="Father's Name"
            value={data.fatherName || ''}
            onChange={handleInput}
            required
            className="border border-gray-300 rounded-lg w-full p-2.5"
          />
          <select
            name="courseName"
            value={data.courseName}
            onChange={handleInput}
            required
            className="border border-gray-300 rounded-lg w-full p-2.5"
          >
            <option value="">Select Course</option>
<option value="3D Animation (Blender)">3D Animation (Blender)</option>
<option value="AI Artificial Intelligence">AI Artificial Intelligence</option>
<option value="Amazon">Amazon</option>
<option value="Audio Video Editing">Audio Video Editing</option>
<option value="CIT, DIT, ADIT">CIT, DIT, ADIT</option>
<option value="Content Writing">Content Writing</option>
<option value="Data Science">Data Science</option>
<option value="Digital Marketing">Digital Marketing</option>
<option value="English Language">English Language</option>
<option value="Forex Trading">Forex Trading</option>
<option value="Full Stack Development">Full Stack Development</option>
<option value="Graphic Designing">Graphic Designing</option>
<option value="Java with DSA">Java with DSA</option>
<option value="Laravel (PHP Framework) Web Development">Laravel (PHP Framework) Web Development</option>
<option value="Mobile Application Development">Mobile Application Development</option>
<option value="Modern Web and App Development">Modern Web and App Development</option>
<option value="Office Automation">Office Automation</option>
<option value="Photoshop">Photoshop</option>
<option value="Python Development">Python Development</option>
<option value="Python Basics">Python Basics</option>
<option value="SEO">SEO</option>
<option value="UI/UX Designing">UI/UX Designing</option>
<option value="Vlogging">Vlogging</option>
<option value="Web Designing">Web Designing</option>
<option value="Web Development">Web Development</option>
<option value="WordPress Customization (Theme + Plugin) Development">WordPress Customization (Theme + Plugin) Development</option>


          </select>
          <input
            type="text"
            name="batchCode"
            placeholder="Batch Code"
            value={data.batchCode || ''}
            onChange={handleInput}
            required
            className="border border-gray-300 rounded-lg w-full p-2.5"
          />
          <select
            name="timing"
            value={data.timing || ''}
            onChange={handleInput}
            required
            className="border border-gray-300 rounded-lg w-full p-2.5"
          >
            <option value="">Select Timing</option>
            <option>03:00 PM - 04:00 PM</option>
            <option>04:00 PM - 05:00 PM</option>
            <option>05:00 PM - 06:00 PM</option>
            <option>06:00 PM - 07:00 PM</option>
            <option>07:00 PM - 08:00 PM</option>
            <option>08:00 PM - 09:00 PM</option>
          </select>
        </div>
      </div>

      {/* Academic Performance */}
      <div>
        <h3 className="text-lg font-semibold text-[#3498db] border-b pb-1 mb-3 flex items-center justify-between">
          Academic Performance (Out of 100)
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {academicFields.map((field) => (
            <div key={field}>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <input
                  type="checkbox"
                  checked={activeFields[field]}
                  onChange={() => onToggleField(field)}
                />
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {activeFields[field] && (
                <input
                  type="number"
                  name={field}
                  placeholder={`${field} marks`}
                  value={data[field as keyof ReportData] || ''}
                  onChange={handleInput}
                  min="0"
                  max="100"
                  required
                  className="border border-gray-300 rounded-lg w-full p-2.5"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Attendance */}
      <div>
        <h3 className="text-lg font-semibold text-[#3498db] border-b pb-1 mb-3">Monthly Attendance</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="number"
            name="totalDays"
            placeholder="Total Days"
            value={data.totalDays || ''}
            onChange={handleInput}
            required
            className="border border-gray-300 rounded-lg p-2.5"
          />
          <input
            type="number"
            name="presentDays"
            placeholder="Present Days"
            value={data.presentDays || ''}
            onChange={handleInput}
            required
            className="border border-gray-300 rounded-lg p-2.5"
          />
          <input
            type="text"
            name="attendancePercentage"
            placeholder="Auto %"
            value={data.attendancePercentage || ''}
            readOnly
            className="border border-gray-200 bg-gray-50 rounded-lg p-2.5 text-gray-600"
          />
        </div>
      </div>
    </div>
  );
}
