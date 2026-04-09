import { useEffect } from "react";
import { useInterview } from "../hooks/useInterview";
import "../styles/history.scss";
import { Link, useNavigate } from "react-router";

const History = () => {
  const { reports, getallInterview } = useInterview();
  const navigate = useNavigate();

  const getScoreLevel = (score) => {
    if (score < 30) return "low";
    if (score <= 60) return "medium";
    return "high";
  };

  const getPreviewText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  useEffect(() => {
    const fetchMe = async () => {
      await getallInterview();
    };

    fetchMe();
  }, [getallInterview]);

  return (
    <div className="main">
      <div className="history-container">
        <div className="history-header">
          <button
            type="button"
            className="page-back-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <h1>Interview History</h1>
        </div>
        {reports.length === 0 ? (
          <p>No interview reports available.</p>
        ) : (
          <div className="reports-list">
            {reports.map((report) => (
              <Link
                key={report._id}
                to={`/interview/${report._id}`}
                className="report-card"
              >
                <div className="report-card-top">
                  <div
                    className={`score-ring score-${getScoreLevel(Number(report.matchScore ?? 0))}`}
                  >
                    <span className="score-value">
                      {Number(report.matchScore ?? 0)}
                    </span>
                    <span className="score-percent">%</span>
                  </div>
                  <div className="report-copy">
                    <h3>{getPreviewText(report.jobDescription)}</h3>
                    <p>Tap to open the full interview report.</p>
                  </div>
                </div>
                {/* <p>{new Date(report.createdAt).toLocaleString()}</p> */}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
