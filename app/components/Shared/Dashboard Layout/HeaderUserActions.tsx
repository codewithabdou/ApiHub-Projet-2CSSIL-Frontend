import { getLoggedInUser } from "@services/authentication.service";
import User from "@typings/entities/User";
import React from "react";
import Header from "./header";

const HeaderUserActions = async () => {
  const user: User | null = await getLoggedInUser();

  return <Header user={user} />;
};

export default HeaderUserActions;
