import { Slider } from "@/components/ui/slider";

interface VolumeSliderProps {
  value: number;
  setValue: (value: number) => void;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ value, setValue }) => {
  const handleChangeValue = (value: number[]) => {
    setValue(value[0]);
  };

  return (
    <Slider
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChangeValue}
      max={1}
      step={0.1}
      aria-label="Volume"
      className="cursor-pointer"
    />
  );
};

export default VolumeSlider;
