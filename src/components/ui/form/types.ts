import { Dispatch, SetStateAction } from "react"

export type FormStateType<T> = {
    value: T, 
    setValue: Dispatch<SetStateAction<T>>
}
