import React, { useState, useEffect, useMemo } from 'react';

// --- ICONS (using inline SVGs for simplicity and performance) ---

const MenuIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
);

const LayoutDashboardIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
);

const LineChartIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
    </svg>
);

const UserCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="10" r="3" />
        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
);

const LogOutIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
);

const PlusCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="16" />
        <line x1="8" x2="16" y1="12" y2="12" />
    </svg>
);

const SearchIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
    </svg>
);

const XIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// --- Initial Data ---
const initialProjects = [
    {
        id: 'RH-564',
        projectName: 'CRM System Upgrade',
        client: 'Acme Corp',
        status: 'In Progress',
        priority: 'High',
        startDate: '2025-07-09',
        dueDate: '2025-08-09',
        description: 'Upgrade the existing CRM system to the latest version, including data migration and user training.',
        manager: 'Alice Johnson',
        budget: '50000',
    },
    {
        id: 'IO-893',
        projectName: 'Data Migration Tool',
        client: 'Nova Solution',
        status: 'Not Started',
        priority: 'Low',
        startDate: '2025-03-24',
        dueDate: '2025-05-20',
        description: 'Develop a tool for migrating data from legacy systems to the new cloud infrastructure.',
        manager: 'Bob Williams',
        budget: '25000',
    },
    {
        id: 'PL-814',
        projectName: 'Website Redesign',
        client: 'GreenTc Ltd',
        status: 'Completed',
        priority: 'Medium',
        startDate: '2025-10-30',
        dueDate: '2025-12-09',
        description: 'Complete redesign of the corporate website with a new CMS and responsive design.',
        manager: 'Charlie Brown',
        budget: '75000',
    },
];


// --- Main App Component ---
export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [page, setPage] = useState('dashboard'); // 'dashboard' or 'analytics'

    // --- !! NEW: This useEffect hook injects the Tailwind CSS CDN script ---
    useEffect(() => {
        // Check if the script already exists to avoid adding it multiple times
        if (!document.querySelector('script[src="https://cdn.tailwindcss.com"]')) {
            const script = document.createElement('script');
            script.src = 'https://cdn.tailwindcss.com';
            document.head.appendChild(script);
        }
    }, []); // Empty dependency array ensures this runs only once

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    if (!isLoggedIn) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return (
        <MainLayout onLogout={handleLogout} currentPage={page} onNavClick={setPage}>
            {page === 'dashboard' && <Dashboard />}
            {page === 'analytics' && <Analytics />}
        </MainLayout>
    );
}


