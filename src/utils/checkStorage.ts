import { changeFirstTime } from "@/redux/reducers/auth";
import store from "@/redux/store";
import { secureStorage } from "./secureStorage";

const { dispatch } = store;

export const getLocalItem = async () => {
    try {
        const isFirstTime = await secureStorage.getItem('IS_FIRST_TIME');
        console.log('isFirstTime', isFirstTime);

        if (isFirstTime) {
            dispatch(changeFirstTime(true));
        }
    } catch (error) {
        console.log(error);
    }
}
