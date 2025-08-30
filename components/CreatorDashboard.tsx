import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { affiliateData } from '../constants';

const salesData = [
  { name: 'Ene', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Abr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

const engagementData = [
  { name: 'Semana 1', users: 120 },
  { name: 'Semana 2', users: 150 },
  { name: 'Semana 3', users: 130 },
  { name: 'Semana 4', users: 180 },
];

const courseCompletionData = [
  { name: 'Libertad Financiera', value: 85 },
  { name: 'Habilidades Digitales', value: 72 },
  { name: 'Mindfulness', value: 91 },
  { name: 'Sostenibilidad', value: 65 },
];

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

interface CreatorDashboardProps {
  onBack: () => void;
}

const BackArrowIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
);

const StatCard: React.FC<{title: string, value: string, change: string, isPositive: boolean}> = ({title, value, change, isPositive}) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
        <p className={`text-sm mt-1 flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '▲' : '▼'} {change} vs mes anterior
        </p>
    </div>
);


const CreatorDashboard: React.FC<CreatorDashboardProps> = ({ onBack }) => {
  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in-up">
      <button onClick={onBack} className="flex items-center space-x-2 text-brand-primary hover:text-indigo-400 font-semibold mb-8">
          <BackArrowIcon />
          <span>Volver al Inicio</span>
      </button>
      <h1 className="text-4xl font-bold text-white mb-8">Panel de Creador</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Ingresos Totales" value="$28,500" change="12.5%" isPositive={true}/>
        <StatCard title="Nuevas Inscripciones" value="352" change="8.2%" isPositive={true}/>
        <StatCard title="Ingresos de Afiliados" value="$3,980" change="25.1%" isPositive={true}/>
        <StatCard title="Usuarios Activos" value="1,280" change="-2.1%" isPositive={false}/>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">Ventas Mensuales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}/>
              <Legend />
              <Bar dataKey="sales" fill="#4F46E5" name="Ventas" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">Usuarios Activos Semanales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}/>
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={2} name="Usuarios" />
            </LineChart>
          </ResponsiveContainer>
        </div>
         <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Rendimiento de Afiliados (Top 5)</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={affiliateData} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#9CA3AF" />
                    <YAxis type="category" dataKey="name" stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} cursor={{fill: '#374151'}}/>
                    <Legend />
                    <Bar dataKey="earnings" fill="#F59E0B" name="Ganancias ($)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Tasa de Finalización de Cursos</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={courseCompletionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                        {courseCompletionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                     <Legend />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}/>
                </PieChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;