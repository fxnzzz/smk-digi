import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ChevronDown, Monitor, Cpu, PenTool, 
  Briefcase, Users, Award, BookOpen, ChevronRight, 
  Plus, Edit2, Trash2, Check, X as CloseIcon, BarChart3,
  MapPin, Phone, Mail, GraduationCap
} from 'lucide-react';

// --- DATA ---
const INITIAL_STUDENTS = [
  { id: 1, name: 'Ahmad Faisal', kelas: 'X PPLG', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
  { id: 2, name: 'Siti Nurhaliza', kelas: 'XI TJKT', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
  { id: 3, name: 'Budi Santoso', kelas: 'XII DKV', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
  { id: 4, name: 'Rina Wijaya', kelas: 'X MPLB', status: 'Lulus', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
  { id: 5, name: 'Dedi Irawan', kelas: 'XI PPLG', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' }
];

const TEACHERS = [
  { name: 'Dr. Andi Pratama', role: 'Kepala Program PPLG', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { name: 'Sari Indah, M.Kom', role: 'Guru Senior TJKT', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { name: 'Bambang Sugiono, S.Sn', role: 'Instruktur DKV', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
];

const MAJORS = [
  { id: 'pplg', title: 'Pengembangan Perangkat Lunak & Gim', icon: Monitor, desc: 'Fokus pada pemrograman, pengembangan web, aplikasi mobile, dan pembuatan game interaktif.', color: 'bg-slate-50 text-slate-700' },
  { id: 'tjkt', title: 'Teknik Jaringan Komputer & Telekomunikasi', icon: Cpu, desc: 'Mempelajari infrastruktur jaringan, administrasi server, keamanan siber, dan telekomunikasi.', color: 'bg-slate-50 text-slate-700' },
  { id: 'dkv', title: 'Desain Komunikasi Visual', icon: PenTool, desc: 'Mengasah kreativitas dalam desain grafis, ilustrasi, tipografi, fotografi, dan videografi.', color: 'bg-slate-50 text-slate-700' },
  { id: 'mplb', title: 'Manajemen Perkantoran & Layanan Bisnis', icon: Briefcase, desc: 'Membekali keahlian administrasi, manajemen arsip, korespondensi, dan layanan pelanggan.', color: 'bg-slate-50 text-slate-700' }
];

// --- COMPONENTS ---

const SectionHeading = ({ title, subtitle, centered = false }) => (
  <div className={`mb-16 max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-slate-500 font-semibold tracking-widest uppercase text-xs mb-3 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight leading-tight"
    >
      {title}
    </motion.h2>
  </div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.98, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.98, opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-md shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200"
        >
          <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-xl font-semibold text-slate-900 tracking-tight">{title}</h3>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-sm transition-colors">
              <CloseIcon size={18} />
            </button>
          </div>
          <div className="p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // Modals state
  const [activeModal, setActiveModal] = useState(null); 
  
  // Student Data State
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', kelas: 'X PPLG', status: 'Aktif' });

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      setActiveDropdown(null);
    }
  };

  // Student CRUD Logic
  const handleEditChange = (e, field) => setEditFormData({ ...editFormData, [field]: e.target.value });
  
  const saveEdit = (id) => {
    setStudents(students.map(s => s.id === id ? { ...s, ...editFormData } : s));
    setEditingId(null);
  };

  const startEdit = (student) => {
    setEditingId(student.id);
    setEditFormData(student);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const addStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name) return;
    const student = {
      ...newStudent,
      id: Date.now(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newStudent.name)}&background=random`
    };
    setStudents([...students, student]);
    setIsAddModalOpen(false);
    setNewStudent({ name: '', kelas: 'X PPLG', status: 'Aktif' });
  };

  // Chart Logic 
  const chartData = useMemo(() => {
    const counts = { PPLG: 0, TJKT: 0, DKV: 0, MPLB: 0 };
    students.forEach(s => {
      const prog = s.kelas.split(' ')[1];
      if (counts[prog] !== undefined) counts[prog]++;
    });
    const max = Math.max(...Object.values(counts), 1);
    return Object.entries(counts).map(([name, count]) => ({
      name, count, percentage: (count / max) * 100
    }));
  }, [students]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-600 selection:bg-slate-200 selection:text-slate-900">
      
      {/* NAVBAR */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('beranda')}>
              <div className={`w-9 h-9 rounded-sm flex items-center justify-center transition-colors ${isScrolled ? 'bg-slate-900' : 'bg-white/10 backdrop-blur-sm border border-white/20'}`}>
                <GraduationCap className={isScrolled ? 'text-white w-5 h-5' : 'text-white w-5 h-5'} />
              </div>
              <span className={`text-xl font-semibold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                SMK Negeri 1
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('beranda')} className={`text-sm font-medium transition-colors hover:opacity-70 ${isScrolled ? 'text-slate-600' : 'text-slate-200'}`}>Beranda</button>
              
              {/* Dropdown Profil */}
              <div className="relative group" onMouseEnter={() => setActiveDropdown('profil')} onMouseLeave={() => setActiveDropdown(null)}>
                <button className={`flex items-center gap-1 text-sm font-medium transition-colors hover:opacity-70 ${isScrolled ? 'text-slate-600' : 'text-slate-200'}`}>
                  Profil <ChevronDown size={14} className="mt-0.5" />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'profil' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-slate-200 overflow-hidden"
                    >
                      <button onClick={() => scrollToSection('visi-misi')} className="block w-full text-left px-5 py-3.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors border-b border-slate-50">Visi & Misi</button>
                      <button className="block w-full text-left px-5 py-3.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors border-b border-slate-50">Sejarah Institusi</button>
                      <button className="block w-full text-left px-5 py-3.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">Struktur Organisasi</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={() => scrollToSection('program-keahlian')} className={`text-sm font-medium transition-colors hover:opacity-70 ${isScrolled ? 'text-slate-600' : 'text-slate-200'}`}>Program Keahlian</button>
              <button onClick={() => scrollToSection('manajemen-siswa')} className={`text-sm font-medium transition-colors hover:opacity-70 ${isScrolled ? 'text-slate-600' : 'text-slate-200'}`}>Portal Siswa</button>
              <button onClick={() => scrollToSection('kontak')} className={`text-sm font-medium transition-colors hover:opacity-70 ${isScrolled ? 'text-slate-600' : 'text-slate-200'}`}>Kontak</button>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 -mr-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className={isScrolled ? 'text-slate-900' : 'text-white'} /> : <Menu className={isScrolled ? 'text-slate-900' : 'text-white'} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-t border-slate-200 overflow-hidden"
            >
              <div className="flex flex-col py-4 px-6 gap-2">
                <button onClick={() => scrollToSection('beranda')} className="text-left text-slate-800 font-medium py-3 border-b border-slate-50">Beranda</button>
                <div className="pl-4 py-2 flex flex-col gap-3 border-b border-slate-50">
                  <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Profil Institusi</span>
                  <button onClick={() => scrollToSection('visi-misi')} className="text-left text-slate-600 text-sm">Visi & Misi</button>
                  <button className="text-left text-slate-600 text-sm">Sejarah Institusi</button>
                </div>
                <button onClick={() => scrollToSection('program-keahlian')} className="text-left text-slate-800 font-medium py-3 border-b border-slate-50">Program Keahlian</button>
                <button onClick={() => scrollToSection('manajemen-siswa')} className="text-left text-slate-800 font-medium py-3">Portal Siswa</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section id="beranda" className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0 bg-slate-900">
          <img 
            src="https://i.ibb.co.com/tTbm9z48/unnamed.jpg" 
            alt="School Campus" 
            className="w-full h-full object-cover object-center"
          />
          {/* Refined Cinematic Overlays */}
          <div className="absolute inset-0 bg-slate-950/75 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <span className="inline-block py-1.5 px-4 rounded-sm bg-white/5 text-white/90 text-xs font-semibold tracking-widest uppercase border border-white/10 mb-8 backdrop-blur-md">
                Portal Informasi Akademik
              </span>
              <h1 className="text-4xl md:text-6xl font-semibold text-white tracking-tight leading-[1.15] mb-6">
                Sistem Manajemen <br/>
                <span className="text-slate-300">Data Pendidikan.</span>
              </h1>
              <p className="text-lg text-slate-300 mb-10 max-w-2xl leading-relaxed font-light">
                Platform digital terintegrasi untuk administrasi akademik. Menghadirkan tata kelola data yang presisi, terstruktur, dan berorientasi pada masa depan.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => scrollToSection('program-keahlian')} className="px-7 py-3.5 bg-blue-800 hover:bg-blue-900 text-white rounded-md font-medium transition-colors shadow-sm flex items-center gap-2">
                  Jelajahi Program <ChevronRight size={18} />
                </button>
                <button onClick={() => scrollToSection('visi-misi')} className="px-7 py-3.5 bg-transparent hover:bg-white/10 text-white backdrop-blur-md rounded-md font-medium transition-colors border border-white/20">
                  Profil Institusi
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VISI & MISI SECTION */}
      <section id="visi-misi" className="py-28 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative border-l-4 border-blue-800 pl-8 lg:pl-12 py-4"
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6 tracking-tight">Visi Institusi</h2>
              <p className="text-xl leading-relaxed text-slate-600 font-light">
                "Menjadi lembaga pendidikan vokasi yang berkarakter, berstandar mutu tinggi, dan responsif terhadap perkembangan teknologi global."
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-10 md:p-12 border border-slate-200 rounded-md shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-slate-900 mb-8 flex items-center gap-3">
                <Award className="text-blue-800" size={24} /> Misi Strategis
              </h2>
              <ul className="space-y-6 mb-8">
                {[
                  'Menyelenggarakan pendidikan berbasis kompetensi dan adaptasi teknologi terkini.',
                  'Mengembangkan budaya akademik yang disiplin, profesional, dan beretika.',
                  'Memperluas sinergi strategis dengan Dunia Usaha dan Dunia Industri (DUDI).'
                ].map((misi, idx) => (
                  <li key={idx} className="flex gap-4 text-slate-600 items-start">
                    <span className="text-blue-800 font-semibold text-sm mt-0.5 w-6 shrink-0">0{idx + 1}.</span>
                    <span className="leading-relaxed">{misi}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setActiveModal('misi')}
                className="text-slate-900 font-semibold text-sm hover:text-blue-800 transition-colors flex items-center gap-2 group mt-8 pt-6 border-t border-slate-100 w-full"
              >
                Baca Selengkapnya 
                <span className="group-hover:translate-x-1 transition-transform"><ChevronRight size={16}/></span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROGRAM KEAHLIAN */}
      <section id="program-keahlian" className="py-28 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeading title="Program Keahlian" subtitle="Akademik" centered />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MAJORS.map((major, idx) => (
              <motion.div 
                key={major.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white rounded-md p-8 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col h-full"
              >
                <div className={`w-12 h-12 rounded-sm ${major.color} flex items-center justify-center mb-6`}>
                  <major.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4 leading-snug">{major.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">{major.desc}</p>
                <button 
                  onClick={() => setActiveModal(major.id)}
                  className="mt-auto inline-flex w-fit items-center text-sm font-semibold text-slate-800 hover:text-blue-800 transition-colors"
                >
                  Detail Program <ChevronRight size={16} className="ml-1" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATISTIK & MENTOR (Split Layout) */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-28">
            
            {/* Left: Statistik */}
            <div>
              <SectionHeading title="Data Demografi" subtitle="Statistik Akademik" />
              <div className="bg-slate-950 rounded-md p-10 text-white relative overflow-hidden border border-slate-800 shadow-xl shadow-slate-900/10">
                <div className="flex items-center gap-5 mb-12 relative z-10">
                  <div className="p-3 bg-white/5 rounded-sm border border-white/10"><Users className="text-slate-300" size={24} /></div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold tracking-widest uppercase mb-1">Total Peserta Didik</div>
                    <div className="text-4xl font-semibold tracking-tight">{students.length * 150} <span className="text-lg font-normal text-slate-500">Siswa Aktif</span></div>
                  </div>
                </div>

                <div className="space-y-7 relative z-10">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
                    <BarChart3 size={14} /> Distribusi Program
                  </h4>
                  {chartData.map((data, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-2.5">
                        <span className="font-medium text-slate-300">{data.name}</span>
                        <span className="text-slate-400 font-mono text-xs">{data.count * 150}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-sm overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} whileInView={{ width: `${data.percentage}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-slate-400 rounded-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Mentor */}
            <div>
              <SectionHeading title="Tenaga Pendidik" subtitle="Fasilitator" />
              <div className="space-y-4">
                {TEACHERS.map((teacher, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-6 p-5 rounded-md hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                  >
                    <img src={teacher.image} alt={teacher.name} className="w-16 h-16 rounded-full object-cover border border-slate-200" />
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900">{teacher.name}</h4>
                      <p className="text-slate-500 text-sm mt-0.5">{teacher.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MANAJEMEN SISWA (Table) */}
      <section id="manajemen-siswa" className="py-28 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <SectionHeading title="Manajemen Siswa" subtitle="Administrasi Data" />
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-md font-medium transition-colors text-sm flex items-center gap-2 flex-shrink-0 shadow-sm"
            >
              <Plus size={18} /> Tambah Data Baru
            </button>
          </div>

          <div className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200">
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider w-16">No</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Profil</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Siswa</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Kelas</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <AnimatePresence>
                    {students.map((student, index) => (
                      <motion.tr 
                        key={student.id}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="py-4 px-6 text-sm text-slate-400 font-mono">{index + 1}</td>
                        <td className="py-4 px-6">
                          <img src={student.avatar} alt={student.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                        </td>
                        <td className="py-4 px-6 font-medium text-slate-800 text-sm">
                          {editingId === student.id ? (
                            <input 
                              type="text" value={editFormData.name} onChange={(e) => handleEditChange(e, 'name')}
                              className="border border-slate-300 rounded-sm px-3 py-1.5 w-full text-sm focus:outline-none focus:border-slate-500"
                            />
                          ) : student.name}
                        </td>
                        <td className="py-4 px-6">
                          {editingId === student.id ? (
                            <select 
                              value={editFormData.kelas} onChange={(e) => handleEditChange(e, 'kelas')}
                              className="border border-slate-300 rounded-sm px-3 py-1.5 w-full text-sm focus:outline-none focus:border-slate-500 bg-white"
                            >
                              <option>X PPLG</option><option>XI PPLG</option><option>XII PPLG</option>
                              <option>X TJKT</option><option>XI TJKT</option><option>XII TJKT</option>
                              <option>X DKV</option><option>X MPLB</option>
                            </select>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                              {student.kelas}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                           {editingId === student.id ? (
                             <select 
                              value={editFormData.status} onChange={(e) => handleEditChange(e, 'status')}
                              className="border border-slate-300 rounded-sm px-3 py-1.5 w-full text-sm focus:outline-none focus:border-slate-500 bg-white"
                            >
                              <option>Aktif</option><option>Lulus</option><option>Pindah</option>
                            </select>
                           ) : (
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-medium border ${
                              student.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                              student.status === 'Lulus' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}>
                              {student.status}
                            </span>
                           )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          {editingId === student.id ? (
                            <div className="flex justify-end gap-1">
                              <button onClick={() => saveEdit(student.id)} className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-sm transition-colors"><Check size={16} /></button>
                              <button onClick={() => setEditingId(null)} className="p-1.5 text-slate-400 hover:bg-slate-200 rounded-sm transition-colors"><X size={16} /></button>
                            </div>
                          ) : (
                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => startEdit(student)} className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-sm transition-colors" title="Edit"><Edit2 size={16} /></button>
                              <button onClick={() => deleteStudent(student.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-sm transition-colors" title="Hapus"><Trash2 size={16} /></button>
                            </div>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  {students.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-slate-400 text-sm">Tidak ada data siswa yang ditemukan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="kontak" className="bg-slate-950 pt-20 pb-10 border-t border-slate-900">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-sm bg-white/10 flex items-center justify-center border border-white/20">
                  <GraduationCap className="text-white w-4 h-4" />
                </div>
                <span className="text-lg font-semibold tracking-tight text-white">SMK Negeri 1</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
                Institusi pendidikan vokasi berstandar mutu yang berkomitmen membangun tata kelola akademik profesional berbasis teknologi masa depan.
              </p>
              <div className="space-y-3 text-sm text-slate-400">
                <div className="flex items-start gap-3"><MapPin size={16} className="text-slate-500 mt-0.5 flex-shrink-0" /> Jl. Pendidikan No. 123, Ciamis, Jawa Barat</div>
                <div className="flex items-center gap-3"><Phone size={16} className="text-slate-500 flex-shrink-0" /> (0265) 123456</div>
                <div className="flex items-center gap-3"><Mail size={16} className="text-slate-500 flex-shrink-0" /> akademik@smkn1.sch.id</div>
              </div>
            </div>

            <div>
              <h4 className="text-slate-100 font-semibold mb-6 uppercase tracking-widest text-xs">Informasi Publik</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><button onClick={() => scrollToSection('beranda')} className="hover:text-white transition-colors">Beranda</button></li>
                <li><button onClick={() => scrollToSection('visi-misi')} className="hover:text-white transition-colors">Profil Institusi</button></li>
                <li><button onClick={() => scrollToSection('program-keahlian')} className="hover:text-white transition-colors">Program Keahlian</button></li>
                <li><button onClick={() => scrollToSection('manajemen-siswa')} className="hover:text-white transition-colors">Sistem Data Siswa</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-100 font-semibold mb-6 uppercase tracking-widest text-xs">Akses Eksternal</h4>
              <button className="w-full bg-white/10 hover:bg-white/15 text-white px-5 py-3 rounded-md font-medium transition-colors text-sm mb-3 border border-white/10">
                Portal Pendaftaran Baru
              </button>
              <button className="w-full bg-transparent hover:bg-white/5 text-slate-300 px-5 py-3 rounded-md font-medium transition-colors text-sm border border-slate-800">
                Jaringan Alumni
              </button>
            </div>
          </div>
          
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
            <p>&copy; 2026 SMK Negeri 1. Seluruh Hak Cipta Dilindungi.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-300 transition-colors">Facebook</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Instagram</a>
              <a href="#" className="hover:text-slate-300 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- MODALS --- */}

      {/* Modal Tambah Siswa */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Registrasi Data Siswa">
        <form onSubmit={addStudent} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Nama Lengkap</label>
            <input 
              type="text" required value={newStudent.name} onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
              className="w-full px-4 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:border-slate-500 text-sm transition-colors"
              placeholder="Masukkan nama resmi siswa..."
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Kelas / Program</label>
              <select 
                value={newStudent.kelas} onChange={(e) => setNewStudent({...newStudent, kelas: e.target.value})}
                className="w-full px-4 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:border-slate-500 text-sm transition-colors bg-white"
              >
                <option>X PPLG</option><option>XI PPLG</option><option>XII PPLG</option>
                <option>X TJKT</option><option>XI TJKT</option><option>XII TJKT</option>
                <option>X DKV</option><option>X MPLB</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Status Akademik</label>
              <select 
                value={newStudent.status} onChange={(e) => setNewStudent({...newStudent, status: e.target.value})}
                className="w-full px-4 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:border-slate-500 text-sm transition-colors bg-white"
              >
                <option>Aktif</option><option>Lulus</option><option>Pindah</option>
              </select>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">Batal</button>
            <button type="submit" className="px-5 py-2.5 rounded-md text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition-colors">Simpan Rekam Data</button>
          </div>
        </form>
      </Modal>

      {/* Modal Detail Visi Misi */}
      <Modal isOpen={activeModal === 'misi'} onClose={() => setActiveModal(null)} title="Penjabaran Misi Institusi">
        <div className="prose prose-slate prose-sm max-w-none text-slate-600">
          <p className="mb-6 leading-relaxed">Untuk mencapai visi akademik yang terstandarisasi, institusi mengimplementasikan langkah-langkah strategis terukur sebagai berikut:</p>
          <ul className="space-y-4 mb-8 list-none pl-0">
            <li className="flex gap-3"><span className="text-blue-800 font-bold mt-0.5">•</span> <strong>Kurikulum Adaptif:</strong> Penyelarasan materi ajar dengan kompetensi nyata yang dibutuhkan oleh ekosistem industri digital.</li>
            <li className="flex gap-3"><span className="text-blue-800 font-bold mt-0.5">•</span> <strong>Sertifikasi Profesional:</strong> Kewajiban uji kelayakan keahlian bersertifikat dari dewan profesi bagi seluruh lulusan.</li>
            <li className="flex gap-3"><span className="text-blue-800 font-bold mt-0.5">•</span> <strong>Integritas Akademik:</strong> Penerapan budaya kedisiplinan dan kode etik profesi secara komprehensif dalam lingkungan studi.</li>
            <li className="flex gap-3"><span className="text-blue-800 font-bold mt-0.5">•</span> <strong>Fasilitas Terkini:</strong> Pemeliharaan laboratorium praktikum yang menyimulasikan ritme serta perangkat standar industri nyata.</li>
          </ul>
          <div className="bg-slate-50 p-5 rounded-md border border-slate-200">
            <p className="text-slate-800 font-medium m-0 italic">"Pendidikan vokasi yang tidak hanya melahirkan tenaga teknis, melainkan arsitek masa depan."</p>
          </div>
        </div>
      </Modal>

      {/* Modal Detail Jurusan */}
      <Modal isOpen={['pplg', 'tjkt', 'dkv', 'mplb'].includes(activeModal)} onClose={() => setActiveModal(null)} title="Detail Program Keahlian">
        {MAJORS.find(m => m.id === activeModal) && (() => {
          const major = MAJORS.find(m => m.id === activeModal);
          return (
            <div className="text-slate-600">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className={`w-12 h-12 rounded-sm ${major.color} flex items-center justify-center border border-slate-200`}>
                  <major.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 leading-tight">{major.title}</h3>
              </div>
              <p className="text-sm mb-6 leading-relaxed text-slate-600">{major.desc}</p>
              
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Konsentrasi Akademik</h4>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-sm bg-slate-400"></div> Implementasi Kurikulum Berbasis Proyek (PBL)</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-sm bg-slate-400"></div> Praktikum Lapangan Terpadu Bersama Mitra</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-sm bg-slate-400"></div> Standarisasi Uji Kelayakan Mutu Industri</li>
              </ul>
              
              <button onClick={() => setActiveModal(null)} className="w-full py-2.5 bg-white border border-slate-300 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors">
                Kembali
              </button>
            </div>
          );
        })()}
      </Modal>

    </div>
  );
}