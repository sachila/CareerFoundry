import { useSelector as useSelectorRedux } from "react-redux";
import { InitialState } from "../initialState";

const useSelector = <TSelected, T = InitialState>(
  selector: (state: T) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => useSelectorRedux<T, TSelected>(selector, equalityFn);

export default useSelector;