// --- Pages & Components ---

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('user@example.com');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (email === 'user@example.com' && password === 'password123') {
            onLogin();
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="min-h-screen font-sans bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center p-4">
            <div className="grid md:grid-cols-2 items-center max-w-6xl w-full">
                <div className="text-white p-8 md:pr-16">
                    <h1 className="text-6xl font-serif mb-4">ProjectFlow</h1>
                    <p className="text-lg text-blue-100 max-w-md">
                        ProjectFlow is a powerful tool that helps project managers and their teams plan, execute, and oversee projects efficiently from start to finish.
                    </p>
                </div>
                <div className="bg-black/20 backdrop-blur-lg p-10 rounded-3xl">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">User Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full px-4 py-3 bg-white/80 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                                id="email"
                                type="email"
                                placeholder="user@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-8">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="w-full px-4 py-3 bg-white/80 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                                id="password"
                                type="password"
                                placeholder="************"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-red-300 text-center mb-4">{error}</p>}
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300 flex items-center gap-2"
                                type="submit"
                            >
                                Login &rarr;
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


function MainLayout({ children, onLogout, currentPage, onNavClick }) {
    const [showLogout, setShowLogout] = useState(false);
    return (
        <div className="min-h-screen bg-[#E0F7FA] font-sans flex flex-col">
            <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md sticky top-0 z-20">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <h1 className="text-2xl font-bold font-serif">ProjectFlow</h1>
                    <div className="relative">
                        <div
                            className="flex items-center gap-3 cursor-pointer"
                            onClick={() => setShowLogout(!showLogout)}
                        >
                            <span>Hi, User</span>
                            <UserCircleIcon className="w-8 h-8 bg-white/30 rounded-full p-1" />
                        </div>
                        {showLogout && (
                            <div
                                className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl py-2 z-30"
                            >
                                <button
                                    onClick={() => { onLogout(); setShowLogout(false); }}
                                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                                >
                                    <LogOutIcon className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <div className="flex-grow flex container mx-auto px-6 py-8">
                <aside className="w-64 flex-shrink-0 pr-8">
                    <div className="bg-white p-4 rounded-2xl shadow-lg h-full">
                        <div className="flex items-center gap-4 p-2 mb-4">
                            <button className="p-2 rounded-full hover:bg-gray-100">
                                <MenuIcon className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>
                        <nav>
                            <ul>
                                <NavItem
                                    icon={<LayoutDashboardIcon />}
                                    label="Dashboard"
                                    isActive={currentPage === 'dashboard'}
                                    onClick={() => onNavClick('dashboard')}
                                />
                                <NavItem
                                    icon={<LineChartIcon />}
                                    label="Analytics"
                                    isActive={currentPage === 'analytics'}
                                    onClick={() => onNavClick('analytics')}
                                />
                            </ul>
                        </nav>
                    </div>
                </aside>
                <main className="flex-grow">
                    {children}
                </main>
            </div>
            <footer className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white text-center py-4">
                <p>&copy; 2025 ProjectFlow. All rights reserved.</p>
            </footer>
        </div>
    );
}

function NavItem({ icon, label, isActive, onClick }) {
    return (
        <li>
            <a
                href="#"
                onClick={(e) => { e.preventDefault(); onClick(); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${isActive ? 'bg-cyan-100 text-cyan-800' : 'text-gray-600 hover:bg-gray-100'
                    }`}
            >
                {React.cloneElement(icon, { className: "w-6 h-6" })}
                <span>{label}</span>
            </a>
        </li>
    );
}


function Dashboard() {
    const [projects, setProjects] = useState(initialProjects);
    const [modal, setModal] = useState({ type: null, project: null }); // type: 'create', 'edit', 'view', 'delete'
    const [filters, setFilters] = useState({ client: '', status: '', priority: '', search: '' });

    const handleOpenModal = (type, project = null) => setModal({ type, project });
    const handleCloseModal = () => setModal({ type: null, project: null });

    const handleSaveProject = (projectData) => {
        if (modal.type === 'create') {
            setProjects([projectData, ...projects]);
        } else if (modal.type === 'edit') {
            setProjects(projects.map(p => p.id === projectData.id ? projectData : p));
        }
        handleCloseModal();
    };

    const handleDeleteProject = () => {
        setProjects(projects.filter(p => p.id !== modal.project.id));
        handleCloseModal();
    };

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    };

    const uniqueClients = useMemo(() => [...new Set(projects.map(p => p.client))], [projects]);
    const uniqueStatuses = useMemo(() => [...new Set(projects.map(p => p.status))], [projects]);
    const uniquePriorities = useMemo(() => [...new Set(projects.map(p => p.priority))], [projects]);

    const filteredProjects = useMemo(() => {
        return projects.filter(p =>
            (filters.client ? p.client === filters.client : true) &&
            (filters.status ? p.status === filters.status : true) &&
            (filters.priority ? p.priority === filters.priority : true) &&
            (filters.search ? p.projectName.toLowerCase().includes(filters.search.toLowerCase()) : true)
        );
    }, [projects, filters]);

    const getStatusClass = (status) => {
        switch (status) {
            case 'Completed': return 'text-green-800';
            case 'In Progress': return 'text-yellow-800 font-semibold';
            case 'Not Started': return 'text-blue-800';
            case 'On Hold': return 'text-red-800';
            default: return 'text-gray-800';
        }
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'High': return 'text-red-600 font-semibold';
            case 'Medium': return 'text-yellow-600 font-semibold';
            case 'Low': return 'text-green-600 font-semibold';
            default: return 'text-gray-600';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-4xl font-bold text-gray-700">Dashboard</h2>
                <button onClick={() => handleOpenModal('create')} className="flex items-center gap-2 bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition-all shadow-md">
                    <PlusCircleIcon className="w-6 h-6" />
                    <span>Create Project</span>
                </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <FilterDropdown label="Client" options={uniqueClients} value={filters.client} onChange={(e) => handleFilterChange('client', e.target.value)} />
                    <FilterDropdown label="Status" options={uniqueStatuses} value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)} />
                    <FilterDropdown label="Priority" options={uniquePriorities} value={filters.priority} onChange={(e) => handleFilterChange('priority', e.target.value)} />
                    <div className="relative">
                         <label className="text-sm font-semibold text-gray-600 mb-1 block">Project Name</label>
                        <input type="text" placeholder="Please Enter" value={filters.search} onChange={(e) => handleFilterChange('search', e.target.value)} className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <div className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 pointer-events-none">
                             <SearchIcon className="w-5 h-5 text-gray-400"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-cyan-50 rounded-lg">
                            <tr>
                                {['Project ID', 'Project Name', 'Client', 'Status', 'Priority', 'Start Date', 'Due Date', ''].map(h => (
                                    <th key={h} className="p-4 text-sm font-bold text-cyan-800">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProjects.map(project => (
                                <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-4 font-semibold text-gray-700">{project.id}</td>
                                    <td className="p-4 text-gray-800">{project.projectName}</td>
                                    <td className="p-4 text-gray-600">{project.client}</td>
                                    <td className="p-4"><span className={`text-sm font-medium ${getStatusClass(project.status)}`}>{project.status}</span></td>
                                    <td className={`p-4 ${getPriorityClass(project.priority)}`}>{project.priority}</td>
                                    <td className="p-4 text-gray-600">{formatDate(project.startDate)}</td>
                                    <td className="p-4 text-gray-600">{formatDate(project.dueDate)}</td>
                                    <td className="p-4 text-sm font-semibold">
                                        <div className="flex gap-4 text-purple-600">
                                            <button onClick={() => handleOpenModal('edit', project)} className="hover:underline">Edit</button>
                                            <button onClick={() => handleOpenModal('view', project)} className="hover:underline">View</button>
                                            <button onClick={() => handleOpenModal('delete', project)} className="text-red-500 hover:underline">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
             {modal.type && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                    {modal.type === 'delete' ? (
                        <DeleteConfirmationModal
                            onCancel={handleCloseModal}
                            onDelete={handleDeleteProject}
                        />
                    ) : (
                        <ProjectModal
                            mode={modal.type}
                            project={modal.project}
                            onClose={handleCloseModal}
                            onSave={handleSaveProject}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

function FilterDropdown({ label, options, ...props }) {
    return (
        <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">{label}</label>
            <select {...props} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="">Please Select</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
    )
}

function Analytics() {
    return (
        <div>
            <h2 className="text-4xl font-bold text-gray-700 mb-6">Analytics</h2>
            <div className="bg-white p-6 rounded-2xl shadow-lg min-h-[60vh] flex items-center justify-center">
                <p className="text-gray-500 text-xl">Analytics data will be displayed here.</p>
            </div>
        </div>
    );
}

const MODAL_TITLES = {
    create: 'Create a New Project',
    edit: 'Edit Project',
    view: 'View Project',
};

function ProjectModal({ mode, project, onClose, onSave }) {
    const isViewMode = mode === 'view';
    const [formData, setFormData] = useState({
        id: '',
        projectName: '',
        client: '',
        description: '',
        manager: '',
        status: 'Not Started',
        priority: 'Medium',
        startDate: '',
        dueDate: '',
        budget: '',
        ...project,
    });
    
    useEffect(() => {
        if(mode === 'create'){
            setFormData(prev => ({ ...prev, id: `PJ-${Math.floor(100 + Math.random() * 900)}` }));
        }
    }, [mode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 relative m-4">
            <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-200">
                <XIcon className="w-6 h-6"/>
            </button>
            <h3 className="text-3xl font-bold mb-6">{MODAL_TITLES[mode]}</h3>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    <FormInput label="Project ID" name="id" value={formData.id} onChange={handleChange} placeholder="e.g.: AA-XXX" disabled={mode !== 'create'} />
                    <FormInput label="Project Name" name="projectName" value={formData.projectName} onChange={handleChange} placeholder="e.g.: Azure Integration" disabled={isViewMode} />
                    <FormInput label="Client Name" name="client" value={formData.client} onChange={handleChange} placeholder="e.g.: Nova Ltd." disabled={isViewMode} />
                    <FormInput label="Manager" name="manager" value={formData.manager} onChange={handleChange} placeholder="e.g.: John Doe" disabled={isViewMode} />
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-1">Project Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full bg-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white disabled:bg-gray-500/30 disabled:cursor-not-allowed" disabled={isViewMode}></textarea>
                    </div>
                    <FormSelect label="Status" name="status" value={formData.status} onChange={handleChange} options={['Not Started', 'In Progress', 'On Hold', 'Completed']} disabled={isViewMode} />
                    <FormSelect label="Priority" name="priority" value={formData.priority} onChange={handleChange} options={['High', 'Medium', 'Low']} disabled={isViewMode} />
                    <FormInput label="Start Date" name="startDate" type="date" value={formData.startDate} onChange={handleChange} disabled={isViewMode} />
                    <FormInput label="Due Date" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} disabled={isViewMode} />
                    <FormInput label="Budget" name="budget" type="number" value={formData.budget} onChange={handleChange} placeholder="e.g.: 50000" disabled={isViewMode} />
                </div>
                {!isViewMode && (
                    <div className="flex justify-end mt-8">
                        <button type="submit" className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition-all">
                            Save
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}

function FormInput({ label, disabled, ...props }) {
    return (
        <div>
            <label className="block text-sm font-semibold mb-1">{label}</label>
            <input {...props} disabled={disabled} className="w-full bg-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white disabled:bg-gray-500/30 disabled:cursor-not-allowed" />
        </div>
    );
}

function FormSelect({ label, options, disabled, ...props }) {
    return (
        <div>
            <label className="block text-sm font-semibold mb-1">{label}</label>
            <select {...props} disabled={disabled} className="w-full bg-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white disabled:bg-gray-500/30 disabled:cursor-not-allowed appearance-none">
                {options.map(opt => <option key={opt} value={opt} className="text-black">{opt}</option>)}
            </select>
        </div>
    );
}

function DeleteConfirmationModal({ onCancel, onDelete }) {
    return (
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative m-4 text-center">
            <button onClick={onCancel} className="absolute top-4 right-4 text-white hover:text-gray-200">
                <XIcon className="w-6 h-6"/>
            </button>
            <h3 className="text-2xl font-bold mb-4">Confirm Deletion</h3>
            <p className="text-lg mb-8">Are you sure you want to delete this project?</p>
            <div className="flex justify-center gap-4">
                <button onClick={onCancel} className="bg-white/30 text-white font-bold py-2 px-6 rounded-lg hover:bg-white/40 transition-all">
                    Cancel
                </button>
                <button onClick={onDelete} className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition-all">
                    Delete
                </button>
            </div>
        </div>
    );
}



