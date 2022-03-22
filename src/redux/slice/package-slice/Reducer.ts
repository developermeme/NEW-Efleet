import { PayloadAction } from "@reduxjs/toolkit";
import {
  IAllocatedRiders,
  IFileData,
  IInitialState,
  IPackages,
  IRider,
  ISelectedRegion,
  TaskPageEnum,
} from "./Types";

export const Reducer = {
  setFileData: (
    state: IInitialState,
    action: PayloadAction<IFileData[]>
  ): void => {
    state.FileData = action.payload;
  },
  setPackages: (
    state: IInitialState,
    action: PayloadAction<IPackages>
  ): void => {
    state.Packages = action.payload;
  },
  setTaskAllocationView: (
    state: IInitialState,
    action: PayloadAction<TaskPageEnum>
  ): void => {
    state.TaskAllocationView = action.payload;
  },
  setSelectedRegion: (
    state: IInitialState,
    action: PayloadAction<ISelectedRegion>
  ): void => {
    state.SelectedRegion = action.payload;
  },
  setRiders: (state: IInitialState, action: PayloadAction<IRider[]>): void => {
    state.Riders = action.payload;
  },
  setAssignedRiders: (
    state: IInitialState,
    action: PayloadAction<IRider[] | null>
  ): void => {
    state.AssignedRiders = action.payload;
  },
  setAllocatedRiders: (
    state: IInitialState,
    action: PayloadAction<IAllocatedRiders[] | null>
  ): void => {
    state.AllocatedRiders = action.payload;
  },
};
