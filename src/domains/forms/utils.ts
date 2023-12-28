import { Option } from "./components/FormRadioGroup";

export const convertStringToSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
};

export const checkIfOption = (options: Option[], label: string) => {
    return options.some((option) => option.label.trim() === label.trim());
};

export const isLabelValid = ({ currentLabel, options }: { currentLabel: string, options: Option[] }) => {
    return typeof currentLabel === "string"
        && currentLabel.length > 0 &&
        !checkIfOption(options, currentLabel)
}

