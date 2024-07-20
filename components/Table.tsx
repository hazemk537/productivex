import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import DynamicModal from "./DynamicModal";
import useFetch from "@/customHook/useFetch";
import { sendResponse } from "next/dist/server/image-optimizer";
import { useRouter } from "next/router";
import { json } from "stream/consumers";
//nested data is ok, see accessorKeys in ColumnDef below

const SimpleTable = (props) => {

  const [modalData, setModalData] = useState({});
  //should be memoized or stable

  
  const columns = useMemo(() => {
    let dynamic_columns = [];
      for (const property in props.jsonData?.data[0]) {
        // #Js_bug should unique id
        dynamic_columns.push({
          id: `${property}`,
          accessorKey: `${property}`, //access nested data with dot notation
          header: `${property}`,
          size: 150,
        });
      }
     
    return dynamic_columns;
  }, [ ]);
  // console.log(columns);

  // console.log('props.jsonData');
  // console.log(props.props.jsonData);
  //  console.log('columns');
  //  console.log(columns);

  // console.log('data');
  // console.log(data);
  //
  // #note_case columns cannot be empty [] intially so avoid until data available
  let data = props.jsonData?.data;
  let table = useMaterialReactTable({
    columns,
    // #NOTE_CASE data should not be empty , should be ready #todo_2
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
      {modalData?.creationDate && (
        <DynamicModal setTriggerFetch={props.setTriggerFetch} data={modalData} />
      )}
      {/* #note_case empty data errrorunexpected */}
      { <MaterialReactTable table={table} />}
    </>
  );
};

export default SimpleTable;
