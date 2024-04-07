import React from 'react';

export default function About() {
  const cursiveStyle = {
    fontFamily: 'cursive',
  };

  return (
    <>
    <div className='about-scrool'>
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-6">
          <img
            className="img-fluid rounded-circle mb-4 mb-lg-0"
            src="https://static9.depositphotos.com/1028979/1141/i/600/depositphotos_11413299-stock-photo-conceptual-image-of-business-woman.jpg"
            alt="Business Woman"
          />
        </div>
        <div className="col-lg-6 ">
          <h2 className="fw-bold mb-4"style={{ ...cursiveStyle, color: '#000' }}>
            Best Institutes Are Involved in Our Website. You Can Make Your Career by Joining Us.
          </h2>
          <p className="lead mb-4  text-dark"style={{ ...cursiveStyle, color: '#000' }}>
            Our main objective in developing this web page is to streamline the workload for organizers.
          </p>
          <p className="mb-4"style={{ ...cursiveStyle, color: '#000' }}>
            We provide comprehensive details of faculty members, including those currently employed, retired, or newly hired.
            This includes essential information such as contact details and college IDs. Furthermore, our platform facilitates
            the posting of job opportunities for faculty members.
          </p>
          <p className="mb-4"style={{ ...cursiveStyle, color: '#000' }}>
            Our website is particularly advantageous for individuals seeking faculty positions. It provides insights into available
            vacancies within various institutes. Additionally, notifications are promptly issued to those who have joined our website,
            ensuring they stay informed about new job openings.
          </p>
          <p className="mb-0"style={{ ...cursiveStyle, color: '#000' }}>
            Our website is highly beneficial for posting faculty job openings. Within a short time, you can secure positions in prestigious institutes.
            Management can effortlessly post faculty job requirements and vacancies on our website. Additionally, management has access to view detailed faculty profiles.
          </p>
        </div>
      </div></div>
    </div></>
  );
}
