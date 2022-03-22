import {
  addPackegeFileAPI,
  addRiderOnSubdivisionAPI,
  addZoneAPI,
  deleteSubdivisionAPI,
  deliveryDetailsByDateAPI,
  deliveryDetailsAPI,
  earningsAPI,
  getAllocatedRidersAPI,
  getPackegeFileModeAPI,
  getridersAPI,
  getZonedParcelAPI,
  updateRiderToParcelAPI,
} from "./APIEndPoint";
import { GET, POST } from "./axios";

export const PackageServices = {
  zonedParcel: async function (data: any) {
    const promise = await GET(getZonedParcelAPI, data);
    return promise;
  },
  getRiders: async function () {
    const promise = await GET(getridersAPI);
    return promise;
  },
  addPackageFile: async function (data: any) {
    const promise = await POST(addPackegeFileAPI, {}, data);
    return promise;
  },
  getPackegeFileMode: async function (data: any) {
    const promise = await GET(getPackegeFileModeAPI, data);
    return promise;
  },
  getRiderOnSubdivision: async function (data: any) {
    const promise = await GET(getAllocatedRidersAPI, data);
    return promise;
  },
  addRiderOnSubdivision: async function (data: any) {
    const promise = await POST(addRiderOnSubdivisionAPI, {}, data);
    return promise;
  },
  updateRiderToParcel: async function (data: any) {
    const promise = await POST(updateRiderToParcelAPI, data);
    return promise;
  },
  getDeliveryDetailsByDate: async function (data: any) {
    console.log("dataa", data);
    const promise = await GET(deliveryDetailsByDateAPI, data);
    return promise;
  },
  getDeliveryDetails: async function (data: any) {
    const promise = await GET(deliveryDetailsAPI, data);
    return promise;
  },
  getEarningsDetails: async function (data: any) {
    const promise = await GET(earningsAPI, data);
    return promise;
  },
};

export const settingservices = {
  addSubzone: async function (data: any, url: string) {
    const promise = await POST(url, data);
    return promise;
  },
  deleteSubdivision: async function (data: any) {
    const promise = await POST(deleteSubdivisionAPI, data);
    return promise;
  },
  addNewZone: async function (data: any) {
    const promise = await POST(addZoneAPI, data);
    return promise;
  },
};
