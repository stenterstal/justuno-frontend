import React, { useState, type ChangeEvent } from "react";

interface MonthPickerProps {
  minDate: string;
  maxDate: string;
  onChange?: (date: Date) => void;
}

const generateMonths = (minDate: Date, maxDate: Date): Date[] => {
  const months: Date[] = [];
  const current = new Date(minDate.getFullYear(), minDate.getMonth(), 1);

  while (current <= maxDate) {
    months.push(new Date(current));
    current.setMonth(current.getMonth() + 1);
  }

  return months;
};

function parseDate(date: string) {
  const [year, month] = date.split('-').map(Number);
  return new Date(year, month - 1, 1); // month is 0-indexed
}

const MonthPicker: React.FC<MonthPickerProps> = ({ minDate, maxDate, onChange }) => {
  const months = generateMonths(parseDate(minDate), parseDate(maxDate));
  const [selectedMonth, setSelectedMonth] = useState<Date>(months[0]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const [yearStr, monthStr] = e.target.value.split("-");
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const newDate = new Date(year, month, 1);
    setSelectedMonth(newDate);
    onChange?.(newDate);
  };

  return (
    <select
      value={`${selectedMonth.getFullYear()}-${selectedMonth.getMonth()}`}
      onChange={handleChange}
      className="outline-none"
    >
      {months.map((date) => (
        <option
          key={`${date.getFullYear()}-${date.getMonth()}`}
          value={`${date.getFullYear()}-${date.getMonth()}`}
        >
          {date.toLocaleString("nl-NL", { month: "long", year: "numeric" })}
        </option>
      ))}
    </select>
  );
};

export default MonthPicker;