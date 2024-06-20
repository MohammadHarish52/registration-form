import useForm from "./useForm";

const JobApplicationForm = () => {
  const initialState = {
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    relevantExperience: "",
    portfolioURL: "",
    managementExperience: "",
    additionalSkills: {
      JavaScript: false,
      CSS: false,
      Python: false,
      Java: false,
    },
    interviewTime: "",
  };

  const validate = (values) => {
    const formErrors = {};
    if (!values.fullName) formErrors.fullName = "Full Name is required";
    if (!values.email) formErrors.email = "Email is required";
    if (values.email && !/\S+@\S+\.\S+/.test(values.email))
      formErrors.email = "Email is invalid";
    if (!values.phoneNumber)
      formErrors.phoneNumber = "Phone Number is required";
    if (values.phoneNumber && isNaN(values.phoneNumber))
      formErrors.phoneNumber = "Phone Number must be a valid number";
    if (values.position === "Developer" || values.position === "Designer") {
      if (!values.relevantExperience || values.relevantExperience <= 0) {
        formErrors.relevantExperience =
          "Relevant Experience is required and must be greater than 0";
      }
    }
    if (
      values.position === "Designer" &&
      (!values.portfolioURL ||
        !/^https?:\/\/[^\s$.?#].[^\s]*$/gm.test(values.portfolioURL))
    ) {
      formErrors.portfolioURL =
        "Portfolio URL is required and must be a valid URL";
    }
    if (values.position === "Manager" && !values.managementExperience) {
      formErrors.managementExperience = "Management Experience is required";
    }
    if (!Object.values(values.additionalSkills).some((skill) => skill)) {
      formErrors.additionalSkills = "At least one skill must be selected";
    }
    if (!values.interviewTime)
      formErrors.interviewTime = "Preferred Interview Time is required";
    return formErrors;
  };

  const {
    formData,
    errors,
    submitted,
    handleChange,
    handleSubmit,
    setFormData,
  } = useForm(initialState, validate);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const skillName = name.substring("additionalSkills.".length); // Extract the skill name
    setFormData((prevState) => ({
      ...prevState,
      additionalSkills: {
        ...prevState.additionalSkills,
        [skillName]: checked,
      },
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center">Job Application Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Full Name:
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
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
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Applying for Position:
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Position</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
              </select>
            </label>
          </div>
          {(formData.position === "Developer" ||
            formData.position === "Designer") && (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Relevant Experience (years):
                <input
                  type="number"
                  name="relevantExperience"
                  value={formData.relevantExperience}
                  onChange={handleChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </label>
              {errors.relevantExperience && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.relevantExperience}
                </p>
              )}
            </div>
          )}
          {formData.position === "Designer" && (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Portfolio URL:
                <input
                  type="text"
                  name="portfolioURL"
                  value={formData.portfolioURL}
                  onChange={handleChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </label>
              {errors.portfolioURL && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.portfolioURL}
                </p>
              )}
            </div>
          )}
          {formData.position === "Manager" && (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Management Experience:
                <input
                  type="text"
                  name="managementExperience"
                  value={formData.managementExperience}
                  onChange={handleChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </label>
              {errors.managementExperience && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.managementExperience}
                </p>
              )}
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Additional Skills:
            </label>
            {Object.keys(formData.additionalSkills).map((skill) => (
              <div key={skill} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name={`additionalSkills.${skill}`}
                  checked={formData.additionalSkills[skill]}
                  onChange={handleCheckboxChange} // Use handleCheckboxChange for checkbox changes
                  className="mr-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <label className="text-sm text-gray-700">{skill}</label>
              </div>
            ))}
            {errors.additionalSkills && (
              <p className="mt-1 text-sm text-red-600">
                {errors.additionalSkills}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Preferred Interview Time:
              <input
                type="datetime-local"
                name="interviewTime"
                value={formData.interviewTime}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>
            {errors.interviewTime && (
              <p className="mt-1 text-sm text-red-600">
                {errors.interviewTime}
              </p>
            )}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Submit Application
            </button>
          </div>
        </form>
        {submitted && (
          <div className="mt-4 p-4 bg-green-100 rounded-md">
            <h2 className="text-lg font-medium text-green-800">
              Application Submitted Successfully!
            </h2>
            <p className="text-sm text-green-700">
              Thank you for applying. We will get in touch with you soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicationForm;
