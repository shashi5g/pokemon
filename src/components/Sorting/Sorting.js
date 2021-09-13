const Sorting = ({sort, handleSorting}) =>(
<select name="sort"value={sort} onChange={handleSorting}>
<option value="">Sorting</option>
    <option value="name">name</option>
    <option value="height">height</option>
    <option value="weight">weight</option>
</select>
);
export default Sorting;