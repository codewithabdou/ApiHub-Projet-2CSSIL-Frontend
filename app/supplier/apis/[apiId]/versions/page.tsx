"use client";

import React, { useEffect } from "react";
import SupplierAPIVersionsDataTable from "@app/components/Provider/APIs Management/Versions Management/data-table";
import getAllVersionsByApi from "@services/api/apiPage/getAllversionsByApi";
import { useParams } from "next/navigation";
import { Version } from "@typings/entities/Versions";
import { ThreeDots } from "react-loader-spinner";

const page = () => {
  const params = useParams<{ apiId: string }>();
  const [versions, setVersions] = React.useState<Version[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    getAllVersionsByApi(Number(params.apiId))
      .then((data) => {
        if (data.status === "success") {
          const versionsData = data as {
            status: string;
            message: string;
            data: { data: Version[] };
          };
          setVersions(versionsData.data.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.apiId]);

  if (loading) {
    return (
      <div className="flex flex-col  justify-center py-[10%] items-center">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#000"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <SupplierAPIVersionsDataTable
      data={versions}
      apiId={Number(params.apiId)}
    />
  );
};

export default page;
