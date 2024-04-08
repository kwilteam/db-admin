import { useRef } from "react";

interface IAutoComplete {
    tables: string[];
    actions: string[];
    params: string[];
    kfDefault: string[];
    tableDefault: string[];
    actionDefault: string[];
    dbDeclaration: string[];
    extensionList: string[];
}

export default function useUpdateAutocomplete() {
    const autoCompleteRef = useRef<IAutoComplete>({
        tables: [],
        actions: [],
        params: [],
        kfDefault: [],
        tableDefault: [],
        actionDefault: [],
        dbDeclaration: [],
        extensionList: [],
    })

    
}