import { createContext } from "react";
import { ILayoutState } from "./schema";

export const initialLayoutState: ILayoutState = {
    search: "",
    setSearch: () => {}
}

const Context = createContext<ILayoutState>(initialLayoutState);

export default Context;