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

            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-12 text-center">
              Sample <span className="text-neon-green italic">Highlight Reels</span>
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
      // On desktop we show 2 cards, so we adjust the scroll position
      // However, for a simple implementation, we'll just scroll to the index
      const scrollAmount = currentIndex * (cardWidth / (window.innerWidth >= 1024 ? 2 : 1));
      scrollContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <section className="relative py-24 bg-matte-black overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Left Content - 35% Width (UNCHANGED) */}
          <div className="lg:w-[35%] z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-[1px] bg-neon-green" />
                <span className="text-neon-green text-xs font-bold tracking-[0.2em] uppercase">
                  Real Player Feedback
                </span>
              </div>
              
              <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight tracking-tighter mb-8">
                Trusted by <span className="text-neon-green italic">370+ Players</span> & Sports Creators
              </h2>
              
              <p className="text-base text-white/50 leading-relaxed mb-12">
                Real Fiverr reviews from footballers and academy aspirants who trusted NextGoal Sports with their highlight reels for trials and social growth.
              </p>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: Star, text: "5-Star Fiverr Rating" },
                  { icon: CheckCircle2, text: "Football-Specific Editing" },
                  { icon: Play, text: "Social + Coach Ready" }
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon-green/30 transition-colors group">
                    <badge.icon className="w-4 h-4 text-neon-green group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold text-white/80">{badge.text}</span>
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
      label: "Before → After",
      type: "video",
      src: "https://res.cloudinary.com/dtrf1c2wm/video/upload/q_auto/f_auto/v1775667733/Before_after_fbb3cv.mp4",
      badge: "Transformation Proof"
    },
    {
      label: "Social Growth Reel",
      type: "video",
      src: "https://res.cloudinary.com/dtrf1c2wm/video/upload/q_auto/f_auto/v1775672653/Benjamin_%C5%A0e%C5%A1ko_Matchday_video_Vs_Eintracht_Frankfurt_football_soccer_gameday_matchday_xzlond.mp4",
      badge: "Instagram & TikTok Ready",
      isVertical: true
    },
    {
      label: "Coach Review",
      type: "youtube",
      src: "https://www.youtube.com/embed/ZJbOvWvvRKo",
      badge: "Tactical & Academy Ready"
    }
  ];

  return (
    <section id="samples" className="py-24 bg-matte-black border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl lg:text-6xl font-bold leading-tight tracking-tighter mb-6">
              See the <span className="text-neon-green italic">Transformation</span> Before You Order
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              From raw match clips to academy-ready, social-ready, and coach-ready highlight reels.
            </p>
          </motion.div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 relative overflow-hidden ${
                activeTab === index 
                  ? "bg-neon-green text-black shadow-[0_0_20px_rgba(204,255,0,0.4)]" 
                  : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Video Player Container */}
        <div className="max-w-5xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className={`relative group mx-auto ${tabs[activeTab].isVertical ? 'max-w-md' : 'w-full'}`}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-green/20 to-transparent rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <div className="relative bg-matte-black border border-neon-green/20 rounded-2xl overflow-hidden shadow-2xl">
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
                  
                  {/* Floating Badge */}
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
      </div>
    </section>
  );
};

