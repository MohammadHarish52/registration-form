import { useState } from "react";
import useForm from "../hooks/useForm";
import useValidation from "../hooks/useValidation";
import axios from "axios";

const SurveyForm = () => {
  const initialState = {
    fullName: "",
    email: "",
    surveyTopic: "",
    additionalQuestions: [],
    feedback: "",
  };

  const { validate } = useValidation();
  const { formData, errors, handleChange, handleSubmit } = useForm(
    initialState,
    validate
  );

  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  // Function to fetch all questions
  const fetchAllQuestions = async () => {
    try {
      const response = await axios.get(
        `https://66740b1c75872d0e0a94d700.mockapi.io/questions`
      );
      console.log("Fetched questions:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
  };

  // Function to filter questions based on survey topic
  const filterQuestionsByTopic = (questions, topic) => {
    const filtered = questions.filter(
      (question) => question.topic.toLowerCase() === topic.toLowerCase()
    );
    console.log(`Filtered questions for topic "${topic}":`, filtered);
    return filtered;
  };

  // Handle change in survey topic selection
  const handleSurveyTopicChange = async (e) => {
    const { name, value } = e.target;
    handleChange(e);
    console.log(`Survey topic changed to: ${value}`);

    if (value) {
      // Fetch all questions and then filter based on selected topic
      const questions = await fetchAllQuestions();
      const filteredQuestions = filterQuestionsByTopic(questions, value);
      setAdditionalQuestions(filteredQuestions);
      console.log("Set additional questions:", filteredQuestions);
    } else {
      setAdditionalQuestions([]);
    }
  };

  return (
    <div className="flex justify-center items-center text-left min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center">Survey Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Survey Topic */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Survey Topic
            </label>
            <select
              name="surveyTopic"
              value={formData.surveyTopic}
              onChange={handleSurveyTopicChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Topic</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
            {errors.surveyTopic && (
              <p className="mt-1 text-sm text-red-600">{errors.surveyTopic}</p>
            )}
          </div>

          {/* Dynamic Additional Questions */}
          {additionalQuestions.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-bold">Additional Questions</h2>
              {additionalQuestions.map((question, index) => (
                <div key={question.id} className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    {question.question}
                  </label>
                  {question.type === "text" && (
                    <input
                      type="text"
                      name={`additionalQuestion${index}`}
                      value={formData[`additionalQuestion${index}`] || ""}
                      onChange={handleChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  )}
                  {question.type === "number" && (
                    <input
                      type="number"
                      name={`additionalQuestion${index}`}
                      value={formData[`additionalQuestion${index}`] || ""}
                      onChange={handleChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Feedback */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Feedback
            </label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              rows={4}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.feedback && (
              <p className="mt-1 text-sm text-red-600">{errors.feedback}</p>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Submit Survey
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;
