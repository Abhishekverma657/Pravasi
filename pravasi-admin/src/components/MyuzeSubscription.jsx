 
import React from "react";
import banner from "../../public/banner.png";

const FeatureRow = ({ name, freeIcon, playIcon }) => {
  const freeIconColor = freeIcon === "x" ? "text-gray-400" : "text-blue-700";
  const playIconColor = playIcon === "✓" ? "text-white" : "text-gray-400";

  return (
    <div className="flex items-center py-2 border-b border-white/20 last:border-b-0">
      <div className="flex-1 pr-4 text-sm text-white">{name}</div>
      <div className={`w-[20%] text-center text-lg font-bold ${freeIconColor}`}>
        {freeIcon}
      </div>
      <div className={`w-[20%] text-center text-lg font-bold ${playIconColor}`}>
        {playIcon}
      </div>
    </div>
  );
};

const MyuzeSubscription = () => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {/* 🔁 Auto-scrolling Banner */}
      <div className="w-full bg-gray-900 overflow-hidden relative" style={{ height: 180 }}>
        <div className="absolute top-0 left-0 w-full h-full flex items-center">
          <div className="flex animate-scroll-x whitespace-nowrap">
            {[...Array(8)].map((_, i) => (
              <img
                key={i}
                src={banner}
                alt="banner"
                className="h-[180px] w-auto object-cover mx-2 rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>

      {/* 🧠 Main Content */}
      <div className="flex-1 w-full max-w-2xl mx-auto">
        {/* CTA Header */}
        <div className="p-4 pt-6 text-center">
          <div className="flex justify-center mb-2">
            <span className="text-3xl text-yellow-500">⚡</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Subscribe to <span className="text-blue-600">myuzePlay</span>
          </h1>
          <p className="text-xs text-gray-500 mb-6">
            Join now & enjoy over 30,000 podcasts, audio shows, and stories
          </p>

          {/* 💳 Subscription Price Options */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { price: "Rs. 75", period: "Weekly" },
              { price: "Rs. 99", period: "Monthly" },
              { price: "Rs. 249", period: "Quarterly" },
              { price: "Rs. 599", period: "Yearly" },
            ].map(({ price, period }, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl shadow-md border-2 text-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-yellow-500 bg-gradient-to-br from-yellow-50 to-white border-gray-200`}
              >
                <span className="text-lg font-bold text-gray-900 block">{price}</span>
                <span className="text-xs text-gray-500">{period}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 🌟 Premium Features */}
        <div className="mt-6 p-6 pb-2 mx-auto bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl">
          <h2 className="text-xl font-bold text-center text-white mb-4">
            Premium features with <span className="font-extrabold">myuzePlay</span>
          </h2>
          <div className="flex items-center mb-2 text-sm font-semibold text-white border-b border-white/50 pb-2">
            <div className="flex-1 pr-4"></div>
            <div className="w-[20%] text-center font-bold text-blue-200">Free</div>
            <div className="w-[20%] text-center font-extrabold text-white">myuzePlay</div>
          </div>
          <FeatureRow name="All Shows Unlocked" freeIcon="x" playIcon="✓" />
          <FeatureRow name="All Audiobooks Unlocked" freeIcon="x" playIcon="✓" />
          <FeatureRow name="Ad-Free Experience" freeIcon="x" playIcon="✓" />
          <FeatureRow name="Download to listen Offline" freeIcon="x" playIcon="✓" />
          <FeatureRow name="Unlimited Downloads" freeIcon="x" playIcon="✓" />
          <FeatureRow name="Bonus Content" freeIcon="x" playIcon="✓" />
          <FeatureRow name="High Quality Audio" freeIcon="x" playIcon="✓" />
        </div>

            
        <div className="p-4 pt-6">
          <h3 className="text-sm font-bold text-gray-900 mb-2">
            Promotional Offer Terms
          </h3>
          <ul className="list-disc pl-5 text-xs text-gray-600 space-y-2 text-left">
            <li>
              Subscriptions purchased on the offer price above are secured on the same
              price as the purchase.
            </li>
            <li>
              Subscriptions can be cancelled anytime from within the App by visiting
              Profile → Manage myuzePlay section.
            </li>
            <li>
              Free Trials (if any) are applicable only once in a lifetime to a user.
            </li>
          </ul>
        </div>
      </div>

   
      <div className="p-4 pt-6 sticky bottom-0 bg-white shadow-lg w-full text-center">
        <button
          className="w-full h-14 rounded-lg text-white font-bold uppercase 
                     bg-gradient-to-r from-blue-600 to-blue-400 
                     flex items-center justify-center transition duration-300 
                     hover:opacity-90 hover:shadow-md"
        >
          CONTINUE FOR <span className="ml-1 font-extrabold">RS. 75</span>
        </button>
        <p className="text-[11px] mt-2 text-gray-500 font-medium">
          Thereafter Rs. 75/weekly. Cancel anytime.
        </p>
      </div>
    </div>
  );
};

export default MyuzeSubscription;
