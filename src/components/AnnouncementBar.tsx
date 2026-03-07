import { Phone } from 'lucide-react'

export default function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-yellow-700 to-yellow-800 text-white py-2 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span>+92 300 1234567</span>
        </div>
        <div className="flex items-center gap-3">
          <img 
            src="/my_image.jpeg" 
            alt="Logo" 
            className="h-5 w-auto object-contain"
          />
          <span className="font-medium">
            Order Now & Enjoy Free Delivery Anywhere in Pakistan!
          </span>
        </div>
        <div className="hidden sm:block w-32"></div>
      </div>
    </div>
  )
}
