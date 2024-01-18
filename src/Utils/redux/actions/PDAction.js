
import { PDSTAGES, UPDATEPDSTAGES, UPDATEPDMODULE, UPDATEPDSUBMODULE, UPDATEPDPAGE, UPDATEPDSUBSTAGE } from "./PDActionType"

export const addPDStages = (parameter) => {
    return {
        type: PDSTAGES,
        payload: parameter
    }
}

export const updatePDStages = (parameter) => {
    return {
        type: UPDATEPDSTAGES,
        payload: parameter
    }
}

export const updatePDSubStage = (subStage) => {
    return {
        type: UPDATEPDSUBSTAGE,
        payload: { subStage }
    }
}

export const updatePDModule = (subStage, module) => {
    return {
        type: UPDATEPDMODULE,
        payload: { subStage, module }
    }
}

export const updatePDSubModule = (subStage, module, submodule) => {
    return {
        type: UPDATEPDSUBMODULE,
        payload: { subStage, module, submodule }
    }
}

export const updatePDPage = (subStage, module, submodule, page) => {
    return {
        type: UPDATEPDPAGE,
        payload: { subStage, module, submodule, page }
    }
}