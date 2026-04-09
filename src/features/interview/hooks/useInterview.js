import { useCallback, useContext } from "react";
import {
  getAllInterview,
  getInterviewById,
  generateReport,
  generateResumePdf,
} from "../services/interview.api";
import { InterviewContext } from "../interview.context";

const extractFilename = (contentDisposition, fallbackName) => {
  if (!contentDisposition) {
    return fallbackName;
  }

  const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) {
    return decodeURIComponent(utf8Match[1]);
  }

  const basicMatch = contentDisposition.match(/filename="?([^";]+)"?/i);
  return basicMatch?.[1] || fallbackName;
};

export const useInterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("useInterview must be used within Interviewprovider");
  }

  const { loading, setLoading, report, setReport, reports, setreports} =context;

  const generatereport = async ({
    resume,
    selfDescription,
    jobDescription,
  }) => {
    setLoading(true);
    let response = null;
    try {
      response = await generateReport({
        resume,
        selfDescription,
        jobDescription,
      });
      console.log(response);
      setReport(response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
    return response;
  };

  const getReportById = useCallback(
    async (interviewId) => {
      setLoading(true);
      let response = null;
      try {
        response = await getInterviewById({ interviewId });
        setReport(response);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
      return response;
    },
    [setLoading, setReport],
  );

  const getallInterview = useCallback(async () => {
    setLoading(true);
    let response = null;
    try {
      response = await getAllInterview();
      setreports(response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
    return response;
  }, [setLoading, setreports]);

  const getResumePdf = async ({interviewId})=>{
    setLoading(true);
    let response = null;
    try {
      response = await generateResumePdf({interviewId});

      const blob = response?.data;
      if (blob) {
        const filename = extractFilename(
          response.headers?.["content-disposition"],
          `resume_${interviewId}.pdf`,
        );

        const fileUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(fileUrl);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
    return response;
  };


  return {
    loading,
    report,
    reports,
    generatereport,
    getReportById,
    getallInterview,
    getResumePdf,
  };
};
