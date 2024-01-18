import { PDSTAGES, UPDATEPDSTAGES, UPDATEPDMODULE, UPDATEPDSUBMODULE, UPDATEPDPAGE, UPDATEPDSUBSTAGE } from "../actions/PDActionType"

const initialState = {
    pdSubStages: [],
};

const pdStagesReducer = (state = initialState, action) => {

    switch (action.type) {

        case PDSTAGES:

            return {
                pdSubStages: action.payload,
            };

        case UPDATEPDSUBSTAGE:

            return {
                pdSubStages: state.pdSubStages.map((item) => {
                    return {
                        ...item,
                        personalDiscussionSubStageLogs: item.personalDiscussionSubStageLogs.map((item1, index1) => {
                            if (item1.subStageCode === action.payload.subStage) {
                                item1.subStageStatus = 'Completed';

                                // Check if there is a next substage
                                const nextSubStage = item.personalDiscussionSubStageLogs[index1 + 1];
                                if (nextSubStage) {
                                    // Update the next substage to 'Inprogress'
                                    nextSubStage.subStageStatus = 'Inprogress';
                                }
                            }
                            return item1;
                        })
                    };
                }),
            };

        case UPDATEPDMODULE:
            return {
                pdSubStages: state.pdSubStages.map((item) => {
                    return {
                        ...item,
                        personalDiscussionSubStageLogs: item.personalDiscussionSubStageLogs.map((item1) => {
                            if (item1.subStageCode === action.payload.subStage) {
                                return {
                                    ...item1,
                                    personalDiscussionModuleLogs: item1.personalDiscussionModuleLogs.map((item2) => {
                                        if (item2.moduleCode === action.payload.module) {
                                            return {
                                                ...item2,
                                                moduleStatus: 'Completed'
                                            };
                                        }
                                        return item2;
                                    })
                                };
                            }
                            return item1;
                        })
                    };
                }),
            };

        default:
            return state;
    }
};

export default pdStagesReducer;
