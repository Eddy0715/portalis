"use client";

import { useState } from "react";
import { Send, PhoneCall, Mail } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitType, setSubmitType] = useState<"whatsapp" | "email">("whatsapp");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("success");

    const subject = encodeURIComponent("New Inquiry - Portalis Interiors");
    const bodyText = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "Not provided"}\n\nMessage:\n${formData.message}`;
    const encodedBody = encodeURIComponent(bodyText);

    if (submitType === "whatsapp") {
      const phoneNumber = "+971555222074";
      const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9+]/g, "")}?text=${encodedBody}`;
      window.open(whatsappUrl, "_blank");
    } else {
      const mailtoUrl = `mailto:info@portalis.ae?subject=${subject}&body=${encodedBody}`;
      window.location.href = mailtoUrl;
    }

    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setStatus("idle");
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6 w-full max-w-lg">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Name Input */}
        <div className="flex-1 flex flex-col space-y-2">
          <label htmlFor="name" className="text-white/85 text-[10px] uppercase tracking-[0.2em] font-medium">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="bg-teal-green/20 border border-warm-gold/20 focus:border-warm-gold text-white text-sm px-4 py-3 outline-none transition-all duration-300 font-normal placeholder-white/20"
          />
        </div>

        {/* Phone Input */}
        <div className="flex-1 flex flex-col space-y-2">
          <label htmlFor="phone" className="text-white/85 text-[10px] uppercase tracking-[0.2em] font-medium">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+971 50 000 0000"
            className="bg-teal-green/20 border border-warm-gold/20 focus:border-warm-gold text-white text-sm px-4 py-3 outline-none transition-all duration-300 font-normal placeholder-white/20"
          />
        </div>
      </div>

      {/* Email Input */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-white/85 text-[10px] uppercase tracking-[0.2em] font-medium">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="hello@example.com"
          className="bg-teal-green/20 border border-warm-gold/20 focus:border-warm-gold text-white text-sm px-4 py-3 outline-none transition-all duration-300 font-normal placeholder-white/20 w-full"
        />
      </div>

      {/* Message Input */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="message" className="text-white/85 text-[10px] uppercase tracking-[0.2em] font-medium">
          Your Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your dream interior project..."
          className="bg-teal-green/20 border border-warm-gold/20 focus:border-warm-gold text-white text-sm px-4 py-3 outline-none transition-all duration-300 font-normal resize-none placeholder-white/20 w-full"
        />
      </div>

      {/* Submission Method Selection */}
      <div className="flex items-center space-x-6 py-2">
        <span className="text-white/85 text-[10px] uppercase tracking-[0.2em] font-medium">Submit Via:</span>
        <label className="flex items-center space-x-2 text-white text-xs cursor-pointer select-none">
          <input
            type="radio"
            name="submitType"
            checked={submitType === "whatsapp"}
            onChange={() => setSubmitType("whatsapp")}
            className="accent-warm-gold"
          />
          <span className="flex items-center gap-1 font-normal"><PhoneCall size={12} className="text-warm-gold" /> WhatsApp</span>
        </label>
        <label className="flex items-center space-x-2 text-white text-xs cursor-pointer select-none">
          <input
            type="radio"
            name="submitType"
            checked={submitType === "email"}
            onChange={() => setSubmitType("email")}
            className="accent-warm-gold"
          />
          <span className="flex items-center gap-1 font-normal"><Mail size={12} className="text-warm-gold" /> Email Draft</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="circle-reveal-btn bg-warm-gold hover:bg-white text-forest-green text-xs uppercase tracking-[0.25em] py-4 px-8 font-semibold transition-all duration-300 w-full flex items-center justify-center gap-2"
      >
        <Send size={14} /> Send Message
      </button>

      {/* Status Indicators */}
      {status === "success" && (
        <p className="text-warm-gold text-xs tracking-wider text-center animate-pulse">
          Opening submission window. Thank you!
        </p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-xs tracking-wider text-center">
          Please fill in all required fields marked with *.
        </p>
      )}
    </form>
  );
}
