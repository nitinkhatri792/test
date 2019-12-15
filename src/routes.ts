import { IRoute } from "./App.types";
import Home from "./components/home/home.component";
export const routes: IRoute[] = [
    {
        path: "/",
        exact: true,
        component: Home ,
        private: false
    },

];
