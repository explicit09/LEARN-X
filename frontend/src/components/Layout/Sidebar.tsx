import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Study', path: '/study' },
  { name: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    // Hide on screens smaller than 'sm' (640px), apply 'fixed' positioning from 'sm' upwards.
    <div className="w-64 h-screen bg-gray-100 p-4 hidden sm:fixed top-0 left-0">
      <div className="mb-10">
        <Link to="/">
          <h1 className="text-3xl font-bold text-primary">LEARN-X</h1>
        </Link>
      </div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link
                to={item.path}
                className={`
                  block p-2 rounded-md text-gray-700 hover:bg-teal-100 hover:text-teal-700
                  ${location.pathname.startsWith(item.path) ? 'font-bold bg-teal-100 text-teal-700' : ''}
                `}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
