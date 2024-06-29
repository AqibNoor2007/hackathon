import { Formik, Form, Field, ErrorMessage } from "formik";
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";
import { signUpSchema } from "../../../components/schemas";
import { createUser } from "../../../firebase/apiFunctions";
import useLoader from "../../../hooks/useLoader";
import { setToken } from "../../../components/lib";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { setIsLoading, Loader } = useLoader();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const data = await createUser(values);
    console.log(data, "data");
    if (data) {
      await setToken(data?.user?.uid);
      await localStorage.setItem("is_Profile", JSON.stringify(false));
      navigate("/profile");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Loader />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2">
        <div className="max-w-md w-full">
          <div>
            <h5 className="mt-6 text-center text-3xl font-medium text-gray-900">
              Create your account
            </h5>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={signUpSchema}
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
                  <div>
                    <label>
                      <span className="text-red-600">*</span> Confirm Password
                    </label>
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="mt-1 w-full rounded-md border shadow-sm p-2 outline-none focus:border-indigo-500"
                      placeholder="Confirm Password"
                    />
                    <div className="mb-4">
                      <ErrorMessage
                        name="confirmPassword"
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
                      name="terms"
                      id="terms"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      I agree to the terms and conditions
                    </label>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign up
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <p className="mt-2">
            Have an account{" "}
            <Link
              to={"/"}
              className="text-yellow-500 font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
