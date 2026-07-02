

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  IndianRupee,
  Search,
  GraduationCap,
  Loader2,
  ArrowRight,
  Sparkles,
  Users,
  X,
  UploadCloud,
  User,
  Mail,
  Phone,
  Link as LinkIcon,
  MessageSquare,
  FileText,
  Building2,
  Code2,
  Target,
  Rocket,
  CheckCircle2,
  HeartHandshake,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import heroImage from "../assets/career.jpg";

const CareerPage = () => {
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [candidateData, setCandidateData] = useState({
    name: "",
    email: "",
    phone: "",
    portfolio: "",
    message: "",
    resume: null,
  });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/careers/jobs");
      setJobs(res.data.data || []);
    } catch (error) {
      console.log("Error fetching career jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchText = `
        ${job.title || ""}
        ${job.department || ""}
        ${job.location || ""}
        ${job.jobType || ""}
        ${job.experience || ""}
        ${job.skills?.join(" ") || ""}
      `.toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());

      const matchesTab =
        activeTab === "All"
          ? true
          : activeTab === "Jobs"
          ? job.jobType !== "Internship"
          : job.jobType === "Internship";

      return matchesSearch && matchesTab;
    });
  }, [jobs, activeTab, search]);

  const totalJobs = jobs.filter((job) => job.jobType !== "Internship").length;

  const totalInternships = jobs.filter(
    (job) => job.jobType === "Internship"
  ).length;

  const tabs = ["All", "Jobs", "Internships"];

  const openApplyModal = (job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  const closeApplyModal = () => {
    setShowApplyModal(false);
    setSelectedJob(null);
    setCandidateData({
      name: "",
      email: "",
      phone: "",
      portfolio: "",
      message: "",
      resume: null,
    });
  };

  const handleCandidateChange = (e) => {
    const { name, value } = e.target;

    setCandidateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, DOC, and DOCX files are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Resume size should be less than 5MB.");
      e.target.value = "";
      return;
    }

    setCandidateData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();

    if (!selectedJob) {
      alert("Please select a job first.");
      return;
    }

    if (!candidateData.resume) {
      alert("Please upload your resume.");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("jobId", selectedJob._id);
      formData.append("name", candidateData.name);
      formData.append("email", candidateData.email);
      formData.append("phone", candidateData.phone);
      formData.append("portfolio", candidateData.portfolio);
      formData.append("message", candidateData.message);
      formData.append("resume", candidateData.resume);

      await axios.post("/api/careers/apply", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Application submitted successfully!");
      closeApplyModal();
    } catch (error) {
      console.log("Application submit error:", error);
      alert(error.response?.data?.message || "Failed to submit application.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="relative w-full overflow-hidden bg-white">
        {/* Background blobs */}
        <motion.div
          className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full opacity-10 blur-3xl"
          style={{ background: "#378af9" }}
          animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full opacity-5 blur-3xl"
          style={{ background: "#378af9" }}
          animate={{ scale: [1, 0.95, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20 lg:py-24">
          {/* Company Hero */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#378af9]">
                <Sparkles className="h-4 w-4" />
                We Are Hiring
              </span>

              <h2 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-5xl">
                Grow Your Career With{" "}
                <span className="text-[#378af9]">Binarylogix</span>
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-gray-500">
                Join Binarylogix Technology LLP and work with a team that builds
                modern websites, applications, dashboards, and digital solutions
                for real businesses.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#openings"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#378af9] px-7 py-3 font-semibold text-white shadow-md shadow-blue-200/50 transition hover:scale-[1.02] hover:shadow-lg"
                >
                  View Openings
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="#why-join"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-100 px-7 py-3 font-semibold text-gray-700 transition hover:bg-blue-100 hover:text-[#378af9]"
                >
                  Why Join Us?
                </a>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <HeroStat value={totalJobs} label="Jobs" />
                <HeroStat value={totalInternships} label="Internships" />
                <HeroStat value={jobs.length} label="Openings" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -left-5 -top-5 h-28 w-28 rounded-full bg-blue-100 blur-2xl" />
              <div className="absolute -bottom-5 -right-5 h-28 w-28 rounded-full bg-[#378af9]/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-3 shadow-xl">
                <img
                  src={heroImage}
                  alt="Company team working together"
                  className="h-[360px] w-full rounded-[1.5rem] object-cover md:h-[460px]"
                />

                <div className="absolute bottom-8 left-8 right-8 rounded-2xl bg-white/90 p-5 shadow-lg backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <Building2 className="h-6 w-6 text-[#378af9]" />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">
                        Binarylogix Technology LLP
                      </h3>
                      <p className="text-sm text-gray-500">
                        Smart solutions for smarter businesses
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

   

          {/* Hiring Process */}
          <div className="mt-20">
            <SectionHeader
              badge="Hiring Process"
              title="Simple Application Process"
              description="Apply for any job or internship in a few simple steps."
            />

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              <ProcessCard
                step="01"
                title="Choose Opening"
                description="Select the job or internship that matches your skills and interest."
              />

              <ProcessCard
                step="02"
                title="Submit Resume"
                description="Fill your details, add your portfolio, and upload your resume."
              />

              <ProcessCard
                step="03"
                title="Team Review"
                description="Our team reviews your application and contacts suitable candidates."
              />
            </div>
          </div>

          {/* Openings */}
          <div id="openings" className="mt-20">
            <SectionHeader
              badge="Open Positions"
              title="Available Jobs & Internships"
              description="Explore current opportunities and apply for the role that suits you best."
            />

            {/* Filter + Search */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-3">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                        activeTab === tab
                          ? "bg-[#378af9] text-white shadow-md shadow-blue-200/60"
                          : "bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-[#378af9]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    placeholder="Search role, department, skills..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-full border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition-colors focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
                  />
                </div>
              </div>
            </motion.div>

            {/* Jobs */}
            <div className="mt-10">
              {loading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="h-10 w-10 animate-spin text-[#378af9]" />
                </div>
              ) : filteredJobs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm"
                >
                  <h2 className="text-2xl font-bold text-gray-900">
                    No openings found
                  </h2>
                  <p className="mt-2 text-gray-500">
                    Try changing your filter or search keyword.
                  </p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredJobs.map((job, index) => {
                    const isInternship = job.jobType === "Internship";

                    return (
                      <motion.div
                        key={job._id}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#378af9]/40 hover:shadow-lg"
                      >
                        <div className="mb-5 flex items-start justify-between gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 transition-colors group-hover:bg-[#378af9]">
                            {isInternship ? (
                              <GraduationCap className="h-6 w-6 text-[#378af9] transition-colors group-hover:text-white" />
                            ) : (
                              <Briefcase className="h-6 w-6 text-[#378af9] transition-colors group-hover:text-white" />
                            )}
                          </div>

                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-[#378af9]">
                            {job.jobType || "Full Time"}
                          </span>
                        </div>

                        <div>
                          <h2 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-[#378af9]">
                            {job.title}
                          </h2>

                          <p className="mt-1 text-sm font-semibold text-[#378af9]">
                            {job.department}
                          </p>

                          <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
                            {job.description}
                          </p>
                        </div>

                        <div className="mt-5 space-y-3 text-sm text-gray-700">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#378af9]" />
                            <span>
                              {job.location || "Bhopal, Madhya Pradesh"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-[#378af9]" />
                            <span>{job.experience || "Fresher"}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <IndianRupee className="h-4 w-4 text-[#378af9]" />
                            <span>{job.salary || "Not Disclosed"}</span>
                          </div>
                        </div>

                        {job.skills?.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-2">
                            {job.skills.slice(0, 5).map((skill, i) => (
                              <span
                                key={i}
                                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 transition-colors group-hover:bg-blue-100 group-hover:text-[#378af9]"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-auto pt-6">
                          <button
                            type="button"
                            onClick={() => openApplyModal(job)}
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#378af9] px-6 py-3 font-semibold text-white shadow-md shadow-blue-200/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#378af9] focus:ring-offset-2"
                          >
                            Apply Now
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

         
        </div>
      </section>
      {/* Why Join Company */}
<section
  id="why-join"
  className="relative overflow-hidden bg-white px-2 py-10 md:px-8 md:py-20 lg:py-24"
>
  {/* Background soft glow */}
  <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
  <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#378af9]/10 blur-3xl" />

  <div className="relative z-10 mx-auto max-w-7xl">
    <SectionHeader
      badge="Company Culture"
      title="Why Work With Us?"
      description="We give you a practical environment where you can learn, build, improve, and work on real-world projects."
    />

    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <BenefitCard
        icon={<Code2 />}
        title="Real Projects"
        description="Work on actual client projects, admin panels, APIs, dashboards, and production-level UI."
      />

      <BenefitCard
        icon={<Rocket />}
        title="Fast Growth"
        description="Improve your technical skills with daily development tasks and real debugging experience."
      />

      <BenefitCard
        icon={<Target />}
        title="Modern Tech"
        description="Learn and use React, Node.js, Express, MongoDB, Tailwind CSS, and deployment tools."
      />

      <BenefitCard
        icon={<HeartHandshake />}
        title="Supportive Team"
        description="Work with a friendly team where learning, communication, and consistency matter."
      />
    </div>
  </div>
</section>
         
      {/* Apply Popup Modal */}
      <AnimatePresence>
        {showApplyModal && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 25 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl md:p-8"
            >
              <button
                type="button"
                onClick={closeApplyModal}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-[#378af9] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6">
                <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#378af9]">
                  <FileText className="h-4 w-4" />
                  Job Application
                </span>

                <h2 className="text-2xl font-bold text-gray-900">
                  Apply for{" "}
                  <span className="text-[#378af9]">{selectedJob?.title}</span>
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Fill your details and upload your resume. Our team will review
                  your application.
                </p>
              </div>

              <form onSubmit={handleApplicationSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormInput
                    icon={<User />}
                    label="Full Name"
                    type="text"
                    name="name"
                    value={candidateData.name}
                    onChange={handleCandidateChange}
                    placeholder="Enter your name"
                    required
                  />

                  <FormInput
                    icon={<Mail />}
                    label="Email Address"
                    type="email"
                    name="email"
                    value={candidateData.email}
                    onChange={handleCandidateChange}
                    placeholder="Enter your email"
                    required
                  />

                  <FormInput
                    icon={<Phone />}
                    label="Mobile Number"
                    type="tel"
                    name="phone"
                    value={candidateData.phone}
                    onChange={handleCandidateChange}
                    placeholder="9876543210"
                    maxLength="10"
                    required
                  />

                  <FormInput
                    icon={<LinkIcon />}
                    label="Portfolio / LinkedIn"
                    type="url"
                    name="portfolio"
                    value={candidateData.portfolio}
                    onChange={handleCandidateChange}
                    placeholder="https://yourportfolio.com"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Message
                  </label>

                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-gray-400" />

                    <textarea
                      name="message"
                      value={candidateData.message}
                      onChange={handleCandidateChange}
                      rows="4"
                      placeholder="Tell us why you are a good fit..."
                      className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 pl-11 text-gray-800 outline-none transition-colors focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Upload Resume
                  </label>

                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center transition hover:border-[#378af9] hover:bg-blue-50">
                    <UploadCloud className="mb-2 h-8 w-8 text-[#378af9]" />

                    <span className="text-sm font-semibold text-gray-800">
                      {candidateData.resume
                        ? candidateData.resume.name
                        : "Click to upload resume"}
                    </span>

                    <span className="mt-1 text-xs text-gray-500">
                      PDF, DOC, DOCX allowed. Max size 5MB.
                    </span>

                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                      required
                      className="hidden"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#378af9] px-6 py-3 font-semibold text-white shadow-md shadow-blue-200/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#378af9] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

const HeroStat = ({ value, label }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="mt-1 text-xs font-medium text-gray-500">{label}</p>
    </div>
  );
};

const SectionHeader = ({ badge, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#378af9]">
        <Sparkles className="h-4 w-4" />
        {badge}
      </span>

      <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
        {title}
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-gray-500">{description}</p>

      <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-[#378af9]" />
    </motion.div>
  );
};

const BenefitCard = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#378af9]/40 hover:shadow-md"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-[#378af9]">
        {React.cloneElement(icon, { className: "h-5 w-5" })}
      </div>

      <h3 className="text-lg font-bold text-gray-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>
    </motion.div>
  );
};

const ProcessCard = ({ step, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#378af9]/40 hover:shadow-md"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#378af9] text-lg font-bold text-white">
        {step}
      </div>

      <h3 className="text-lg font-bold text-gray-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>

      <CheckCircle2 className="absolute right-6 top-6 h-5 w-5 text-[#378af9]" />
    </motion.div>
  );
};

const FormInput = ({ icon, label, ...props }) => {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        {React.cloneElement(icon, {
          className:
            "absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400",
        })}

        <input
          {...props}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 pl-11 text-gray-800 outline-none transition-colors focus:border-[#378af9] focus:ring-2 focus:ring-[#378af9]/20"
        />
      </div>
    </div>
  );
};

export default CareerPage;