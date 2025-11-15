function fillQueryWithBindings(sql, bindings) {
    let i = 0;
    return sql.replace(/\?/g, () => {
        const val = bindings[i++];
        if (val === null || val === undefined) return "NULL";
        if (typeof val === "number") return val;
        if (typeof val === "boolean") return val ? "1" : "0";
        return `'${String(val).replace(/'/g, "''")}'`; // Escape single quotes
    });
}

module.exports = { fillQueryWithBindings };
