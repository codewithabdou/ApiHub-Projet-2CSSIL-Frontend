import React from "react";
import AddDisscussionForm from "./AddDisscussionForm";
import DisscussionDetails from "./Disscussion";
import getAllDiscussions from "@services/api/apiPage/getAllDisscussions";
import { Disscussion } from "@typings/api/disscussionTypes";
import { toast } from "sonner";
import { ErrorType } from "@typings/entities/Error";

const DiscussionsSection = async (props: any) => {
  let data: Disscussion[] = [];

  const result:
    | { data: Disscussion[]; status: string; message: string }
    | ErrorType = await getAllDiscussions(props.id);
  if (result.status === "success") {
    console.log(result);

    const res = result as {
      data: Disscussion[];
      status: string;
      message: string;
    };
    data = res.data;
  } else {
    toast("Message", {
      description: result.message,
      action: {
        label: "Ok",
        onClick: () => null,
      },
    });
  }

  return (
    <div className="sm:w-full w-full flex flex-col p-5 gap-y-5 z-10">
      {/**I got some weird errors when i added the pagination i ll try to fix them later (related to live reload) */}
      <AddDisscussionForm /*setRefresh={setRefresh}*/ id={props.id} />
      {data
        ? data /*slice(startIndex, endIndex)*/
            .map((dis, key) => (
              <DisscussionDetails
                /*setRefresh={setRefresh}*/ userId={dis.user.id}
                apiId={props.id}
                id={dis.id}
                title={dis.title}
                username={`${dis.user.firstname} ${dis.user.lastname}`}
                created_date={dis.created_at}
              />
            ))
        : null}
      {/*data.length ?  (<PaginationBar rowsPerPage={rowsPerPage} startIndex={startIndex} endIndex={endIndex}
          setRefresh={setRefresh}    setStartIndex={setStartIndex} setEndIndex={setEndIndex} length={data.length ? Math.ceil(data.length/ rowsPerPage)*rowsPerPage :0}/>) : null*/}
    </div>
  );
};

export default DiscussionsSection;
