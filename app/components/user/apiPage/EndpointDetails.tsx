import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { CodeBlock } from "react-code-blocks";
function EndpointDetails(props: any) {
  return (
    <div className="w-full overflow-x-hidden">
      <Accordion
        type="single"
        collapsible
        className="w-full border-[2px] border-[#184173] p-2 rounded-[7px] bg-white overflow-x-hidden"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-[#184173] font-bold">{`${props.name}`}</AccordionTrigger>
          <AccordionContent>
            <div className="w-full flex flex-col gap-y-5 p-2">
              <h1 className="sm:text-xl text-lg font-medium ">
                Méthode: <span className="text-[#048B77]">{props.method}</span>
              </h1>
              <h1
                className="sm:text-xl text-lg font-medium"
                style={{ whiteSpace: "pre-line" }}
              >
                Déscription:
              </h1>
              <div className="bg-[#F2F1F1] h-fit p-2">{props.description}</div>
              <h1 className="sm:text-xl text-lg font-medium">
                Corps de la requette:
              </h1>

              <CodeBlock
                text={props.req ? props.req : "No request body"}
                language="javascript"
                showLineNumbers={true}
              />
              <h1 className="sm:text-xl text-lg font-medium">
                Corps de la réponse:
              </h1>
              <CodeBlock
                text={props.res ? props.res : "No response body"}
                language="javascript"
                showLineNumbers={true}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default EndpointDetails;
