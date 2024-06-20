import useForm from "./useForm";

const EventRegistrationForm = () => {
  const initialState = {
    name: "",
    email: "",
    age: "",
    attendingWithGuest: "No",
    guestName: "",
  };

  const validate = (values) => {
    const formErrors = {};
    if (!values.name) formErrors.name = "Name is required";
    if (!values.email) formErrors.email = "Email is required";
    if (values.email && !/\S+@\S+\.\S+/.test(values.email))
      formErrors.email = "Email is invalid";
    if (!values.age) formErrors.age = "Age is required";
    if (values.age && (isNaN(values.age) || values.age <= 0))
      formErrors.age = "Age must be a number greater than 0";
    if (values.attendingWithGuest === "Yes" && !values.guestName)
      formErrors.guestName = "Guest name is required";
    return formErrors;
  };

  const { formData, errors, submitted, handleChange, handleSubmit } = useForm(
    initialState,
    validate
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg flex justify-between items-center flex-col">
        <h1 className="text-2xl font-bold text-center">
          Event Registration Form
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Age:
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>
            {errors.age && (
              <p className="mt-1 text-sm text-red-600">{errors.age}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Are you attending with a guest?
              <select
                name="attendingWithGuest"
                value={formData.attendingWithGuest}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </label>
          </div>
          {formData.attendingWithGuest === "Yes" && (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Guest Name:
                <input
                  type="text"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </label>
              {errors.guestName && (
                <p className="mt-1 text-sm text-red-600">{errors.guestName}</p>
              )}
            </div>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>

        {submitted && (
          <div className="mt-6 p-4 border-t border-gray-200 text-green-500 flex justify-start flex-col text-left">
            <h2 className="text-xl font-bold">Form Summary</h2>
            <p className="summary">
              <strong>Name:</strong> {formData.name}
            </p>
            <p className="summary">
              <strong>Email:</strong> {formData.email}
            </p>
            <p className="summary">
              <strong>Age:</strong> {formData.age}
            </p>
            <p className="summary">
              <strong>Attending with Guest:</strong>{" "}
              {formData.attendingWithGuest}
            </p>
            {formData.attendingWithGuest === "Yes" && (
              <p className="summary">
                <strong>Guest Name:</strong> {formData.guestName}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventRegistrationForm;
