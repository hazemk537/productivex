import Table from "@/components/Table";
import useFetch from "@/customHook/useFetch";
import { readFile } from "fs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  // hooks in server component #todo_2
  //  we cannot use state here and trigger updates after api call #note
  const [jsonData, setData, sendRequest] = useFetch();
  const [triggerFetch, setTriggerFetch] = useState(0);
  const router = useRouter();
  useEffect(() => {
    sendRequest(`/api/getNotes?filepath=${router.query?.filepath}`, {
      method: "GET",
      name: "getNotes",
    });
  }, [triggerFetch]);

  return (
    <div>
      {jsonData?.data?.length > 0 && (
        <Table jsonData={jsonData} setTriggerFetch={setTriggerFetch} />
      )}{" "}
    </div>
  );
}

export default Index;

// #NOTE_CASE we cannot use the following function  to fetch data , becasue if we need to refetch it based on edit,delete,..
// this component should be client one

// export async function getServerSideProps(context) {
// // let tablePath=context?.params
// let filepath = context?.query?.filepath;
// // console.log('-------------------');
// // console.log(filepath);

// let jsonData = await new Promise((resolve, reject) => {
//   readFile(filepath, "utf8", (err, jsonData) => {
//     if (err) {
//       reject(err);
//     } else {

//       resolve(jsonData);
//     }
//   }

// );
// });
// return { props: { jsonData: JSON.parse(jsonData) } };
// }
