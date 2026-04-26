import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Play, ArrowRight, Star, CheckCircle2, X, ChevronLeft, ChevronRight, Target, TrendingUp, Eye, GraduationCap, MessageCircle, Send, Menu } from 'lucide-react';

const proofCards = [
  { id: 1, src: 'https://res.cloudinary.com/dtrf1c2wm/image/upload/v1775639982/Whisk_mvhztzkzty_y6dezt.jpg', label: 'Before / After' },
  { id: 2, src: 'https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775640602/Screenshot_2026-04-08_142336_pz9yoy.png', label: 'Matchday' },
  { id: 3, src: 'https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775641471/Whisk_13dfefeea4ec044a2a147b9837cb60dedr_to9dep.jpg', label: 'Passing Lane' },
  { id: 4, src: 'https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775640603/Screenshot_2026-04-08_142510_ouhioj.png', label: 'Player Info' },
  { id: 5, src: 'https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775641605/Whisk_3bb0ee59dc35034a06d4a5734fe67986dr_ndzxho.jpg', label: 'GK Save' },
  { id: 6, src: 'https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775641475/Whisk_9b38cb1efedf048a71b4e1810ab9399bdr_syee3l.jpg', label: 'Player Stats' },
  { id: 7, src: 'https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775641470/Whisk_1c34ad6697b54d89686407140e93b4fddr_xlp9ug.jpg', label: 'Academy Trial', type: 'title' },
  { id: 8, src: 'https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775641469/Whisk_b099ca808634a1e9e724f8d863bbaf69dr_oqyi8c.jpg', label: 'Vertical Reel', type: 'reel' },
  { id: 9, src: 'https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775642226/Whisk_e21c60e6ee3022283b64911149dbe1cfdr_jahvbd.jpg', label: 'Before vs After', type: 'split' },
  { id: 10, src: 'https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775642228/Whisk_ab8b63138089bf2847e41d89289173aedr_m4piik.jpg', label: 'Coach Review', type: 'widescreen' },
  { id: 11, src: 'https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775641603/Whisk_fba5747086dc5d196614f9c392f1d5a9dr_nsg2mb.jpg', label: 'Striker Shot', type: 'brand' },
  { id: 12, src: 'https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775641470/Whisk_5dea1be2e75d369a4f344097f349d78cdr_emmxvz.jpg', label: 'Goal Celebration' },
  { id: 13, src: 'https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775641471/Whisk_13dfefeea4ec044a2a147b9837cb60dedr_to9dep.jpg', label: 'Crossing Route' },
  { id: 14, src: 'https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775641603/Whisk_ec56a3a23690153b84c41f412830344bdr_q3xdze.jpg', label: 'Pressure Angle' },
  { id: 15, src: 'https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775641470/Whisk_bde09cddf2f488597a148195269053c6dr_hrmbrv.jpg', label: 'Spotlight Player' },
  { id: 16, src: 'https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775641469/Whisk_9a7cfaea0e20ab7a87b46eaed18232aadr_zzbj2p.jpg', label: 'Freeze Emphasis' },
];

