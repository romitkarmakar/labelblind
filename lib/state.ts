import { createContext } from "react";
import { ILayoutState } from "./schema";

export const initialLayoutState: ILayoutState = {
    search: "",
    setSearch: () => { },
    filter: {
        startDate: null,
        endDate: null
    }
}

const Context = createContext<ILayoutState>(initialLayoutState);

export default Context;