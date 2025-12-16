"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  User,
  Phone,
  MessageSquare,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <motion.div
        className="absolute top-32 left-1/2 -translate-x-1/2 z-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div
          className="font-youth text-8xl md:text-[10rem] lg:text-[14rem] font-bold tracking-tight text-center"
          style={{ color: "var(--base)" }}
        >
          vernonthedev
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border mb-8"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-d)",
            }}
          >
            <motion.div
              className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
            <Image
              src="/logos/white.png"
              alt="vernonthedev's Logo"
              width={32}
              height={32}
              className="w-full h-full object-cover hidden dark:block"
            />
            <Image
              src="/logos/black.png"
              alt="vernonthedev's Logo"
              width={32}
              height={32}
              className="w-full h-full object-cover block dark:hidden"
            />
            </motion.div>
            <Mail className="w-5 h-5" style={{ color: "var(--orange)" }} />
            <span
              className="text-base font-semibold"
              style={{ color: "var(--grey)" }}
            >
              Get In Touch
            </span>
            <span
              className="text-xs font-youth font-bold uppercase tracking-wide px-2 py-1 rounded"
              style={{
                backgroundColor: "var(--orange)20",
                color: "var(--orange)",
              }}
            >
              vernonthedev
            </span>
          </motion.div>

          <h2 className="font-youth text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tight mb-8">
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ color: "var(--base)" }}
            >
              Let&apos;s
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ color: "var(--orange)" }}
            >
              Connect
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "var(--grey)" }}
          >
            Have a project in mind? Let&apos;s build something amazing together!
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div
            className="p-10 md:p-14 rounded-[2.5em] border backdrop-blur-sm"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-d)",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <label
                    htmlFor="name"
                    className="absolute -top-3 left-4 px-2 text-sm font-semibold"
                    style={{
                      backgroundColor: "var(--bg-d)",
                      color: "var(--base)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <User
                        className="w-4 h-4"
                        style={{ color: "var(--orange)" }}
                      />
                      Name
                    </div>
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    id="name"
                    className="w-full px-5 py-4 rounded-2xl border-2 transition-all focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: "var(--bg)",
                      borderColor: errors.name
                        ? "var(--red)"
                        : "var(--border-subtle)",
                      color: "var(--base)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--orange)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.name
                        ? "var(--red)"
                        : "var(--border-subtle)";
                    }}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm"
                      style={{ color: "var(--red)" }}
                    >
                      {errors.name.message}
                    </motion.p>
                  )}
                </div>

                <div className="relative group">
                  <label
                    htmlFor="email"
                    className="absolute -top-3 left-4 px-2 text-sm font-semibold"
                    style={{
                      backgroundColor: "var(--bg-d)",
                      color: "var(--base)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Mail
                        className="w-4 h-4"
                        style={{ color: "var(--orange)" }}
                      />
                      Email
                    </div>
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className="w-full px-5 py-4 rounded-2xl border-2 transition-all focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: "var(--bg)",
                      borderColor: errors.email
                        ? "var(--red)"
                        : "var(--border-subtle)",
                      color: "var(--base)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--orange)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.email
                        ? "var(--red)"
                        : "var(--border-subtle)";
                    }}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm"
                      style={{ color: "var(--red)" }}
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="relative group">
                <label
                  htmlFor="phone"
                  className="absolute -top-3 left-4 px-2 text-sm font-semibold"
                  style={{
                    backgroundColor: "var(--bg-d)",
                    color: "var(--base)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Phone
                      className="w-4 h-4"
                      style={{ color: "var(--orange)" }}
                    />
                    Phone Number
                  </div>
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  id="phone"
                  className="w-full px-5 py-4 rounded-2xl border-2 transition-all focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: "var(--bg)",
                    borderColor: errors.phone
                      ? "var(--red)"
                      : "var(--border-subtle)",
                    color: "var(--base)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--orange)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.phone
                      ? "var(--red)"
                      : "var(--border-subtle)";
                  }}
                  placeholder="+1 234 567 8900"
                />
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm"
                    style={{ color: "var(--red)" }}
                  >
                    {errors.phone.message}
                  </motion.p>
                )}
              </div>

              <div className="relative group">
                <label
                  htmlFor="message"
                  className="absolute -top-3 left-4 px-2 text-sm font-semibold"
                  style={{
                    backgroundColor: "var(--bg-d)",
                    color: "var(--base)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare
                      className="w-4 h-4"
                      style={{ color: "var(--orange)" }}
                    />
                    Short Message
                  </div>
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={4}
                  className="w-full px-5 py-4 rounded-2xl border-2 transition-all focus:outline-none focus:ring-2 resize-none"
                  style={{
                    backgroundColor: "var(--bg)",
                    borderColor: errors.message
                      ? "var(--red)"
                      : "var(--border-subtle)",
                    color: "var(--base)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--orange)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.message
                      ? "var(--red)"
                      : "var(--border-subtle)";
                  }}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm"
                    style={{ color: "var(--red)" }}
                  >
                    {errors.message.message}
                  </motion.p>
                )}
              </div>

              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 p-5 rounded-2xl border-2"
                    style={{
                      backgroundColor: "var(--orange)20",
                      borderColor: "var(--orange)50",
                      color: "var(--orange)",
                    }}
                  >
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-semibold text-lg">
                      Message sent successfully!
                    </span>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 p-5 rounded-2xl border-2"
                    style={{
                      backgroundColor: "var(--red)20",
                      borderColor: "var(--red)50",
                      color: "var(--red)",
                    }}
                  >
                    <AlertCircle className="w-6 h-6" />
                    <span className="font-semibold text-lg">
                      Failed to send message. Please try again.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-5 rounded-2xl font-youth font-bold text-base uppercase tracking-tight disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
                style={{
                  background: isSubmitting
                    ? "var(--grey)"
                    : "linear-gradient(135deg, var(--orange), var(--purple))",
                  color: "var(--bg)",
                }}
                whileHover={{ scale: isSubmitting ? 1 : 1.02, y: -2 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-6 h-6 border-3 border-bg border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
