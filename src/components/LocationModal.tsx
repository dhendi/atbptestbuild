import React, { useState } from 'react';
import { X, MapPin, Check } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  onSelectLocation: (loc: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}) => {
  const [customInput, setCustomInput] = useState('');

  if (!isOpen) return null;

  const popularAreas = [
    'Poblacion, Makati',
    'Cubao Expo, Quezon City',
    'Kapitolyo, Pasig City',
    'San Juan, Metro Manila',
    'Marikina City',
    'Baguio City, Benguet',
    'San Fernando, Pampanga',
    'Vigan, Ilocos Sur',
    'Cebu City, Central Visayas',
    'Iloilo City, Western Visayas',
    'Davao City, Mindanao',
  ];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    onSelectLocation(customInput.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7EE] text-[#24140E] rounded-[14px_8px_12px_6px] max-w-md w-full p-6 border-2 border-[#24140E] shadow-[8px_8px_0px_#24140E] relative">
        <button
          onClick={onClose}
          className="btn-handmade-paper absolute top-4 right-4 p-1.5 shadow-[2px_2px_0px_#24140E]"
        >
          <X size={16} />
        </button>

        <div className="border-b-2 border-[#24140E] pb-3 mb-4">
          <span className="tag-handmade-yellow font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5">
            LOKASYON NG MAMIMILI
          </span>
          <h3 className="font-serif text-2xl text-[#24140E] font-bold mt-2">
            Piliin ang Iyong Bayan o Lungsod
          </h3>
          <p className="text-xs text-[#5C4A3E] mt-0.5">
            Ipapakita ang mga pinakamalapit na seller, garage sales, at direct studio shipping options sa iyong lugar.
          </p>
        </div>

        {/* Popular Locations */}
        <div className="space-y-2 mb-4 max-h-56 overflow-y-auto pr-1">
          {popularAreas.map((area) => (
            <button
              key={area}
              onClick={() => {
                onSelectLocation(area);
                onClose();
              }}
              className={`w-full p-2.5 rounded-[6px] text-left text-xs flex items-center justify-between cursor-pointer transition-all border-1.5 font-mono ${
                currentLocation === area
                  ? 'bg-[#24140E] text-[#FAF7EE] border-[#24140E] shadow-[2px_2px_0px_#FAB900] font-bold'
                  : 'bg-[#FFFDF8] hover:bg-[#FAF7EE] text-[#24140E] border-[#24140E]/30 hover:border-[#24140E]'
              }`}
            >
              <span className="flex items-center gap-2">
                <MapPin size={13} className={currentLocation === area ? "text-[#FAB900]" : "text-[#9E3F24]"} />
                <span>{area}</span>
              </span>
              {currentLocation === area && <Check size={14} className="text-[#FAB900]" />}
            </button>
          ))}
        </div>

        {/* Custom Input */}
        <form onSubmit={handleCustomSubmit} className="pt-3 border-t-2 border-dashed border-[#24140E]/20">
          <label className="block text-xs font-mono font-bold text-[#24140E] mb-1">
            O ilagay ang iyong barangay:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Hal. Brgy. Loyola Heights, QC"
              className="flex-1 bg-[#FFFDF8] border-2 border-[#24140E] rounded-[6px] p-2 text-xs text-[#24140E] focus:outline-none focus:ring-1 focus:ring-[#FAB900] shadow-[2px_2px_0px_rgba(36,20,14,0.1)] font-mono"
            />
            <button
              type="submit"
              disabled={!customInput.trim()}
              className="btn-handmade-dark px-3.5 py-2 disabled:opacity-50 text-xs font-mono font-bold cursor-pointer"
            >
              Itakda
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
