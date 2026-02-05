import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
  User,
  AtSign,
  MessageSquare,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import candidatesBanner from "../../assets/bg.png";
import toast from "react-hot-toast";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success(
      <p className="text-green-700 text-center font-serif">
        {t('contact_success_message')}
      </p>,
      {
        duration: 2000,
      },
    );
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section - KEEPING AS IS */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${candidatesBanner})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {t('contact_banner_title')}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            {t('contact_banner_desc')}
          </p>
        </div>
      </div>

      {/* NEW DESIGN STARTS HERE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-20">
        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Address Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-green-600">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t('contact_office_title')}
              </h3>
              <p className="text-gray-600 text-sm">

                Dhaka
                <br />
                Bangladesh
              </p>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-green-600">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t('contact_inquiries_title')}
              </h3>
              <a
                href="mailto:info@bnpcandidates.com"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                info@bnpcandidates.com
              </a>
              <p className="text-gray-500 text-sm mt-1">{t('contact_send_email')}</p>
            </div>
          </div>

          {/* Press Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-green-600">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t('contact_press_title')}
              </h3>
              <a
                href="mailto:campaign@bnpcandidates.com"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                campaign@bnpcandidates.com
              </a>
              <p className="text-gray-500 text-sm mt-1">{t('contact_media_inquiries')}</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  {t('contact_form_title')}
                </h2>
                <p className="text-gray-600">
                  {t('contact_form_desc')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('contact_name_label')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={t('contact_name_placeholder')}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('contact_email_label')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <AtSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={t('contact_email_placeholder')}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('contact_subject_label')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder={t('contact_subject_placeholder')}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('contact_message_label')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder={t('contact_message_placeholder')}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="cursor-pointer w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {t('contact_send_button')}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar - Social Media & Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Social Media Card */}
            <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">{t('contact_follow_us')}</h3>
              <p className="text-green-100 mb-6 text-sm">
                {t('contact_follow_desc')}
              </p>

              <div className="space-y-3">
                <a
                  href="https://www.facebook.com/people/BNPcandidatescom/61587275225560/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-white/20 group-hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                    <Facebook className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Facebook</p>
                    {/* <p className="text-xs text-green-100">@bnpbd.org</p> */}
                  </div>
                </a>

                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-white/20 group-hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                    <FaXTwitter className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Twitter</p>
                    {/* <p className="text-xs text-green-100">@bdbnp78</p> */}
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-white/20 group-hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Instagram</p>
                    {/* <p className="text-xs text-green-100">@bnpbd</p> */}
                  </div>
                </a>

                {/* <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-white/20 group-hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                    <Youtube className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">YouTube</p>
                    <p className="text-xs text-green-100">@bdbnp</p>
                  </div>
                </a> */}
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('contact_get_involved')}
              </h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <p>
                    {t('contact_get_involved_1')}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <p>
                    {t('contact_get_involved_2')}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <p>
                    {t('contact_get_involved_3')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
