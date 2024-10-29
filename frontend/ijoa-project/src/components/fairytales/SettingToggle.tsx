import React from "react";

interface ToggleOptionsProps {
  options: { label: string; checked: boolean }[];
  onToggle: (index: number) => void;
}

const SettingToggles: React.FC<ToggleOptionsProps> = ({ options, onToggle }) => {
  return (
    <div className="mt-6 flex justify-center">
      <div className="space-y-3">
        {options.map((option, index) => (
          <label key={index} className="label cursor-pointer flex items-center gap-16">
            <span className="text-lg flex-grow text-center">{option.label}</span>
            <input
              type="checkbox"
              className="toggle custom-toggle"
              defaultChecked={option.checked}
              onChange={() => onToggle(index)}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default SettingToggles;