"use client";

import { useState, useEffect } from "react";

// কাস্টম আইকন
const ShoppingCartIcon = () => <span>🛒</span>;
const TrashIcon = () => <span>🗑️</span>;
const PlusIcon = () => <span>+</span>;
const MinusIcon = () => <span>−</span>;
const ChevronDown = () => <span>▼</span>;

const PRODUCTS = [
  { 
    id: 1, 
    name: "AirPods Pro 2nd Gen (Black)", 
    price: 599, 
    oldPrice: 799,
    image: "/IMG_1161.JPG.jpeg",
    description: `🔰 কালার: কালো🖤

✨ বিশেষত্ব:
✅ প্রিমিয়াম Sound Quality ও ডিপ Bass
✅ দীর্ঘস্থায়ী ২০ ঘণ্টা ব্যাটারি ব্যাকআপ
✅ স্মার্ট Popup Screen সাপোর্ট
✅ কানেক্ট হলে Beep Sound নোটিফিকেশন
✅ গান Play / Pause / Change করার জন্য স্মার্ট Touch Sensor
✅ নিশ্চিন্ত ব্যবহারের জন্য ৬ মাসের Service Warranty

🎧 ডেইলি ইউজ ও মিউজিক লাভারদের জন্য পারফেক্ট চয়েস!`
  },
  { 
    id: 2, 
    name: "AirPods Pro 2nd Gen (White)", 
    price: 549, 
    oldPrice: 699,
    image: "/IMG_1146.PNG",
    description: `🔰 কালার: সাদা🤍

✨ বিশেষত্ব:
✅ প্রিমিয়াম Sound Quality ও ডিপ Bass
✅ দীর্ঘস্থায়ী ২০ ঘণ্টা ব্যাটারি ব্যাকআপ
✅ স্মার্ট Popup Screen সাপোর্ট
✅ কানেক্ট হলে Beep Sound নোটিফিকেশন
✅ গান Play / Pause / Change করার জন্য স্মার্ট Touch Sensor
✅ নিশ্চিন্ত ব্যবহারের জন্য ৬ মাসের Service Warranty

🎧 ডেইলি ইউজ ও মিউজিক লাভারদের জন্য পারফেক্ট চয়েস!`
  },
  { 
    id: 3, 
    name: "Recrsi Re NY-060 Neckband", 
    price: 599, 
    oldPrice: 850,
    image: "/IMG_8533.JPG.jpeg",
    description: `এক চার্জেই টানা ১৫ দিন পর্যন্ত ব্যাকআপ 🔋
সস্তা ও ঝামেলার প্রোডাক্ট নয়—
💡 বাজেট একটু বাড়ান, কোয়ালিটিতে শান্তি নিন।
মিউজিক শোনা হোক বা কল—দুটোতেই পাবেন আলাদা আরাম 🎶📞

📌 নেকব্যান্ডটির প্রিমিয়াম ফিচারসমূহ:
🔹 ডিজিটাল ডিসপ্লে – ব্যাটারি ও ফাংশন এক নজরে
🔹 ২০০ ঘণ্টা ব্যাকআপ – বারবার চার্জের চিন্তা নেই
🔹 মেমোরি কার্ড সাপোর্ট – ইন্টারনেট ছাড়াই গান উপভোগ
🔹 টাইপ-সি চার্জিং পোর্ট – দ্রুত চার্জ, বেশি সময় ব্যবহার
🔹 Bass কাস্টমাইজেশন অপশন – নিজের মতো করে বেস সেট করুন
🔹 ফাস্ট চার্জিং সাপোর্ট ⚡
🔹 হ্যান্ড-ফ্রি কলিং সিস্টেম – ক্লিয়ার ভয়েস কোয়ালিটি
🔹 Bass Port Superior Sound – গভীর ও পরিষ্কার সাউন্ড
🔹 স্পোর্ট-ফ্রেন্ডলি ডিজাইন – দৌড়, ব্যায়াম ও দৈনন্দিন ব্যবহারে আরামদায়ক
🔹 ১৫ মিটার ব্লুটুথ রেঞ্জ – ফ্রি মুভমেন্ট, কোনো বাধা নেই`
  },
];

