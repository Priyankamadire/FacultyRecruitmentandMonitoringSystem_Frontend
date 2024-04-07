import React from 'react'

const Faqs = () => {
  return (
    <div>
       <div className='faq-scrool'>
      <div>
      <>
      <center><h1>MORE FREQUENTLY ASKED QUESTIONS</h1></center>
      <div className="box" style={{ backgroundColor: "rgb(222, 255, 196)" }}>
  <strong>
   <div >
   <h3><em className='bi bi-pen-fill'>What is main aim of creating web sites?</em></h3>
   </div>
  </strong>
  <p className='bi bi-arrow-right'>The main is to find the faculty jobs and for admin to view faculty detail easily</p>
 
</div>

<div className="box" style={{ backgroundColor: "rgb(252, 255, 196)" }}>
  <strong>
   <div >
   <h3><em className='bi bi-pen-fill'>Will every one have access to login?</em></h3>
   </div>
  </strong>
  <p className='bi bi-arrow-right'>Yes, everyone who is seeking faculty jobs can log in easily. However, posting jobs can only be done by the superadmin of the institute</p>

  {/* <p className='bi bi-arrow-right'>Yaa every one who are finding jobs can login easily but poting job can be only done by superadmin of the institute</p> */}
 
</div>
<div className="box" style={{ backgroundColor: "rgb(422, 155, 156)" }}>
  <strong>
   <div >
   <h3><em className='bi bi-pen-fill'>In what way website is useful for superadmin ?</em></h3>
   </div>
  </strong>
  <p className='bi bi-arrow-right'>Superadmin can easily post and view details of faculty who are a part of their institute</p>
 
</div>
<div className="box" style={{ backgroundColor: "rgb(402, 175, 116)" }}>
  <strong>
   <div >
   <h3><em className='bi bi-pen-fill'>Are there any specific qualifications required to register on the website?
</em></h3>
   </div>
  </strong>
  <p className='bi bi-arrow-right'>Yes, everyone who is seeking faculty jobs can log in easily. However, posting jobs can only be done by the superadmin of the institute</p>
  {/* <p className='bi bi-arrow-right'>Yes, everyone who is seeking faculty jobs can log in easily. However, posting jobs can only be done by the superadmin of the institute</p> */}
 
</div>

<div className="box" style={{ backgroundColor: "rgb(362, 100, 200)" }}>
  <strong>
   <div >
   <h3><em className='bi bi-pen-fill'>What features does the website offer to job seekers?
</em></h3>
   </div>
  </strong>
  <p className='bi bi-arrow-right'>No, there are no specific qualifications required to register on the website. It is open to individuals from various educational backgrounds and career levels seeking faculty positions.

</p>
 
</div>
      
      </></div>
    </div>
    </div>
  )
}

export default Faqs
