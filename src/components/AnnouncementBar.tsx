export default function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-[#2C1810] via-[#3D2318] to-[#2C1810] text-white py-2.5 px-4">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="font-light">+92 300 1234567</span>
        </div>
        
        <div className="flex-1 text-center">
          <span className="font-light tracking-widest text-xs sm:text-sm uppercase">Free Delivery on Orders Above PKR 3,000</span>
        </div>
        
        <div className="w-32 hidden sm:block"></div>
      </div>
    </div>
  )
}