export default function Home() {
  const phone = "8801736196960";
  const [cart, setCart] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState({ name: "", mobile: "", address: "", location: "Inside Dhaka" });
  const [mounted, setMounted] = useState(false);
  const [openDesc, setOpenDesc] = useState<number | null>(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const shipping = userInfo.location === "Inside Dhaka" ? 70 : 120;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + (cart.length ? shipping : 0);

  const addToCart = (product: any) => {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id);
      if (found) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ).filter(item => item.qty > 0));
  };

  const removeFromCart = (id: number) => setCart(cart.filter(i => i.id !== id));

  const sendOrder = () => {
    if (!cart.length) return alert("কার্ট খালি! পণ্য যোগ করুন।");
    if (!userInfo.name || !userInfo.mobile || !userInfo.address) return alert("আপনার সঠিক তথ্য দিন।");

    const orderList = cart.map(p => `• ${p.name} (x${p.qty}) = ৳${p.price * p.qty}`).join("\n");
    const msg = `📦 *অর্ডার কনফার্মেশন | NexKart* \n\n👤 *নাম:* ${userInfo.name}\n📞 *ফোন নাম্বার:* ${userInfo.mobile}\n📍 *ঠিকানা:* ${userInfo.address}\n🏠 *Inside Dhaka:* ${userInfo.location === "Inside Dhaka" ? "Yes" : "No"}\n\n🛍️ *অর্ডার ডিটেইলস:*\n${orderList}\n\n--------------------------\n🧱 *সর্বমোট =* ৳${subtotal} Total\n🛳️ *শিপিং খরচ:* ৳${shipping}\n💰 *মোট খরচ: ৳${total}*\n\n✅ অর্ডারটি কনফার্ম হয়েছে। ধন্যবাদ! 💙`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#F1F5F9] pb-40 font-sans">
      {/* Header */}
      <nav className="sticky top-0 z-[100] w-full bg-white/80 px-6 py-4 shadow-sm backdrop-blur-xl border-b border-slate-100">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-11 w-11 rounded-2xl bg-white p-[2px] shadow-md ring-1 ring-slate-200">
              <img src="/IMG_8526.JPG.jpeg" alt="Logo" className="h-full w-full rounded-[14px] object-cover" />
            </div>
            <h1 className="text-xl font-black text-green-600 tracking-tighter uppercase">NexKart</h1>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 relative">
            <ShoppingCartIcon />
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">{cart.length}</span>}
          </div>
        </div>
      </nav>

      <div className="max-w-lg mx-auto p-4 space-y-10">
        {/* Product Cards */}
        <div className="grid grid-cols-1 gap-8 mt-4">
          {PRODUCTS.map(p => (
            <div key={p.id} className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
              <div className="h-72 w-full bg-slate-100">
                <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
              </div>
              <div className="p-7 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-slate-800 leading-tight">{p.name}</h3>
                  <div className="text-right">
                    <p className="text-green-600 font-black text-xl">৳{p.price}</p>
                    <p className="text-[10px] text-slate-400 line-through">৳{p.oldPrice}</p>
                  </div>
                </div>

                {/* ডেসক্রিপশন সেকশন */}
                <div className="border-t border-b border-slate-50 py-3">
                  <button 
                    onClick={() => setOpenDesc(openDesc === p.id ? null : p.id)}
                    className="flex items-center justify-between w-full text-xs font-bold text-slate-500 uppercase tracking-widest"
                  >
                    <span>পণ্যর বিস্তারিত / Details</span>
                    <span className={`transition-transform duration-300 ${openDesc === p.id ? 'rotate-180 text-green-600' : ''}`}><ChevronDown /></span>
                  </button>
                  {openDesc === p.id && (
                    <div className="mt-4 text-[13px] text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 p-5 rounded-3xl border border-slate-100 animate-in fade-in slide-in-from-top-4">
                      {p.description}
                    </div>
                  )}
                </div>

                <button onClick={() => addToCart(p)} className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-green-100 active:scale-95 transition-all">কার্টে যোগ করুন</button>
              </div>
            </div>
          ))}
        </div>

        {/* 🛍️ Your Cart Section */}
        {cart.length > 0 && (
          <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm space-y-6">
            <h2 className="font-black text-slate-800 text-lg flex items-center gap-2">🛍️ অর্ডার ডিটেইলস</h2>
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                  <div className="flex-1 pr-2"><p className="font-bold text-sm text-slate-800">{item.name}</p></div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-xl border border-slate-200">
                        <button onClick={() => updateQty(item.id, -1)}><MinusIcon /></button>
                        <span className="font-black w-4 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)}><PlusIcon /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-300"><TrashIcon /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User Form */}
        <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm space-y-6">
          <h2 className="font-black text-slate-800 text-xl">🛒 আপনার তথ্য দিন</h2>
          <div className="space-y-4">
            <input 
              placeholder="আপনার নাম" 
              className="w-full bg-slate-50 rounded-[20px] p-5 outline-none focus:ring-2 focus:ring-green-500/20 placeholder:text-black placeholder:font-bold" 
              onChange={e => setUserInfo({...userInfo, name: e.target.value})} 
            />
            <input 
              placeholder="মোবাইল নম্বর" 
              className="w-full bg-slate-50 rounded-[20px] p-5 outline-none focus:ring-2 focus:ring-green-500/20 placeholder:text-black placeholder:font-bold" 
              onChange={e => setUserInfo({...userInfo, mobile: e.target.value})} 
            />
            <textarea 
              placeholder="পুরো ঠিকানা" 
              className="w-full bg-slate-50 rounded-[20px] p-5 outline-none focus:ring-2 focus:ring-green-500/20 placeholder:text-black placeholder:font-bold" 
              rows={2} 
              onChange={e => setUserInfo({...userInfo, address: e.target.value})} 
            />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setUserInfo({...userInfo, location: "Inside Dhaka"})} className={`flex-1 py-5 rounded-[20px] text-xs font-black uppercase ${userInfo.location === "Inside Dhaka" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"}`}>Dhaka City</button>
            <button onClick={() => setUserInfo({...userInfo, location: "Outside Dhaka"})} className={`flex-1 py-5 rounded-[20px] text-xs font-black uppercase ${userInfo.location === "Outside Dhaka" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"}`}>Outside</button>
          </div>
        </div>

        {/* অর্ডার কনফার্মেশন বক্স */}
        <div className="bg-[#E9F2FF] rounded-[24px] p-6 border border-blue-100 shadow-sm space-y-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">📦 অর্ডার কনফার্মেশন | NexKart</h2>
          <div className="space-y-2 text-[15px] text-slate-700">
            <p>👤 <b>নাম:</b> {userInfo.name || "No Name Provided"}</p>
            <p>📞 <b>ফোন নাম্বার:</b> {userInfo.mobile || "No Phone Provided"}</p>
            <p>📍 <b>ঠিকানা:</b> {userInfo.address || "No Shipping Address Provided"}</p>
            <p>🏠 <b>ঢাকার ভিতরে:</b> {userInfo.location === "Inside Dhaka" ? "YES - (হ্যাঁ)" : "NO - (না)"}</p>
          </div>
          <div className="border-t border-blue-200 pt-4">
            <p className="font-bold text-slate-800 mb-2">🛍️ অর্ডার ডিটেইলস:</p>
            {cart.length > 0 ? (
              cart.map((p, i) => <p key={i} className="text-sm italic text-slate-600">• {p.name} (x{p.qty}) = ৳{p.price * p.qty}</p>)
            ) : (
              <p className="text-sm italic text-slate-500">No Products Selected</p>
            )}
          </div>
          <div className="border-t border-blue-200 pt-4 space-y-1 text-slate-800">
            <p>🧱 <b>সর্বমোট =</b> ৳{subtotal} Total</p>
            <p>🛳️ <b>শিপিং খরচ:</b> ৳{cart.length ? shipping : 0}</p>
            <p className="text-lg font-black text-green-700">💰 মোট খরচ: ৳{total}</p>
          </div>
          <div className="bg-white/50 p-3 rounded-xl border border-blue-100 text-[13px] text-slate-700">
            <p>✅ অর্ডারটি কনফার্ম হয়েছে। ধন্যবাদ **NexKart** থেকে অর্ডার করার জন্য! 💙</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t p-6 pb-10 flex justify-center shadow-lg z-[90]">
        <div className="w-full max-w-lg flex justify-between items-center gap-6">
          <div className="flex flex-col">
            <span className="text-3xl font-black text-green-600">৳{total}</span>
          </div>
          <button onClick={sendOrder} className="flex-1 bg-green-600 text-white h-16 rounded-3xl font-black shadow-lg active:scale-95 transition-all">অর্ডার করুন 🚀</button>
        </div>
      </div>
    </main>
  );
}