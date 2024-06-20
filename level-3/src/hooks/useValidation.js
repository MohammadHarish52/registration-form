const useValidation = () => {
  const validate = (values) => {
    const errors = {};
    if (!values.fullName) errors.fullName = "Full Name is required";
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }
    if (!values.surveyTopic) errors.surveyTopic = "Survey Topic is required";

    if (values.surveyTopic === "Technology") {
      if (!values.technology.favoriteLanguage) {
        errors.favoriteLanguage = "Favorite Programming Language is required";
      }
      if (!values.technology.yearsOfExperience) {
        errors.yearsOfExperience = "Years of Experience is required";
      }
    }

    if (values.surveyTopic === "Health") {
      if (!values.health.exerciseFrequency) {
        errors.exerciseFrequency = "Exercise Frequency is required";
      }
      if (!values.health.dietPreference) {
        errors.dietPreference = "Diet Preference is required";
      }
    }

    if (values.surveyTopic === "Education") {
      if (!values.education.highestQualification) {
        errors.highestQualification = "Highest Qualification is required";
      }
      if (!values.education.fieldOfStudy) {
        errors.fieldOfStudy = "Field of Study is required";
      }
    }

    if (!values.feedback) {
      errors.feedback = "Feedback is required";
    } else if (values.feedback.length < 10) {
      errors.feedback = "Feedback must be at least 10 characters";
    }

    return errors;
  };

  return { validate };
};

export default useValidation;
