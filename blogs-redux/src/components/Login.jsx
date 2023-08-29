import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

const loginForm = ({
  username,
  handleLogin,
  password,
  setPassword,
  setUsername,
}) => {
  return (
    <form
      id="login"
      onSubmit={handleLogin}
      className="flex flex-col gap-3 mx-5 text-center"
    >
      <h1 className="text-5xl font-bold">Welcome to Blogs</h1>
      <Input
        type="text"
        value={username}
        label="Username"
        radius="sm"
        id="username"
        onChange={({ target }) => setUsername(target.value)}
      />
      <Input
        type="password"
        value={password}
        radius="sm"
        label="Password"
        id="password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <Button
        type="submit"
        radius="sm"
        id="login-button"
        className="font-semibold"
        color="primary"
      >
        Login
      </Button>
    </form>
  );
};

export default loginForm;
