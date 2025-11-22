import { Platform } from "react-native";
import moment from "moment";

export const isIOS: boolean = Platform.OS === "ios";
export const isAndroid: boolean = Platform.OS === "android";

export const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const emptyFunction = (): void => { };

export const truncateString = (str: string, maxLength: number): string => {
    if (!str || str.length <= maxLength) return str;
    return str.substring(0, maxLength - 3) + '...';
};

export const formatDate = (dateString: string) => {
    return moment(dateString).format('dddd, MMMM DD, YYYY');
};

export const formatMonthDate = (dateString: string) => {
    return moment(dateString).format('MMM DD');
};