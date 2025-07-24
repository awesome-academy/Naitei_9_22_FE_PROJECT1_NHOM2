import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaVimeoV,
  FaPaperPlane,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

// Data arrays for footer sections
const footerSections = [
  {
    title: "THÔNG TIN KHÁCH HÀNG",
    links: [
      "› Tài khoản của tôi",
      "› Sản phẩm yêu thích",
      "› Lịch sử mua hàng",
      "› Chính sách đổi trả",
      "› Góp ý, khiếu nại",
    ],
  },
  {
    title: "HỖ TRỢ DỊCH VỤ",
    links: [
      "› Hệ thống cửa hàng",
      "› Hướng dẫn mua hàng",
      "› Hướng dẫn thanh toán",
      "› Tích điểm đổi quà",
      "› Câu hỏi thường gặp",
    ],
  },
  {
    title: "CHÍNH SÁCH ƯU ĐÃI",
    links: [
      "› Chính sách giao hàng",
      "› Chính sách đổi trả sản phẩm",
      "› Chính sách bảo hành",
      "› Giới thiệu sản phẩm mới",
      "› Chính sách trả góp",
    ],
  },
  {
    title: "TIN TỨC",
    links: [
      "› Tin mới",
      "› Khuyến mại",
      "› Tuyển dụng",
      "› Download",
      "› Tags",
    ],
  },
];

const bottomLinks = [
  "Sitemap",
  "Danh mục sản phẩm",
  "Hợp tác",
  "Thông tin liên hệ",
  "Câu hỏi thường gặp",
];

const socialIcons = [
  { Icon: FaFacebookF, hoverColor: "hover:text-blue-500" },
  { Icon: FaTwitter, hoverColor: "hover:text-blue-400" },
  { Icon: FaYoutube, hoverColor: "hover:text-red-500" },
  { Icon: FaVimeoV, hoverColor: "hover:text-blue-600" },
];

export default function Footer() {
  return (
    <footer className="bg-[#2a2a2a] text-gray-300 text-sm">
      {/* Top Line */}
      <div className="border-b border-gray-600 px-4 py-6">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* Social */}
          <div className="flex flex-col gap-3">
            <span className="uppercase font-semibold text-sm text-white tracking-wide">
              KÊNH THÔNG TIN TỪ CHÚNG TÔI:
            </span>
            <div className="flex gap-4 text-lg">
              {socialIcons.map(({ Icon, hoverColor }, index) => (
                <Icon
                  key={`social-${index}`}
                  className={`${hoverColor} cursor-pointer transition-colors duration-200`}
                />
              ))}
            </div>
          </div>

          {/* Đăng ký nhận email */}
          <div className="flex flex-col gap-3">
            <span className="uppercase font-semibold text-sm text-white tracking-wide">
              ĐĂNG KÝ NHẬN EMAIL TỪ CHÚNG TÔI
            </span>
            <div className="flex w-full lg:w-auto">
              <Input
                type="email"
                placeholder="Nhập email của bạn..."
                className="px-4 py-3 w-full lg:w-80 text-black bg-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-r-none"
              />
              <Button className="bg-emerald-500 hover:bg-emerald-600 px-6 text-white rounded-l-none rounded-r-md transition-colors duration-200">
                <FaPaperPlane />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="px-4 py-12">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Cột 1: Logo và mô tả */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl text-emerald-500 font-light mb-2">
              Green<span className="italic font-semibold">Shop</span>
            </h1>
            <p className="text-sm text-emerald-400 mb-6">
              Món quà từ thiên nhiên
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              Green shop được thành lập từ 8/2010 được sự tin tưởng của khách
              hàng trong suốt thời gian hoạt động đến nay cửa hàng ngày một phát
              triển
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaPhone className="text-emerald-500 text-sm" />
                <span className="text-gray-400">
                  Điện thoại: (84-4) 66.558.868
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-emerald-500 text-sm" />
                <span className="text-gray-400">Email: info@dkt.com.vn</span>
              </div>
            </div>
          </div>

          {/* 4 Cột còn lại */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {footerSections.map((section, index) => (
              <div key={`section-${index}`}>
                <h3 className="text-white font-semibold mb-4 text-base">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li
                      key={`link-${index}-${linkIndex}`}
                      className="text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors duration-200"
                    >
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-600 px-4 py-6">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-center items-center text-xs gap-4 text-gray-400">
          {bottomLinks.map((link, index) => (
            <div key={`bottom-${index}`} className="flex items-center gap-4">
              <span className="hover:text-emerald-400 cursor-pointer transition-colors duration-200">
                {link}
              </span>
              {index < bottomLinks.length - 1 && (
                <span className="hidden sm:inline">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}



