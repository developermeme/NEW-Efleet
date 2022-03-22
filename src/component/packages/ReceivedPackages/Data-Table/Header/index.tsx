import React, { useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

export interface Ihead {
  name: string;
  field: string;
  sortable: boolean;
}

interface IProps {
  headers: Ihead[];
  onSorting: (field: string, order: string) => void;
}

const Header = (props: IProps) => {
  const { headers, onSorting } = props;
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  const onSortingChange = (field: string) => {
    console.log(field);
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };

  return (
    <thead>
      <tr>
        {headers.map(({ name, field, sortable }: any) => (
          <th
            key={name}
            onClick={() => (sortable ? onSortingChange(field) : null)}
          >
            {name}
            {sortingField &&
              sortingField === field &&
              (sortingOrder === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
