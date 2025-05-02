export const staffListReducer = (state, action) => {
    if (action.type === "POPULATE_ITEMS") {
        return [...action.payload];
    }
    return state;
};

export default staffListReducer;
