import { useSelector } from "react-redux";
import { Card, CardBody } from "@nextui-org/react";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (notification === null) {
    return null;
  }

  return (
    <Card isBlurred className="mx-w-md z-50 absolute top-0 left-52">
      <CardBody>{notification}</CardBody>
    </Card>
  );
};

export default Notification;
