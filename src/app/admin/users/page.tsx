"use client";
import { useState } from "react";
import { users } from "../../../data/mockData";
import { Search, Filter, Mail, Calendar } from "lucide-react";

export default function AdminUsers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    const filteredUsers = users.filter((user) => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="p-4 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl text-white mb-2">Users Management</h1>
                <p className="text-white/60">Manage customer and admin accounts</p>
            </div>

            {/* Filters */}
            <div className="bg-card border border-white/10 rounded-xl p-6 mb-8">
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors duration-300"
                        />
                    </div>

                    {/* Role Filter */}
                    <div className="relative">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold transition-colors duration-300"
                        >
                            <option value="all">All Roles</option>
                            <option value="customer">Customers</option>
                            <option value="admin">Admins</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-linear-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-xl p-6">
                    <p className="text-white/60 mb-2">Total Users</p>
                    <p className="text-4xl font-bold text-white">{users.length}</p>
                </div>
                <div className="bg-linear-to-br from-blue-400/10 to-blue-400/5 border border-blue-400/30 rounded-xl p-6">
                    <p className="text-white/60 mb-2">Customers</p>
                    <p className="text-4xl font-bold text-white">
                        {users.filter((u) => u.role === "customer").length}
                    </p>
                </div>
                <div className="bg-linear-to-br from-purple-400/10 to-purple-400/5 border border-purple-400/30 rounded-xl p-6">
                    <p className="text-white/60 mb-2">Admins</p>
                    <p className="text-4xl font-bold text-white">
                        {users.filter((u) => u.role === "admin").length}
                    </p>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-card border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5 border-b border-white/10">
                            <tr>
                                <th className="text-left text-white/60 font-semibold p-4">User</th>
                                <th className="text-left text-white/60 font-semibold p-4">Email</th>
                                <th className="text-left text-white/60 font-semibold p-4">Role</th>
                                <th className="text-left text-white/60 font-semibold p-4">Orders</th>
                                <th className="text-left text-white/60 font-semibold p-4">Joined</th>
                                <th className="text-left text-white/60 font-semibold p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center">
                                                <span className="text-gold font-semibold">
                                                    {user.name.charAt(0)}
                                                </span>
                                            </div>
                                            <span className="text-white font-semibold">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center space-x-2 text-white/60">
                                            <Mail className="w-4 h-4" />
                                            <span>{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === "admin"
                                            ? "bg-purple-400/10 text-purple-400"
                                            : "bg-blue-400/10 text-blue-400"
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4 text-white">{user.totalOrders}</td>
                                    <td className="p-4">
                                        <div className="flex items-center space-x-2 text-white/60">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(user.joinedAt).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <button className="px-4 py-2 bg-white/5 border border-white/10 text-white text-sm rounded-lg hover:bg-white/10 hover:border-gold transition-all duration-300">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
