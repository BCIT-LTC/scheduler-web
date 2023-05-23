import './surveyPage.css';

/**
 *
 * @returns {JSX.Element} - Survey Open Lab
 */
export default function SurveyPage() {
  return (
    <div className="survey-page">
      <iframe title="survey" src="https://www.surveymonkey.ca/r/BSNopenlab">
        {' '}
      </iframe>
    </div>
  );
}
