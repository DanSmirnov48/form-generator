"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export type QuestionType = "text" | "multiple-choice" | "checkbox"

const questionTypes = [
  {
    value: "text",
    label: "Text",
  },
  {
    value: "multiple-choice",
    label: "Multiple Choice",
  },
  {
    value: "checkbox",
    label: "Check Box",
  },
] as Array<{
  label: string;
  value: QuestionType
}>

type FormQuestionTypeProps = {
  value?:QuestionType;
  onChange: (value: QuestionType) => void;
};

export function FormQuestionType({ value, onChange }: FormQuestionTypeProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? questionTypes.find((questionType) => questionType.value === value)?.label
            : "Select question type"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No options found.</CommandEmpty>
          <CommandGroup>
            {questionTypes.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  onChange(currentValue as QuestionType)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
