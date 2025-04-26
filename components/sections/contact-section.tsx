"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ContactSection() {
  const contactRef = useRef(null)
  const contactInView = useInView(contactRef, { once: true })

  return (
    <section id="contact" ref={contactRef} className="w-full py-20 md:py-32 relative">
      <div className="container px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={contactInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#004D40] mb-4 relative inline-block">
            Get In Touch
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[#D4A017]"></div>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 mt-6">
            Have questions or ready to start your digital transformation journey? Get in touch with our team of experts
            today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={contactInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
              <h3 className="text-2xl font-bold text-[#004D40] mb-6">Frequently Asked Questions</h3>

              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "What services does CLÉ-BUT EXPERTS offer?",
                    answer:
                      "CLÉ-BUT EXPERTS offers a comprehensive range of IT services including software development, IT consulting, training and development, digital transformation, project management, and IT infrastructure solutions.",
                  },
                  {
                    question: "How can I request a consultation?",
                    answer:
                      "You can request a consultation by filling out the contact form on this page, calling our office directly, or sending us an email. Our team will get back to you within 24 hours to schedule a meeting.",
                  },
                  {
                    question: "Do you offer customized solutions?",
                    answer:
                      "Yes, we specialize in creating customized IT solutions tailored to meet the specific needs and challenges of your organization. We work closely with you to understand your requirements and develop solutions that align with your business goals.",
                  },
                  {
                    question: "What industries do you serve?",
                    answer:
                      "We serve a wide range of industries including finance, healthcare, education, government, manufacturing, and more. Our expertise allows us to deliver effective solutions across various sectors.",
                  },
                  {
                    question: "How long does a typical project take?",
                    answer:
                      "The timeline for a project depends on its scope and complexity. During our initial consultation, we'll provide you with a detailed project plan including estimated timelines. We're committed to delivering high-quality solutions within agreed-upon timeframes.",
                  },
                ].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium text-[#004D40]">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={contactInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-[#004D40] mb-6">Send Us a Message</h3>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      className="border-gray-300 focus:border-[#004D40] focus:ring-[#004D40]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="border-gray-300 focus:border-[#004D40] focus:ring-[#004D40]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="How can we help you?"
                    className="border-gray-300 focus:border-[#004D40] focus:ring-[#004D40]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    className="min-h-[120px] border-gray-300 focus:border-[#004D40] focus:ring-[#004D40]"
                  />
                </div>

                <Button className="w-full bg-[#004D40] hover:bg-[#00695C] text-white">Send Message</Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Curved bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#004D40">
          <path d="M0,96L80,85.3C160,75,320,53,480,53.3C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  )
}