const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const WhyPlayersFailSection = () => {
  const reasons = [
    {
      title: "Tactical Blindness",
      description: "Generic highlight reels show goals, but they don't show the tactical maturity scouts actually look for. You're showing the finish, but you're hiding the process.",
      icon: Eye
    },
    {
      title: "Zero Structural Authority",
      description: "Clubs receive thousands of videos. Within 15 seconds, a poorly structured edit tells them you aren't serious about your profession.",
      icon: Target
    },
    {
      title: "The Matchday Gap",
      description: "A mismatch between your social media presence and your matchday reality. Scouts want to see consistent, elite habits, not just a one-off flair clip.",
      icon: CheckCircle2
    }
  ];

  return (
    <section className="py-24 bg-matte-black border-y border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl lg:text-7xl font-bold leading-tight tracking-tighter mb-8 text-white">
              Why 99% of <span className="text-neon-green italic">Elite Aspirants</span> Fail to Get Scouted.
            </h2>
            <p className="text-xl lg:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed">
              Talent is rarely the bottleneck. <span className="text-white font-bold">Presentation is.</span> Most players treat their recruitment assets as social media content. Pro clubs treat them as professional resumes.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-red-500/30 transition-all group"
            >
              <reason.icon className="w-10 h-10 text-red-500 mb-8 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-4">{reason.title}</h3>
              <p className="text-white/40 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 text-lg font-bold text-neon-green uppercase tracking-widest animate-pulse"
        >
          You are likely making these mistakes right now.
        </motion.p>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

const SystemSection = () => {
  const steps = [
    {
      step: "01",
      title: "Raw Data Evaluation",
      description: "We don't just take your clips. We analyze your footage to identify your unique selling points that scouts for your specific position are hunting for."
    },
    {
      step: "02",
      title: "Impact Selection",
      description: "Filtering the noise. We select moments that demonstrate high-impact decision making and technical consistency over flashy but tactical-void plays."
    },
    {
      step: "03",
      title: "Tactical Optimization",
      description: "We annotate your footage to highlight movement, spatial awareness, and off-the-ball habits that separate pro-ready players from amateurs."
    },
    {
      step: "04",
      title: "Scout-First Structuring",
      description: "Formatted into the exact structure used by pro recruitment pipelines. No intros, no fillers—just the high-density evidence they need to pull the trigger."
    }
  ];

  return (
    <section id="system" className="py-24 bg-matte-black relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          <div className="lg:w-1/3 pt-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-40"
            >
              <span className="text-neon-green font-black uppercase tracking-widest text-xs mb-4 block">The NextGoal Framework</span>
              <h2 className="font-display text-5xl lg:text-7xl font-bold text-white leading-none mb-8">
                Not a Service. <br/> <span className="text-neon-green italic">A System.</span>
              </h2>
              <p className="text-white/50 text-xl leading-relaxed">
                Basic video editing is for YouTubers. We provide a structured recruitment preparation process designed to transition you from unseen to unstoppable.
              </p>
              <div className="mt-12 p-6 rounded-xl bg-neon-green/5 border border-neon-green/20">
                <p className="text-sm font-bold text-neon-green mb-2">Exclusivity Notice:</p>
                <p className="text-white/60 text-sm italic italic leading-relaxed">
                  "We do not work with every player who fits the budget. We work with players who have the work ethic to back up the footage."
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-10 rounded-3xl bg-white/[0.03] border border-white/10 relative group"
              >
                <div className="text-6xl font-display font-black text-white/5 group-hover:text-neon-green/10 transition-colors mb-4">{step.step}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-white/40 leading-relaxed">{step.description}</p>
                <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-4 h-4 text-neon-green fill-neon-green" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const VideoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const videos = [
    { id: 'lL6bXKvSu9A', title: 'Academy Trial Reel', label: 'Academy Trial' },
    { id: 'SOjSBSAKL2A', title: 'Social Media Player Reel', label: 'Social Media' },
    { id: 'ZJbOvWvvRKo', title: 'Coach Review Tactical Reel', label: 'Coach Review' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-matte-black border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-12 text-center text-white">
              Scouter-Ready <span className="text-neon-green italic">Profile Samples</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col gap-4"
                >
                  <div className="relative aspect-[9/16] md:aspect-video rounded-2xl overflow-hidden border border-neon-green/30 bg-white/5 shadow-lg group-hover:border-neon-green transition-colors">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="px-2">
                    <span className="text-xs font-black uppercase tracking-widest text-neon-green/60 group-hover:text-neon-green transition-colors">
                      {video.label}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">{video.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const reviewScreenshots = [
  "https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775646008/10_mtyhj7.png",
  "https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775646007/9_wj8pfh.png",
  "https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775646005/7_csr31b.png",
  "https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775646006/5_rdkhkj.png",
  "https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775646006/8_rehpjw.png",
  "https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775646005/3_kr6yim.png",
  "https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775646005/6_eehqhg.png",
  "https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775646005/4_htjdjm.png",
  "https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775646004/2_zi8kqb.png",
];

interface ReviewCardProps {
  src: string;
  index: number;
  key?: number | string;
}

const ReviewCard = ({ src, index }: ReviewCardProps) => {
  return (
    <div className="flex-shrink-0 w-full lg:w-[calc(50%-12px)] snap-center">
      <div className="relative w-full h-[120px] sm:h-[160px] lg:h-[280px] rounded-2xl overflow-hidden border border-white/10 bg-matte-black/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center p-4 group">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 via-transparent to-transparent opacity-50" />
        <div className="absolute inset-0 border border-neon-green/10 rounded-2xl pointer-events-none group-hover:border-neon-green/30 transition-colors duration-500" />
        <img
          src={src}
          alt={`Fiverr Review ${index + 1}`}
          className="w-full h-full object-contain relative z-10 hover:scale-[1.01] transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewScreenshots.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviewScreenshots.length) % reviewScreenshots.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      const scrollAmount = currentIndex * (cardWidth / (window.innerWidth >= 1024 ? 2 : 1));
      scrollContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <section className="relative py-24 bg-matte-black overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-24">
          
          <div className="lg:w-[35%] z-20 sticky top-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-[1px] bg-neon-green" />
                <span className="text-neon-green text-xs font-bold tracking-[0.2em] uppercase">
                  Recruitment Evidence
                </span>
              </div>
              
              <h2 className="font-display text-4xl lg:text-7xl font-bold leading-none tracking-tighter mb-8 text-white">
                Results Over <span className="text-neon-green italic">Hype.</span>
              </h2>
              
              <p className="text-xl text-white/50 leading-relaxed mb-12">
                We don't collect "reviews." we collect <span className="text-white font-bold">success stories.</span> From academy transitions to professional trial invitations, our system bridges the matchday gap.
              </p>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: Target, text: "U18 Agency Placements" },
                  { icon: Eye, text: "Direct Scout Engagement" },
                  { icon: CheckCircle2, text: "Elite Player Verified" }
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-3 p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-neon-green/30 transition-colors group">
                    <badge.icon className="w-5 h-5 text-neon-green group-hover:scale-110 transition-transform" />
                    <span className="text-base font-bold text-white/80">{badge.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Carousel (65% Width) */}
          <div className="lg:w-[65%] relative group"
               onMouseEnter={() => setIsPaused(true)}
               onMouseLeave={() => setIsPaused(false)}>
            
            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {reviewScreenshots.map((src, index) => (
                <ReviewCard key={index} src={src} index={index} />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-6 -right-6 justify-between pointer-events-none">
              <button 
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-matte-black/80 border border-white/10 flex items-center justify-center text-white hover:border-neon-green transition-colors pointer-events-auto backdrop-blur-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-matte-black/80 border border-white/10 flex items-center justify-center text-white hover:border-neon-green transition-colors pointer-events-auto backdrop-blur-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {reviewScreenshots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === i ? 'w-8 bg-neon-green' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-neon-green/5 to-transparent pointer-events-none" />
    </section>
  );
};

const TransformationSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: "U18 Academy Prep",
      type: "video",
      src: "https://res.cloudinary.com/dtrf1c2wm/video/upload/q_auto/f_auto/v1775667733/Before_after_fbb3cv.mp4",
      caseStudy: {
        player: "U18 Midfielder",
        problem: "Talent was unseen due to low-quality, unformatted match clips.",
        action: "Strategic position-led curation and tactical spotlighting.",
        result: "Secured Trial with Category-1 UK Academy."
      },
      badge: "Tactical Overhaul"
    },
    {
      label: "Pro Trial Showcase",
      type: "video",
      src: "https://res.cloudinary.com/dtrf1c2wm/video/upload/q_auto/f_auto/v1775672653/Benjamin_%C5%A0e%C5%A1ko_Matchday_video_Vs_Eintracht_Frankfurt_football_soccer_gameday_matchday_xzlond.mp4",
      caseStudy: {
        player: "Senior Striker",
        problem: "Struggling to get direct agent responses with standard reels.",
        action: "High-Calibre asset engineering focused on finishing efficiency.",
        result: "Direct agent engagement and 2 trial invites in Germany."
      },
      badge: "Elite Precision",
      isVertical: true
    },
    {
      label: "Scholarship Strategy",
      type: "youtube",
      src: "https://www.youtube.com/embed/ZJbOvWvvRKo",
      caseStudy: {
        player: "US College Aspirant",
        problem: "No centralized evidence of consistent technical ability.",
        action: "Data-led tactical profile focusing on consistency metrics.",
        result: "Awarded Full-Ride D1 Scholarship."
      },
      badge: "Scholarship Grade"
    }
  ];

  return (
    <section id="samples" className="py-24 bg-matte-black border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl lg:text-7xl font-bold leading-tight tracking-tighter mb-6 text-white">
              Tactical Case <span className="text-neon-green italic">Studies.</span>
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Real players. Real recruitment problems. Real strategic solutions.
            </p>
          </motion.div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 relative overflow-hidden ${
                activeTab === index 
                  ? "bg-neon-green text-black shadow-[0_0_20px_rgba(204,255,0,0.4)]" 
                  : "bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Case Study Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto">
          {/* Left: Video */}
          <div className="lg:col-span-7 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className={`relative group mx-auto ${tabs[activeTab].isVertical ? 'max-w-sm' : 'w-full'}`}
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-neon-green/20 to-transparent rounded-[32px] blur opacity-25" />
                <div className="relative bg-matte-black border border-neon-green/20 rounded-3xl overflow-hidden shadow-2xl">
                  <div className={`${tabs[activeTab].isVertical ? 'aspect-[9/16]' : 'aspect-video'} w-full relative`}>
                    {tabs[activeTab].type === 'video' ? (
                      <video
                        key={tabs[activeTab].src}
                        src={tabs[activeTab].src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <iframe
                        src={`${tabs[activeTab].src}?autoplay=1&mute=1`}
                        title={tabs[activeTab].label}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                    
                    <div className="absolute top-6 left-6 z-10">
                      <span className="px-4 py-2 bg-black/80 backdrop-blur-md text-neon-green border border-neon-green/30 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        {tabs[activeTab].badge}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Data/Details */}
          <div className="lg:col-span-5 space-y-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-neon-green/10 border border-neon-green/20 rounded-xl text-neon-green text-xs font-black uppercase tracking-widest">
                    {tabs[activeTab].caseStudy.player}
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { label: "The Problem", text: tabs[activeTab].caseStudy.problem, icon: X, color: "text-red-500" },
                    { label: "The Strategy", text: tabs[activeTab].caseStudy.action, icon: Target, color: "text-neon-green" },
                    { label: "The Result", text: tabs[activeTab].caseStudy.result, icon: Star, color: "text-white" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-colors">
                      <div className={`mt-1 ${item.color}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-white/40 mb-2">{item.label}</h4>
                        <p className="text-white/80 font-bold leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a 
                  href="#quote"
                  className="inline-flex items-center gap-3 px-8 py-5 bg-neon-green text-black font-black rounded-2xl hover:scale-[1.03] transition-all shadow-lg group"
                >
                  <span>Apply for Similar Result</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const PathsSection = () => {
  return (
    <section id="paths" className="py-32 bg-matte-black border-t border-white/5 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl lg:text-8xl font-bold text-white leading-none mb-8">
              Two Paths. <br/> <span className="text-neon-green italic">One Goal.</span>
            </h2>
            <p className="text-xl text-white/50">Choose the trajectory that fits your current ambition.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Option 1: Basic */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="p-12 rounded-[40px] bg-white/[0.02] border border-white/10 flex flex-col items-center text-center group"
          >
            <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-white/10 transition-colors">
              <Play className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-display font-bold text-white mb-6">High-Impact Highlights</h3>
            <p className="text-white/40 text-lg leading-relaxed mb-12">
              For players who have elite footage and simply need professional, scout-friendly editing to stand out on social media and agency messages.
            </p>
            <ul className="space-y-4 mb-12 text-left w-full max-w-xs mx-auto">
              {["Full HD Editing", "Tactical Spotlight", "Position-Specific Format", "48-72h Delivery"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/60">
                  <CheckCircle2 className="w-4 h-4 text-neon-green" />
                  <span className="text-sm font-bold">{item}</span>
                </li>
              ))}
            </ul>
            <a 
              href="https://wa.me/447480675324?text=I'm%20ready%20to%20get%20my%20highlights%20edited."
              className="px-12 py-5 rounded-2xl bg-white/10 text-white font-black hover:bg-white/20 transition-all uppercase tracking-widest text-sm"
            >
              Get My Highlights
            </a>
          </motion.div>

          {/* Option 2: Premium */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="p-12 rounded-[40px] bg-neon-green/5 border-2 border-neon-green/50 flex flex-col items-center text-center relative group"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neon-green text-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(204,255,0,0.5)]">
              Most Selected
            </div>
            <div className="w-20 h-20 rounded-3xl bg-neon-green/10 flex items-center justify-center mb-10 group-hover:bg-neon-green/20 transition-colors">
              <Target className="w-8 h-8 text-neon-green" />
            </div>
            <h3 className="text-3xl font-display font-bold text-white mb-6">Recruitment Program</h3>
            <p className="text-white/60 text-lg leading-relaxed mb-12">
              For serious players who want a full strategic overhaul. Includes data-led consulting and a complete recruitment asset vault.
            </p>
            <ul className="space-y-4 mb-12 text-left w-full max-w-xs mx-auto">
              {["Strategic Asset Audit", "Scout-First Formatting", "Data-Led Player Resume", "Agency Introduction Support"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white">
                  <Star className="w-4 h-4 text-neon-green fill-neon-green" />
                  <span className="text-sm font-bold">{item}</span>
                </li>
              ))}
            </ul>
            <a 
              href="#quote"
              className="px-12 py-5 rounded-2xl bg-neon-green text-black font-black hover:scale-105 transition-all uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(204,255,0,0.3)]"
            >
              Apply for Program
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const QuoteSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    goal: '',
    length: '',
    link: '',
    deadline: '',
    whatsapp: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `ELITE RECRUITMENT APPLICATION:
Name: ${formData.name}
Position: ${formData.position}
Primary Goal: ${formData.goal}
Footage Scope: ${formData.length}
Evidence Link: ${formData.link}
Trial Deadline: ${formData.deadline}
WhatsApp: ${formData.whatsapp}
Strategic Notes: ${formData.notes}`;
    
    window.open(`https://wa.me/447480675324?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="quote" className="py-24 bg-matte-black border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Waitlist Active</span>
            </div>
            <h2 className="font-display text-4xl lg:text-7xl font-bold leading-tight tracking-tighter mb-6 text-white">
              Apply for <span className="text-neon-green italic">Selection.</span>
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              We do not work with every player. We only accept athletes who exhibit a clear professional trajectory and possess sufficient match evidence for tactical analysis.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          {/* Left Side: Lead Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10 backdrop-blur-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-green/50 focus:outline-none transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Playing Position</label>
                  <input
                    required
                    type="text"
                    placeholder="Striker / CB"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-green/50 focus:outline-none transition-colors"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Main Goal</label>
                  <input
                    required
                    type="text"
                    placeholder="Academy Trial / Social"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-green/50 focus:outline-none transition-colors"
                    value={formData.goal}
                    onChange={(e) => setFormData({...formData, goal: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Approx Footage Length</label>
                  <input
                    required
                    type="text"
                    placeholder="15 mins / 3 matches"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-green/50 focus:outline-none transition-colors"
                    value={formData.length}
                    onChange={(e) => setFormData({...formData, length: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Footage Link (Drive/Dropbox/YouTube)</label>
                <input
                  required
                  type="url"
                  placeholder="https://..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-green/50 focus:outline-none transition-colors"
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Trial / Posting Deadline</label>
                  <input
                    required
                    type="date"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-green/50 focus:outline-none transition-colors [color-scheme:dark]"
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">WhatsApp Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="+44..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-green/50 focus:outline-none transition-colors"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Notes / Special Requests (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Any specific moments or music style?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-green/50 focus:outline-none transition-colors resize-none"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-neon-green text-black font-black rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.3)] hover:shadow-[0_0_50px_rgba(204,255,0,0.5)]"
              >
                <Send className="w-5 h-5" />
                <span>Submit Application</span>
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-green/20 to-transparent rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-neon-green/10 flex items-center justify-center mb-8">
                  <MessageCircle className="w-7 h-7 text-neon-green" />
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  Elite Consultation
                </h3>
                
                <p className="text-white/50 leading-relaxed mb-10">
                  Discuss your current career trajectory. We help you choose the recruitment profile path that aligns with your professional aspirations.
                </p>
                
                <a 
                  href="https://wa.me/447480675324?text=Hi%20NextGoal%20Sports%2C%20I'm%20a%20Tier-1%20player%20interested%20in%20Elite%20Recruitment%20Preparation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-neon-green text-black font-black rounded-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(204,255,0,0.3)] hover:shadow-[0_0_50px_rgba(204,255,0,0.5)]"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Direct Agency Chat</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center gap-2">
                <Star className="w-6 h-6 text-neon-green fill-neon-green" />
                <span className="text-sm font-bold text-white">Pro Standard</span>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-neon-green" />
                <span className="text-sm font-bold text-white">Scout Verified</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Navbar = ({ onOpenQuote }: { onOpenQuote: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Assets', href: '#samples' },
    { name: 'The System', href: '#system' },
    { name: 'Paths', href: '#paths' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled 
          ? 'h-24 lg:h-32 bg-black/95 backdrop-blur-2xl border-b border-neon-green/30 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(204,255,0,0.1)]' 
          : 'h-32 lg:h-48 bg-black/40 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="container mx-auto h-full px-4 lg:px-8 flex items-center justify-between">
        <a href="#" className="relative z-[110] flex-shrink-0">
          <img 
            src="https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775676293/Light_Gray_Leaf_Minimalism_Curved_Text_Logo_pl3idr.png" 
            alt="NextGoal Sports Logo" 
            className={`w-auto object-contain transition-all duration-500 ${
              isScrolled 
                ? 'h-[60px] md:h-[80px] lg:h-[100px]' 
                : 'h-[100px] md:h-[140px] lg:h-[180px]'
            }`}
          />
        </a>

        {/* Center: Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-white/70 hover:text-neon-green transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.5)]"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right: Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <a 
            href="https://wa.me/447480675324"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full text-sm font-bold text-white/80 hover:text-white border border-white/10 hover:border-neon-green/50 transition-all duration-300"
          >
            WhatsApp
          </a>
          <a 
            href="#quote"
            className="px-6 py-2.5 rounded-full text-sm font-black bg-neon-green text-black shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] hover:scale-105 transition-all duration-300"
          >
            Apply Now
          </a>
        </div>

        {/* Mobile: WhatsApp Icon + Hamburger */}
        <div className="lg:hidden flex items-center gap-4 relative z-[110]">
          <a 
            href="https://wa.me/447480675324"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-neon-green/10 border border-neon-green/20 flex items-center justify-center text-neon-green"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
          </a>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-matte-black/98 backdrop-blur-2xl z-[105] pt-32 px-8"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-display font-bold text-white hover:text-neon-green transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-[1px] bg-white/10 w-full my-4" />
              <a 
                href="#quote"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-5 rounded-2xl bg-neon-green text-black font-black text-center text-lg shadow-[0_0_30px_rgba(204,255,0,0.4)]"
              >
                Get Custom Quote
              </a>
              <a 
                href="https://wa.me/447480675324"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-center text-lg"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="relative mt-[72px] bg-black/80 backdrop-blur-xl border-t border-neon-green/20 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 mb-16">
          {/* Left Section */}
          <div className="space-y-6">
            <img 
              src="https://res.cloudinary.com/dtrf1c2wm/image/upload/q_auto/f_auto/v1775676293/Light_Gray_Leaf_Minimalism_Curved_Text_Logo_pl3idr.png" 
              alt="NextGoal Sports Logo" 
              className="h-[100px] md:h-[140px] lg:h-[180px] w-auto object-contain"
            />
            <p className="text-white/50 leading-relaxed max-w-sm">
              The Strategic Choice for Football Recruitment Preparation. Elite Standards for Pro Clubs & Scouts.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">
                Exclusively Supporting Tier-1 Talent
              </span>
            </div>
          </div>

          {/* Center Section */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-black text-white uppercase tracking-widest">Agency Links</h4>
            <nav className="flex flex-col gap-4">
              {[
                { name: 'Scout-Ready Profiles', href: '#samples' },
                { name: 'Recruitment Process', href: '#how-it-works' },
                { name: 'Apply Now', href: '#quote' }
              ].map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-white/50 hover:text-neon-green transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.5)] w-fit"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Section */}
          <div className="space-y-6 text-white">
            <h4 className="text-sm font-black uppercase tracking-widest">Tier-1 Consultation</h4>
            <p className="text-white/50 leading-relaxed">
              Serious about recruitment? Apply for a career assessment.
            </p>
            <a 
              href="https://wa.me/447480675324"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-neon-green text-black font-black rounded-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(204,255,0,0.3)] hover:shadow-[0_0_50px_rgba(204,255,0,0.5)]"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-xs font-bold text-white/20 uppercase tracking-[0.2em]">
            © 2025 NextGoal Sports. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [gridItems, setGridItems] = useState(proofCards);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGridItems((prev) => shuffleArray(prev));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-matte-black selection:bg-neon-green selection:text-black font-sans overflow-x-hidden">
      <Navbar onOpenQuote={() => {}} />
      
      {/* Stadium Glow Effect */}
      <div className="fixed inset-0 stadium-glow pointer-events-none opacity-40" />
      
      {/* Premium Branding Accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green/30 to-transparent" />

      <main className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between min-h-screen pt-48 lg:pt-64 pb-12 lg:pb-0 gap-12 lg:gap-24">
        
        {/* Left Content */}
        <div className="flex-1 max-w-2xl order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[1px] bg-neon-green" />
              <span className="text-neon-green text-xs font-bold tracking-[0.2em] uppercase">
                Football Recruitment Strategy Agency
              </span>
            </div>
            
            <h1 className="font-display text-4xl lg:text-7xl font-bold leading-[0.9] tracking-tighter mb-8 text-white">
              We Don't Edit Videos.<br />
              We Prepare <span className="text-neon-green italic">Athletes</span><br />
              for Pro Trials.
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/50 leading-relaxed mb-12 max-w-xl">
              Stop sending raw footage that scouts ignore. We strategically engineer your match highlights into recruitment assets that command professional attention.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 mb-16">
              <a 
                href="#quote"
                className="w-full sm:w-auto px-12 py-6 bg-neon-green text-black font-black rounded-2xl hover:scale-[1.03] transition-all flex items-center justify-center gap-3 group relative overflow-hidden shadow-[0_0_40px_rgba(204,255,0,0.4)] hover:shadow-[0_0_60px_rgba(204,255,0,0.6)]"
              >
                <span className="relative z-10 text-lg">Apply for Evaluation</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
              </a>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-12 py-6 bg-white/[0.03] hover:bg-white/[0.08] text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 border border-white/10 group"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-neon-green/10 group-hover:text-neon-green transition-colors">
                  <Play className="w-4 h-4 fill-current ml-1" />
                </div>
                <span className="text-lg">View Scouter Samples</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-white/5">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-neon-green fill-neon-green" />
                  <span className="text-lg font-display font-bold text-white">Tier-1</span>
                </div>
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest text-white">Elite Standard</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-display font-bold text-white">370+</span>
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest leading-tight text-white">Recruitment Profiles Built</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neon-green" />
                  <span className="text-lg font-display font-bold text-white">Scout-Ready</span>
                </div>
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest text-white">Pro Club Formats</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Shuffle Grid */}
        <div className="flex-1 w-full max-w-[700px] aspect-square order-2 lg:order-2">
          <div className="grid grid-cols-4 grid-rows-4 gap-4 h-full">
            <AnimatePresence mode="popLayout">
              {gridItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 35,
                    duration: 0.6
                  }}
                  className={`relative group cursor-pointer overflow-hidden rounded-2xl bg-white/5 border border-white/10 shadow-2xl ${
                    item.type === 'reel' ? 'ring-2 ring-neon-green/40' : ''
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Specific Card Types */}
                  {item.type === 'reel' && (
                    <div className="absolute top-2 right-2 bg-neon-green text-black px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter">
                      Reel Preview
                    </div>
                  )}
                  {item.type === 'stats' && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-2">
                      <div className="w-full h-full border border-neon-green/30 rounded-lg flex flex-col items-center justify-center gap-1">
                        <span className="text-[10px] font-black text-neon-green">PACE 94</span>
                        <span className="text-[10px] font-black text-white">SHOT 88</span>
                      </div>
                    </div>
                  )}
                  {item.type === 'split' && (
                    <div className="absolute inset-0 flex">
                      <div className="flex-1 border-r border-white/20 bg-black/20 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white/60">RAW</span>
                      </div>
                      <div className="flex-1 bg-neon-green/5 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-neon-green">EDIT</span>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neon-green">
                        {item.label}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Sticky Mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-matte-black/90 backdrop-blur-2xl border-t border-white/10 z-50">
        <a 
          href="#quote"
          className="w-full py-5 bg-neon-green text-black font-black rounded-xl shadow-[0_0_30px_rgba(204,255,0,0.5)] active:scale-95 transition-transform flex items-center justify-center"
        >
          APPLY FOR A PROFILE
        </a>
      </div>

      {/* Video Modal */}
      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <WhyPlayersFailSection />

      <SystemSection />

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* Transformation Section */}
      <TransformationSection />

      <PathsSection />

      {/* Quote Section */}
      <QuoteSection />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <motion.a
        href="#quote"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 lg:bottom-8 right-8 z-[100] w-16 h-16 bg-neon-green text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(204,255,0,0.5)] cursor-pointer"
      >
        <TrendingUp className="w-8 h-8" />
      </motion.a>
    </div>
  );
}
