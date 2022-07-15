interface Meta {
  $id: string;
  $class?: string;
}
type Dict = Record<string, JSX.Element | string | undefined> & Meta;
export interface RichTableProps<T extends Dict[]> {
  rows: T;
  order: (keyof Omit<{ [K in keyof T[number]]: JSX.Element | string }, keyof Meta>)[];
  header: Omit<{ [K in keyof T[number]]: JSX.Element | string }, keyof Meta>;
}

export function RichTable<T extends Dict[]>({ rows, header, order }: RichTableProps<T>) {
  const entries = order.map((k) => [k, header[k]]);
  const [[, first], ...center] = entries;
  const [, last] = center.pop() as [string, JSX.Element | string];
  return (
    <table className="mt-3 table-auto w-full text-sm font-normal font-inter">
      <thead className="font-inter text-left text-[13px] text-climate-light-gray font-light border-b border-neutral-200">
        <th className="pb-4 pl-6 pr-6  text-climate-light-gray font-inter font-light">{first}</th>
        {center.map(([key, value]) => (
          <th key={`${String(key)}`} className="font-inter font-light pb-4 pl-6 pr-6">
            <p>{value}</p>
          </th>
        ))}
        <th className="font-inter font-light pb-4 pl-6 pr-6">{last}</th>
      </thead>
      <tbody>
        {rows.map((child) => (
          <>
            <tr key={child.$id} className="py-4 border-b border-neutral-200">
              {order.map((k) => (
                <td
                  key={`${child.$id}/${String(k)}`}
                  className="text-climate-light-gray p-4 pl-6 pr-6"
                >
                  {child[k]}
                </td>
              ))}
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
}
