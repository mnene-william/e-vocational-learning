import React from "react";
import {FaGithub, FaTwitter, FaLinkedin} from "react-icons/fa"

function Footer(){



   return(<>

        <footer className="bg-gray-900 text-gray-300 py-8 mt-10">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div>

                        <h2 className="text-xl font-bold text-white">E-Vocational Learning</h2>

                        <p className="mt-2 text-sm">
                            Empowering skills for the future
                        </p>

                    </div>

                    <div>
                        
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h3>

                        <ul className="mt-4 space-y-2">

                            <li><a href="/">Home</a></li> 

                            <li><a href="/lessons">Explore</a></li> 

                            <li><a href="#">Profile</a></li> 

                            <li><a href="#">Contact</a></li> 

                            <li><a href="#">Home</a></li> 

                        </ul>

                    </div>

                </div>

            </div>
        </footer>
   
   
   
   </>)



}
export default Footer;