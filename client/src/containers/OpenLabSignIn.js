import './openLabSignIn.css';

/**
 *
 * @returns {JSX.Element} - Survey iframe
 */
export default function SurveyPage() {
  return (
    <div className="survey-page">
      <iframe title="survey" src="https://www.surveymonkey.ca/r/OLsign-in">
        {' '}
      </iframe>
    </div>
  );
}
