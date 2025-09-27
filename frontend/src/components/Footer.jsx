import React from "react";
import {FaGithub, FaInstagram, FaLinkedin} from "react-icons/fa"

function Footer(){



   return(<>

        <footer className="bg-gray-900 text-gray-300 py-8 mt-10">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div>

                        <h2 className="text-xl font-bold text-white">Skill Learn</h2>

                        <p className="mt-2 text-sm">
                            Empowering skills for the future
                        </p>

                    </div>

                    <div>
                        
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h3>

                        <ul className="mt-4 space-y-2">

                            <li><a href="/">Home</a></li> 

                            <li><a href="/lessons">Explore</a></li> 

                            <li><a href="/profile">Profile</a></li> 

                            <li><a href="/contact">Contact</a></li> 

                           

                        </ul>

                    </div>

                    <div>

                        <h3 className="text-sm font-semibold text-white uppercase ">Connect with us</h3>

                        <div className="flex mt-4 space-x-4">
                            <a href="https://github.com"> 

                              <FaGithub className="h-6 w-6 hover:text-white" />
                            
                            </a>

                            <a href="https://instagram.com" >

                                <FaInstagram className="h-6 w-6 hover:text-white" />
                             
                            </a> 

                            <a href="https://linkedin.com">

                                <FaLinkedin className="h-6 w-6 hover:text-white" />
                            </a>

                            

                        </div>
                    </div>

                </div>

                <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">

                    <p>&copy; 2025 SkillLearn . All rights reserved.</p>

                </div>

            </div>
        </footer>
   
   
   
   </>)



}
export default Footer;