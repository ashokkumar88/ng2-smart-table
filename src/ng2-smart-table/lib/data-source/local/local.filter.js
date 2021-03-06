var LocalFilter = (function () {
    function LocalFilter() {
    }
    LocalFilter.filter = function (data, field, search, customFilter) {
        var filter = customFilter ? customFilter : this.FILTER;
        return data.filter(function (el) { 
            var value = typeof el[field] === 'undefined' || el[field] === null ? el['srt'] : el[field];
            return filter.call(null, value, search);
        });
    };
    return LocalFilter;
}());
export { LocalFilter };
LocalFilter.FILTER = function (value, search) {
    return value.toString().toLowerCase().includes(search.toString().toLowerCase());
};
//# sourceMappingURL=local.filter.js.map