import React from 'react';

const CheckBoxItem = ({ id, category, setColumnFilters, isActive }) => {
  const handleChange = (e) => {
    e.preventDefault();

    setColumnFilters((prev) => {
      const categories = prev.find((filter) => filter.id === "category")?.value;
      if (!categories) {
        return prev.concat({
          id: "category",
          value: [category],
        });
      }

      return prev.map((f) =>
        f.id === "category"
          ? {
              ...f,
              value: isActive
                ? categories.filter((c) => c !== category)
                : categories.concat(category),
            }
          : f
      );
    })
  }

  return (
    <li onClick={handleChange} className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
      {/* <input defaultChecked={true} id={index} type="checkbox" value="" name={category} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> */}
      {/* <input onChange={handleChange} id={category} type="checkbox" name={category} value={isActive ? true : false} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> */}
      <input onChange={(e) => {}} id={id} type="checkbox" name={category} checked={isActive ? true : false} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
      <label htmlFor={id} className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 capitalize">{category}</label>
    </li>
  )
}

const FilterPopOver = ({ categories, columnFilters, setColumnFilters }) => {
  const filterCategories = columnFilters.find((f) => f.id === "category")?.value || [];

  return (
    <>
      <ul
        className="dropdown-menu bottom-end"
        style={{
          minWidth: "240px",
          opacity: "1",
          visibility: "visible",
          transform: "rotateX(0deg)",
          marginTop: "8px"
        }}
      >
        <li className="menu-item-header">
          <div className="border-b border-gray-200 dark:border-gray-600 px-4 py-2 flex items-center justify-between">
            <h6>Filter By:</h6>
            <p>Categories</p>
          </div>
        </li>
        {categories && categories.map((category, index) => {
          return (
            <CheckBoxItem 
              key={index}
              id={index}
              category={category}
              setColumnFilters={setColumnFilters}
              isActive={filterCategories.includes(category)}
            />
          )
        })}
      </ul>
    </>
  )
}

export default FilterPopOver;