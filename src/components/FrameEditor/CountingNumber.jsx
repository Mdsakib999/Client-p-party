import React, { useState, useEffect } from 'react';
import { TrendingUp, Download, Image, Frame } from 'lucide-react';

const CountingNumber = () => {
    const [stats, setStats] = useState(() => {
        const savedStats = localStorage.getItem('counting_stats');
        return savedStats ? JSON.parse(savedStats) : {
            photoDownload: 13785,
            coverCreate: 12659,
            frameCreate: 18758
        };
    });

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        localStorage.setItem('counting_stats', JSON.stringify(stats));
    }, [stats]);

    useEffect(() => {
        setIsVisible(true);
        const getRandomIncrement = () => Math.floor(Math.random() * (25 - 15 + 1)) + 15;

        const interval = setInterval(() => {
            setStats(prevStats => ({
                photoDownload: prevStats.photoDownload + getRandomIncrement(),
                coverCreate: prevStats.coverCreate + getRandomIncrement(),
                frameCreate: prevStats.frameCreate + getRandomIncrement()
            }));
        }, 120000);

        return () => clearInterval(interval);
    }, []);

    const statsData = [
        {
            icon: Download,
            value: stats.frameCreate,
            label: 'Photo Downloads',
            gradient: 'from-emerald-400 to-green-500'
        },
        {
            icon: Frame,
            value: stats.coverCreate,
            label: 'Frames Created',
            gradient: 'from-teal-400 to-green-500'
        },
        {
            icon: Image,
            value: stats.photoDownload,
            label: 'Covers Created',
            gradient: 'from-green-400 to-emerald-600'
        }
    ];

    return (
        <div className="w-full px-4 py-12 ">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-4">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">Live Statistics</span>
                    </div>
                   
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {statsData.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                                style={{
                                    transitionDelay: `${index * 150}ms`
                                }}
                            >
                                {/* Gradient Background Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                                
                                {/* Decorative Circle */}
                                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>

                                <div className="relative p-8">
                                    {/* Icon */}
                                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>

                                    {/* Number */}
                                    <div className="mb-2">
                                        <span className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                            {stat.value.toLocaleString()}
                                        </span>
                                        <span className="text-2xl font-bold text-green-500 ml-1">+</span>
                                    </div>

                                    {/* Label */}
                                    <p className="text-gray-600 font-medium">{stat.label}</p>

                                    {/* Progress Bar */}
                                    <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full animate-pulse`}
                                            style={{ width: '75%' }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Badge */}
                {/* <div className="text-center mt-8">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-600">Updated every 2 minutes</span>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default CountingNumber;