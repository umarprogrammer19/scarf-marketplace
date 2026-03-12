export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-serif text-text-main mb-8">Overview</h1>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface p-6 rounded-xl border border-gray-800">
                    <h3 className="text-text-muted text-sm font-medium">Total Sales</h3>
                    <p className="text-2xl font-bold text-gold mt-2">Rs. 0</p>
                </div>

                <div className="bg-surface p-6 rounded-xl border border-gray-800">
                    <h3 className="text-text-muted text-sm font-medium">Pending COD Orders</h3>
                    <p className="text-2xl font-bold text-text-main mt-2">0</p>
                </div>

                <div className="bg-surface p-6 rounded-xl border border-gray-800">
                    <h3 className="text-text-muted text-sm font-medium">Total Products</h3>
                    <p className="text-2xl font-bold text-text-main mt-2">0</p>
                </div>
            </div>
        </div>
    );
}