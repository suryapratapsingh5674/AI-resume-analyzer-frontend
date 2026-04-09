import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const generateReport = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  const formData = new FormData();
  formData.append("resume", resume);
  formData.append("selfDescription", selfDescription);
  formData.append("jobDescription", jobDescription);

  const response = await api.post("/api/ai/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.interviewReport;
};

export const getInterviewById = async ({ interviewId }) => {
  const response = await api.get(`/api/ai/${interviewId}`);
  return response.data.interviewReport;
};

export const getAllInterview = async () => {
  const response = await api.get("/api/ai/allinterview");
  return response.data.allInterview;
};

export const generateResumePdf = async ({ interviewId }) => {
  const response = await api.post(`/api/ai/resume/pdf/${interviewId}`, null, {
    headers: { Accept: "application/pdf" },
    responseType: "blob",
  });
  return response;
};
