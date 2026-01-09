import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store/index"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppselector: TypedUseSelectorHook<RootState> = useSelector