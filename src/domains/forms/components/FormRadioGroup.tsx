import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRef, useState } from "react";
import { QuestionItem } from "../containers/CreateForm";
import { CheckCircle, Circle, Edit, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = {
  value: string;
  label: string;
};

export type MultipleOption = Option[]

const convertStringToSlug = (text: string) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
};

const checkIfOption = (options: Option[], label: string) => {
  return options.some((option) => option.label.trim() === label.trim());
};

const isLabelValid = ({ currentLabel, options }: { currentLabel: string, options: Option[] }) => {
  return typeof currentLabel === "string"
    && currentLabel.length > 0 &&
    !checkIfOption(options, currentLabel)
}

type FormRadioGroupProps = {
  question?: Partial<QuestionItem>;
  onChange?: (question: Partial<QuestionItem>) => void
};

export function FormRadioGroup({ question, onChange }: FormRadioGroupProps) {
  const inputAddRef = useRef<HTMLInputElement>(null);
  const inputEdiRef = useRef<HTMLInputElement>(null);
  const options = question?.options ?? []
  const [editingOption, setEditingOption] = useState<Option | null>(null)

  const handleAddOption = () => {
    const currentLabel = inputAddRef.current?.value;

    if (typeof currentLabel === "string" && isLabelValid({ currentLabel, options })) {
      const option = {
        value: convertStringToSlug(currentLabel),
        label: currentLabel,
      };
      onChange?.({
        ...question,
        options: [...options, option]
      });
      inputAddRef.current!.value = ""
    }
  };

  const handleRemoveOption = (value: string) => {
    onChange?.({
      ...question,
      options: options.filter((o) => o.value !== value)
    })
  }

  const handleEditOption = (value: string) => {
    const option = options.find((o) => o.value == value)
    setEditingOption(option ?? null)
  }

  const handleUpdateOption = (newLabel: string) => {
    if (typeof newLabel === "string" && isLabelValid({ currentLabel: newLabel, options })) {
      const newValue = convertStringToSlug(newLabel)
      const newOptions = options.map((option) => {
        if (option.value === editingOption?.value) {
          return {
            ...option,
            value: newValue,
            label: newLabel
          }
        }
        return option
      })
      onChange?.({
        ...question,
        options: newOptions
      })
    }
    setEditingOption(null)
  }

  return (
    <div className="w-full grid gap-4">
      <RadioGroup className="w-full grid gap-4">
        {options.map(({ label, value }) => (
          <div className="grid grid-cols-2">
            <div className="flex items-center gap-2 min-h-[40px]" key={value}>
              <Input defaultValue={ editingOption?.label} className={cn("hidden", {
                "block": editingOption?.value === value,
                "border border-input": editingOption?.value !== value,
                "border border-primary": editingOption?.value === value
              })}
                ref={inputEdiRef}
                onBlur={(e) => handleUpdateOption(e.target.value ?? "")}
              />
              <div className={cn("flex items-center gap-2", { "hidden": editingOption?.value === value })}>
                <RadioGroupItem value={value} id={value} />
                <Label htmlFor={value}>{label}</Label>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Trash className="cursor-pointer" onClick={() => handleRemoveOption(value)} />
              <Edit className="cursor-pointer" onClick={() => handleEditOption(value)} />
              <CheckCircle className="cursor-pointer" onClick={() => setEditingOption(null)} />
            </div>
          </div>
        ))}
      </RadioGroup>
      <div className="flex gap-2">
        <Input placeholder="Add option" ref={inputAddRef} className="" />
        <Button type="button" onClick={handleAddOption}>
          Add option
        </Button>
      </div>
    </div>
  );
}
