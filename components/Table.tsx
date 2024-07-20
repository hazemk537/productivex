import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import UpdateNoteModal from "./UpdateNoteModal";
import AddNoteModal from './AddNoteModal.js'
import useFetch from "@/customHook/useFetch";
import { sendResponse } from "next/dist/server/image-optimizer";
import { useRouter } from "next/router";
import { json } from "stream/consumers";
//nested data is ok, see accessorKeys in ColumnDef below

const SimpleTable = (props) => {
  const [editModalData, setEditModalData] = useState({});
  const [addModalData, setaddModalData] = useState({});
  const [jsonData, setData, sendRequest] = useFetch();

  const router = useRouter();
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
  }, []);
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
              setEditModalData(row.original);
            }}
          >
            edit
          </span>
          <br></br>
          <span
            onClick={() => {
              sendRequest(`/api/deleteNote`, {
                method: "DELETE",
                name: "dltNote",
                body: {
                  dataId: row.original.id,
                  filepath: router.query.filepath,
                },
                onOk: () => {
                  props.setTriggerFetch((old) => !old);
                },
              });
            }}
          >
            delete
          </span>
          <br></br>
        </>
      );
    },
  });

  return (
    <>
      {/* #note_Case exist for all table types */}
      <button
        onClick={() => {
          //#note_case generate intil modal val

          let intialModalValue = props.jsonData?.data[0];
          for (const property in props.jsonData?.data[0]) {
            if (property === "id")
              intialModalValue["id"] = props.jsonData?.data.length + 1;
            else if (property === "creationDate")
              intialModalValue["creationDate"] = new Date();
            else
            intialModalValue[property]=''
          }
          // #todo_3 will it set correctly or bad async effect

          setaddModalData(intialModalValue);
        }}
      >
        Add Note
      </button>
      {addModalData?.creationDate && (
        <AddNoteModal 
        setTriggerFetch={props.setTriggerFetch}
        data={addModalData} />
      )}
      {editModalData?.creationDate && (
        <UpdateNoteModal
          setTriggerFetch={props.setTriggerFetch}
          data={editModalData}
        />
      )}
      {/* #note_case empty data errrorunexpected */}
      {<MaterialReactTable table={table} />}
    </>
  );
};

export default SimpleTable;
