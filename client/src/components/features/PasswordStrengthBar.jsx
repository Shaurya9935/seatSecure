import React from "react";
import { STRENGTH_COLORS } from "../../utils/passwordStrength";

/**
 * PasswordStrengthBar displays 4 segments representing password strength (Weak, Fair, Good, Strong).
 *
 * @param {Object} props
 * @param {number} props.score Current score (0 to 4)
 * @param {string} props.label Text description of strength
 * @param {string} props.color Dynamic color string
 */
export const PasswordStrengthBar = ({ score, label, color }) => {
  return (
    <div className="mt-2">
      {/* 4 strength segments */}
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((segIndex) => {
          const isActive = segIndex <= score;
          const bgStyle = isActive
            ? { backgroundColor: STRENGTH_COLORS[score - 1] }
            : { backgroundColor: "rgba(255, 255, 255, 0.08)" };

          return (
            <div
              key={segIndex}
              className="h-[3px] flex-1 rounded-sm transition-colors duration-300"
              style={bgStyle}
            />
          );
        })}
      </div>

      {/* Text label showing Weak / Fair / Good / Strong */}
      {label && (
        <div
          className="text-[0.72rem] mt-1 font-medium transition-colors duration-200"
          style={{ color }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
