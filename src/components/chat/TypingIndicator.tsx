import { ReasoningText } from "../ui/reasoning-text";

export interface TypingIndicatorProps {
  className?: string;
  isIndonesian?: boolean;
}

const PHRASES_ID = [
  "Sedang menalar",
  "Membaca konteks portofolio",
  "Menghubungkan arsitektur proyek",
  "Menyusun jawaban",
];

const PHRASES_EN = [
  "Thinking",
  "Reading portfolio context",
  "Connecting architecture details",
  "Forming response",
];

export function TypingIndicator({
  className = "",
  isIndonesian = false,
}: TypingIndicatorProps) {
  return (
    <div className={`inline-flex items-center py-1 ${className}`}>
      <ReasoningText
        phrases={isIndonesian ? PHRASES_ID : PHRASES_EN}
        variant="cascade"
        interval={1800}
      />
    </div>
  );
}

export default TypingIndicator;
