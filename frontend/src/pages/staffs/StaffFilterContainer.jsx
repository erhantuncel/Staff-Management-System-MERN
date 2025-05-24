import ColumnFilter from "./ColumnFilter";
import PageSizeFilter from "./PageSizeFilter";

const StaffFilterContainer = () => {
    return (
        <div className="mb-2 flex justify-between">
            <PageSizeFilter />
            <ColumnFilter />
        </div>
    );
};

export default StaffFilterContainer;
