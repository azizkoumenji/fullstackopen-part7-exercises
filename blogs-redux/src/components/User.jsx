import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react";

const User = () => {
  const users = useSelector((state) => state.users);

  const match = useMatch("/users/:id");
  const user = match ? users.find((us) => us.id === match.params.id) : null;
  if (!user) {
    return null;
  }

  return (
    <div>
      <Avatar showFallback />
      <h2 className="font-bold text-4xl">{user.name}</h2>
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-xl">Your Blogs</h3>
        </CardHeader>
        <CardBody>
          <ul>
            {user.blogs.map((blog, i) => (
              <li key={i}>
                <Card className="bg-content2">{blog.title}</Card>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
};

export default User;
