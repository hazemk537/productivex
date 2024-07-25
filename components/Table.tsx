import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import UpdateNoteModal from "./UpdateNoteModal";
import AddNoteModal from "./AddNoteModal.js";
import useFetch from "@/customHook/useFetch";
import { sendResponse } from "next/dist/server/image-optimizer";
import { useRouter } from "next/router";
import { json } from "stream/consumers";
import { log } from "console";
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
        enableResizing:true,
        minSize: 100, //min size enforced during resizing
        maxSize: 200, //max size enforced during resizing
        size: 130, //medium column
        sortingFn: 'textCaseSensitive', //use the built-in textCaseSensitive sorting function instead of the default basic sorting function

      });
    }

    return dynamic_columns;
  }, []);

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
    // enableEditing: true,
    // editDisplayMode: 'cell',
    // muiEditTextFieldProps: ({ cell,row }) => ({
    //   select: true,
    //   onChange: (event) =>
    //   {
    //     console.log(cell);
        
    //     // sendRequest('/api/updateNote', {
    //     //   method: 'PUT', name: 'updateNote',
    //     //   body: { data: {...row.original,[cell.id]:cell}, filepath: router.query.filepath }
    //     //   , onOk: () => {
    //     //     props.setTriggerFetch((old) => !old)
    //     //   }
    //     // })
    
    //   }
    // }),
    sortDescFirst:true,
    enableColumnOrdering:true,
    renderRowActions: ({ row }) => {
      return (
        <>
          <span
            onClick={() => {
              setEditModalData(row.original);
              setaddModalData(false);
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
        style={{ padding: "20px" }}
        onClick={() => {
          //#note_case generate intil modal val

          let intialModalValue = props.jsonData?.data[0];
          for (const property in props.jsonData?.data[0]) {
            if (property === "id")
              intialModalValue["id"] = props.jsonData?.data.length + 1;
            else if (property === "creationDate")
              intialModalValue["creationDate"] = new Date();
            else if (property === "done")
               intialModalValue[property] = "0";
            else intialModalValue[property] = "";
          }
          // #todo_3 will it set correctly or bad async effect

          setaddModalData(intialModalValue);
          setEditModalData(false);
        }}
      >
        Add Note
      </button>
      {addModalData?.creationDate && !editModalData?.creationDate ? (
        <AddNoteModal
          setTriggerFetch={props.setTriggerFetch}
          data={addModalData}
        />
      ) : null}
      <button onClick={()=>{
        let jsonElements
        let itemArr=table.getRowModel().rows
         jsonElements=itemArr.map((item)=>{
          return item.original
        })
        console.log(jsonElements);
        
      }}>export filtered</button>
      <button>dlt filtered</button>
      {editModalData?.creationDate && !addModalData?.creationDate ? (
        <UpdateNoteModal
          setTriggerFetch={props.setTriggerFetch}
          data={editModalData}
        />
      ) : null}
      {/* #note_case empty data errrorunexpected */}
      {<MaterialReactTable table={table} />}
    </>
  );
};

export default SimpleTable;
