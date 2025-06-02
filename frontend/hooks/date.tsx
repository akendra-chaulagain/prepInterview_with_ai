import React from "react";
type FormattedDateProps = {
  date: string | Date;
  className?: string;
};

const FormattedDate: React.FC<FormattedDateProps> = ({
  date,
  className = "",
}) => {
  const formatted = new Date(date).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className={`text-xs text-gray-400 mt-1 ${className}`}>{formatted}</div>
  );
};

export default FormattedDate;
