import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import Head from "next/head";
import {
  FaGithub,
  FaLinkedin,
  FaStackOverflow,
  FaMedium,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFileAlt
} from "react-icons/fa";

export default function Home() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    x.set(mouseX * 0.5);
    y.set(mouseY * 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const personalInfo = {
    name: "Abdulmoiz Ahmer",
    title: "Full-Stack Software Consultant @ Ciklum",
    avatarUrl: "/avatar.jpg",
    cv: {
      url: "https://docs.google.com/document/d/1SquSYKLUtVxEbhZy0593f9npgCJFUK66AcxCG2fZZ8o/edit?usp=sharing", 
      display: "View My CV"
    },
    github: {
      url: "https://github.com/Abdulmoiz-Ahmer",
      display: "github.com/Abdulmoiz-Ahmer"
    },
    linkedin: {
      url: "https://www.linkedin.com/in/abdulmoiz-ahmer-821a19115/",
      display: "linkedin.com/in/Abdulmoiz-Ahmer"
    },
    stackoverflow: {
      url: "https://stackoverflow.com/users/10866877/abdulmoiz-ahmer",
      display: "stackoverflow.com/users/abdulmoiz-ahmer"
    },
    medium: {
      url: "https://medium.com/@abdulmoizahmer1996",
      display: "medium.com/@abdulmoizahmer1996"
    },
    phone: "+92 331-8809772",
    email: "abdulmoizahmer@gmail.com",
    address: "Rawalpindi, Pakistan",
  };

  return (
    <>
      <Head>
        <title>Abdulmoiz Ahmer - Full Stack Software Consultant</title>
        <meta name="description" content="Personal business card of Abdulmoiz Ahmer, Full Stack Software Consultant at Ciklum" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <div className="min-h-screen bg-gradient-to-r from-[#02315E] via-[#00457E] to-[#2D82B5] flex items-center justify-center p-4">
        <motion.div
          className="relative w-full max-w-md perspective-1000"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          animate={{ scale: isHovered ? 1.02 : 1 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            scale: {
              type: "spring",
              stiffness: 100,
              damping: 15
            }
          }}
        >
          <div className="bg-gradient-to-br from-[#015C92]/25 to-[#2D82B5]/25 backdrop-blur-xl rounded-2xl p-8 shadow-[0_8px_32px_rgba(2,49,94,0.3)] border border-white/15 transform-gpu">
            <div className="space-y-8">
              <div className="flex flex-col items-center space-y-4">
                <motion.div 
                  className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 bg-white"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.name}
                    className="w-full h-full"
                  />
                </motion.div>
                <div className="text-center space-y-3">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                    {personalInfo.name}
                  </h1>
                  <p className="text-lg font-medium text-teal-300">{personalInfo.title}</p>
                </div>
              </div>

              <div className="space-y-7">
                {[
                  { icon: FaFileAlt, text: personalInfo.cv.display, url: personalInfo.cv.url, color: "#ffffff" },
                  { icon: FaGithub, text: personalInfo.github.display, url: personalInfo.github.url, color: "#171515" },
                  { icon: FaLinkedin, text: personalInfo.linkedin.display, url: personalInfo.linkedin.url, color: "#0077b5" },
                  { icon: FaStackOverflow, text: personalInfo.stackoverflow.display, url: personalInfo.stackoverflow.url, color: "#f48024" },
                  { icon: FaMedium, text: personalInfo.medium.display, url: personalInfo.medium.url, color: "#000000" },
                  { icon: FaPhone, text: personalInfo.phone, color: "#4CAF50" },
                  { icon: FaEnvelope, text: personalInfo.email, url: `mailto:${personalInfo.email}`, color: "#EA4335" },
                  { icon: FaMapMarkerAlt, text: personalInfo.address, color: "#FF5722" }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <SocialLink
                      key={index}
                      icon={<Icon style={{ color: item.color }} />}
                      text={item.text}
                      url={item.url}
                      styleColor={item.color}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

interface SocialLinkProps {
  icon: React.ReactNode;
  text: string;
  url?: string;
  styleColor: string;
}

function SocialLink({ icon, text, url, styleColor }: SocialLinkProps) {
  const content = (
    <motion.div
      className="flex items-center space-x-4 text-gray-300 transition-all duration-300 hover:scale-105 group"
      whileHover={{ x: 8, color: styleColor }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <span className="text-2xl transition-transform group-hover:scale-110 duration-300">{icon}</span>
      <span className="text-sm font-medium tracking-wide">{text}</span>
    </motion.div>
  );

  if (url) {
    return (
      <motion.a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block w-full no-underline cursor-pointer"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {content}
      </motion.a>
    );
  }

  return content;
}
