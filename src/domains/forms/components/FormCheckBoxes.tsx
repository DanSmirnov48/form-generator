"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { QuestionItem } from "../containers/DynamicForm"
import { Input } from "@/components/ui/input"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Option } from "./FormRadioGroup"
import { Label } from "@/components/ui/label"
import { CheckCircle, Edit, Trash } from "lucide-react"
import { convertStringToSlug, isLabelValid } from "../utils"
import { FormAddOptionButton } from "./FormAddOptionButton"

type FormCheckBoxesProps = {
  question?: Partial<QuestionItem>;
  onChange?: (question: Partial<QuestionItem>) => void
};

export function FormCheckBoxes({ question, onChange }: FormCheckBoxesProps) {
  const inputAddRef = useRef<HTMLInputElement>(null);
  const inputEdiRef = useRef<HTMLInputElement>(null);
  const options = question?.options ?? []
  const [editingOption, setEditingOption] = useState<Option | null>(null)

  const handleAddOption = () => {
    const currentLabel = inputAddRef.current?.value;

    if (typeof currentLabel === "string" && isLabelValid({ currentLabel, options })) {
      const option = {
        id: currentLabel,
        label: currentLabel,
      };
      onChange?.({
        ...question,
        options: [...options, option]
      });
      inputAddRef.current!.id = ""
    }
  };

  const handleRemoveOption = (id: string) => {
    onChange?.({
      ...question,
      options: options.filter((o) => o.id !== id)
    })
  }

  const handleEditOption = (id: string) => {
    const option = options.find((o) => o.id == id)
    setEditingOption(option ?? null)
    inputEdiRef.current?.focus()
    inputEdiRef.current!.value = option?.label ?? ""
  }

  const handleUpdateOption = (label: string) => {
    const currentLabel = label
    if (typeof currentLabel === "string" && isLabelValid({ currentLabel, options })) {
      const option = {
        id: convertStringToSlug(currentLabel),
        label: currentLabel,
      }

      const index = options.findIndex((option) => option.id === editingOption?.id)
      const newOptions = [...options]
      newOptions[index] = option

      onChange?.({
        ...question,
        options: newOptions
      })
    }
    setEditingOption(null)
  }

  const handleOnCheck = (id: string) => {
    const option = options.find((option) => option.id === id)
    const index = options.findIndex((option) => option.id === id)
    const newOptions = [...options]
    const newOption = {
      ...option!,
      isChecked: !option!.isChecked
    } as Option

    newOptions[index] = newOption

    onChange?.({
      ...question,
      options: newOptions
    })
  }

  return (
    <div className="grid gap-4 w-full">
      {options.map(({ id, label, isChecked }) => (
        <div className="grid grid-cols-2">
          <div key={id} className="flex items-center gap-2 min-h-[40px]">
            {editingOption?.id === id ? 
              <Input
                defaultValue={editingOption?.label}
                ref={inputEdiRef}
                onBlur={(e) => handleUpdateOption(e.target.value ?? "")}
              /> : null}
            <div className={cn("flex items-center gap-2", { "hidden": editingOption?.id === id })}>
              <Checkbox
                id={id}
                defaultChecked={isChecked}
                onCheckedChange={() => handleOnCheck(id)}
              />
              <Label htmlFor={id}>{label}</Label>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Trash className="cursor-pointer" onClick={() => handleRemoveOption(id)} />
            <Edit className="cursor-pointer" onClick={() => handleEditOption(id)} />
            <CheckCircle className="cursor-pointer" onClick={() => setEditingOption(null)} />
          </div>
        </div>
      ))}
      <FormAddOptionButton onAddOption={handleAddOption} ref={inputAddRef} />
    </div>
  );
}