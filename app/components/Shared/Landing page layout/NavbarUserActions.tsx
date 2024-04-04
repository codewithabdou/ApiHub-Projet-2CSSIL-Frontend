import { getLoggedInUser } from "@services/authentication.service";
import User from "@typings/entities/User";
import React from "react";
import Navbar from "./Navbar";

const NavbarUserActions = async () => {
  const user: User | null = await getLoggedInUser();

  return <Navbar user={user} />;
};

export default NavbarUserActions;
