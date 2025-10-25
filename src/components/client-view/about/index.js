"use client";

import AnimationWrapper, { staggerVariants } from "../animation-wrapper";
import { motion } from "framer-motion";
import Image from "next/image";
import { HiCheckCircle, HiUsers, HiBriefcase, HiClock } from "react-icons/hi";
import aboutMeImage from "../../../assets/about-image.png";

const statsVariants = {
  offscreen: { scale: 0.8, opacity: 0 },
  onscreen: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const skillVariants = {
  offscreen: { y: 20, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.6,
    },
  },
};

export default function ClientAboutView({ data }) {
  const aboutDataInfo = [
    {
      label: "Happy Clients",
      value: data?.noofclients || "50",
      icon: HiUsers,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Projects Done",
      value: data?.noofprojects || "100",
      icon: HiBriefcase,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      label: "Years Experience",
      value: data?.yearofexperience || "5",
      icon: HiClock,
      color: "text-primary-500",
      bgColor: "bg-primary-50",
    },
  ];

  const defaultSkills = [
    "React", "Next.js", "Node.js", "TypeScript", "MongoDB", "PostgreSQL",
    "AWS", "Docker", "GraphQL", "Tailwind CSS", "Python", "Express.js"
  ];

  const skills = data?.skills ? data.skills.split(",").map(s => s.trim()) : defaultSkills;

  return (
    <section className="section-padding bg-secondary-50/50" id="about">
      <div className="container-custom">
        {/* Stats Section */}
        <AnimationWrapper stagger className="mb-12 sm:mb-16 lg:mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {aboutDataInfo.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={statsVariants}
                  className="card p-4 sm:p-6 lg:p-8 text-center group hover:shadow-strong transition-all duration-300"
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${stat.bgColor} ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                  </div>
                  <motion.h3 
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary-900 mb-1 sm:mb-2"
                    initial={{ scale: 1 }}
                    whileInView={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {stat.value}+
                  </motion.h3>
                  <p className="text-sm sm:text-base text-secondary-600 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </AnimationWrapper>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <AnimationWrapper>
            <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary-900 leading-tight">
                  Why Hire Me For Your{" "}
                  <span className="text-gradient">Next Project?</span>
                </h2>
              </motion.div>
              
              <motion.p 
                className="text-sm sm:text-base lg:text-lg text-secondary-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {data?.aboutme || 
                  "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating efficient, scalable, and user-friendly applications that solve real-world problems. My goal is to deliver high-quality solutions that exceed expectations."}
              </motion.p>

              <motion.div
                className="space-y-3 sm:space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {[
                  "Clean, maintainable code",
                  "Responsive design principles",
                  "Performance optimization",
                  "Modern development practices"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 sm:gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <HiCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-secondary-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </AnimationWrapper>

          {/* Image */}
          <AnimationWrapper>
            <motion.div 
              className="relative"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative overflow-hidden rounded-4xl shadow-strong">
                <Image
                  src={aboutMeImage}
                  alt="About Me"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent"></div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 bg-primary-500 rounded-2xl shadow-green-glow flex items-center justify-center"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="text-white font-bold text-lg">5+</span>
              </motion.div>
            </motion.div>
          </AnimationWrapper>
        </div>

        {/* Skills Section */}
        <AnimationWrapper className="mt-12 sm:mt-16 lg:mt-20" stagger>
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-3 sm:mb-4 px-4 sm:px-0">
              Technologies I <span className="text-gradient">Work With</span>
            </h3>
            <p className="text-sm sm:text-base text-secondary-600 max-w-2xl mx-auto px-4 sm:px-0">
              I stay up-to-date with the latest technologies and best practices to deliver cutting-edge solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                variants={skillVariants}
                className="group"
              >
                <div className="card p-3 sm:p-4 text-center hover:shadow-green-glow hover:border-primary-200 transition-all duration-300 group-hover:scale-105">
                  <span className="font-semibold text-xs sm:text-sm lg:text-base text-secondary-700 group-hover:text-primary-600 transition-colors break-words">
                    {skill}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
}
