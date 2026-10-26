import React, { type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router";

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

function capitalizeFirstLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

function parseDate(date: string) {
  const [year, month] = date.split('-').map(Number);
  return new Date(year, month - 1, 1); // month is 0-indexed
}

function formatMonth(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

const MonthPicker: React.FC<MonthPickerProps> = ({ minDate, maxDate, onChange }) => {
  const navigate = useNavigate()
  const { month } = useParams()

  // If there are no played games then there is also no min/max date
  if(minDate == null || maxDate == null){
    return null
  }

  // Same fallback as homepageLoader: no (valid) month in the URL means the current month
  const now = new Date();
  const selectedMonth = month && /^\d{4}-\d{2}$/.test(month)
    ? parseDate(month)
    : new Date(now.getFullYear(), now.getMonth(), 1);

  // Always include the selected month, even when it has no games
  const min = parseDate(minDate);
  const max = parseDate(maxDate);
  const months = generateMonths(
    selectedMonth < min ? selectedMonth : min,
    selectedMonth > max ? selectedMonth : max,
  );

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(parseDate(e.target.value));
    navigate(`/${e.target.value}`);
  };

  return (
    <select
      value={formatMonth(selectedMonth)}
      onChange={handleChange}
      className="outline-none capitalize"
    >
      {months.map((date) => (
        <option key={formatMonth(date)} value={formatMonth(date)}>
          {capitalizeFirstLetter(date.toLocaleString("nl-NL", { month: "long", year: "numeric" }))}
        </option>
      ))}
    </select>
  );
};

export default MonthPicker;
