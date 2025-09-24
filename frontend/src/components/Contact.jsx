import React from 'react'
import { FaMapMarkedAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

function Contact(){


   return(
      <>

      <div className="min-h-screen bg-gray-50 text-gray-800">

        <section className="relative bg-center bg-cover text-white py-24 text-center" style={{backgroundImage:"url('https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')"}}>

          <div className="absolute inset-0 bg-black bg-opacity-60"></div>

          <div className="relative z-10">

            <h1 className="text-5xl font-bold mb-4">Get in touch with us</h1>

            <p className="text-xl max-w-2xl mx-auto">We'd love to hear from you.Reach out with any questions or feedback </p>

          </div>
           
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
            <div className="bg-white shadow-lg rounded-2xl p-8">

                <h2 className="text-2xl font-bold mb-6">Send Us a message</h2>

                <form className="space-y-4">

                     <input type="text" placeholder="Enter your Name" className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400" required />

                     <input type="email" placeholder="Enter your Email" className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400" required />

                     <textarea  placeholder="Enter your message..." rows="5" className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"></textarea>

                     <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"> Send Message</button>

                </form>


            </div>

            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-6">Our Location</h2>
                    <ul className="space-y-4">

                        <li className="flex items-center gap-3"><FaMapMarkedAlt className="text-blue-600" /> Nairobi, Kenya</li> 

                        <li className="flex items-center gap-3"><FaPhoneAlt className="text-blue-600" /> +254 200 123 456</li> 

                        <li className="flex items-center gap-3"><FaEnvelope className="text-blue-600" /> contact@e-vocational.com</li> 



                    </ul>
                </div>

                <div>
                    <iframe 
                       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.1414!2d36.821946!3d-1.292066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10c6d8c3d7c3%3A0x1234567890abcdef!2sNairobi!5e0!3m2!1sen!2ske!4v1234567890" 
                       frameborder="0"
                       
                       width="100%"
                       height="300"
                       allowFullScreen=""
                       loading="lazy"
                       style={{border:0}}
                       
                       >
                    
                    
                    </iframe>
                </div>


            </div>

        </section>


      </div>
      
      
      </>

   )

}

export default Contact;