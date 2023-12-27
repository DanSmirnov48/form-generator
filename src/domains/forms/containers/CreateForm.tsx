"use client";

import React, { useState } from "react";
import { FormHeader } from "../components/FormHeader";
import FormQuestion from "../components/FormQuestion";
import { Button } from "@/components/ui/button";
import { QuestionType } from "../components/FormQuestionType";
import { MultipleOption } from "../components/FormRadioGroup";
import { v4 as uuidv4 } from 'uuid'

export type QuestionItem = {
  id: string
  questionType: QuestionType;
  question: MultipleOption | string;
  text?: string;
  options?: MultipleOption
};

const CreateForm = () => {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: uuidv4(), questionType: "text", question: "" }])
  }

  const handleQuestionChange = (question:  Partial<QuestionItem>) => {
    const index = questions.findIndex((q) => q.id === question.id)
    const newQuestions = [...questions];
    newQuestions[index] = question as QuestionItem;
    setQuestions(newQuestions);
  }

  return (
    <div className="grid gap-4">
      <FormHeader
        value={{
          title: "",
          description: "",
        }}
        onChange={() => { }}
      />
      {questions.map((question) => (
        <FormQuestion key={question.id} onChange={handleQuestionChange} question={question}/>
      ))}
      <Button type="button" onClick={handleAddQuestion}>
        Add Question
      </Button>
    </div>
  );
};

export { CreateForm };
