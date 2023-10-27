import { useContext } from "react";
import { Navigate } from "react-router-dom"
import UsersTable from "../components/RoleManagement/UsersTable";

export default function RoleManagement() {

  return (
    <>
      <UsersTable />
    </>
  );
}