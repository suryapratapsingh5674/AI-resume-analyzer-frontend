import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import "../styles/interview.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate, useParams } from "react-router";

const Interview = () => {
  const [activeSection, setActiveSection] = useState("technical");
  const [expandedTechnicalIndex, setExpandedTechnicalIndex] = useState(null);
  const [expandedBehavioralIndex, setExpandedBehavioralIndex] = useState(null);
  const [expandedRoadmapIndex, setExpandedRoadmapIndex] = useState(null);

  const navigate = useNavigate();
  const { interviewId } = useParams();
  const { report, loading, getReportById, getResumePdf } = useInterview();

  useEffect(() => {
    if (!interviewId) return;
    getReportById(interviewId);
  }, [getReportById, interviewId]);

  const sections = useMemo(
    () => [
      { id: "technical", label: "Technical questions" },
      { id: "behavioral", label: "Behavioral questions" },
      { id: "roadmap", label: "Road Map" },
    ],
    [],
  );

  if (loading || !report) {
    return (
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          fontSize: "2vw",
        }}
      >
        <h1>Loading...</h1>
      </main>
    );
  }

  const matchScore = Number(report.matchScore ?? 0);
  const scoreLevel =
    matchScore < 30 ? "low" : matchScore <= 60 ? "medium" : "high";

  const technicalQuestions = report.technicalQuestions ?? [];
  const behavioralQuestions = report.behavioralQuations ?? [];

  return (
    <>
      <Navbar />
      <main className="interview-page">
        <button
          type="button"
          className="page-back-btn"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <div className="interview-card">
          <aside className="interview-sidebar">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className={`section-btn ${
                  activeSection === section.id ? "active" : ""
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </aside>

          <section className="interview-main-content">
            {activeSection === "technical" && (
              <div className="question-list">
                <h2>Technical questions</h2>
                {technicalQuestions.length > 0 && (
                  <div className="question-accordion">
                    {technicalQuestions.map((item, index) => {
                      const isExpanded = expandedTechnicalIndex === index;

                      return (
                        <article
                          className={`question-item ${isExpanded ? "expanded" : ""}`}
                          key={`tech-${index}`}
                        >
                          <button
                            type="button"
                            className="question-toggle"
                            onClick={() =>
                              setExpandedTechnicalIndex(
                                isExpanded ? null : index,
                              )
                            }
                          >
                            <span>{`Question ${index + 1}: ${item.question}`}</span>
                            <span className="toggle-indicator">
                              {isExpanded ? "-" : "+"}
                            </span>
                          </button>

                          <div
                            className={`question-content ${isExpanded ? "is-open" : ""}`}
                          >
                            <p>
                              <strong>Intention:</strong> {item.intention}
                            </p>
                            <p>
                              <strong>Answer:</strong> {item.answer}
                            </p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeSection === "behavioral" && (
              <div className="question-list">
                <h2>Behavioral questions</h2>
                {behavioralQuestions.length > 0 && (
                  <div className="question-accordion">
                    {behavioralQuestions.map((item, index) => {
                      const isExpanded = expandedBehavioralIndex === index;

                      return (
                        <article
                          className={`question-item ${isExpanded ? "expanded" : ""}`}
                          key={`beh-${index}`}
                        >
                          <button
                            type="button"
                            className="question-toggle"
                            onClick={() =>
                              setExpandedBehavioralIndex(
                                isExpanded ? null : index,
                              )
                            }
                          >
                            <span>{`Question ${index + 1}: ${item.question}`}</span>
                            <span className="toggle-indicator">
                              {isExpanded ? "-" : "+"}
                            </span>
                          </button>

                          <div
                            className={`question-content ${isExpanded ? "is-open" : ""}`}
                          >
                            <p>
                              <strong>Intention:</strong> {item.intention}
                            </p>
                            <p>
                              <strong>Answer:</strong> {item.answer}
                            </p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeSection === "roadmap" && (
              <div className="roadmap-list">
                <h2>Preparation roadmap</h2>
                <div className="question-accordion">
                  {report.preparetionPlan?.map((item, index) => {
                    const isExpanded = expandedRoadmapIndex === index;

                    return (
                      <article
                        className={`question-item ${isExpanded ? "expanded" : ""}`}
                        key={item.day}
                      >
                        <button
                          type="button"
                          className="question-toggle"
                          onClick={() =>
                            setExpandedRoadmapIndex(isExpanded ? null : index)
                          }
                        >
                          <span>
                            Day {item.day}: {item.focus}
                          </span>
                          <span className="toggle-indicator">
                            {isExpanded ? "-" : "+"}
                          </span>
                        </button>

                        <div
                          className={`question-content roadmap-content ${
                            isExpanded ? "is-open" : ""
                          }`}
                        >
                          <ul>
                            {item.tasks?.map((task, taskIndex) => (
                              <li key={`${item.day}-${taskIndex}`}>{task}</li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          <aside className="interview-skill-gap">
            <div className={`match-score-card score-${scoreLevel}`}>
              <h3>Match Score</h3>
              <div className="score-ring">
                <span className="score-value">{matchScore}</span>
                <span className="score-percent">%</span>
              </div>
              <p>
                {scoreLevel === "high" && "Strong match for this role"}
                {scoreLevel === "medium" && "Moderate match for this role"}
                {scoreLevel === "low" && "Needs improvement for this role"}
              </p>
            </div>

            <h2>Skill Gaps</h2>
            <div className="skill-gap-list">
              {report.skillGaps?.map((item, index) => (
                <span
                  key={`skill-${index}`}
                  className={`skill-pill severity-${item.severity}`}
                >
                  {item.skill}
                </span>
              ))}
            </div>

            <button
              type="button"
              className="resume-download-btn"
              onClick={() => getResumePdf({ interviewId:interviewId})}
            >
              Download AI Generated Resume
            </button>
          </aside>
        </div>
      </main>
    </>
  );
};

export default Interview;
