'use client'
import React, { useEffect, useState } from 'react'
import useFetch from '../customHook/useFetch'
import { useRouter } from 'next/router'
function AddNoteModal(props) {
  const [data, , sendRequest] = useFetch()
  const router = useRouter()
  // to avoid errors when at first access props.data[] #note
  const [inputState, setInputState] = useState(props.data)
  // auto make input fields
  // auto update form states
  // onClick change data state
  // consume update api on hard 
  // crud api with next >>> 
  // #note_case 
  const inputFieldKeys = Object.keys(props.data);
  console.log(inputFieldKeys);
  console.log(props.data);


  useEffect(() => {
    // #Note_case 
    // if props.data update if props change

    setInputState(props.data)

  }, [props.data])



  function addItem() {
   

    sendRequest('/api/createNote', {
      method: 'POST', name: 'createNote',
      body: JSON.stringify({data:inputState,filepath:router.query.filepath}),onOk:()=>{
        props.setTriggerFetch()
      }
    })


  } 

  return (
    <div>
      {
        inputFieldKeys.map((item, idx) => {
          // console.log(inputState);
          return (
            <div key={idx}>
              {/* // #note object[string] */}
              <span>{item}</span>
              <input value={inputState[item]}
                onChange={(event) => {
                  setInputState((old) => {
                    // console.log(event.target.value);
                    console.log({ ...old, item: event.target.value });
                    // #note_Case update old state automatically
                    let tempObj = {}

                    tempObj[item] = event.target.value

                    return { ...old, ...tempObj }
                  })
                }} />
            </div>
          )
        })


      }
      <button onClick={() => {
          addItem()
        


      }}>Save Data</button>
    </div>
  )
}

export default AddNoteModal