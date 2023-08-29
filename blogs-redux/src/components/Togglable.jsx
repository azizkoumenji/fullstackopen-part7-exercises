import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          color="primary"
          className="font-semibold"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <Card style={showWhenVisible}>
        <CardBody>
          {props.children}
          <Button color="danger" onClick={toggleVisibility}>
            Cancel
          </Button>
        </CardBody>
      </Card>
    </div>
  );
});

Togglable.displayName = "Togglable";
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default Togglable;
