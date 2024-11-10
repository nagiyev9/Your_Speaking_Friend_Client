import React from "react";

const Table = ({ columns, data }) => {
  if (!data.length) return <p>No data available.</p>;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {columns.map((col) => (
                <th key={col.key} className="py-3 px-6 text-left">
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {data.map((row, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-200 hover:bg-gray-100 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="py-3 px-6 text-left">
                    {col.render
                      ? col.render(row[col.dataIndex], row, idx)
                      : row[col.dataIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
