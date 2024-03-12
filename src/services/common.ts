import {
  ActionReducerMapBuilder,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
  createSlice,
} from "@reduxjs/toolkit";

export interface FetchApiState<T> {
  data?: T;
  status: "loading" | "finished" | "error";
}

export const createGenericSlice = <
  T,
  Reducers extends SliceCaseReducers<FetchApiState<T>>
>({
  name = "",
  initialState,
  reducers,
  extraReducers,
}: {
  name: string;
  initialState: FetchApiState<T>;
  reducers: ValidateSliceCaseReducers<FetchApiState<T>, Reducers>;
  extraReducers: (builder: ActionReducerMapBuilder<FetchApiState<T>>) => void;
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      start(state) {
        state.status = "loading";
      },
      success(state: FetchApiState<T>, action: PayloadAction<T>) {
        state.data = action.payload;
        state.status = "finished";
      },
      error(state) {
        state.status = "error";
      },
      ...reducers,
    },
    extraReducers: extraReducers,
  });
};
