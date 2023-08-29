import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const users = useSelector((state) => state.users);
  return (
    <>
      <p className="text-2xl font-bold">Users</p>
      <Table>
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Blogs Created</TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((user, i) => (
            <TableRow key={i}>
              <TableCell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Users;