const GoalSection = () => {
  const goals = [
    {
      title: "Academy Trials",
      description: "Stand out in academy trials with coach-ready reels that spotlight your best moments.",
      cta: "Build My Trial Reel",
      icon: Target
    },
    {
      title: "Personal Branding",
      description: "Turn your best moments into scroll-stopping social reels that grow your football identity.",
      cta: "Grow My Football Brand",
      icon: TrendingUp
    },
    {
      title: "Coach Review",
      description: "Tactical edits built to showcase decision-making, positioning, and football IQ.",
      cta: "Create My Coach Review",
      icon: Eye
    },
    {
      title: "Scholarship / Recruitment",
      description: "Professional reels structured for recruitment, scholarships, and serious football opportunities.",
      cta: "Prepare My Recruitment Reel",
      icon: GraduationCap
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-matte-black border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl lg:text-6xl font-bold leading-tight tracking-tighter mb-6">
              What’s Your <span className="text-neon-green italic">Football Goal</span> Right Now?
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Choose the reel style built for your next move.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {goals.map((goal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-green/20 to-transparent rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative h-full bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10 backdrop-blur-xl flex flex-col items-start hover:border-neon-green/30 transition-colors duration-500">
                <div className="w-14 h-14 rounded-xl bg-neon-green/10 flex items-center justify-center mb-8 group-hover:bg-neon-green/20 transition-colors">
                  <goal.icon className="w-7 h-7 text-neon-green" />
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-neon-green transition-colors">
                  {goal.title}
                </h3>
                
                <p className="text-white/50 leading-relaxed mb-10 flex-grow">
                  {goal.description}
                </p>
                
                <a 
                  href="https://wa.me/447480675324"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neon-green font-bold text-sm uppercase tracking-widest group/btn"
                >
                  <span>{goal.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-lg text-white/50 mb-8">
            Not sure which reel fits your football goal? Let’s help you choose.
          </p>
          <a 
            href="https://wa.me/447480675324"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-neon-green text-black font-black rounded-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(204,255,0,0.3)] hover:shadow-[0_0_50px_rgba(204,255,0,0.5)] group"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>
        </motion.div>
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
    // In a real app, this would send data to a backend or WhatsApp
    const message = `Hi NextGoal Sports, I'd like a custom quote.
Name: ${formData.name}
Position: ${formData.position}
Goal: ${formData.goal}
Footage Length: ${formData.length}
Link: ${formData.link}
Deadline: ${formData.deadline}
WhatsApp: ${formData.whatsapp}
Notes: ${formData.notes}`;
    
    window.open(`https://wa.me/447480675324?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="quote" className="py-24 bg-matte-black border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl lg:text-6xl font-bold leading-tight tracking-tighter mb-6">
              Let’s Plan Your <span className="text-neon-green italic">Perfect Highlight Reel</span>
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Send your footage details, football goal, and deadline. We’ll review everything personally on WhatsApp and send you the best custom quote.
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
                <span>Get My Custom Quote</span>
              </button>
            </form>
          </motion.div>

          {/* Right Side: WhatsApp Consultation Card */}
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
                  Need Help Before Sending Your Footage?
                </h3>
                
                <p className="text-white/50 leading-relaxed mb-10">
                  Message us directly on WhatsApp and we’ll help you choose the best reel style, format, and pricing package for your football goal.
                </p>
                
                <a 
                  href="https://wa.me/447480675324?text=Hi%20NextGoal%20Sports%2C%20I%20need%20help%20choosing%20the%20right%20highlight%20reel%20for%20my%20football%20goal."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-neon-green text-black font-black rounded-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(204,255,0,0.3)] hover:shadow-[0_0_50px_rgba(204,255,0,0.5)]"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Trust Badges in Consultation Column */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center gap-2">
                <Star className="w-6 h-6 text-neon-green fill-neon-green" />
                <span className="text-sm font-bold text-white">5-Star Rated</span>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-neon-green" />
                <span className="text-sm font-bold text-white">Expert Review</span>
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
    { name: 'Sample Reels', href: '#samples' },
    { name: 'How It Works', href: '#how-it-works' },
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
            Get Custom Quote
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
              Professional Football Highlight Reels for Trials, Coaches & Social Growth
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">
                Trusted by 370+ players worldwide
              </span>
            </div>
          </div>

          {/* Center Section */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-black text-white uppercase tracking-widest">Quick Links</h4>
            <nav className="flex flex-col gap-4">
              {[
                { name: 'Sample Reels', href: '#samples' },
                { name: 'How It Works', href: '#how-it-works' },
                { name: 'Get Custom Quote', href: '#quote' }
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
          <div className="space-y-6">
            <h4 className="text-sm font-black text-white uppercase tracking-widest">Consultation</h4>
            <p className="text-white/50 leading-relaxed">
              Need help before sending your footage?
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
                Trusted by serious footballers
              </span>
            </div>
            
            <h1 className="font-display text-5xl lg:text-8xl font-bold leading-[0.95] tracking-tighter mb-8">
              Turn Raw Match Footage<br />
              Into <span className="text-neon-green italic">Academy-Ready</span><br />
              Highlight Reels
            </h1>
            
            <p className="text-lg lg:text-xl text-white/50 leading-relaxed mb-12 max-w-xl">
              We help football players transform raw match clips into professional highlight reels for academy trials, coach review, scholarship showcases, and social media growth.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 mb-16">
              <a 
                href="https://wa.me/447480675324"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-5 bg-neon-green text-black font-black rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-3 group relative overflow-hidden shadow-[0_0_30px_rgba(204,255,0,0.4)] hover:shadow-[0_0_50px_rgba(204,255,0,0.6)]"
              >
                <span className="relative z-10">Get My Highlight Reel</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 border border-white/10"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-current ml-1" />
                </div>
                Watch Sample Reels
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-white/5">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-neon-green fill-neon-green" />
                  <span className="text-lg font-display font-bold text-white">5-Star</span>
                </div>
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Athlete Reviews</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-display font-bold text-white">370+</span>
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest leading-tight">Highlight Reels Delivered</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neon-green" />
                  <span className="text-lg font-display font-bold text-white">Social + Coach</span>
                </div>
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Ready Formats</span>
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
          href="https://wa.me/447480675324"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-5 bg-neon-green text-black font-black rounded-xl shadow-[0_0_30px_rgba(204,255,0,0.5)] active:scale-95 transition-transform flex items-center justify-center"
        >
          GET MY HIGHLIGHT REEL
        </a>
      </div>

      {/* Video Modal */}
      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* Transformation Section */}
      <TransformationSection />

      {/* Goal Section */}
      <GoalSection />

      {/* Quote Section */}
      <QuoteSection />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/447480675324"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 lg:bottom-8 right-8 z-[100] w-16 h-16 bg-neon-green text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(204,255,0,0.5)] cursor-pointer"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
      </motion.a>
    </div>
  );
}
