export interface InputFieldProps {
    className?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: string
    placeholder?: string
    type?: string
    children?: React.ReactNode
    onSubmit?: (e: any) => void
}
