import './SelectPageSize.css';
const SelectPageSize = ({pageSize, handleSize}) =>(

<select name="pageSize" value={pageSize} onChange={handleSize}>
    <option value="10">10</option>
    <option value="20">20</option>
    <option value="50">50</option>
</select>

);
export default SelectPageSize;