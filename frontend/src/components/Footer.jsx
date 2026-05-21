import { Link } from 'react-router-dom';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="border-t border-slate-200/75 bg-white py-10 dark:border-slate-700/75 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Groupe Scolaire Nemba</h3>
          <p className="mt-3 max-w-md text-slate-600 dark:text-slate-400">Delivering high-quality education in Nemba Sector, Gakenke District with modern facilities, strong community values and student-centered learning.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Quick links</h4>
          <div className="mt-4 flex flex-col gap-2 text-slate-600 dark:text-slate-400">
            <Link to="/about">About</Link>
            <Link to="/academics">Academics</Link>
            <Link to="/timetable">Timetable</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Contact</h4>
          <div className="mt-4 space-y-3 text-slate-600 dark:text-slate-400">
            <p className="flex items-center gap-2"><FiMapPin /> Nemba Sector, Gakenke District, Rwanda</p>
            <p className="flex items-center gap-2"><FiPhone /> +250 78 000 0000</p>
            <p className="flex items-center gap-2"><FiMail /> info@gsnemba.rw</p>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-slate-200/70 pt-6 text-center text-sm text-slate-500 dark:border-slate-700/70 dark:text-slate-400">
        © {new Date().getFullYear()} Groupe Scolaire Nemba. Built for education and community growth.
      </div>
    </footer>
  );
}

export default Footer;
