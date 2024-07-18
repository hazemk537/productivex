import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import DynamicModal from "./DynamicModal";
//nested data is ok, see accessorKeys in ColumnDef below

const Example = (props) => {
  const [data, setData] = useState(props?.jsonData);
  const [modalData, setModalData] = useState({});
  //should be memoized or stable
  const columns = useMemo(() => {
    let dynamic_columns = [];

    for (const property in props.jsonData[0]) {
      // #Js_bug should unique id
      dynamic_columns.push({
        id: `${property}`,
        accessorKey: `${property}`, //access nested data with dot notation
        header: `${property}`,
        size: 150,
      });
    }
    return dynamic_columns;
  }, []);

  // console.log('jsonData');
  // console.log(props.jsonData);
  //  console.log('columns');
  //  console.log(columns);

  // console.log('data');
  // console.log(data);
  //
  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowActions: true,
    renderRowActionMenuItems: ({ row }) => {
      return (
        <>
          <span
            onClick={() => {
              setModalData(row.original);
              
            }}
          >
            edit
          </span>
          <br></br>
          <span>delete</span>
          <br></br>
        </>
      );
    },
  });

  return (
    <>
      { modalData?.creationDate&& <DynamicModal data={modalData} />}

      <MaterialReactTable table={table} />
    </>
  );
};

export default Example;
