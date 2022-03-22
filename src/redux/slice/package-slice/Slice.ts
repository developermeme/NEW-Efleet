import { createSlice } from "@reduxjs/toolkit";
import { Reducer } from "./Reducer";
import { IInitialState, TaskPageEnum } from "./Types";

const initialState: IInitialState = {
  FileData: null,
  Packages: null,
  TaskAllocationView: TaskPageEnum.List,
  SelectedRegion: null,
  AllocatedRiders: null,
  Riders: null,
  AssignedRiders: null,
};

export const Slice = createSlice({
  initialState,
  name: "Package-Slice",
  reducers: Reducer,
});

export { Slice as PackageSlice };

export const {
  setPackages,
  setTaskAllocationView,
  setSelectedRegion,
  setRiders,
  setAssignedRiders,
  setFileData,
  setAllocatedRiders,
} = Slice.actions;
