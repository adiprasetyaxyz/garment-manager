import { useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function LoginPage({
  setLogin,
  setMessage,
  setShowNotification,
  setShowDangerNotification,
}) {
  const [passwordShown, setPasswordShown] = useState(false);
  const [input, setInput] = useState({ username: "", password: "" });
  const userName = { username: "admin", password: "admin" };

  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      input.username === userName.username &&
      input.password === userName.password
    ) {
      setLogin(true);
      setMessage("Selamat datang Maju Jaya Garment!");
      setShowNotification(true);
      localStorage.setItem("login", true);
    } else {
      setMessage("Username atau password salah!");
      setShowDangerNotification(true);
    }
  };

  return (
    <section className="h-5/6 mt-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign In
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your username and password to sign in
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-6">
            <label htmlFor="username">
              <Typography variant="small" className="mb-2 block font-medium">
                Username
              </Typography>
            </label>
            <Input
              id="username"
              color="gray"
              size="lg"
              type="text"
              name="username"
              value={input.username}
              onChange={handleInputChange}
              placeholder="username"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography variant="small" className="mb-2 block font-medium">
                Password
              </Typography>
            </label>
            <div className="relative w-full">
              <Input
                size="lg"
                placeholder="********"
                labelProps={{
                  className: "hidden",
                }}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 pr-10"
                type={passwordShown ? "text" : "password"}
                name="password"
                value={input.password}
                onChange={handleInputChange}
              />
              <i
                onClick={togglePasswordVisibility}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-3 cursor-pointer"
              >
                {passwordShown ? (
                  <RemoveRedEyeIcon className="h-5 w-5" />
                ) : (
                  <VisibilityOffIcon className="h-5 w-5" />
                )}
              </i>
            </div>
          </div>
          <Button
            type="submit"
            color="gray"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2 text-black dark:text-white"
            fullWidth
          >
            Sign In
          </Button>
          <div className="!mt-4 flex justify-end">
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              variant="small"
              className="font-medium"
            >
              Forgot password
            </Typography>
          </div>
        </form>
      </div>
    </section>
  );
}
