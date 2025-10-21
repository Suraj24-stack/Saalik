import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createWaitlistEntry, clearSubmitSuccess, clearError } from "../../store/slices/waitlistSlice";

export default function GuideBookingForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { submitLoading, submitSuccess, error } = useSelector((state) => state.waitlist);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travel_date: "",
    destination: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Dispatch the create action
    dispatch(createWaitlistEntry(formData));
  };

  // Handle success - redirect after submission
  useEffect(() => {
    if (submitSuccess) {
      alert("Form submitted successfully! Our team will contact you soon.");
      dispatch(clearSubmitSuccess());
      navigate("/guide-booking");
    }
  }, [submitSuccess, navigate, dispatch]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #0a3d2e 100%)',
        padding: '60px 20px',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div 
        style={{
          maxWidth: '600px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '2px solid #2ecc71',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 10px 40px rgba(46, 204, 113, 0.2)'
        }}
      >
        <h1 
          style={{
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 'bold',
            marginBottom: '30px',
            textAlign: 'center',
            letterSpacing: '2px',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)'
          }}
        >
          <span style={{ color: '#fff' }}>GUIDE </span>
          <span style={{ color: '#2ecc71', textShadow: '0 0 20px rgba(46, 204, 113, 0.5)' }}>
            BOOKING FORM
          </span>
        </h1>

        {/* Error Message */}
        {error && (
          <div 
            style={{
              marginBottom: '20px',
              padding: '15px',
              background: 'rgba(231, 76, 60, 0.1)',
              border: '2px solid #e74c3c',
              borderRadius: '10px',
              color: '#e74c3c',
              fontSize: '14px',
              textAlign: 'center'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label 
              style={{
                display: 'block',
                fontSize: '14px',
                marginBottom: '8px',
                color: '#2ecc71',
                fontWeight: '500',
                letterSpacing: '0.5px'
              }}
            >
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={submitLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '2px solid rgba(46, 204, 113, 0.3)',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.3s ease',
                opacity: submitLoading ? 0.5 : 1,
                cursor: submitLoading ? 'not-allowed' : 'text'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2ecc71'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(46, 204, 113, 0.3)'}
            />
          </div>

          <div>
            <label 
              style={{
                display: 'block',
                fontSize: '14px',
                marginBottom: '8px',
                color: '#2ecc71',
                fontWeight: '500',
                letterSpacing: '0.5px'
              }}
            >
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={submitLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '2px solid rgba(46, 204, 113, 0.3)',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.3s ease',
                opacity: submitLoading ? 0.5 : 1,
                cursor: submitLoading ? 'not-allowed' : 'text'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2ecc71'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(46, 204, 113, 0.3)'}
            />
          </div>

          <div>
            <label 
              style={{
                display: 'block',
                fontSize: '14px',
                marginBottom: '8px',
                color: '#2ecc71',
                fontWeight: '500',
                letterSpacing: '0.5px'
              }}
            >
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={submitLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '2px solid rgba(46, 204, 113, 0.3)',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.3s ease',
                opacity: submitLoading ? 0.5 : 1,
                cursor: submitLoading ? 'not-allowed' : 'text'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2ecc71'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(46, 204, 113, 0.3)'}
            />
          </div>

          <div>
            <label 
              style={{
                display: 'block',
                fontSize: '14px',
                marginBottom: '8px',
                color: '#2ecc71',
                fontWeight: '500',
                letterSpacing: '0.5px'
              }}
            >
              Travel Date
            </label>
            <input
              type="date"
              name="travel_date"
              value={formData.travel_date}
              onChange={handleChange}
              disabled={submitLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '2px solid rgba(46, 204, 113, 0.3)',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.3s ease',
                opacity: submitLoading ? 0.5 : 1,
                cursor: submitLoading ? 'not-allowed' : 'text',
                colorScheme: 'dark'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2ecc71'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(46, 204, 113, 0.3)'}
            />
          </div>

          <div>
            <label 
              style={{
                display: 'block',
                fontSize: '14px',
                marginBottom: '8px',
                color: '#2ecc71',
                fontWeight: '500',
                letterSpacing: '0.5px'
              }}
            >
              Destination
            </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              disabled={submitLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '2px solid rgba(46, 204, 113, 0.3)',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.3s ease',
                opacity: submitLoading ? 0.5 : 1,
                cursor: submitLoading ? 'not-allowed' : 'text'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2ecc71'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(46, 204, 113, 0.3)'}
            />
          </div>

          <div>
            <label 
              style={{
                display: 'block',
                fontSize: '14px',
                marginBottom: '8px',
                color: '#2ecc71',
                fontWeight: '500',
                letterSpacing: '0.5px'
              }}
            >
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              disabled={submitLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '2px solid rgba(46, 204, 113, 0.3)',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.3s ease',
                opacity: submitLoading ? 0.5 : 1,
                cursor: submitLoading ? 'not-allowed' : 'text',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2ecc71'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(46, 204, 113, 0.3)'}
            />
          </div>

          <button
            type="submit"
            disabled={submitLoading}
            style={{
              width: '100%',
              background: '#2ecc71',
              color: '#000',
              border: 'none',
              padding: '16px',
              borderRadius: '50px',
              fontSize: '16px',
              fontWeight: 'bold',
              letterSpacing: '2px',
              cursor: submitLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              boxShadow: '0 5px 20px rgba(46, 204, 113, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              opacity: submitLoading ? 0.6 : 1,
              marginTop: '10px'
            }}
            onMouseEnter={(e) => {
              if (!submitLoading) {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 8px 30px rgba(46, 204, 113, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 5px 20px rgba(46, 204, 113, 0.4)';
            }}
          >
            {submitLoading ? (
              <>
                <svg 
                  style={{
                    animation: 'spin 1s linear infinite',
                    width: '20px',
                    height: '20px'
                  }}
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    style={{ opacity: 0.25 }} 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    style={{ opacity: 0.75 }} 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Booking'
            )}
          </button>
        </form>

        <button
          onClick={() => navigate("/guide-booking")}
          disabled={submitLoading}
          style={{
            marginTop: '20px',
            width: '100%',
            background: 'transparent',
            border: 'none',
            color: submitLoading ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.6)',
            fontSize: '14px',
            cursor: submitLoading ? 'not-allowed' : 'pointer',
            transition: 'color 0.3s ease',
            padding: '10px'
          }}
          onMouseEnter={(e) => {
            if (!submitLoading) e.target.style.color = '#2ecc71';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = 'rgba(255, 255, 255, 0.6)';
          }}
        >
          ← Back to Guide Booking
        </button>
      </div>

      {/* Add CSS animation for spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}