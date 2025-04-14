import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import TutorsList from '../../components/TutorsList';

const CustomerHomePage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="customer-home">
      <section className="welcome-section">
        <h1>Welcome, {currentUser?.name || 'Student'}!</h1>
        <p>Find the perfect tutor for your learning needs.</p>
        <div className="action-buttons">
          <Link to="/customer/tutors" className="btn btn-primary">
            Browse All Tutors
          </Link>
          <Link to="/customer/request-tutoring" className="btn btn-secondary">
            Request Tutoring
          </Link>
        </div>
      </section>

      <section className="featured-tutors">
        <h2>Featured Tutors</h2>
        <TutorsList featured={true} limit={3} />
        <div className="see-all-link">
          <Link to="/customer/tutors">See All Tutors →</Link>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Browse Tutors</h3>
            <p>Explore our qualified tutors and find the perfect match for your learning needs.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Request Tutoring</h3>
            <p>Send a request to your chosen tutor with your requirements and availability.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Start Learning</h3>
            <p>Connect with your tutor and begin your personalized learning journey.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerHomePage;
