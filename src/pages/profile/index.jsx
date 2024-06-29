import { Formik } from "formik";
import { Button, Form, Modal } from "react-bootstrap";
import { profileSchema } from "../../components/schemas";
import { useState } from "react";
import { addDocById, uploadFile } from "../../firebase/apiFunctions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useLoader from "../../hooks/useLoader";
import { getToken } from "../../components/lib";

const Profile = () => {
  const [isProfile, setIsProfile] = useState(getToken("is_Profile"));
  const { setIsLoading, Loader } = useLoader();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const uid = getToken();
    const img_url = await uploadFile(values.profileImage, `users/${uid}`);
    await addDocById("users", uid, { ...values, profileImage: img_url });
    toast.success("Profile updated");
    localStorage.setItem("is_Profile", JSON.stringify(true));
    setIsProfile(true);
    setIsLoading(false);
    navigate("/home");
  };
  return (
    <>
      <Loader />
      <Modal
        show={!isProfile}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton={false}>
          <Modal.Title id="contained-modal-title-vcenter">
            Complete Your Profile First
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              fullName: "",
              phoneNumber: "",
              city: "",
              profileImage: null,
            }}
            validationSchema={profileSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={values.fullName}
                    onChange={handleChange}
                    isInvalid={touched.fullName && !!errors.fullName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phoneNumber}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    as="select"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    isInvalid={touched.city && !!errors.city}
                  >
                    <option value="">Select City</option>
                    <option value="karachi">Karachi</option>
                    <option value="lahore">Lahore</option>
                    <option value="islamabad">Islamabad</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formProfileImage">
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      setFieldValue(
                        "profileImage",
                        event.currentTarget.files[0]
                      );
                    }}
                    isInvalid={touched.profileImage && !!errors.profileImage}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.profileImage}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Continue
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
