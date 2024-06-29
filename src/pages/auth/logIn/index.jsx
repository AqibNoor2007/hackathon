import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { logInSchema } from "../../../components/schemas";
import useLoader from "../../../hooks/useLoader";
import { logInUser } from "../../../firebase/apiFunctions";
import useUser from "../../../hooks/useUser";

const LogIn = () => {
  const { setIsLoading, Loader } = useLoader();
  const { getUser } = useUser();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    await logInUser(values);
    const uid = JSON.parse(localStorage.getItem("uid"));
    await getUser(uid);
    setIsLoading(false);
  };

  return (
    <>
      <Loader />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h5 className="mt-6 text-center text-3xl font-medium text-gray-900">
              Sign in to your account
            </h5>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={logInSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8 space-y-6">
                <div className="rounded-md -space-y-px">
                  <div>
                    <label>
                      <span className="text-red-600">*</span> Email address
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="mt-1 w-full rounded-md border shadow-sm p-2 outline-none focus:border-indigo-500"
                      placeholder="Email address"
                    />
                    <div className="mb-4">
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label>
                      <span className="text-red-600">*</span> Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className="mt-1 w-full rounded-md border shadow-sm p-2 outline-none focus:border-indigo-500"
                      placeholder="Password"
                    />
                    <div className="mb-4">
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Field
                      type="checkbox"
                      name="remember"
                      id="remember_me"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link
                      to={"/forget-password"}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign in
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <h2>
            Don&lsquo;t have an account{" "}
            <Link className=" text-yellow-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </>
  );
};

export default LogIn;
