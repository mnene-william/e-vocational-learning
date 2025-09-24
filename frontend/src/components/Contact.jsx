import React from 'react'

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

                </form>


            </div>

        </section>


      </div>
      
      
      </>

   )

}

export default Contact;