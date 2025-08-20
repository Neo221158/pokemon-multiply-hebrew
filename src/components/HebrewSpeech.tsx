import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { useState } from "react";

interface HebrewSpeechProps {
  num1: number;
  num2: number;
}

export const HebrewSpeech = ({ num1, num2 }: HebrewSpeechProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const hebrewNumbers = {
    1: "אחד", 2: "שניים", 3: "שלושה", 4: "ארבעה", 5: "חמישה",
    6: "שישה", 7: "שבעה", 8: "שמונה", 9: "תשעה", 10: "עשרה"
  };

  const speakHebrew = async () => {
    setIsPlaying(true);
    
    const hebrewText = `${hebrewNumbers[num1 as keyof typeof hebrewNumbers]} כפול ${hebrewNumbers[num2 as keyof typeof hebrewNumbers]}`;
    
    // For now, we'll use the Web Speech API as a fallback
    // TODO: Replace with ElevenLabs Hebrew TTS when API key is provided
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(hebrewText);
      utterance.lang = 'he-IL';
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    } else {
      setIsPlaying(false);
    }
  };

  const hebrewText = `${hebrewNumbers[num1 as keyof typeof hebrewNumbers]} כפול ${hebrewNumbers[num2 as keyof typeof hebrewNumbers]}`;

  return (
    <div className="flex items-center gap-3 justify-center">
      <div className="text-lg font-medium text-foreground" dir="rtl">
        {hebrewText}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={speakHebrew}
        disabled={isPlaying}
        className="flex items-center gap-2"
      >
        <Volume2 className="w-4 h-4" />
        {isPlaying ? "Playing..." : "Listen"}
      </Button>
    </div>
  );
};