import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TutorCard from '../../components/TutorCard';

const TutorDetailPage = () => {
  const { tutorId } = useParams();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch the tutor data from an API
    // For now, we'll simulate this with a timeout
    const fetchTutor = async () => {
      try {
        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
          // This is mock data - replace with actual API call
          const mockTutor = {
            id: tutorId,
            name: "Jane Doe",
            subjects: ["Mathematics", "Physics"],
            education: "Masters in Mathematics",
            experience: "5 years of tutoring experience",
            hourlyRate: 25,
            rating: 4.8,
            profilePicture: "https://via.placeholder.com/150",
            bio: "I am a passionate mathematics tutor with experience teaching students at all levels. I specialize in making complex concepts easy to understand.",
            availability: ["Weekdays evenings", "Weekend mornings"]
          };
          
          setTutor(mockTutor);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to load tutor details.");
        setLoading(false);
      }
    };

    fetchTutor();
  }, [tutorId]);

  const handleRequestTutoring = () => {
    navigate('/customer/request-tutoring', { state: { tutor } });
  };

  if (loading) {
    return <div className="loading">Loading tutor details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!tutor) {
    return <div className="not-found">Tutor not found</div>;
  }

  return (
    <div className="tutor-detail-page">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to Tutors
      </button>
      
      <div className="tutor-profile">
        <div className="tutor-info">
          <TutorCard tutor={tutor} />
          
          <div className="tutor-actions">
            <button onClick={handleRequestTutoring} className="request-button">
              Request Tutoring with {tutor.name}
            </button>
          </div>
        </div>
        
        <div className="tutor-details">
          <section className="bio-section">
            <h2>About {tutor.name}</h2>
            <p>{tutor.bio}</p>
          </section>
          
          <section className="subjects-section">
            <h2>Subjects</h2>
            <ul className="subjects-list">
              {tutor.subjects.map((subject, index) => (
                <li key={index} className="subject-item">{subject}</li>
              ))}
            </ul>
          </section>
          
          <section className="availability-section">
            <h2>Availability</h2>
            <ul className="availability-list">
              {tutor.availability.map((time, index) => (
                <li key={index} className="availability-item">{time}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailPage;
