import React from 'react'

const Contact = () => {
    return (
        <>
        <div className="contact_info">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
                        <div className="contact_info_item d-flex justify-content-start align-items-center">
                             <img src ="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.citypng.com%2Fphoto%2F9261%2Fhd-light-blue-round-circle-phone-icon-png&psig=AOvVaw3ky3Lnex8vH9DgdaO3eQuo&ust=1670874521395000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJihxuWq8vsCFQAAAAAdAAAAABAE" alt="phone" />
                             <div className="contact_info_content">
                                <div className="contact_info_title">
                                    Phone
                                </div>
                                <div className="contact_info_text">
                                      +91 7895675671              
                                </div>
                             </div>
                        </div>
                        <div className="contact_info_item d-flex justify-content-start align-items-center">
                             <img src ="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.citypng.com%2Fphoto%2F9261%2Fhd-light-blue-round-circle-phone-icon-png&psig=AOvVaw3ky3Lnex8vH9DgdaO3eQuo&ust=1670874521395000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJihxuWq8vsCFQAAAAAdAAAAABAE" alt="phone" />
                             <div className="contact_info_content">
                                <div className="contact_info_title">
                                Email
                                </div>
                                <div className="contact_info_text">
                                      carpooling@gmail.com              
                                </div>
                             </div>
                        </div>




                        <div className="contact_info_item d-flex justify-content-start align-items-center">
                             <img src ="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.citypng.com%2Fphoto%2F9261%2Fhd-light-blue-round-circle-phone-icon-png&psig=AOvVaw3ky3Lnex8vH9DgdaO3eQuo&ust=1670874521395000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJihxuWq8vsCFQAAAAAdAAAAABAE" alt="phone" />
                             <div className="contact_info_content">
                                <div className="contact_info_title">
                                    Address
                                </div>
                                <div className="contact_info_text">

                                    VJTI MUMBAI               
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
                 
            </div>
            
            </div>

            {/* Contact Us In Case Of Queries */}
            <div className="contact_form">
             <div className = "container">
                <div className="row">
                    <div className="col-10-10 offset-lg-1">
                        <div className="contact_form_container py-5">
                            <div className="contact_form_title">
                                Get in Touch
                                 
                            </div>
                            <form id="contact_form">
                                 <div className="contact_form_name d-flex justify-content-between align-items-between">
                                    <input type="text" id="contact_form_name"
                                    className="contact_form_name input_field"
                                    placeholder="Your Name" required="true" />
                                    <input type="email" id="contact_form_email"
                                    className="contact_form_email input_field"
                                    placeholder="Your Email" required="true" />
                                    <input type="number" id="contact_form_phone"
                                    className="contact_form_phone input_field"
                                    placeholder="Your Phone number" required="true" />

                                    
                                    
                                 </div>
                                 <div className="contact_form_text">
                                    <textarea className="text_field contact_form_message" placeholder="Message" cols="30" rows = "10">

                                    </textarea>
                                 </div>
                                 <div className="contact_form_button" >
                                    <button type="submit" className="button contact_submit_button">
                                        SEND MESSAGE
                                    </button>
                                 </div>

                            </form>
                        </div>
                    </div>
                </div>
             </div>
            </div>
        </>
        

       


        
    )
}

export default Contact;