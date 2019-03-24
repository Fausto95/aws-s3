import {DateISOString, DateYMD, XAmzDate } from "./types";

export const dateISOString: DateISOString = new Date(+new Date() + 864e5).toISOString();
export const xAmzDate: XAmzDate =  dateISOString.split("-").join("").split(":").join("").split(".").join("");
export const dateYMD: DateYMD = dateISOString.split("T")[0].split("-").join("");
