const IMAGE_BASE = "http://31.97.231.85:2700/images/"; 

export default function ChapterCard({ city, onEdit, onManagePeople, onPeopleView, onDelete }) {
  const img = city.image ? (city.image.startsWith("http") ? city.image : `${IMAGE_BASE}${city.image}`) : null;

  return (
    <div className="relative bg-white/95 backdrop-blur-sm border rounded-2xl shadow-md hover:shadow-lg transition-all p-4 overflow-hidden">
      
      {/* Card Content */}
      <div className="flex gap-4">
        
        {/* Image */}
        <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border">
          {img ? (
            <img src={img} alt={city.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
          )}
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{city.name}</h3>
          <div className="mt-2 text-sm text-gray-600">
            <div>{city.contact?.address}</div>
            <div>{city.contact?.phone} · {city.contact?.email}</div>
            <div className="mt-2 text-xs text-gray-500">
              {new Date(city.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* People Pills */}
          {Array.isArray(city.people) && city.people.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 items-end justify-end">
              {city.people.slice(0, 2).map((p) => (
                <div key={p._id || p.email} className="px-2 py-1 bg-pink-50 text-pink-600 rounded-lg text-xs font-medium border border-pink-200">
                  {p.name}
                </div>
              ))}

              {/* Show +X if more people + quick button to open People modal */}
              {city.people.length > 2 && (
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                    +{city.people.length - 2} more
                  </div>

 
                </div>
                
                
              )}
                                <button
                    onClick={onPeopleView}
                    title="Manage people"
                    className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs shadow-sm flex items-center"
                  >
                    {/* small users icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 11a4 4 0 10-8 0 4 4 0 008 0z" />
                    </svg>
                  </button>
            </div>
          )}
        </div>
      </div>

      {/* 🔥 Action buttons fixed inside card */}
      <div className="absolute top-3 right-3 flex gap-2">

        <button 
          onClick={onEdit}
          className="px-3 py-1.5 bg-[#D90165] hover:bg-[#b30054] text-white rounded-md text-xs shadow-sm"
        >
          Edit
        </button>

        <button 
          onClick={onManagePeople}
          className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md text-xs shadow-sm"
        >
          People
        </button>

        <button 
          onClick={onDelete}
          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-md text-xs shadow-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
